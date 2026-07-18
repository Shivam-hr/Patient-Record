"use client";
import { useMemo, useState } from "react";
import { offset } from "@/lib/dates";

const RANGES = [
  { label: "Past 20 days", start: -20, end: -1 },
  { label: "Past 10 days", start: -10, end: -1 },
  { label: "Next 10 days", start: 0, end: 9 },
  { label: "Next 20 days", start: 0, end: 19 },
  { label: "Next 30 days", start: 0, end: 29 },
];

function weekday(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short" });
}

function fmtCell(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function CalendarView({ patients, loading }) {
  const [rangeIdx, setRangeIdx] = useState(2); // "Next 10 days" by default
  const range = RANGES[rangeIdx];
  const today = offset(0);

  const rows = useMemo(() => {
    const list = [];
    for (let i = range.start; i <= range.end; i++) {
      const dateStr = offset(i, today);
      const due = patients.filter((p) => p.nextVisitDate === dateStr && p.status !== "completed");
      const visited = patients.filter((p) => p.visitDate === dateStr);
      list.push({ dateStr, due, visited, isToday: dateStr === today });
    }
    return list;
  }, [patients, range, today]);

  return (
    <div>
      <h1 className="text-[19px] font-extrabold mb-4">Calendar</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {RANGES.map((r, i) => (
          <button
            key={r.label}
            onClick={() => setRangeIdx(i)}
            className={`px-3.5 py-2 rounded-xl text-[12.5px] font-bold border-[1.5px] cursor-pointer ${
              i === rangeIdx
                ? "bg-primary text-white border-primary"
                : "bg-white text-textsoft border-line"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-textsoft text-sm">Loading…</div>
      ) : (
        <div className="bg-white rounded-[20px] card-shadow overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr className="text-[11px] font-extrabold uppercase tracking-wide text-textsoft border-b border-line">
                <th className="text-left px-4.5 py-3">Date</th>
                <th className="text-left px-4.5 py-3">Day</th>
                <th className="text-left px-4.5 py-3">Appointments Due</th>
                <th className="text-left px-4.5 py-3">Patients Visited</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.dateStr}
                  className={`border-b border-line last:border-b-0 text-[13px] ${
                    row.isToday ? "bg-primary-soft/40" : ""
                  }`}
                >
                  <td className="px-4.5 py-3 font-bold">
                    {fmtCell(row.dateStr)}
                    {row.isToday && (
                      <span className="ml-2 text-[10px] font-extrabold bg-primary text-white px-1.5 py-0.5 rounded-full">
                        TODAY
                      </span>
                    )}
                  </td>
                  <td className="px-4.5 py-3 text-textsoft">{weekday(row.dateStr)}</td>
                  <td className="px-4.5 py-3">
                    {row.due.length === 0 ? (
                      <span className="text-textsoft">—</span>
                    ) : (
                      <span className="font-bold text-warning">
                        {row.due.length} — {row.due.map((p) => p.name).join(", ")}
                      </span>
                    )}
                  </td>
                  <td className="px-4.5 py-3">
                    {row.visited.length === 0 ? (
                      <span className="text-textsoft">—</span>
                    ) : (
                      <span className="font-bold text-success">{row.visited.length}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
