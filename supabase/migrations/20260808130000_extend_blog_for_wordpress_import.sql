alter table public.blog_posts
  add column if not exists source_id bigint,
  add column if not exists source_url text,
  add column if not exists source_modified_at timestamptz,
  add column if not exists author_name text,
  add column if not exists categories text[] not null default '{}',
  add column if not exists tags text[] not null default '{}';

create unique index if not exists blog_posts_source_id_idx
  on public.blog_posts (source_id)
  where source_id is not null;

create index if not exists blog_posts_source_modified_at_idx
  on public.blog_posts (source_modified_at desc)
  where source_id is not null;
