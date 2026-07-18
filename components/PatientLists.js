import { fmtShort, initials } from "@/lib/dates";

function VisitedRow({ p }) {
  const nextTxt = p.nextVisitDate ? fmtShort(p.nextVisitDate) : "Not scheduled";
  return (
    <div className="flex items-center gap-2.5 p-2.5 border border-line rounded-[14px] bg-[#FBFCFE]">
      <div className="w-9.5 h-9.5 rounded-full bg-primary-soft text-primary flex items-center justify-center font-extrabold text-[13px] shrink-0">
        {initials(p.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{p.name}</div>
        <div className="text-xs text-textsoft mt-0.5">+91 {p.phone}</div>
        <div className="text-[11.5px] font-bold text-warning mt-1 flex items-center gap-1">
          📅 Next Visit: {nextTxt}
        </div>
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
    </div>
  );
}

function DueRow({ p, onMarkVisited }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5 border border-line rounded-[14px] bg-[#FBFCFE]">
      <div className="w-9.5 h-9.5 rounded-full bg-primary-soft text-primary flex items-center justify-center font-extrabold text-[13px] shrink-0">
        {initials(p.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm">{p.name}</div>
        <div className="text-xs text-textsoft mt-0.5">+91 {p.phone}</div>
      </div>
      <button
        onClick={() => onMarkVisited(p.id)}
        className="bg-primary text-white border-none rounded-[9px] px-3 py-2 text-xs font-bold cursor-pointer whitespace-nowrap active:scale-95"
      >
        Mark Visited
      </button>
    </div>
  );
}

function Empty({ text }) {
  return <div className="text-center py-6 px-2.5 text-textsoft text-[13px]">{text}</div>;
}

export default function PatientLists({ patients, selectedDate, onMarkVisited }) {
  const visited = patients.filter((p) => p.visitDate === selectedDate);
  const due = patients.filter(
    (p) => p.nextVisitDate === selectedDate && p.status !== "completed"
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
      <div className="bg-white rounded-[20px] card-shadow p-4.5">
        <h2 className="text-[14.5px] font-extrabold flex items-center gap-2 m-0">
          🟢 Patients Visited Today
          <span className="bg-primary-soft text-primary text-[11.5px] font-extrabold px-2.5 py-0.5 rounded-full">
            {visited.length}
          </span>
        </h2>
        <div className="flex flex-col gap-2.5 mt-3">
          {visited.length === 0 ? (
            <Empty text="No patients added for this day yet." />
          ) : (
            visited.map((p) => <VisitedRow key={p.id} p={p} />)
          )}
        </div>
      </div>

      <div className="bg-white rounded-[20px] card-shadow p-4.5">
        <h2 className="text-[14.5px] font-extrabold flex items-center gap-2 m-0">
          🟠 Appointments Due Today
          <span className="bg-primary-soft text-primary text-[11.5px] font-extrabold px-2.5 py-0.5 rounded-full">
            {due.length}
          </span>
        </h2>
        <div className="flex flex-col gap-2.5 mt-3">
          {due.length === 0 ? (
            <Empty text="No follow-up appointments fall on this day." />
          ) : (
            due.map((p) => <DueRow key={p.id} p={p} onMarkVisited={onMarkVisited} />)
          )}
        </div>
      </div>
    </div>
  );
}
