"use client";
import { useMemo, useState } from "react";
import { fmtShort, initials } from "@/lib/dates";

// Each Supabase row is one visit *event* (see CLAUDE.md for why). A person can
// have several rows over time. This view groups by phone number so the doctor
// sees one card per real patient: their most recent visit, and whether they
// currently have an open (not-yet-completed) next-visit date.
function groupByPatient(patients) {
  const byPhone = new Map();

  for (const p of patients) {
    const key = p.phone;
    if (!byPhone.has(key)) {
      byPhone.set(key, { name: p.name, phone: p.phone, visits: [] });
    }
    byPhone.get(key).visits.push(p);
  }

  return Array.from(byPhone.values()).map((group) => {
    const visits = group.visits.slice().sort((a, b) => (a.visitDate < b.visitDate ? 1 : -1));
    const lastVisit = visits[0];
    const openNext = group.visits.find((v) => v.nextVisitDate && v.status !== "completed");
    return {
      name: group.name,
      phone: group.phone,
      lastVisitDate: lastVisit?.visitDate ?? null,
      nextVisitDate: openNext?.nextVisitDate ?? null,
      visitCount: visits.length,
    };
  });
}

export default function PatientsView({ patients, loading }) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => groupByPatient(patients), [patients]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return grouped;
    return grouped.filter(
      (p) => p.name.toLowerCase().includes(q) || p.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""))
    );
  }, [grouped, query]);

  const sorted = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h1 className="text-[19px] font-extrabold mb-4">All Patients</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or WhatsApp number…"
        className="w-full max-w-[420px] px-3.5 py-2.5 text-sm border-[1.5px] border-line rounded-xl bg-white focus:outline-none focus:border-primary mb-4"
      />

      {loading ? (
        <div className="text-center py-16 text-textsoft text-sm">Loading patients…</div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16 text-textsoft text-sm">
          {grouped.length === 0 ? "No patients added yet." : "No patients match that search."}
        </div>
      ) : (
        <div className="bg-white rounded-[20px] card-shadow overflow-hidden">
          <div className="hidden xl:grid grid-cols-[2fr_1.4fr_1.2fr_1.2fr_0.8fr_60px] gap-2 px-4.5 py-3 text-[11px] font-extrabold uppercase tracking-wide text-textsoft border-b border-line">
            <div>Name</div>
            <div>WhatsApp</div>
            <div>Last Visit</div>
            <div>Next Visit</div>
            <div>Visits</div>
            <div></div>
          </div>

          {sorted.map((p) => (
            <div
              key={p.phone}
              className="grid grid-cols-1 xl:grid-cols-[2fr_1.4fr_1.2fr_1.2fr_0.8fr_60px] gap-1 xl:gap-2 items-center px-4.5 py-3 border-b border-line last:border-b-0 text-[13px]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center font-extrabold text-[11.5px] shrink-0">
                  {initials(p.name)}
                </div>
                <span className="font-bold">{p.name}</span>
              </div>
              <div className="text-textsoft">+91 {p.phone}</div>
              <div className="text-textsoft">{p.lastVisitDate ? fmtShort(p.lastVisitDate) : "—"}</div>
              <div className={p.nextVisitDate ? "font-bold text-warning" : "text-textsoft"}>
                {p.nextVisitDate ? fmtShort(p.nextVisitDate) : "Not scheduled"}
              </div>
              <div className="text-textsoft">{p.visitCount}</div>
              <a
                href={`https://wa.me/91${p.phone.replace(/\s/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-[9px] bg-success-soft text-success flex items-center justify-center text-sm shrink-0"
                title="Send WhatsApp"
              >
                💬
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
