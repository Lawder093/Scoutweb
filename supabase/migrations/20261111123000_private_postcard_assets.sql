-- Apply only after 20261102120000_create_conecta_postcards.sql and deploy
-- code that uses resolvePostcardAssetUrl. Existing objects are preserved.
-- Pending/rejected cover photos must not have permanent public URLs.
begin;

update storage.buckets
set public = false,
    file_size_limit = 2097152,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']::text[]
where id = 'conecta-postcards';

commit;
