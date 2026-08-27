-- Editorial data for the admin dashboard.
-- Run this migration after the existing content schema migrations.

create table public.conecta_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index conecta_users_name_lower_idx
  on public.conecta_users (lower(name));

create table public.cde_activities (
  id uuid primary key default gen_random_uuid(),
  cde_slug text not null,
  slug text not null,
  title text not null,
  event_date date not null,
  image_path text,
  summary text not null,
  body text not null default '',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint cde_activities_publication_date_check check (not is_published or published_at is not null),
  constraint cde_activities_cde_slug_slug_key unique (cde_slug, slug)
);

create index cde_activities_published_idx
  on public.cde_activities (cde_slug, event_date desc)
  where is_published = true;

create trigger set_conecta_users_updated_at
before update on public.conecta_users
for each row execute function public.set_updated_at();

create trigger set_cde_activities_updated_at
before update on public.cde_activities
for each row execute function public.set_updated_at();

alter table public.conecta_users enable row level security;
alter table public.cde_activities enable row level security;

create policy "Published CDE activities are publicly readable"
on public.cde_activities
for select
to anon, authenticated
using (is_published = true and published_at <= timezone('utc', now()));

comment on table public.conecta_users is 'Accounts prepared for the future Conecta experience; passwords are stored as hashes.';
comment on table public.cde_activities is 'News and activities published inside each CDE page.';
