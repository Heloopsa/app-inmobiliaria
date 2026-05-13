-- =====================================================
-- InmueblePro — Initial Schema (Open Source)
-- Supabase / PostgreSQL 15
-- =====================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp" with schema public;

-- =====================================================
-- 1. PROFILES — perfiles de usuarios
-- =====================================================
create table public.profiles (
  id uuid not null primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  cedula_rnc text unique,
  avatar_url text,
  is_agent boolean not null default false,
  agent_verified boolean not null default false,
  agent_license text,
  role text not null default 'user' check (role in ('user', 'agent', 'admin')),
  raw_user_meta_data jsonb default '{}'::jsonb,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index idx_profiles_role on public.profiles(role);

-- Trigger to auto-update updated_at
create or replace function public.handle_profiles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_profiles_updated_at();

-- =====================================================
-- 2. PROPERTIES — propiedades publicadas
-- =====================================================
create table public.properties (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text not null unique,
  description text not null,
  deal_type text not null check (deal_type in ('venta', 'alquiler')),
  category text not null,
  city text not null,
  zone text not null,
  currency text not null default 'USD' check (currency in ('USD', 'DOP')),
  price numeric(15,2) not null,
  beds smallint,
  baths smallint not null,
  area_m2 numeric(10,2) not null,
  lat numeric(10,7),
  lng numeric(10,7),
  amenities text[] not null default '{}',
  matricula_ref text,
  status text not null default 'revision' check (status in ('borrador', 'revision', 'aprobada', 'rechazada')),
  published_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index idx_properties_status on public.properties(status) where status = 'aprobada';
create index idx_properties_city on public.properties(city);
create index idx_properties_category on public.properties(category);
create index idx_properties_deal_type on public.properties(deal_type);
create index idx_properties_user on public.properties(user_id);
create index idx_properties_slug on public.properties(slug);
create index idx_properties_price on public.properties(price);

-- Trigger to auto-update updated_at
create or replace function public.handle_properties_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  if new.status = 'aprobada' and old.status != 'aprobada' then
    new.published_at = now();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger properties_updated_at
  before update on public.properties
  for each row execute procedure public.handle_properties_updated_at();

-- =====================================================
-- 3. PROPERTY IMAGES — imágenes de propiedades
-- =====================================================
create table public.property_images (
  id uuid not null primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now()
);

create index idx_property_images_property on public.property_images(property_id);

-- =====================================================
-- 4. PROPERTY VIEWS — analíticas de vistas
-- =====================================================
create table public.property_views (
  id uuid not null primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  ip_address inet,
  user_agent text,
  viewed_at timestamp with time zone not null default now()
);

create index idx_property_views_property on public.property_views(property_id);
create index idx_property_views_date on public.property_views(viewed_at);

-- =====================================================
-- 5. CONTACT REQUESTS — solicitudes de contacto
-- =====================================================
create table public.contact_requests (
  id uuid not null primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  sender_name text not null,
  sender_email text not null,
  sender_phone text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamp with time zone not null default now()
);

create index idx_contact_requests_property on public.contact_requests(property_id);
create index idx_contact_requests_status on public.contact_requests(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- =====================================================

-- Profiles
alter table public.profiles enable row level security;

-- Todos pueden leer perfiles públicos
create policy profiles_public_read on public.profiles
  for select using (true);

-- Solo el dueño puede actualizar su perfil
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = id);

-- Properties
alter table public.properties enable row level security;

-- Todos pueden ver propiedades aprobadas
create policy properties_public_read on public.properties
  for select using (
    status = 'aprobada'
    or auth.uid() = user_id
    or (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- El dueño puede ver/editar/eliminar sus propiedades
create policy properties_owner_crud on public.properties
  for all using (auth.uid() = user_id);

-- Admin puede aprobar/rechazar
create policy properties_admin_manage on public.properties
  for all using (
    (select role from public.profiles where id = auth.uid()) in ('admin', 'agent')
  );

-- Property Images
alter table public.property_images enable row level security;

create policy property_images_public_read on public.property_images
  for select using (true);

create policy property_images_owner_crud on public.property_images
  for all using (
    exists (select 1 from public.properties where properties.id = property_images.property_id and properties.user_id = auth.uid())
  );

-- Property Views
alter table public.property_views enable row level security;

create policy property_views_insert on public.property_views
  for insert with check (true);

create policy property_views_owner_read on public.property_views
  for select using (
    exists (select 1 from public.properties where properties.id = property_views.property_id and properties.user_id = auth.uid())
  );

-- Contact Requests
alter table public.contact_requests enable row level security;

create policy contact_requests_insert on public.contact_requests
  for insert with check (true);

create policy contact_requests_owner_read on public.contact_requests
  for select using (
    exists (select 1 from public.properties where properties.id = contact_requests.property_id and properties.user_id = auth.uid())
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, raw_user_meta_data)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Check Cédula/RNC uniqueness before insert
create or replace function public.check_cedula_uniqueness()
returns trigger as $$
declare
  count integer;
begin
  if new.cedula_rnc is not null then
    select count(*) into count from public.profiles where cedula_rnc = new.cedula_rnc and id != new.id;
    if count > 0 then
      raise exception 'Cédula o RNC ya está en uso por otro usuario';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger cedula_uniqueness_check
  before insert or update on public.profiles
  for each row execute procedure public.check_cedula_uniqueness();

-- =====================================================
-- SEED DATA — Datos de ejemplo para desarrollo
-- =====================================================

-- Insert demo profiles (use fixed UUIDs for reproducibility)
insert into auth.users (id, email, raw_user_meta_data, aud)
values
  ('00000000-0000-0000-0000-000000000001', 'demo@inmueblepro.com', '{"full_name": "Carlos Demo"}', 'authenticated'),
  ('00000000-0000-0000-0000-000000000002', 'agente@inmueblepro.com', '{"full_name": "María Agente"}', 'authenticated')
on conflict do nothing;

insert into public.profiles (id, full_name, email, phone, cedula_rnc, is_agent, agent_verified, role)
values
  ('00000000-0000-0000-0000-000000000001', 'Carlos Demo', 'demo@inmueblepro.com', '+18095550100', '001-0000000-0', false, false, 'user'),
  ('00000000-0000-0000-0000-000000000002', 'María Agente', 'agente@inmueblepro.com', '+18095550101', '1311234567', true, true, 'agent')
on conflict (id) do nothing;