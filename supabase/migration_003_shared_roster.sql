-- Migration 003: shared roster across doctors
-- Both doctors can see and update every patient (needed for coverage days
-- when only one doctor is in). doctor_id is kept on each row purely to track
-- who originally added that patient, for individual stats — it no longer
-- restricts who can see or edit the row.

drop policy if exists "Doctors see only their own patients" on patients;
drop policy if exists "Doctors insert only their own patients" on patients;
drop policy if exists "Doctors update only their own patients" on patients;

create policy "Any signed-in doctor can view all patients"
on patients for select
using (auth.uid() is not null);

create policy "Any signed-in doctor can add patients"
on patients for insert
with check (auth.uid() is not null and doctor_id = auth.uid());

create policy "Any signed-in doctor can update any patient"
on patients for update
using (auth.uid() is not null);
