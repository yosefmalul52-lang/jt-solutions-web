import { DashboardTopbar } from "@/components/admin/dashboard-topbar";
import { LeadsTableCard } from "@/components/admin/leads-table-card";
import { fetchLeads } from "@/lib/admin/data";
import type { LeadStatus } from "@/lib/admin/types";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type Search = Promise<{ status?: string; q?: string }>;

export default async function AdminLeadsPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const status =
    params.status && params.status !== "all" ? (params.status as LeadStatus) : "all";
  const q = params.q?.trim() || undefined;
  const configured = isSupabaseConfigured();
  const leads = configured
    ? await fetchLeads({ status, q }).catch(() => [])
    : [];

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <DashboardTopbar
        title="כל הלידים"
        statusFilter={status}
        searchQuery={q ?? ""}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-2">
        <LeadsTableCard
          title="רשימת לידים"
          leads={leads}
          actionLabel="ליד חדש"
          interactive
        />
      </div>
    </main>
  );
}
