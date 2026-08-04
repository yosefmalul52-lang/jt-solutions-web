"use client";

import { DashboardTopbar } from "@/components/admin/dashboard-topbar";
import { LeadsChartPanel } from "@/components/admin/leads-chart-panel";
import { LeadsTableCard } from "@/components/admin/leads-table-card";
import { RecentSourcesPanel } from "@/components/admin/recent-leads-panel";
import { StatGrid } from "@/components/admin/stat-grid";
import { TasksTableCard } from "@/components/admin/tasks-table-card";
import type {
  ChartPoint,
  Lead,
  LeadSourceStat,
  LeadStatus,
  StatItem,
  Task,
} from "@/lib/admin/types";

type DashboardViewProps = {
  configured: boolean;
  stats: StatItem[];
  chart: ChartPoint[];
  chartTotal: number;
  chartDeltaLabel: string;
  sources: LeadSourceStat[];
  leads: Lead[];
  /** Full lead list for linking when creating tasks */
  allLeads?: Lead[];
  tasks: Task[];
  statusFilter: LeadStatus | "all";
  searchQuery: string;
};

export default function DashboardView({
  configured,
  stats,
  chart,
  chartTotal,
  chartDeltaLabel,
  sources,
  leads,
  allLeads = [],
  tasks,
  statusFilter,
  searchQuery,
}: DashboardViewProps) {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <DashboardTopbar
        title="סקירת לידים"
        statusFilter={statusFilter}
        searchQuery={searchQuery}
      />
      {!configured ? (
        <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          חסר חיבור ל־Supabase. הגדר משתני סביבה כדי לראות לידים אמיתיים.
        </p>
      ) : null}
      <div className="mx-auto grid min-h-0 w-full flex-1 grid-rows-[auto_minmax(0,1.05fr)_minmax(0,1fr)] gap-2 pt-2">
        <StatGrid stats={stats} />
        <section className="grid min-h-0 gap-2 xl:grid-cols-4">
          <LeadsChartPanel
            data={chart}
            total={chartTotal}
            deltaLabel={chartDeltaLabel}
          />
          <RecentSourcesPanel sources={sources} />
        </section>
        <section className="grid min-h-0 gap-2 overflow-hidden xl:grid-cols-5">
          <div className="flex min-h-0 flex-col overflow-hidden xl:col-span-3">
            <LeadsTableCard
              title="לידים פתוחים"
              leads={leads}
              compact
              showAction={false}
              interactive
            />
          </div>
          <div className="flex min-h-0 flex-col overflow-hidden xl:col-span-2">
            <TasksTableCard
              title="משימות פתוחות"
              tasks={tasks}
              leads={allLeads}
              compact
              showAction
              interactive
              actionLabel="משימה חדשה"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
