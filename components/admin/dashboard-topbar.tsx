"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateLeadSheet } from "@/components/admin/create-lead-sheet";
import { leadStatusLabels } from "@/lib/admin/labels";
import type { LeadStatus } from "@/lib/admin/types";

type DashboardTopbarProps = {
  title?: string;
  statusFilter?: LeadStatus | "all";
  searchQuery?: string;
  showLeadFilters?: boolean;
  showStatusDropdown?: boolean;
  showCreateButton?: boolean;
};

export function DashboardTopbar({
  title = "סקירת לידים",
  statusFilter = "all",
  searchQuery = "",
  showLeadFilters = true,
  showStatusDropdown = true,
  showCreateButton = true,
}: DashboardTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = React.useState(searchQuery);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [now, setNow] = React.useState(() => new Date());
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  React.useEffect(() => {
    setQ(searchQuery);
  }, [searchQuery]);

  React.useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const dateTimeLabel = React.useMemo(() => {
    const date = now.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
    });
    const time = now.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} · ${time}`;
  }, [now]);

  const pushFilters = React.useCallback(
    (next: { status?: string; q?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      const status = next.status ?? statusFilter;
      const query = next.q ?? q;
      if (!status || status === "all") params.delete("status");
      else params.set("status", status);
      if (!query.trim()) params.delete("q");
      else params.set("q", query.trim());
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname, q, router, searchParams, statusFilter],
  );

  React.useEffect(() => {
    if (!showLeadFilters) return;
    const handle = window.setTimeout(() => {
      if (q === searchQuery) return;
      pushFilters({ q });
    }, 350);
    return () => window.clearTimeout(handle);
  }, [q, pushFilters, searchQuery, showLeadFilters]);

  return (
    <>
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border/80 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <SidebarTrigger className="admin-control size-9 shrink-0 lg:hidden" />
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
              {title}
            </h1>
            <time
              dateTime={now.toISOString()}
              className="hidden tabular-nums text-sm text-slate-600 sm:inline"
            >
              {dateTimeLabel}
            </time>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          {showLeadFilters ? (
            <>
              <div className="relative min-w-[11rem] flex-1 md:w-52 md:flex-none">
                <Search className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-slate-500" />
                <Input
                  aria-label="חיפוש לידים"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="admin-control border-border bg-white pr-9 text-sm text-slate-900 placeholder:text-slate-500"
                  placeholder="חיפוש שם, טלפון, שירות..."
                />
              </div>
              {showStatusDropdown ? (
                <Select
                  value={statusFilter}
                  onValueChange={(value) => pushFilters({ status: value })}
                >
                  <SelectTrigger
                    className="admin-control w-[11.5rem] justify-between border-border bg-white text-slate-900"
                    aria-label="סינון סטטוס"
                  >
                    <SelectValue placeholder="סטטוס" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    align="start"
                    sideOffset={6}
                    className="z-[60] w-[var(--radix-select-trigger-width)] rounded-[var(--admin-radius-sm)] border border-border bg-white p-1 text-slate-900 shadow-md"
                  >
                    <SelectItem value="all">כל הסטטוסים</SelectItem>
                    {Object.entries(leadStatusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}
            </>
          ) : null}

          {bookingUrl ? (
            <Button
              asChild
              variant="outline"
              className="admin-control border-border bg-white text-slate-800 hover:bg-slate-50"
            >
              <a href={bookingUrl} target="_blank" rel="noreferrer">
                קבע שיחה
                <CalendarDays className="size-4" />
              </a>
            </Button>
          ) : null}

          {showCreateButton ? (
            <Button
              className="admin-control bg-[#1e3a8a] px-3 text-white hover:bg-[#1e40af]"
              type="button"
              onClick={() => setCreateOpen(true)}
            >
              ליד חדש
              <Plus className="size-4" />
            </Button>
          ) : null}
        </div>
      </header>
      {showCreateButton ? (
        <CreateLeadSheet open={createOpen} onOpenChange={setCreateOpen} />
      ) : null}
    </>
  );
}
