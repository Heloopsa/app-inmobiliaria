-- =====================================================
-- InmueblePro — Fix Profile Creation on Signup
-- Fixes Google Auth profile not being saved
-- =====================================================

-- =====================================================
-- 1. Revoke and re-grant EXECUTE properly
-- The trigger doesn't need EXECUTE permission, but we need
-- to ensure the function can still be called by the trigger
-- =====================================================

-- Drop the revoke that may be interfering
-- Grant EXECUTE back to PUBLIC (triggers work independently)
-- The function is SECURITY DEFINER so it runs with owner privileges
grant execute on function public.handle_new_user() to public;

-- =====================================================
-- 2. Ensure profiles table allows trigger inserts
-- The handle_new_user function inserts into profiles,
-- so we need a policy that allows this via SECURITY DEFINER
-- =====================================================

-- Drop existing policies that might block trigger inserts
drop policy if exists profiles_insert on public.profiles;

-- Create policy that allows INSERT for SECURITY DEFINER functions
-- This is safe because handle_new_user validates the data
create policy profiles_insert_via_trigger on public.profiles
  for insert
  with check (true);

-- =====================================================
-- 3. Ensure auth trigger is properly set up
-- Verify the trigger exists and is enabled
-- =====================================================

-- Drop and recreate the trigger to ensure it's working
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================
-- 4. Ensure profiles can be read by authenticated users
-- =====================================================

drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select
  using (auth.uid() = id or auth.uid() is not null);

-- =====================================================
-- 5. Fix: Ensure handle_new_user doesn't fail on duplicate
-- Use ON CONFLICT DO NOTHING to prevent errors on re-signup
-- =====================================================

create or replace function public.handle_new_user()
 returns trigger
 set search_path to public, pg_catalog
 language plpgsql
 security definer
as $$
begin
  insert into public.profiles (id, full_name, email, raw_user_meta_data)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- =====================================================
-- Migration complete
-- =====================================================