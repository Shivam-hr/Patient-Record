import { supabase } from "./supabaseClient";

function rowToPatient(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    visitDate: row.visit_date,
    nextVisitDate: row.next_visit_date,
    status: row.status,
    doctorId: row.doctor_id,
  };
}

export async function fetchPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("visit_date", { ascending: true });

  if (error) throw error;
  return data.map(rowToPatient);
}

export async function insertPatient({ name, phone, visitDate, nextVisitDate, status }) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) throw new Error("Not signed in.");

  const { data, error } = await supabase
    .from("patients")
    .insert([
      {
        name,
        phone,
        visit_date: visitDate,
        next_visit_date: nextVisitDate,
        status,
        doctor_id: userData.user.id,
      },
    ])
    .select();

  if (error) throw error;
  return rowToPatient(data[0]);
}

export async function markPatientCompleted(id) {
  const { error } = await supabase
    .from("patients")
    .update({ status: "completed" })
    .eq("id", id);

  if (error) throw error;
}
