import {
  leadSourceColors,
  leadSourceLabels,
} from "@/lib/admin/labels";
import { mapLeadRow, mapTaskRow } from "@/lib/admin/mappers";
import type {
  ChartPoint,
  Lead,
  LeadSource,
  LeadSourceStat,
  LeadStatus,
  StatItem,
  Task,
} from "@/lib/admin/types";
import { getSupabaseAdmin, isSupabaseConfigured, type LeadRow, type TaskRow } from "@/lib/supabase/admin";

const HEB_DAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"] as const;

export type DashboardBundle = {
  leads: Lead[];
  tasks: Task[];
  stats: StatItem[];
  chart: ChartPoint[];
  chartTotal: number;
  chartDeltaLabel: string;
  sources: LeadSourceStat[];
  openLeads: Lead[];
  openTasks: Task[];
  dueTodayCount: number;
};

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function fetchLeads(options?: {
  status?: LeadStatus | "all";
  q?: string;
}): Promise<Lead[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabaseAdmin();
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (options?.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;
  if (error) throw error;

  let leads = (data as LeadRow[]).map(mapLeadRow);
  const q = options?.q?.trim().toLowerCase();
  if (q) {
    leads = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.service.toLowerCase().includes(q) ||
        (lead.email?.toLowerCase().includes(q) ?? false),
    );
  }
  return leads;
}

export async function fetchTasks(): Promise<Task[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("tasks")
    .select("*, leads(name)")
    .order("due_date", { ascending: true });

  if (error) throw error;
  return (data as TaskRow[]).map(mapTaskRow);
}

function buildChart(leads: Lead[], days = 7): { points: ChartPoint[]; total: number; deltaLabel: string } {
  const today = startOfDay(new Date());
  const points: ChartPoint[] = [];
  let total = 0;

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const count = leads.filter((lead) => {
      const created = new Date(lead.createdAt);
      return created >= day && created < next;
    }).length;
    total += count;
    points.push({ day: HEB_DAYS[day.getDay()], value: count });
  }

  let prevTotal = 0;
  for (let i = days * 2 - 1; i >= days; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    prevTotal += leads.filter((lead) => {
      const created = new Date(lead.createdAt);
      return created >= day && created < next;
    }).length;
  }

  let deltaLabel = "אין השוואה לשבוע שעבר";
  if (prevTotal > 0) {
    const pct = Math.round(((total - prevTotal) / prevTotal) * 100);
    deltaLabel = `${pct >= 0 ? "+" : ""}${pct}% מהשבוע שעבר`;
  } else if (total > 0) {
    deltaLabel = "חדש השבוע";
  }

  return { points, total, deltaLabel };
}

function buildSources(leads: Lead[]): LeadSourceStat[] {
  const counts: Record<LeadSource, number> = { site: 0, whatsapp: 0, referral: 0, meta: 0 };
  for (const lead of leads) counts[lead.source] += 1;
  const total = leads.length || 1;
  return (Object.keys(counts) as LeadSource[]).map((source) => ({
    name: leadSourceLabels[source],
    count: counts[source],
    share: `${Math.round((counts[source] / total) * 100)}%`,
    color: leadSourceColors[source],
  }));
}

function buildStats(leads: Lead[], tasks: Task[]): StatItem[] {
  const newCount = leads.filter((l) => l.status === "new").length;
  const contacted = leads.filter((l) => l.status === "contacted").length;
  const openTasks = tasks.filter((t) => !t.done);
  const today = isoDate(new Date());
  const dueToday = openTasks.filter((t) => t.dueDate.slice(0, 10) === today).length;

  const weekAgo = startOfDay(new Date());
  weekAgo.setDate(weekAgo.getDate() - 7);
  const newThisWeek = leads.filter(
    (l) => l.status === "new" && new Date(l.createdAt) >= weekAgo,
  ).length;

  return [
    {
      label: "לידים חדשים",
      value: String(newCount),
      detail: newThisWeek > 0 ? `+${newThisWeek} השבוע` : "אין חדשים השבוע",
      surface: "border-blue-200 bg-blue-50",
      chip: "bg-blue-600 text-white",
      ink: "text-blue-950",
      muted: "text-blue-800",
      icon: "inbox",
    },
    {
      label: "נוצר קשר",
      value: String(contacted),
      detail: "ממתינים להמשך",
      surface: "border-sky-200 bg-sky-50",
      chip: "bg-sky-600 text-white",
      ink: "text-sky-950",
      muted: "text-sky-800",
      icon: "phone",
    },
    {
      label: "משימות פתוחות",
      value: String(openTasks.length),
      detail: dueToday > 0 ? `${dueToday} להיום` : "אין להיום",
      surface: "border-amber-200 bg-amber-50",
      chip: "bg-amber-500 text-white",
      ink: "text-amber-950",
      muted: "text-amber-900",
      icon: "list",
    },
    {
      label: "יעד להיום",
      value: String(dueToday),
      detail: "משימות לטיפול",
      surface: "border-emerald-200 bg-emerald-50",
      chip: "bg-emerald-600 text-white",
      ink: "text-emerald-950",
      muted: "text-emerald-800",
      icon: "clock",
    },
  ];
}

export async function fetchDashboardBundle(options?: {
  status?: LeadStatus | "all";
  q?: string;
}): Promise<DashboardBundle> {
  const [leads, tasks] = await Promise.all([fetchLeads(options), fetchTasks()]);
  const chart = buildChart(leads);
  const openLeads = leads.filter((lead) =>
    ["new", "contacted", "qualified"].includes(lead.status),
  );
  const openTasks = tasks.filter((task) => !task.done);
  const today = isoDate(new Date());
  const dueTodayCount = openTasks.filter((t) => t.dueDate.slice(0, 10) === today).length;

  return {
    leads,
    tasks,
    stats: buildStats(leads, tasks),
    chart: chart.points,
    chartTotal: chart.total,
    chartDeltaLabel: chart.deltaLabel,
    sources: buildSources(leads),
    openLeads,
    openTasks,
    dueTodayCount,
  };
}
