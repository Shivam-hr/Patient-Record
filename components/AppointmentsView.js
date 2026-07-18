"use client";
import { useMemo } from "react";
import { offset, fmtShort, initials } from "@/lib/dates";

function Row({ p, onMarkVisited }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5 border border-line rounded-[14px] bg-[#FBFCFE]">
      <div className="w-9.5 h-9.5 rounded-full bg-primary-soft text-primary flex items-center justify-center font-extrabold text-[13px] shrink-0">
        {initials(p.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{p.name}</div>
        <div className="text-xs text-textsoft mt-0.5">+91 {p.phone}</div>
        <div className="text-[11.5px] font-bold text-warning mt-1">📅 {fmtShort(p.nextVisitDate)}</div>
      </div>
      <a
        href={`https://wa.me/91${p.phone.replace(/\s/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="w-8 h-8 rounded-[9px] bg-success-soft text-success flex items-center justify-center text-sm shrink-0"
        title="Send WhatsApp"
      >
        💬
      </a>
      <button
        onClick={() => onMarkVisited(p.id)}
        className="bg-primary text-white border-none rounded-[9px] px-3 py-2 text-xs font-bold cursor-pointer whitespace-nowrap active:scale-95"
      >
        Mark Visited
      </button>
    </div>
  );
}

function Section({ title, badgeClass, items, onMarkVisited, empty }) {
  return (
    <div className="bg-white rounded-[20px] card-shadow p-4.5">
      <h2 className="text-[14.5px] font-extrabold flex items-center gap-2 m-0 mb-3">
        {title}
        <span className={`text-[11.5px] font-extrabold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
          {items.length}
        </span>
      </h2>
      <div className="flex flex-col gap-2.5">
        {items.length === 0 ? (
          <div className="text-center py-4 text-textsoft text-[13px]">{empty}</div>
        ) : (
          items.map((p) => <Row key={p.id} p={p} onMarkVisited={onMarkVisited} />)
        )}
      </div>
    </div>
  );
}

export default function AppointmentsView({ patients, loading, onMarkVisited }) {
  const today = offset(0);

  const { overdue, dueToday, upcoming } = useMemo(() => {
    const open = patients
      .filter((p) => p.nextVisitDate && p.status !== "completed")
      .sort((a, b) => (a.nextVisitDate < b.nextVisitDate ? -1 : 1));

    return {
      overdue: open.filter((p) => p.nextVisitDate < today),
      dueToday: open.filter((p) => p.nextVisitDate === today),
      upcoming: open.filter((p) => p.nextVisitDate > today),
    };
  }, [patients, today]);

  return (
    <div>
      <h1 className="text-[19px] font-extrabold mb-4">Appointments</h1>

      {loading ? (
        <div className="text-center py-16 text-textsoft text-sm">Loading appointments…</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3.5 items-start">
          <Section
            title="🔴 Overdue"
            badgeClass="bg-danger-soft text-danger"
            items={overdue}
            onMarkVisited={onMarkVisited}
            empty="Nothing overdue."
          />
          <Section
            title="🟠 Due Today"
            badgeClass="bg-warning-soft text-warning"
            items={dueToday}
            onMarkVisited={onMarkVisited}
            empty="Nothing due today."
          />
          <Section
            title="🔵 Upcoming"
            badgeClass="bg-primary-soft text-primary"
            items={upcoming}
            onMarkVisited={onMarkVisited}
            empty="Nothing scheduled yet."
          />
        </div>
      )}
    </div>
  );
}
