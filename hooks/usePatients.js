"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchPatients, insertPatient, markPatientCompleted } from "@/lib/patientsApi";

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (err) {
      console.error(err);
      setLoadError(
        "Could not reach Supabase. Check that .env.local has your project URL and anon key, and that the patients table exists."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount
    load();
  }, [load]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  async function addPatient({ name, phone, visitDate, nextVisitDate }) {
    const newPatient = await insertPatient({
      name,
      phone,
      visitDate,
      nextVisitDate,
      status: "visited",
    });
    setPatients((prev) => [...prev, newPatient]);
    return newPatient;
  }

  // Fulfils a due appointment: closes out the old row (status -> completed)
  // and logs a fresh visit row for the date it actually happened on.
  async function markVisited(id, visitDate) {
    const original = patients.find((p) => p.id === id);
    if (!original) return null;

    const newVisit = await insertPatient({
      name: original.name,
      phone: original.phone,
      visitDate,
      nextVisitDate: null,
      status: "visited",
    });
    await markPatientCompleted(id);

    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "completed" } : p)).concat(newVisit)
    );
    return newVisit;
  }

  return { patients, loading, loadError, reload: load, toast, showToast, addPatient, markVisited };
}
