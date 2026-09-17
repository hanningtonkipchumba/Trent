-- Run in Supabase SQL Editor after replacing YOUR_OWNER_EMAIL.
create table if not exists public.analytics_events (
 id bigint generated always as identity primary key,
 event_name text not null check (event_name in ('page_view','open_app_nav','open_app_hero','open_app_footer','open_school_app','open_parent_app','open_student_app')),
 page_path text not null default '/', visitor_id uuid not null, created_at timestamptz not null default now()
);
alter table public.analytics_events enable row level security;
create policy "Public can add analytics events" on public.analytics_events for insert to anon, authenticated with check (true);
create policy "Owner can read analytics events" on public.analytics_events for select to authenticated using ((auth.jwt() ->> 'email') = 'hanningtonkipchumba1@gmail,com');
create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
