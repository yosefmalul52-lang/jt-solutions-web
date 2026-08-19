import type { ChartPoint, Lead } from "@/lib/admin/types";

export type ChartRange = "7d" | "30d" | "year" | "all";

export type LeadsChartFilter = {
  range: ChartRange;
  year: number | "all";
  month: number | "all";
};

export type LeadsChartResult = {
  points: ChartPoint[];
  total: number;
  deltaLabel: string;
  title: string;
};

const HEB_DAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"] as const;

const HEB_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
] as const;

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfMonth(year: number, month: number): Date {
  return new Date(year, month - 1, 1);
}

function endOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function countLeadsInRange(leads: Lead[], start: Date, end: Date): number {
  return leads.filter((lead) => {
    const created = new Date(lead.createdAt);
    return created >= start && created < end;
  }).length;
}

function formatDayLabel(d: Date): string {
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "numeric" });
}

function formatMonthLabel(year: number, month: number): string {
  const short = HEB_MONTHS[month - 1]?.slice(0, 3) ?? String(month);
  const yy = String(year).slice(-2);
  return `${short} ${yy}`;
}

function deltaLabel(current: number, previous: number, period: string): string {
  if (previous > 0) {
    const pct = Math.round(((current - previous) / previous) * 100);
    return `${pct >= 0 ? "+" : ""}${pct}% מ${period}`;
  }
  if (current > 0) return `חדש ב${period}`;
  return "אין לידים בתקופה";
}

export function getLeadYears(leads: Lead[]): number[] {
  const years = new Set<number>();
  const now = new Date().getFullYear();
  years.add(now);
  for (const lead of leads) {
    years.add(new Date(lead.createdAt).getFullYear());
  }
  return [...years].sort((a, b) => b - a);
}

export function buildLeadsChart(leads: Lead[], filter: LeadsChartFilter): LeadsChartResult {
  const today = startOfDay(new Date());
  const points: ChartPoint[] = [];
  let total = 0;
  let prevTotal = 0;
  let title = "לידים";
  let comparePeriod = "התקופה הקודמת";

  if (filter.range === "7d") {
    title = "לידים — 7 ימים אחרונים";
    comparePeriod = "7 הימים שלפני";
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const next = new Date(day);
      next.setDate(day.getDate() + 1);
      const count = countLeadsInRange(leads, day, next);
      total += count;
      points.push({ day: HEB_DAYS[day.getDay()], value: count });
    }
    for (let i = 13; i >= 7; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const next = new Date(day);
      next.setDate(day.getDate() + 1);
      prevTotal += countLeadsInRange(leads, day, next);
    }
  } else if (filter.range === "30d") {
    title = "לידים — 30 ימים אחרונים";
    comparePeriod = "30 הימים שלפני";
    for (let i = 29; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const next = new Date(day);
      next.setDate(day.getDate() + 1);
      const count = countLeadsInRange(leads, day, next);
      total += count;
      points.push({
        day: i % 5 === 0 || i === 0 ? formatDayLabel(day) : "",
        value: count,
      });
    }
    for (let i = 59; i >= 30; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const next = new Date(day);
      next.setDate(day.getDate() + 1);
      prevTotal += countLeadsInRange(leads, day, next);
    }
  } else if (filter.range === "year" || filter.range === "all") {
    const year =
      filter.year === "all"
        ? today.getFullYear()
        : filter.year;

    if (filter.month !== "all") {
      title = `לידים — ${HEB_MONTHS[filter.month - 1]} ${year}`;
      comparePeriod = "החודש הקודם";
      const monthStart = startOfMonth(year, filter.month);
      const monthEnd = endOfMonth(year, filter.month);
      const daysInMonth = new Date(year, filter.month, 0).getDate();

      for (let d = 1; d <= daysInMonth; d++) {
        const day = new Date(year, filter.month - 1, d);
        const next = new Date(day);
        next.setDate(day.getDate() + 1);
        const count = countLeadsInRange(leads, day, next);
        total += count;
        points.push({
          day: d % 5 === 1 || d === daysInMonth ? String(d) : "",
          value: count,
        });
      }

      const prevMonth = filter.month === 1 ? 12 : filter.month - 1;
      const prevYear = filter.month === 1 ? year - 1 : year;
      const prevStart = startOfMonth(prevYear, prevMonth);
      const prevEnd = endOfMonth(prevYear, prevMonth);
      prevTotal = countLeadsInRange(leads, prevStart, prevEnd);
    } else if (filter.range === "year" || filter.year !== "all") {
      title = filter.year === "all" ? `לידים — ${year}` : `לידים — ${year}`;
      comparePeriod = "השנה הקודמת";

      for (let m = 1; m <= 12; m++) {
        const start = startOfMonth(year, m);
        const end = endOfMonth(year, m);
        const count = countLeadsInRange(leads, start, end);
        total += count;
        points.push({ day: formatMonthLabel(year, m), value: count });
      }

      for (let m = 1; m <= 12; m++) {
        const start = startOfMonth(year - 1, m);
        const end = endOfMonth(year - 1, m);
        prevTotal += countLeadsInRange(leads, start, end);
      }
    } else {
      title = "לידים — כל הזמנים";
      comparePeriod = "השנה הקודמת";

      const buckets = new Map<string, { sort: number; count: number }>();
      for (const lead of leads) {
        const created = new Date(lead.createdAt);
        const y = created.getFullYear();
        const m = created.getMonth() + 1;
        const key = `${y}-${String(m).padStart(2, "0")}`;
        const existing = buckets.get(key);
        if (existing) existing.count += 1;
        else buckets.set(key, { sort: y * 100 + m, count: 1 });
      }

      const sorted = [...buckets.entries()].sort((a, b) => a[1].sort - b[1].sort);
      const recent = sorted.slice(-18);

      for (const [, { count }] of recent) {
        total += count;
      }

      for (const [key, { count }] of recent) {
        const [y, m] = key.split("-").map(Number);
        points.push({ day: formatMonthLabel(y, m), value: count });
      }

      const prevBuckets = sorted.slice(Math.max(0, sorted.length - 36), Math.max(0, sorted.length - 18));
      prevTotal = prevBuckets.reduce((sum, [, v]) => sum + v.count, 0);
      comparePeriod = "18 החודשים שלפני";
    }
  }

  return {
    points,
    total,
    deltaLabel: deltaLabel(total, prevTotal, comparePeriod),
    title,
  };
}

export const CHART_RANGE_LABELS: Record<ChartRange, string> = {
  "7d": "שבוע",
  "30d": "חודש",
  year: "שנה",
  all: "הכל",
};

export { HEB_MONTHS };
