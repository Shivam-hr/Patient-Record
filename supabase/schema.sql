-- Run this once in Supabase → SQL Editor → New Query → Run

create table if not exists patients (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  visit_date date not null,
  next_visit_date date,
  status text not null default 'visited', -- 'visited' | 'pending_due' | 'completed'
  created_at timestamptz not null default now()
);

-- Speeds up the day-by-day lookups the dashboard does constantly
create index if not exists idx_patients_visit_date on patients (visit_date);
create index if not exists idx_patients_next_visit_date on patients (next_visit_date);

-- Row Level Security: required by Supabase, but since this is a single-clinic
-- app for now (no doctor login yet), we allow full access via the anon key.
-- When multi-doctor login is added later, this policy will be replaced with
-- one that scopes rows to auth.uid().
alter table patients enable row level security;

create policy "Allow all access for now"
on patients
for all
using (true)
with check (true);
