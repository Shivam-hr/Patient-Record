"use client";
import { useState } from "react";
import { fmtShort, offset } from "@/lib/dates";

export default function AddPatientModal({ open, selectedDate, onClose, onSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nextVisitDate, setNextVisitDate] = useState("");

  if (!open) return null;

  const isToday = selectedDate === offset(0);

  function handleSave() {
    if (!name.trim() || !phone.trim()) {
      onSave(null, "Please enter both name and WhatsApp number.");
      return;
    }
    if (phone.length !== 10) {
      onSave(null, "WhatsApp number must be exactly 10 digits.");
      return;
    }
    onSave({
      name: name.trim(),
      phone: phone.trim(),
      nextVisitDate: nextVisitDate || null,
    });
    setName("");
    setPhone("");
    setNextVisitDate("");
  }

  return (
    <div className="fixed inset-0 bg-[#111827]/45 flex items-end xl:items-center justify-center z-50">
      <div className="bg-white w-full max-w-[480px] rounded-t-[22px] xl:rounded-[22px] p-5.5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-extrabold m-0">Add New Patient</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[9px] bg-background flex items-center justify-center text-textsoft cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="bg-primary-soft text-primary text-[12.5px] font-bold px-3 py-2 rounded-[10px] mb-3.5">
          Adding for: {isToday ? "Today, " : ""}
          {fmtShort(selectedDate)}
        </div>

        <div className="mb-3.5">
          <label className="block text-xs font-bold text-textsoft mb-1.5 uppercase tracking-wide">
            Patient Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient name"
            className="w-full px-3.5 py-3 text-base border-[1.5px] border-line rounded-xl bg-background focus:outline-none focus:border-primary focus:bg-white"
          />
        </div>

        <div className="mb-3.5">
          <label className="block text-xs font-bold text-textsoft mb-1.5 uppercase tracking-wide">
            WhatsApp Number
          </label>
          <div className="flex gap-2">
            <div className="flex-none w-16 flex items-center justify-center border-[1.5px] border-line rounded-xl font-bold text-sm bg-background">
              🇮🇳 +91
            </div>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit number"
              maxLength={10}
              className="flex-1 w-full px-3.5 py-3 text-base border-[1.5px] border-line rounded-xl bg-background focus:outline-none focus:border-primary focus:bg-white"
            />
          </div>
        </div>

        <div className="mb-3.5">
          <label className="block text-xs font-bold text-textsoft mb-1.5 uppercase tracking-wide">
            Next Visit Date (optional)
          </label>
          <input
            type="date"
            value={nextVisitDate}
            onChange={(e) => setNextVisitDate(e.target.value)}
            className="w-full px-3.5 py-3 text-base border-[1.5px] border-line rounded-xl bg-background focus:outline-none focus:border-primary focus:bg-white"
          />
        </div>

        <div className="flex gap-2.5 mt-1.5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-[1.5px] border-line bg-white font-bold text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-[1.4] py-3 rounded-xl border-none bg-primary text-white font-extrabold text-sm cursor-pointer"
          >
            Save Patient
          </button>
        </div>
      </div>
    </div>
  );
}
