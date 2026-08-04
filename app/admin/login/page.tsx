import { Suspense } from "react";
import AdminLoginPage from "./login-form";

export default function AdminLoginRoute() {
  return (
    <Suspense fallback={<main className="min-h-svh bg-[#f8fbff]" />}>
      <AdminLoginPage />
    </Suspense>
  );
}
