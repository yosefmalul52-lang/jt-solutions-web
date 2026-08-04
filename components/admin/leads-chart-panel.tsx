"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadsChart } from "@/components/admin/leads-chart";
import type { ChartPoint } from "@/lib/admin/types";

type LeadsChartPanelProps = {
  data: ChartPoint[];
  total: number;
  deltaLabel: string;
};

export function LeadsChartPanel({ data, total, deltaLabel }: LeadsChartPanelProps) {
  const [range, setRange] = React.useState<"7D" | "1M" | "All">("7D");

  return (
    <section className="admin-surface flex min-h-0 flex-col p-2.5 xl:col-span-3">
      <div className="mb-1.5 flex shrink-0 flex-row items-center justify-between gap-2">
        <h2 className="truncate text-sm font-semibold text-slate-900">לידים השבוע</h2>
        <Tabs value={range} onValueChange={(value) => setRange(value as typeof range)}>
          <TabsList className="admin-control gap-0.5 bg-slate-100 p-0.5">
            {(["7D", "1M", "All"] as const).map((item) => (
              <TabsTrigger
                key={item}
                value={item}
                className="h-7 min-w-9 rounded-[var(--admin-radius-sm)] border-0 px-2.5 text-xs data-[state=active]:bg-[#1e3a8a] data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:text-slate-600"
              >
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="admin-inset flex min-h-0 flex-1 flex-col p-2.5">
        <div className="shrink-0">
          <p className="text-xl font-semibold tracking-tight text-slate-900">{total}</p>
          <p className="text-xs font-medium text-emerald-700">{deltaLabel}</p>
        </div>
        <div className="mt-1 min-h-0 w-full flex-1" key={range}>
          <LeadsChart data={data} />
        </div>
      </div>
    </section>
  );
}
