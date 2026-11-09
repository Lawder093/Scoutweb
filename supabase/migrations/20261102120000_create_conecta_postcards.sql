-- Postales públicas de Conecta. Esta migración se prepara localmente y no se aplica a producción automáticamente.

create table if not exists public.conecta_postcards (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.conecta_users(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 2 and 120),
  country_code text not null check (char_length(country_code) between 2 and 20),
  country_name text not null check (char_length(country_name) between 2 and 80),
  group_name text not null check (char_length(group_name) between 2 and 120),
  group_logo_path text,
  cover_image_path text not null,
  message text not null check (char_length(message) between 1 and 350),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'expired')),
  submitted_at timestamptz not null default timezone('utc', now()),
  approved_at timestamptz,
  published_at timestamptz,
  expires_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  rejection_reason text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists conecta_postcards_public_idx
  on public.conecta_postcards (published_at desc)
  where status = 'approved';

create index if not exists conecta_postcards_review_idx
  on public.conecta_postcards (status, submitted_at desc);

create trigger set_conecta_postcards_updated_at
before update on public.conecta_postcards
for each row execute function public.set_updated_at();

alter table public.conecta_postcards enable row level security;

create policy "Public can read active approved postcards"
on public.conecta_postcards for select
to anon, authenticated
using (status = 'approved' and expires_at > timezone('utc', now()));

insert into storage.buckets (id, name, public)
values ('conecta-postcards', 'conecta-postcards', true)
on conflict (id) do update set public = excluded.public;

comment on table public.conecta_postcards is 'Postales de Conecta moderadas, visibles durante 72 horas y conservadas como archivo histórico.';
