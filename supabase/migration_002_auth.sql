-- Migration 002: multi-doctor login
-- Run this in Supabase → SQL Editor → New Query → Run
-- (Run this AFTER schema.sql, on top of your existing patients table)

alter table patients add column if not exists doctor_id uuid references auth.users(id);
alter table patients add column if not exists feedback_sent_at timestamptz;

create index if not exists idx_patients_doctor_id on patients (doctor_id);

-- Replace the old open-access policy with real per-doctor scoping.
drop policy if exists "Allow all access for now" on patients;

create policy "Doctors see only their own patients"
on patients for select
using (auth.uid() = doctor_id);

create policy "Doctors insert only their own patients"
on patients for insert
with check (auth.uid() = doctor_id);

create policy "Doctors update only their own patients"
on patients for update
using (auth.uid() = doctor_id);

-- NOTE: any patients you added before this migration have doctor_id = null,
-- and will become invisible to both doctors once RLS is enforced (that's the
-- point of RLS — it hides rows with no matching doctor). If you want to keep
-- your test data, find each doctor's UUID under Authentication → Users, then run:
--   update patients set doctor_id = 'PASTE-DOCTOR-UUID-HERE' where doctor_id is null;
