-- Migration 004: revert to strict per-doctor isolation
-- Supersedes migration_003_shared_roster.sql — that shared-list approach is
-- no longer wanted. Doctor A must never see Doctor B's patients, and vice versa.

drop policy if exists "Any signed-in doctor can view all patients" on patients;
drop policy if exists "Any signed-in doctor can add patients" on patients;
drop policy if exists "Any signed-in doctor can update any patient" on patients;

create policy "Doctors see only their own patients"
on patients for select
using (auth.uid() = doctor_id);

create policy "Doctors insert only their own patients"
on patients for insert
with check (auth.uid() = doctor_id);

create policy "Doctors update only their own patients"
on patients for update
using (auth.uid() = doctor_id);
