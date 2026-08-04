"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("رمز عبور اشتباه است");
      return;
    }

    const redirectTo = searchParams.get("redirect") || "/admin";
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div dir="rtl" className="max-w-sm mx-auto py-24 px-4">
      <h1 className="text-xl font-bold mb-6 text-center">ورود به پنل مدیریت</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 pl-10 w-full"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-zinc-950 text-white rounded-md p-2 disabled:opacity-50"
        >
          {loading ? "در حال بررسی..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
