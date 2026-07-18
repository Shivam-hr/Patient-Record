"use client";
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6FA] px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-[20px] card-shadow p-7 w-full max-w-[360px]">
        <div className="w-11 h-11 rounded-[13px] bg-primary-soft flex items-center justify-center text-xl mb-3">
          🩺
        </div>
        <h1 className="text-[18px] font-extrabold mb-1">Patient Desk</h1>
        <p className="text-[13px] text-textsoft mb-5">Sign in to your doctor account</p>

        {error && (
          <div className="bg-danger-soft text-danger text-[12.5px] font-semibold px-3 py-2.5 rounded-lg mb-3.5">
            {error}
          </div>
        )}

        <label className="block text-[12.5px] font-bold mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border-[1.5px] border-line rounded-xl bg-white focus:outline-none focus:border-primary mb-3.5"
        />

        <label className="block text-[12.5px] font-bold mb-1.5">Password</label>
        <div className="relative mb-3.5">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border-[1.5px] border-line rounded-xl bg-white focus:outline-none focus:border-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white border-none rounded-xl py-3 font-extrabold text-[14px] cursor-pointer disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
          <button
          type="button"
          onClick={async () => {
            if (!email) {
              setError("Enter your email above first, then tap Forgot password.");
              return;
            }
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/reset-password`,
            });
            setError(resetError ? resetError.message : "Reset link sent — check your email.");
          }}
          className="w-full text-[12.5px] font-semibold text-primary text-center mt-3 bg-transparent border-none cursor-pointer"
        >
          Forgot password?
        </button>
      </form>
    </div>
  );
}
