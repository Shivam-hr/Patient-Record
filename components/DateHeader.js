import { fmtLong } from "@/lib/dates";

export default function DateHeader({ selectedDate, onToday, onShift }) {
  return (
    <div className="flex items-center justify-between mt-1.5 mb-3 px-0.5">
      <h1 className="text-[19px] font-extrabold m-0">{fmtLong(selectedDate)}</h1>
      <div className="flex gap-2">
        <button
          onClick={onToday}
          className="border border-line bg-white rounded-[10px] px-3.5 h-8.5 text-[13px] font-bold cursor-pointer"
        >
          Today
        </button>
        <button
          onClick={() => onShift(-1)}
          className="w-8.5 h-8.5 rounded-[10px] border border-line bg-white flex items-center justify-center text-sm text-textsoft cursor-pointer"
        >
          ‹
        </button>
        <button
          onClick={() => onShift(1)}
          className="w-8.5 h-8.5 rounded-[10px] border border-line bg-white flex items-center justify-center text-sm text-textsoft cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>
  );
}
