-- Dashboard users and per-section permissions. The owner remains the email
-- configured in CONTENT_ADMIN_EMAILS and is always a full administrator.
create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text not null default '',
  can_manage_blog boolean not null default false,
  can_manage_conecta boolean not null default false,
  can_manage_activities boolean not null default false,
  can_manage_instagram boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_admin_users_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;

comment on table public.admin_users is 'Dashboard users and their section-level editorial permissions. Service role access only.';
