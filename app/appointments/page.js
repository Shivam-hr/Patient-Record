"use client";
import { offset } from "@/lib/dates";
import { usePatients } from "@/hooks/usePatients";
import AppShell from "@/components/AppShell";
import AppointmentsView from "@/components/AppointmentsView";

export default function AppointmentsPage() {
  const { patients, loading, loadError, toast, showToast, markVisited } = usePatients();

  async function handleMarkVisited(id) {
    const original = patients.find((p) => p.id === id);
    try {
      await markVisited(id, offset(0));
      showToast(`${original?.name ?? "Patient"} marked as visited today.`);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong saving that. Check your Supabase connection.");
    }
  }

  return (
    <>
      <AppShell>
        {loadError && (
          <div className="bg-danger-soft text-danger text-[13px] font-semibold px-4 py-3 rounded-xl mb-4">
            {loadError}
          </div>
        )}
        <AppointmentsView patients={patients} loading={loading} onMarkVisited={handleMarkVisited} />
      </AppShell>

      {toast && (
        <div className="fixed top-[70px] left-1/2 -translate-x-1/2 bg-foreground text-white px-4.5 py-2.5 rounded-xl text-[13px] font-semibold z-60 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
          {toast}
        </div>
      )}
    </>
  );
}
