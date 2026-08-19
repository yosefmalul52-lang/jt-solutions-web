"use client";

import { leadStatusLabels } from "@/lib/admin/labels";
import { LEAD_STATUS_ORDER, leadStatusCard } from "@/lib/admin/status-styles";
import type { LeadStatus } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

type LeadStatusCardsProps = {
  counts: Record<LeadStatus, number>;
  active: LeadStatus | "all";
  onSelect: (status: LeadStatus | "all") => void;
  className?: string;
};

export function LeadStatusCards({
  counts,
  active,
  onSelect,
  className,
}: LeadStatusCardsProps) {
  return (
    <section
      className={cn(
        "grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5",
        className,
      )}
      aria-label="סינון לפי סטטוס"
    >
      {LEAD_STATUS_ORDER.map((status) => {
        const styles = leadStatusCard[status];
        const isActive = active === status;
        return (
          <button
            key={status}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? "all" : status)}
            className={cn(
              "flex min-h-[3.75rem] flex-col justify-between rounded-lg border px-3 py-2 text-right transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]",
              isActive
                ? styles.active
                : "border-border bg-white hover:bg-slate-50",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "truncate text-xs font-semibold",
                  isActive ? styles.ink : "text-slate-700",
                )}
              >
                {leadStatusLabels[status]}
              </span>
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  isActive ? styles.dot : "bg-slate-300",
                )}
                aria-hidden
              />
            </div>
            <p
              className={cn(
                "text-lg font-bold tabular-nums leading-none sm:text-xl",
                isActive ? styles.ink : "text-slate-900",
              )}
            >
              {counts[status]}
            </p>
          </button>
        );
      })}
    </section>
  );
}
