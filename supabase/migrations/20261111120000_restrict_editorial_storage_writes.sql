-- Run after inspecting existing policies and validating in staging.
-- The application uploads through permission-checked server routes using its
-- secret key; ordinary Auth sessions must not bypass those checks via Storage.
-- Public reads and existing files remain unchanged. No records are deleted.
begin;

drop policy if exists "Authenticated users can upload content assets" on storage.objects;
drop policy if exists "Authenticated users can update content assets" on storage.objects;
drop policy if exists "Authenticated users can delete content assets" on storage.objects;
drop policy if exists "Authenticated users can manage library files" on storage.objects;

commit;
