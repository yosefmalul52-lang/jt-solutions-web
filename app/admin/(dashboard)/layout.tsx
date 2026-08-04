import type { ReactNode } from "react";
import { Suspense } from "react";
import DashboardLayout from "@/components/admin/dashboard-layout";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout>
      <Suspense
        fallback={<div className="min-h-0 flex-1 bg-[#f8fbff]" />}
      >
        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </Suspense>
    </DashboardLayout>
  );
}
