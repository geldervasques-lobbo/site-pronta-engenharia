-- PRONTA Engenharia - estrutura segura para edição de conteúdo
-- Rode este arquivo no SQL Editor do Supabase.

create table if not exists public.editor_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  can_edit boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.editor_profiles enable row level security;

create policy "Editors can read own profile"
on public.editor_profiles
for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.is_site_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.editor_profiles
    where user_id = (select auth.uid())
      and can_edit = true
  );
$$;

create table if not exists public.site_content (
  key text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Anyone can read published site content"
on public.site_content
for select
to anon, authenticated
using (true);

create policy "Only approved editors can insert site content"
on public.site_content
for insert
to authenticated
with check (public.is_site_editor());

create policy "Only approved editors can update site content"
on public.site_content
for update
to authenticated
using (public.is_site_editor())
with check (public.is_site_editor());

create policy "Only approved editors can delete site content"
on public.site_content
for delete
to authenticated
using (public.is_site_editor());

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "Anyone can read site assets"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-assets');

create policy "Only approved editors can upload site assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets' and public.is_site_editor());

create policy "Only approved editors can update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets' and public.is_site_editor())
with check (bucket_id = 'site-assets' and public.is_site_editor());

create policy "Only approved editors can delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets' and public.is_site_editor());

-- Depois de criar um usuário em Authentication > Users, autorize-o assim:
-- insert into public.editor_profiles (user_id, email, can_edit)
-- values ('COLE_AQUI_O_USER_ID', 'cliente@exemplo.com', true);
