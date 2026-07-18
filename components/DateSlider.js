import { offset } from "@/lib/dates";

export default function DateSlider({ patients, selectedDate, railAnchor, onSelect }) {
  const todayStr = offset(0);
  const days = [];
  for (let i = -3; i <= 3; i++) {
    days.push(offset(i, railAnchor));
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 mb-4 -mx-0.5 px-0.5" style={{ scrollSnapType: "x proximity" }}>
      {days.map((dateStr) => {
        const d = new Date(dateStr);
        const visited = patients.filter((p) => p.visitDate === dateStr).length;
        const due = patients.filter(
          (p) => p.nextVisitDate === dateStr && p.status !== "completed"
        ).length;
        const isActive = dateStr === selectedDate;
        const isToday = dateStr === todayStr;

        return (
          <div
            key={dateStr}
            onClick={() => onSelect(dateStr)}
            style={{ scrollSnapAlign: "center" }}
            className={`shrink-0 min-w-[64px] rounded-[14px] border px-1.5 py-2.5 text-center cursor-pointer transition-shadow ${
              isActive
                ? "bg-primary border-primary shadow-[0_6px_14px_rgba(37,99,235,0.25)]"
                : "bg-white border-line " +
                  (isToday ? "shadow-[0_0_0_2px_#F59E0B]" : "")
            }`}
          >
            <div className={`text-[10.5px] font-bold uppercase tracking-wide ${isActive ? "text-white/80" : "text-textsoft"}`}>
              {d.toLocaleDateString("en-IN", { weekday: "short" })}
            </div>
            <div className={`text-[17px] font-extrabold my-0.5 ${isActive ? "text-white" : "text-foreground"}`}>
              {d.getDate()}
            </div>
            <div className="flex gap-1 justify-center flex-wrap">
              {visited > 0 && (
                <span
                  className={`text-[9.5px] font-extrabold px-1.5 rounded-md ${
                    isActive ? "bg-white/20 text-white" : "bg-success-soft text-success"
                  }`}
                >
                  {visited}
                </span>
              )}
              {due > 0 && (
                <span
                  className={`text-[9.5px] font-extrabold px-1.5 rounded-md ${
                    isActive ? "bg-white/30 text-white" : "bg-warning-soft text-warning"
                  }`}
                >
                  {due}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
