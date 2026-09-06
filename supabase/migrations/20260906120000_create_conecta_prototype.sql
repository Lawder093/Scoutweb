-- Primer prototipo privado de Conecta.
-- Ejecutar después de 20260826120000_create_admin_and_cde_activities.sql.

alter table public.conecta_users
  alter column password_hash drop not null;

alter table public.conecta_users
  add column if not exists phone text,
  add column if not exists photo_path text,
  add column if not exists cde_slug text,
  add column if not exists community text,
  add column if not exists otp_code_hash text,
  add column if not exists otp_expires_at timestamptz,
  add column if not exists otp_requested_at timestamptz,
  add column if not exists otp_attempts integer not null default 0,
  add column if not exists last_login_at timestamptz;

create unique index if not exists conecta_users_phone_lower_idx
  on public.conecta_users (phone)
  where phone is not null;

create index if not exists conecta_users_active_phone_idx
  on public.conecta_users (phone)
  where is_active = true and phone is not null;

create table if not exists public.conecta_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text not null,
  image_path text not null,
  location text,
  external_url text,
  is_published boolean not null default true,
  published_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists conecta_posts_published_idx
  on public.conecta_posts (published_at desc)
  where is_published = true;

create table if not exists public.conecta_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.conecta_posts(id) on delete cascade,
  user_id uuid not null references public.conecta_users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists conecta_comments_post_idx
  on public.conecta_comments (post_id, created_at asc);

create trigger set_conecta_posts_updated_at
before update on public.conecta_posts
for each row execute function public.set_updated_at();

alter table public.conecta_posts enable row level security;
alter table public.conecta_comments enable row level security;

comment on table public.conecta_users is 'Pre-registered private Conecta scout accounts. WhatsApp OTP replaces password login when the provider is connected.';
comment on table public.conecta_posts is 'Global private feed posts managed by editorial administrators.';
comment on table public.conecta_comments is 'Comments from authenticated Conecta scouts; moderation is performed by editorial administrators.';

-- Las fotos de perfiles y publicaciones no deben vivir en el bucket público editorial.
insert into storage.buckets (id, name, public)
values ('conecta-private', 'conecta-private', false)
on conflict (id) do update set public = excluded.public;
