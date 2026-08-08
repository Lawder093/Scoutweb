-- Milestone 4: production-ready library catalog.
-- The existing library_resources table remains available for backwards
-- compatibility while the application migrates to this normalized model.

create type public.library_item_status as enum ('draft', 'review', 'published', 'archived');
create type public.library_item_visibility as enum ('public', 'members', 'private');

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  bio text,
  avatar_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.publishers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  website_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.languages (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  bucket text not null check (bucket in ('books', 'covers', 'thumbnails', 'authors', 'uploads')),
  path text not null,
  mime_type text not null,
  size_bytes bigint,
  width integer,
  height integer,
  checksum text,
  created_at timestamptz not null default timezone('utc', now()),
  unique (bucket, path)
);

create table public.library_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  description text not null default '',
  publisher_id uuid references public.publishers(id) on delete set null,
  publication_year smallint check (publication_year between 1000 and 9999),
  edition text,
  language_id uuid references public.languages(id) on delete set null,
  isbn text,
  cover_media_id uuid references public.media(id) on delete set null,
  thumbnail_media_id uuid references public.media(id) on delete set null,
  pdf_media_id uuid references public.media(id) on delete set null,
  epub_media_id uuid references public.media(id) on delete set null,
  mobi_media_id uuid references public.media(id) on delete set null,
  featured boolean not null default false,
  recommended boolean not null default false,
  downloads bigint not null default 0 check (downloads >= 0),
  views bigint not null default 0 check (views >= 0),
  reading_time_minutes integer check (reading_time_minutes is null or reading_time_minutes > 0),
  pages integer check (pages is null or pages > 0),
  license text,
  visibility public.library_item_visibility not null default 'public',
  seo_title text,
  seo_description text,
  status public.library_item_status not null default 'draft',
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.library_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.library_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.library_item_authors (
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  author_id uuid not null references public.authors(id) on delete cascade,
  author_order smallint not null default 0,
  primary key (library_item_id, author_id)
);

create table public.library_item_categories (
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  category_id uuid not null references public.library_categories(id) on delete cascade,
  primary key (library_item_id, category_id)
);

create table public.library_item_tags (
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  tag_id uuid not null references public.library_tags(id) on delete cascade,
  primary key (library_item_id, tag_id)
);

create table public.downloads (
  id uuid primary key default gen_random_uuid(),
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  media_id uuid references public.media(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.reading_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  progress numeric(5, 2) not null default 0 check (progress between 0 and 100),
  last_read_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, library_item_id)
);

create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, library_item_id)
);

create index library_items_public_idx
  on public.library_items (status, visibility, updated_at desc)
  where deleted_at is null;
create index library_items_featured_idx
  on public.library_items (featured, recommended, updated_at desc)
  where deleted_at is null and status = 'published';
create index library_items_title_idx on public.library_items using gin (to_tsvector('simple', title));
create index library_item_authors_author_idx on public.library_item_authors (author_id);
create index library_item_categories_category_idx on public.library_item_categories (category_id);
create index library_item_tags_tag_idx on public.library_item_tags (tag_id);
create index downloads_item_idx on public.downloads (library_item_id, created_at desc);

create trigger set_authors_updated_at before update on public.authors
for each row execute function public.set_updated_at();
create trigger set_publishers_updated_at before update on public.publishers
for each row execute function public.set_updated_at();
create trigger set_library_items_updated_at before update on public.library_items
for each row execute function public.set_updated_at();
create trigger set_library_categories_updated_at before update on public.library_categories
for each row execute function public.set_updated_at();

alter table public.authors enable row level security;
alter table public.publishers enable row level security;
alter table public.languages enable row level security;
alter table public.media enable row level security;
alter table public.library_items enable row level security;
alter table public.library_categories enable row level security;
alter table public.library_tags enable row level security;
alter table public.library_item_authors enable row level security;
alter table public.library_item_categories enable row level security;
alter table public.library_item_tags enable row level security;
alter table public.downloads enable row level security;
alter table public.reading_progress enable row level security;
alter table public.favorites enable row level security;

create policy "Published library items are publicly readable"
on public.library_items for select to anon, authenticated
using (status = 'published' and visibility = 'public' and deleted_at is null);

create policy "Library taxonomy is publicly readable"
on public.library_categories for select to anon, authenticated using (true);
create policy "Library tags are publicly readable"
on public.library_tags for select to anon, authenticated using (true);
create policy "Library authors are publicly readable"
on public.authors for select to anon, authenticated using (true);
create policy "Library publishers are publicly readable"
on public.publishers for select to anon, authenticated using (true);
create policy "Library languages are publicly readable"
on public.languages for select to anon, authenticated using (true);
create policy "Published item relationships are publicly readable"
on public.library_item_authors for select to anon, authenticated
using (exists (select 1 from public.library_items item where item.id = library_item_id and item.status = 'published' and item.visibility = 'public' and item.deleted_at is null));
create policy "Published item categories are publicly readable"
on public.library_item_categories for select to anon, authenticated
using (exists (select 1 from public.library_items item where item.id = library_item_id and item.status = 'published' and item.visibility = 'public' and item.deleted_at is null));
create policy "Published item tags are publicly readable"
on public.library_item_tags for select to anon, authenticated
using (exists (select 1 from public.library_items item where item.id = library_item_id and item.status = 'published' and item.visibility = 'public' and item.deleted_at is null));

create policy "Users can read their reading progress"
on public.reading_progress for select to authenticated using (auth.uid() = user_id);
create policy "Users can manage their reading progress"
on public.reading_progress for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can read their favorites"
on public.favorites for select to authenticated using (auth.uid() = user_id);
create policy "Users can manage their favorites"
on public.favorites for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('books', 'books', false, 104857600, array['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook']::text[]),
  ('covers', 'covers', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('thumbnails', 'thumbnails', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('authors', 'authors', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('uploads', 'uploads', false, 104857600, array['application/pdf', 'application/epub+zip', 'image/jpeg', 'image/png', 'image/webp']::text[])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Public library images are readable"
on storage.objects for select to public
using (bucket_id in ('covers', 'thumbnails', 'authors'));
create policy "Authenticated users can manage library files"
on storage.objects for all to authenticated
using (bucket_id in ('books', 'covers', 'thumbnails', 'authors', 'uploads'))
with check (bucket_id in ('books', 'covers', 'thumbnails', 'authors', 'uploads'));

comment on table public.library_items is 'Normalized public library catalog with future-ready media, taxonomy, and reader fields.';
comment on table public.reading_progress is 'Future authenticated-reader progress tracking; no reader UI is enabled yet.';
comment on table public.favorites is 'Future authenticated-reader favorites; no favorites UI is enabled yet.';
