"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DashboardTopbar } from "@/components/admin/dashboard-topbar";
import { LeadStatusCards } from "@/components/admin/lead-status-cards";
import { LeadsTableCard } from "@/components/admin/leads-table-card";
import { leadStatusLabels } from "@/lib/admin/labels";
import type { Lead, LeadStatus } from "@/lib/admin/types";

type LeadsPageViewProps = {
  leads: Lead[];
  statusCounts: Record<LeadStatus, number>;
  statusFilter: LeadStatus | "all";
  searchQuery: string;
};

export function LeadsPageView({
  leads,
  statusCounts,
  statusFilter,
  searchQuery,
}: LeadsPageViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setStatusFilter = (status: LeadStatus | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") params.delete("status");
    else params.set("status", status);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const tableTitle =
    statusFilter === "all"
      ? "רשימת לידים"
      : `לידים — ${leadStatusLabels[statusFilter]}`;

  return (
    <>
      <DashboardTopbar
        title="כל הלידים"
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        showStatusDropdown={false}
        showCreateButton={false}
      />
      <section className="admin-surface flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-3 pt-2">
        <LeadStatusCards
          counts={statusCounts}
          active={statusFilter}
          onSelect={setStatusFilter}
        />
        <div className="h-px shrink-0 bg-border/80" aria-hidden />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <LeadsTableCard
            title={tableTitle}
            leads={leads}
            actionLabel="ליד חדש"
            interactive
            embedded
            showAction={false}
          />
        </div>
      </section>
    </>
  );
}
