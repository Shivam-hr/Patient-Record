export default function DesktopRail({ patients, selectedDate, onAddClick }) {
  const visited = patients.filter((p) => p.visitDate === selectedDate);
  const due = patients.filter(
    (p) => p.nextVisitDate === selectedDate && p.status !== "completed"
  );
  const completedToday = patients.filter(
    (p) => p.status === "completed" && p.visitDate === selectedDate
  ).length;
  const newPatients = visited.filter(
    (p) => !p.nextVisitDate || p.nextVisitDate >= selectedDate
  ).length;

  const rows = [
    ["Total Visits", visited.length],
    ["New Patients", newPatients],
    ["Follow-ups Due", due.length],
    ["Completed", completedToday],
  ];

  return (
    <div className="hidden xl:flex flex-col gap-4">
      <div className="bg-white rounded-[20px] card-shadow p-4.5">
        <h3 className="text-[13px] font-extrabold mb-3">Today&apos;s Summary</h3>
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={`flex justify-between text-[13px] py-1.5 ${
              i < rows.length - 1 ? "border-b border-line" : ""
            }`}
          >
            <span className="text-textsoft font-semibold">{k}</span>
            <span className="font-extrabold">{v}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[20px] card-shadow p-4.5">
        <h3 className="text-[13px] font-extrabold mb-3">Quick Actions</h3>
        <div
          onClick={onAddClick}
          className="flex items-center gap-2.5 py-2 text-[13px] font-semibold cursor-pointer"
        >
          ➕ Add Patient
        </div>
        <div className="flex items-center justify-between gap-2.5 py-2 text-[13px] font-semibold opacity-45 cursor-not-allowed" title="Not built yet">
          <span className="flex items-center gap-2.5">📢 Send Broadcast</span>
          <span className="text-[9px] font-extrabold bg-warning-soft text-warning px-1.5 py-0.5 rounded-full">SOON</span>
        </div>
        <div className="flex items-center justify-between gap-2.5 py-2 text-[13px] font-semibold opacity-45 cursor-not-allowed" title="Not built yet">
          <span className="flex items-center gap-2.5">📤 Export Report</span>
          <span className="text-[9px] font-extrabold bg-warning-soft text-warning px-1.5 py-0.5 rounded-full">SOON</span>
        </div>
      </div>

      <div className="bg-warning-soft rounded-2xl p-3.5 text-[12.5px] text-[#92620A]">
        <b className="block text-xs mb-1.5 text-warning">Doctor&apos;s Note</b>
        I will not be available on 17 July. Appointments shifted to next day.
      </div>
    </div>
  );
}
