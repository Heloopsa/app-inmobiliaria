-- =====================================================
-- Migration 002 — Add raw_user_meta_data to profiles
-- Run this in Supabase SQL Editor to update existing DB
-- =====================================================

-- 1. Add raw_user_meta_data column if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS raw_user_meta_data jsonb DEFAULT '{}'::jsonb;

-- 2. Populate raw_user_meta_data from auth.users existing data
UPDATE public.profiles p
SET raw_user_meta_data = COALESCE(
  (
    SELECT jsonb_build_object(
      'company', u.raw_user_meta_data->>'company',
      'website', u.raw_user_meta_data->>'website',
      'linkedin', u.raw_user_meta_data->>'linkedin',
      'instagram', u.raw_user_meta_data->>'instagram',
      'city', u.raw_user_meta_data->>'city'
    )
    FROM auth.users u
    WHERE u.id = p.id
  ),
  '{}'::jsonb
)
WHERE raw_user_meta_data IS NULL;

-- 3. Update the handle_new_user function to include raw_user_meta_data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, raw_user_meta_data)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data, '{}'::jsonb)
  )
  ON CONFLICT (id) DO UPDATE
  SET raw_user_meta_data = COALESCE(EXCLUDED.raw_user_meta_data, profiles.raw_user_meta_data);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create policy for profiles to allow self-read
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'profiles_self_read'
  ) THEN
    CREATE POLICY profiles_self_read ON public.profiles
      FOR SELECT USING (true);
  END IF;
END
$$;