"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const NAV_ITEMS = [
  { icon: "🏠", label: "Dashboard", href: "/" },
  { icon: "👥", label: "Patients", href: "/patients" },
  { icon: "📋", label: "Appointments", href: "/appointments" },
  { icon: "📅", label: "Calendar", href: "/calendar" },
  { icon: "💬", label: "Messages", href: null },
  { icon: "📊", label: "Reports", href: null },
  { icon: "⚙️", label: "Settings", href: "/settings" },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="hidden xl:flex flex-col w-[230px] bg-white border-r border-line px-4 py-5 shrink-0">
      <div className="flex items-center gap-2.5 mb-7 px-1.5">
        <div className="w-9 h-9 rounded-[11px] bg-primary-soft flex items-center justify-center text-lg">
          🩺
        </div>
        <div>
          <div className="font-extrabold text-sm leading-tight">Wadhawan hospital</div>
          <div className="text-[11.5px] text-textsoft font-medium">Patient Desk</div>
        </div>
      </div>

      {NAV_ITEMS.map((item) => {
        const active = item.href && pathname === item.href;
        const rowClass = `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold mb-0.5 ${
          active ? "bg-primary-soft text-primary font-extrabold" : "text-textsoft"
        }`;

        if (item.href) {
          return (
            <Link key={item.label} href={item.href} className={`${rowClass} cursor-pointer`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          );
        }

        return (
          <div
            key={item.label}
            title="Not built yet"
            className={`${rowClass} opacity-45 cursor-not-allowed justify-between`}
          >
            <span className="flex items-center gap-2.5">
              <span>{item.icon}</span> {item.label}
            </span>
            <span className="text-[9px] font-extrabold bg-warning-soft text-warning px-1.5 py-0.5 rounded-full">
              SOON
            </span>
          </div>
        );
      })}

      <div className="mt-auto pt-3 px-1.5 border-t border-line">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-extrabold text-[13px] shrink-0">
            {(user?.email?.[0] || "D").toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[13px] truncate">{user?.email}</div>
            <div className="text-[11px] text-textsoft">Signed in</div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-3 py-2 rounded-xl text-[12.5px] font-bold text-danger bg-danger-soft border-none cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
