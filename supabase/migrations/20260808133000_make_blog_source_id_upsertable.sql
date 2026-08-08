drop index if exists public.blog_posts_source_id_idx;

create unique index if not exists blog_posts_source_id_idx
  on public.blog_posts (source_id);
