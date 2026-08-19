"use client";

import * as React from "react";
import { LeadsChart } from "@/components/admin/leads-chart";
import {
  buildLeadsChart,
  CHART_RANGE_LABELS,
  getLeadYears,
  HEB_MONTHS,
  type ChartRange,
} from "@/lib/admin/leads-chart";
import type { Lead } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

type LeadsChartPanelProps = {
  leads: Lead[];
};

const RANGES: ChartRange[] = ["7d", "30d", "year", "all"];

export function LeadsChartPanel({ leads }: LeadsChartPanelProps) {
  const [range, setRange] = React.useState<ChartRange>("7d");
  const years = React.useMemo(() => getLeadYears(leads), [leads]);
  const [year, setYear] = React.useState<number | "all">(years[0] ?? new Date().getFullYear());
  const [month, setMonth] = React.useState<number | "all">("all");

  React.useEffect(() => {
    if (year !== "all" && !years.includes(year)) {
      setYear(years[0] ?? new Date().getFullYear());
    }
  }, [year, years]);

  const showYearMonthFilters = range === "year" || range === "all";
  const showMonthFilter = showYearMonthFilters && year !== "all";

  const chart = React.useMemo(
    () =>
      buildLeadsChart(leads, {
        range,
        year: showYearMonthFilters ? year : "all",
        month: showMonthFilter ? month : "all",
      }),
    [leads, range, year, month, showYearMonthFilters, showMonthFilter],
  );

  return (
    <section className="admin-surface flex min-h-0 flex-col p-2.5 xl:col-span-3">
      <div className="mb-1.5 flex shrink-0 flex-col gap-2">
        <div className="flex flex-row items-center justify-between gap-2">
          <h2 className="truncate text-sm font-semibold text-slate-900">{chart.title}</h2>
          <div
            className="inline-flex shrink-0 rounded-lg bg-slate-100 p-0.5"
            role="tablist"
            aria-label="טווח תצוגה"
          >
            {RANGES.map((item) => {
              const active = range === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setRange(item);
                    if (item === "7d" || item === "30d") {
                      setMonth("all");
                    }
                  }}
                  className={cn(
                    "h-7 min-w-[2.5rem] rounded-md px-2.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-[#1e3a8a] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {CHART_RANGE_LABELS[item]}
                </button>
              );
            })}
          </div>
        </div>

        {showYearMonthFilters ? (
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium">שנה</span>
              <select
                value={year === "all" ? "all" : String(year)}
                onChange={(e) => {
                  const v = e.target.value;
                  setYear(v === "all" ? "all" : Number(v));
                  if (v === "all") setMonth("all");
                }}
                className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-900 outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]/30"
              >
                {range === "all" ? <option value="all">כל השנים</option> : null}
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            {showMonthFilter ? (
              <label className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="font-medium">חודש</span>
                <select
                  value={month === "all" ? "all" : String(month)}
                  onChange={(e) => {
                    const v = e.target.value;
                    setMonth(v === "all" ? "all" : Number(v));
                  }}
                  className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-900 outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]/30"
                >
                  <option value="all">כל השנה</option>
                  {HEB_MONTHS.map((name, i) => (
                    <option key={name} value={i + 1}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="admin-inset flex min-h-0 flex-1 flex-col p-2.5">
        <div className="shrink-0">
          <p className="text-xl font-semibold tracking-tight text-slate-900">{chart.total}</p>
          <p
            className={cn(
              "text-xs font-medium",
              chart.deltaLabel.startsWith("+")
                ? "text-emerald-700"
                : chart.deltaLabel.startsWith("-")
                  ? "text-red-700"
                  : "text-slate-600",
            )}
          >
            {chart.deltaLabel}
          </p>
        </div>
        <div className="mt-1 min-h-0 w-full flex-1" key={`${range}-${year}-${month}`}>
          <LeadsChart data={chart.points} />
        </div>
      </div>
    </section>
  );
}
