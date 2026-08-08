create extension if not exists "pgcrypto";

create table public.content_authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  bio text,
  avatar_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null default '',
  category text not null,
  cover_image_path text,
  author_id uuid references public.content_authors(id) on delete set null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint blog_posts_publication_date_check check (not is_published or published_at is not null)
);

create table public.library_resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  creator text not null,
  description text not null,
  cover_image_path text,
  file_path text,
  file_mime_type text,
  is_public boolean not null default false,
  published_at timestamptz,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint library_resources_publication_date_check check (not is_public or published_at is not null)
);

create index blog_posts_published_at_idx
  on public.blog_posts (published_at desc)
  where is_published = true;

create index library_resources_public_order_idx
  on public.library_resources (display_order asc, published_at desc)
  where is_public = true;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger set_content_authors_updated_at
before update on public.content_authors
for each row execute function public.set_updated_at();

create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create trigger set_library_resources_updated_at
before update on public.library_resources
for each row execute function public.set_updated_at();

alter table public.content_authors enable row level security;
alter table public.blog_posts enable row level security;
alter table public.library_resources enable row level security;

create policy "Published authors are publicly readable"
on public.content_authors
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.blog_posts
    where blog_posts.author_id = content_authors.id
      and blog_posts.is_published = true
      and blog_posts.published_at <= timezone('utc', now())
  )
);

create policy "Published blog posts are publicly readable"
on public.blog_posts
for select
to anon, authenticated
using (is_published = true and published_at <= timezone('utc', now()));

create policy "Public library resources are publicly readable"
on public.library_resources
for select
to anon, authenticated
using (is_public = true and published_at <= timezone('utc', now()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'content-assets',
  'content-assets',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::text[]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Public content assets are readable"
on storage.objects
for select
to public
using (bucket_id = 'content-assets');

create policy "Authenticated users can upload content assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'content-assets');

create policy "Authenticated users can update content assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'content-assets')
with check (bucket_id = 'content-assets');

create policy "Authenticated users can delete content assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'content-assets');

comment on table public.blog_posts is 'Published editorial content for the public blog.';
comment on table public.library_resources is 'Public educational resources and downloadable files.';
comment on table public.content_authors is 'Editorial authors referenced by blog posts.';
