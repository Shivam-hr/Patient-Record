import { offset } from "@/lib/dates";

function Stat({ icon, iconBg, value, label }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-3">
      <div className={`w-10.5 h-10.5 rounded-xl flex items-center justify-center text-[19px] shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <div className="text-[22px] font-extrabold leading-none">{value}</div>
        <div className="text-xs text-textsoft font-semibold mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function StatCards({ patients, selectedDate }) {
  const visitedCount = patients.filter((p) => p.visitDate === selectedDate).length;
  const dueCount = patients.filter(
    (p) => p.nextVisitDate === selectedDate && p.status !== "completed"
  ).length;
  const totalPatients = patients.length;
  const weekEnd = offset(7, selectedDate);
  const upcomingWeek = patients.filter(
    (p) => p.status !== "completed" && p.nextVisitDate > selectedDate && p.nextVisitDate <= weekEnd
  ).length;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 max-w-[420px] xl:max-w-none mb-4">
      <Stat icon="👥" iconBg="bg-success-soft" value={visitedCount} label="Visited Today" />
      <Stat icon="📅" iconBg="bg-warning-soft" value={dueCount} label="Appointments Due" />
      <div className="hidden xl:block">
        <Stat icon="📈" iconBg="bg-success-soft" value={totalPatients} label="Total Patients" />
      </div>
      <div className="hidden xl:block">
        <Stat icon="🗓️" iconBg="bg-warning-soft" value={upcomingWeek} label="Upcoming This Week" />
      </div>
    </div>
  );
}
