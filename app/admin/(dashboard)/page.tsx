import DashboardView from "@/components/admin/dashboard-view";
import { fetchDashboardBundle } from "@/lib/admin/data";
import type { LeadStatus } from "@/lib/admin/types";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type Search = Promise<{ status?: string; q?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const status =
    params.status && params.status !== "all" ? (params.status as LeadStatus) : "all";
  const q = params.q?.trim() || undefined;

  const configured = isSupabaseConfigured();
  const data = configured
    ? await fetchDashboardBundle({ status, q }).catch(() => null)
    : null;

  return (
    <DashboardView
      configured={configured}
      stats={data?.stats ?? []}
      sources={data?.sources ?? []}
      leads={data?.openLeads ?? []}
      allLeads={data?.leads ?? []}
      tasks={data?.openTasks ?? []}
      statusFilter={status}
      searchQuery={q ?? ""}
    />
  );
}
