-- Services table for Pavicat
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/jbqioxsskgaalgxxljdo/sql

create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  sanity_id text unique,
  title text not null,
  slug text not null unique,
  short_description text,
  icon_url text,
  featured_image_url text,
  gallery jsonb default '[]'::jsonb,
  body jsonb,
  features jsonb default '[]'::jsonb,
  display_order int default 0,
  seo jsonb,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for slug lookups
create index if not exists idx_services_slug on public.services(slug);

-- Index for ordering
create index if not exists idx_services_order on public.services(display_order);

-- Updated at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger on_services_updated
  before update on public.services
  for each row execute function public.handle_updated_at();

-- Enable RLS
alter table public.services enable row level security;

-- Public read access
create policy "Services are publicly readable"
  on public.services for select
  using (is_published = true);

-- Service role full access (for webhook sync)
create policy "Service role has full access"
  on public.services for all
  using (true)
  with check (true);
