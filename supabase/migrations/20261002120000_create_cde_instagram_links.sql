-- One replaceable Instagram publication per CDE.
create table public.cde_instagram_links (
  cde_slug text primary key,
  instagram_url text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint cde_instagram_links_cde_slug_check check (cde_slug in ('mexico', 'colombia', 'argentina')),
  constraint cde_instagram_links_url_check check (instagram_url ~* '^https://(www\.)?instagram\.com/')
);

create trigger set_cde_instagram_links_updated_at
before update on public.cde_instagram_links
for each row execute function public.set_updated_at();

alter table public.cde_instagram_links enable row level security;

create policy "Published CDE Instagram links are publicly readable"
on public.cde_instagram_links
for select
to anon, authenticated
using (is_published = true);

comment on table public.cde_instagram_links is 'Current Instagram publication link managed for each CDE.';
