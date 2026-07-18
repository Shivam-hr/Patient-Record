"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { BottomNav } from "./MobileNav";

export default function AppShell({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-textsoft text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />

      <div className="flex-1 min-w-0">
        <TopBar user={user} />
        <div className="max-w-[1500px] mx-auto px-4 xl:px-7.5 pt-4 xl:pt-6 pb-[110px] xl:pb-10">
          {children}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
