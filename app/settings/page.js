"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import AppShell from "@/components/AppShell";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing form field from auth user on mount
      setName(user.user_metadata?.full_name || "");
    }
  }, [user]);

  async function handleSaveName(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name.trim() },
    });
    setSaving(false);
    setMessage(error ? "Could not save. Try again." : "Saved.");
    setTimeout(() => setMessage(null), 2500);
  }

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <AppShell>
      <h1 className="text-[19px] font-extrabold mb-4">Settings</h1>

      <div className="bg-white rounded-[20px] card-shadow p-5 mb-4 max-w-[480px]">
        <h2 className="text-[14px] font-extrabold mb-4">Profile</h2>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-full bg-primary-soft text-primary flex items-center justify-center font-extrabold text-xl shrink-0">
            {(name || user?.email || "D")[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm truncate">{name || "Add your name below"}</div>
            <div className="text-[12.5px] text-textsoft truncate">{user?.email}</div>
          </div>
        </div>

        <form onSubmit={handleSaveName}>
          <label className="block text-xs font-bold text-textsoft mb-1.5 uppercase tracking-wide">
            Doctor Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dr. Priya Wadhawan"
            className="w-full px-3.5 py-3 text-base border-[1.5px] border-line rounded-xl bg-background focus:outline-none focus:border-primary focus:bg-white mb-3"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white border-none rounded-xl px-4 py-2.5 font-bold text-[13.5px] cursor-pointer disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Name"}
            </button>
            {message && <span className="text-[12.5px] font-semibold text-success">{message}</span>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-[20px] card-shadow p-5 max-w-[480px]">
        <h2 className="text-[14px] font-extrabold mb-3">Account</h2>
        <p className="text-[13px] text-textsoft mb-4">
          Signed in as <span className="font-semibold text-foreground">{user?.email}</span>
        </p>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full text-center px-4 py-3 rounded-xl text-[13.5px] font-extrabold text-danger bg-danger-soft border-none cursor-pointer disabled:opacity-60"
        >
          {signingOut ? "Signing out…" : "Log Out"}
        </button>
      </div>
    </AppShell>
  );
}
