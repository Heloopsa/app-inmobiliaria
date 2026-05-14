-- =====================================================
-- InmueblePro — Favorites System (Open Source)
-- Allows authenticated users to save/unsave properties
-- =====================================================

-- 1. Create favorites table
create table if not exists public.favorites (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  unique(user_id, property_id)
);

-- Indexes for fast lookups
create index if not exists idx_favorites_user on public.favorites(user_id);
create index if not exists idx_favorites_property on public.favorites(property_id);

-- 2. Enable RLS
alter table public.favorites enable row level security;

-- 3. Policies
-- Users can insert their own favorite
drop policy if exists favorites_insert on public.favorites;
create policy favorites_insert on public.favorites
  for insert
  with check (auth.uid() = user_id);

-- Users can delete their own favorite
drop policy if exists favorites_delete on public.favorites;
create policy favorites_delete on public.favorites
  for delete
  using (auth.uid() = user_id);

-- Users can select their own favorites
drop policy if exists favorites_select on public.favorites;
create policy favorites_select on public.favorites
  for select
  using (auth.uid() = user_id);

-- Property owners can see favorites count (for analytics)
drop policy if exists favorites_owner_read_count on public.favorites;
create policy favorites_owner_read_count on public.favorites
  for select
  using (
    exists (
      select 1 from public.properties p
      where p.id = property_id
      and p.user_id = auth.uid()
    )
  );

-- 4. Function to check if user favorited a property
create or replace function public.is_favorited(p_user_id uuid, p_property_id uuid)
 returns boolean
 language sql
 set search_path to public, pg_catalog
 as $$
  select exists(select 1 from public.favorites where user_id = p_user_id and property_id = p_property_id);
$$;

-- 5. Function to get favorites count for a property
create or replace function public.favorite_count(p_property_id uuid)
 returns integer
 language sql
 set search_path to public, pg_catalog
 as $$
  select count(*) from public.favorites where property_id = p_property_id;
$$;

-- Migration complete