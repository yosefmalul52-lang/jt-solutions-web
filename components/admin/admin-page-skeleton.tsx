import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function Sk({ className }: { className?: string }) {
  return <Skeleton className={cn("bg-slate-200/80", className)} />;
}

export function AdminTopbarSkeleton({
  showSearch = true,
  showAction = true,
}: {
  showSearch?: boolean;
  showAction?: boolean;
}) {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border/80 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Sk className="size-9 shrink-0 rounded-md lg:hidden" />
        <div className="flex min-w-0 items-center gap-2">
          <Sk className="h-6 w-28 sm:w-36" />
          <Sk className="hidden h-4 w-36 sm:block" />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
        {showSearch ? <Sk className="h-9 min-w-[11rem] flex-1 rounded-md md:w-52 md:flex-none" /> : null}
        {showAction ? <Sk className="h-9 w-24 rounded-md" /> : null}
      </div>
    </header>
  );
}

function StatCardsSkeleton() {
  return (
    <section className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex h-[5.5rem] flex-col justify-between rounded-[var(--admin-radius)] border border-slate-200 bg-white px-3.5 py-3"
        >
          <div className="flex items-center justify-between gap-2">
            <Sk className="h-4 w-20" />
            <Sk className="size-7 rounded-md" />
          </div>
          <div className="space-y-2">
            <Sk className="h-7 w-12" />
            <Sk className="h-3 w-24" />
          </div>
        </div>
      ))}
    </section>
  );
}

function TableCardSkeleton({
  rows = 6,
  embedded = false,
}: {
  rows?: number;
  embedded?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden",
        !embedded && "admin-surface p-2.5",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <Sk className="h-4 w-28" />
        <Sk className="h-8 w-20 rounded-md" />
      </div>
      <div className="mb-2 h-9 shrink-0" aria-hidden />
      <div className="admin-inset min-h-0 flex-1 space-y-2 overflow-hidden p-2">
        <Sk className="h-9 w-full rounded-md" />
        {Array.from({ length: rows }).map((_, i) => (
          <Sk key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <AdminTopbarSkeleton />
      <div className="mx-auto grid min-h-0 w-full flex-1 grid-rows-[auto_minmax(0,1.05fr)_minmax(0,1fr)] gap-2 pt-2">
        <StatCardsSkeleton />
        <section className="grid min-h-0 gap-2 xl:grid-cols-4">
          <div className="admin-surface flex min-h-[12rem] flex-col gap-3 p-3 xl:col-span-3">
            <div className="flex items-center justify-between gap-2">
              <Sk className="h-4 w-32" />
              <Sk className="h-8 w-28 rounded-md" />
            </div>
            <Sk className="min-h-[8rem] flex-1 rounded-md" />
          </div>
          <div className="admin-surface flex min-h-[12rem] flex-col gap-2 p-3">
            <Sk className="h-4 w-24" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <Sk className="h-3 w-20" />
                <Sk className="h-3 w-8" />
              </div>
            ))}
          </div>
        </section>
        <section className="grid min-h-0 gap-2 overflow-hidden xl:grid-cols-5">
          <div className="flex min-h-0 flex-col overflow-hidden xl:col-span-3">
            <TableCardSkeleton rows={5} />
          </div>
          <div className="flex min-h-0 flex-col overflow-hidden xl:col-span-2">
            <TableCardSkeleton rows={4} />
          </div>
        </section>
      </div>
    </main>
  );
}

export function LeadsPageSkeleton() {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <AdminTopbarSkeleton showAction={false} />
      <section className="admin-surface flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-3 pt-2">
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex min-h-[3.75rem] flex-col justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
            >
              <div className="flex items-center justify-between gap-2">
                <Sk className="h-3 w-14" />
                <Sk className="size-2 rounded-full" />
              </div>
              <Sk className="h-6 w-8" />
            </div>
          ))}
        </div>
        <div className="h-px shrink-0 bg-border/80" aria-hidden />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <TableCardSkeleton rows={8} embedded />
        </div>
      </section>
    </main>
  );
}

export function TasksPageSkeleton() {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <AdminTopbarSkeleton showSearch={false} />
      <div className="flex min-h-0 flex-1 flex-col gap-3 pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Sk key={i} className="h-8 w-16 rounded-md" />
            ))}
          </div>
          <Sk className="h-9 w-28 rounded-md" />
        </div>
        <div className="h-9 shrink-0" aria-hidden />
        <section className="admin-surface flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-3 py-2">
            <Sk className="h-4 w-40" />
            <Sk className="h-7 w-16 rounded-md" />
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Sk key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function InvoicesPageSkeleton() {
  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 lg:px-4">
      <AdminTopbarSkeleton showSearch={false} />
      <div className="min-h-0 flex-1 pt-3">
        <div className="admin-surface flex h-full min-h-[20rem] flex-col gap-4 p-4">
          <div className="flex items-start justify-between gap-4">
            <Sk className="h-10 w-32" />
            <Sk className="h-8 w-40" />
          </div>
          <Sk className="h-px w-full" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Sk key={i} className="h-4 w-full max-w-md" />
          ))}
          <Sk className="mt-auto h-32 w-full rounded-md" />
        </div>
      </div>
    </main>
  );
}
