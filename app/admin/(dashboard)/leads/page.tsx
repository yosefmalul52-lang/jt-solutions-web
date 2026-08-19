import { LeadsPageView } from "@/components/admin/leads-page-view";
import { fetchLeads } from "@/lib/admin/data";
import { countLeadsByStatus } from "@/lib/admin/lead-status-counts";
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
  const allLeads = configured ? await fetchLeads({ q }).catch(() => []) : [];
  const statusCounts = countLeadsByStatus(allLeads);
  const leads =
    status === "all" ? allLeads : allLeads.filter((lead) => lead.status === status);

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <LeadsPageView
        leads={leads}
        statusCounts={statusCounts}
        statusFilter={status}
        searchQuery={q ?? ""}
      />
    </main>
  );
}
