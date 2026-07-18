"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="xl:hidden fixed bottom-[78px] left-4 right-4 md:left-auto md:right-6 md:w-[210px] bg-primary text-white border-none rounded-2xl py-4 text-[15px] font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_24px_rgba(37,99,235,0.32)] z-30"
    >
      ＋ Add Patient
    </button>
  );
}

const NAV_ITEMS = [
  { icon: "🏠", label: "Home", href: "/" },
  { icon: "👥", label: "Patients", href: "/patients" },
  { icon: "📋", label: "Appts", href: "/appointments" },
  { icon: "📅", label: "Calendar", href: "/calendar" },
  { icon: "⚙️", label: "Settings", href: "/settings" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-line flex px-1.5 pt-2 pb-2.5 z-25">
      {NAV_ITEMS.map((item) => {
        const active = item.href && pathname === item.href;
        const content = (
          <>
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </>
        );
        const cls = `flex-1 flex flex-col items-center gap-0.5 text-[10.5px] font-bold ${
          active ? "text-primary" : item.href ? "text-textsoft" : "text-textsoft opacity-40"
        }`;

        return item.href ? (
          <Link key={item.label} href={item.href} className={cls}>
            {content}
          </Link>
        ) : (
          <div key={item.label} title="Not built yet" className={`${cls} cursor-not-allowed`}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
