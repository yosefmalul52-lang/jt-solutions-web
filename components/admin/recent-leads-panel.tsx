import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import type { LeadSourceStat } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

export function RecentSourcesPanel({ sources }: { sources: LeadSourceStat[] }) {
  const total = sources.reduce((sum, source) => sum + source.count, 0);

  return (
    <section className="admin-surface flex w-full flex-col self-start p-2.5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">מקורות לידים</h2>
        <Link
          href="/admin/leads"
          className="inline-flex h-8 items-center gap-1 rounded-[var(--admin-radius-sm)] px-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          הכל
          <ArrowUpLeft className="size-3.5" aria-hidden />
        </Link>
      </div>

      {sources.length === 0 ? (
        <p className="text-sm text-slate-600">אין נתונים עדיין</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {sources.map((source) => (
            <li key={source.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      "admin-icon-chip text-[11px] font-semibold text-white",
                      source.color,
                    )}
                    aria-hidden
                  >
                    {source.count}
                  </span>
                  <span className="truncate text-sm font-medium text-slate-900">
                    {source.name}
                  </span>
                </div>
                <span className="shrink-0 tabular-nums text-sm font-semibold text-slate-900">
                  {source.share}
                </span>
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn("absolute inset-y-0 start-0 rounded-full", source.color)}
                  style={{ width: source.share }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-2.5">
        <span className="text-xs font-medium text-slate-600">סה״כ מקורות</span>
        <span className="tabular-nums text-sm font-semibold text-slate-900">
          {total} לידים
        </span>
      </div>
    </section>
  );
}
