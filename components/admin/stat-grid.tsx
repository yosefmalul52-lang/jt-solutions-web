import { Clock3, Inbox, ListTodo, PhoneCall } from "lucide-react";
import type { StatItem } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

const icons = {
  inbox: Inbox,
  phone: PhoneCall,
  list: ListTodo,
  clock: Clock3,
} as const;

export function StatGrid({ stats }: { stats: StatItem[] }) {
  if (!stats.length) {
    return (
      <section className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <article
            key={i}
            className="h-[5.5rem] rounded-[var(--admin-radius)] border border-slate-200 bg-white"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        return (
          <article
            key={stat.label}
            className={cn(
              "flex flex-col gap-2 rounded-[var(--admin-radius)] border px-3.5 py-3",
              stat.surface,
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h2
                className={cn(
                  "min-w-0 truncate text-sm font-bold tracking-tight",
                  stat.ink,
                )}
              >
                {stat.label}
              </h2>
              <span className={cn("admin-icon-chip", stat.chip)}>
                <Icon className="size-3.5" aria-hidden />
              </span>
            </div>
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[1.75rem] font-bold leading-none tracking-tight tabular-nums",
                  stat.ink,
                )}
              >
                {stat.value}
              </p>
              <p className={cn("mt-1.5 truncate text-xs font-semibold", stat.muted)}>
                {stat.detail}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
