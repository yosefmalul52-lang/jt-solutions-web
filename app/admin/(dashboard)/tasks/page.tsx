import { DashboardTopbar } from "@/components/admin/dashboard-topbar";
import { TasksPageView } from "@/components/admin/tasks-page-view";
import { fetchLeads, fetchTasks } from "@/lib/admin/data";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminTasksPage() {
  const configured = isSupabaseConfigured();
  const [tasks, leads] = configured
    ? await Promise.all([
        fetchTasks().catch(() => []),
        fetchLeads().catch(() => []),
      ])
    : [[], []];

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <DashboardTopbar title="משימות מעקב" showLeadFilters={false} />
      <div className="flex min-h-0 flex-1 flex-col pt-3">
        <TasksPageView tasks={tasks} leads={leads} />
      </div>
    </main>
  );
}
