"use client";
import { useState } from "react";
import { offset } from "@/lib/dates";
import { usePatients } from "@/hooks/usePatients";
import AppShell from "./AppShell";
import DateHeader from "./DateHeader";
import DateSlider from "./DateSlider";
import StatCards from "./StatCards";
import PatientLists from "./PatientLists";
import DesktopRail from "./DesktopRail";
import AddPatientModal from "./AddPatientModal";
import { FloatingAddButton } from "./MobileNav";

export default function Dashboard() {
  const { patients, loading, loadError, toast, showToast, addPatient, markVisited } = usePatients();
  const [selectedDate, setSelectedDate] = useState(offset(0));
  const [railAnchor, setRailAnchor] = useState(offset(0));
  const [modalOpen, setModalOpen] = useState(false);

  function goToday() {
    setSelectedDate(offset(0));
    setRailAnchor(offset(0));
  }

  function shiftWindow(dir) {
    const days = dir * 7;
    setRailAnchor((prev) => offset(days, prev));
    setSelectedDate((prev) => offset(days, prev));
  }

  async function handleMarkVisited(id) {
    const original = patients.find((p) => p.id === id);
    try {
      await markVisited(id, selectedDate);
      showToast(`${original?.name ?? "Patient"} marked as visited today.`);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong saving that. Check your Supabase connection.");
    }
  }

  async function handleSave(data, error) {
    if (error) {
      showToast(error);
      return;
    }
    try {
      await addPatient({
        name: data.name,
        phone: data.phone,
        visitDate: selectedDate,
        nextVisitDate: data.nextVisitDate,
      });
      setModalOpen(false);
      showToast(`Welcome message queued for ${data.name}.`);
    } catch (err) {
      console.error(err);
      showToast("Could not save patient. Check your Supabase connection.");
    }
  }

  return (
    <>
      <AppShell>
        <DateHeader selectedDate={selectedDate} onToday={goToday} onShift={shiftWindow} />

        {loadError && (
          <div className="bg-danger-soft text-danger text-[13px] font-semibold px-4 py-3 rounded-xl mb-4">
            {loadError}
          </div>
        )}

        <DateSlider
          patients={patients}
          selectedDate={selectedDate}
          railAnchor={railAnchor}
          onSelect={setSelectedDate}
        />
        <StatCards patients={patients} selectedDate={selectedDate} />

        <div className="hidden xl:block mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary text-white border-none rounded-xl px-4.5 py-2.5 font-extrabold text-[13.5px] cursor-pointer shadow-[0_8px_18px_rgba(37,99,235,0.25)]"
          >
            ＋ Add Patient
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-textsoft text-sm">Loading patients…</div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 items-start">
            <PatientLists patients={patients} selectedDate={selectedDate} onMarkVisited={handleMarkVisited} />
            <DesktopRail patients={patients} selectedDate={selectedDate} onAddClick={() => setModalOpen(true)} />
          </div>
        )}
      </AppShell>

      <FloatingAddButton onClick={() => setModalOpen(true)} />

      <AddPatientModal
        open={modalOpen}
        selectedDate={selectedDate}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      {toast && (
        <div className="fixed top-[70px] left-1/2 -translate-x-1/2 bg-foreground text-white px-4.5 py-2.5 rounded-xl text-[13px] font-semibold z-60 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
          {toast}
        </div>
      )}
    </>
  );
}
