import Link from "next/link";

export default function TopBar({ user }) {
  const displayName = user?.user_metadata?.full_name || "Doctor";

  return (
    <div className="xl:hidden flex items-center justify-between px-4.5 py-4 bg-white border-b border-line sticky top-0 z-20">
      <div className="flex items-center gap-2.5">
        <div className="w-9.5 h-9.5 rounded-[11px] bg-primary-soft flex items-center justify-center text-lg">
          🩺
        </div>
        <div>
          <div className="font-extrabold text-[15px] leading-tight">Wadhawan Hospital</div>
          <div className="text-[11.5px] text-textsoft font-medium">Welcome back, {displayName}</div>
        </div>
      </div>
      <Link
        href="/settings"
        aria-label="Profile and settings"
        className="w-9.5 h-9.5 rounded-[11px] bg-primary-soft text-primary flex items-center justify-center font-extrabold text-[13px] shrink-0"
      >
        {displayName[0].toUpperCase()}
      </Link>
    </div>
  );
}
