"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { safeAdminNextPath } from "@/lib/admin/safe-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? "התחברות נכשלה");
        return;
      }
      router.replace(safeAdminNextPath(searchParams.get("next")));
      router.refresh();
    } catch {
      setError("שגיאת רשת");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center bg-[#f8fbff] px-4" dir="rtl">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-lg font-semibold text-slate-900">כניסה ל־JT Admin</h1>
        <p className="mt-1 text-sm text-slate-600">הזן את סיסמת הניהול כדי להמשיך</p>
        <label className="mt-5 block text-sm font-medium text-slate-800" htmlFor="admin-password">
          סיסמה
        </label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 border-slate-200"
          required
        />
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
        >
          {loading ? "מתחבר…" : "כניסה"}
        </Button>
      </form>
    </main>
  );
}
