"use client";
import { usePatients } from "@/hooks/usePatients";
import AppShell from "@/components/AppShell";
import PatientsView from "@/components/PatientsView";

export default function PatientsPage() {
  const { patients, loading, loadError } = usePatients();

  return (
    <AppShell>
      {loadError && (
        <div className="bg-danger-soft text-danger text-[13px] font-semibold px-4 py-3 rounded-xl mb-4">
          {loadError}
        </div>
      )}
      <PatientsView patients={patients} loading={loading} />
    </AppShell>
  );
}
