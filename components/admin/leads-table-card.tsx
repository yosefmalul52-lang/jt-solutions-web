"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CheckSquare,
  ChevronsUpDown,
  Copy,
  FileUp,
  MoreVertical,
  Phone,
  Plus,
  Square,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { CreateLeadSheet } from "@/components/admin/create-lead-sheet";
import { ImportLeadsSheet } from "@/components/admin/import-leads-sheet";
import { leadSourceLabels, leadStatusLabels } from "@/lib/admin/labels";
import { telHref, whatsappHref } from "@/lib/admin/phone";
import type { Lead, LeadStatus } from "@/lib/admin/types";
import { cn } from "@/lib/utils";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const statusTone: Record<Lead["status"], string> = {
  new: "bg-blue-600 text-white border-blue-700",
  contacted: "bg-sky-600 text-white border-sky-700",
  qualified: "bg-[#1e3a8a] text-white border-[#1e3a8a]",
  won: "bg-emerald-600 text-white border-emerald-700",
  lost: "bg-slate-500 text-white border-slate-600",
};

type LeadsTableCardProps = {
  title?: string;
  leads: Lead[];
  actionLabel?: string;
  compact?: boolean;
  showAction?: boolean;
  interactive?: boolean;
};

export function LeadsTableCard({
  title = "לידים פתוחים",
  leads,
  actionLabel = "הוסף ליד",
  compact = false,
  showAction = true,
  interactive = false,
}: LeadsTableCardProps) {
  const router = useRouter();
  const [sortDir, setSortDir] = React.useState<"asc" | "desc" | null>("desc");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [importOpen, setImportOpen] = React.useState(false);
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [busy, setBusy] = React.useState(false);
  const [confirm, setConfirm] = React.useState<
    null | { mode: "one" | "selected"; ids: string[] }
  >(null);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  React.useEffect(() => {
    setSelected((prev) => {
      const valid = new Set(leads.map((l) => l.id));
      const next = new Set<string>();
      for (const id of prev) if (valid.has(id)) next.add(id);
      return next;
    });
  }, [leads]);

  const sorted = React.useMemo(() => {
    if (!sortDir) return leads;
    return [...leads].sort((a, b) => {
      const left = new Date(a.createdAt).getTime();
      const right = new Date(b.createdAt).getTime();
      return sortDir === "asc" ? left - right : right - left;
    });
  }, [leads, sortDir]);

  const allSelected = sorted.length > 0 && sorted.every((l) => selected.has(l.id));
  const someSelected = selected.size > 0;
  const colSpan = interactive ? 8 : 6;

  const toggleSort = () => {
    setSortDir((current) => {
      if (current === "desc") return "asc";
      if (current === "asc") return null;
      return "desc";
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(sorted.map((l) => l.id)));
  const clearSelection = () => setSelected(new Set());

  const updateStatus = async (id: string, status: LeadStatus) => {
    if (!interactive) return;
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const copySummary = async (lead: Lead) => {
    const text = [
      `ליד: ${lead.name}`,
      `טלפון: ${lead.phone}`,
      lead.email ? `אימייל: ${lead.email}` : null,
      `שירות: ${lead.service}`,
      `סטטוס: ${leadStatusLabels[lead.status]}`,
      lead.notes ? `הערות: ${lead.notes}` : null,
      bookingUrl ? `קביעת שיחה: ${bookingUrl}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    await navigator.clipboard.writeText(text);
  };

  const runDelete = async () => {
    if (!confirm) return;
    setBusy(true);
    try {
      if (confirm.mode === "one" && confirm.ids.length === 1) {
        const res = await fetch(`/api/admin/leads/${confirm.ids[0]}`, { method: "DELETE" });
        if (!res.ok) return;
      } else {
        const res = await fetch("/api/admin/leads/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete", ids: confirm.ids }),
        });
        if (!res.ok) return;
      }
      clearSelection();
      setConfirm(null);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <section className="admin-surface flex h-full min-h-0 flex-col overflow-hidden p-2.5">
        <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2 px-0.5">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
            {interactive && someSelected ? (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                {selected.size} נבחרו
              </span>
            ) : null}
          </div>
          {interactive ? (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                type="button"
                onClick={() => setImportOpen(true)}
              >
                <FileUp className="size-3.5" />
                ייבוא CSV
              </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-slate-600"
                  aria-label={`${title} תפריט פעולות`}
                  type="button"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-44 z-[80]">
                <DropdownMenuItem onSelect={selectAll} disabled={sorted.length === 0}>
                  <CheckSquare className="size-4" />
                  בחר הכל
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={clearSelection} disabled={!someSelected}>
                  <Square className="size-4" />
                  נקה בחירה
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={!someSelected}
                  onSelect={() =>
                    setConfirm({ mode: "selected", ids: Array.from(selected) })
                  }
                >
                  <Trash2 className="size-4" />
                  מחק נבחרים ({selected.size})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          ) : null}
        </div>

        {interactive && someSelected ? (
          <div className="mb-2 flex flex-wrap items-center gap-2 rounded-md border border-red-100 bg-red-50 px-2.5 py-1.5">
            <span className="text-xs font-medium text-red-800">
              {selected.size} לידים נבחרו
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 border-red-200 bg-white text-red-700 hover:bg-red-100"
              onClick={() => setConfirm({ mode: "selected", ids: Array.from(selected) })}
            >
              מחק נבחרים
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 text-slate-700"
              onClick={clearSelection}
            >
              ביטול
            </Button>
          </div>
        ) : null}

        <div className="admin-inset min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <Table>
            <TableHeader className="sticky top-0 z-[1] bg-slate-50">
              <TableRow className="hover:bg-transparent">
                {interactive ? (
                  <TableHead className="h-9 w-10">
                    <input
                      type="checkbox"
                      className="size-3.5 accent-[#1e3a8a]"
                      checked={allSelected}
                      aria-label="בחר הכל"
                      onChange={(e) => (e.target.checked ? selectAll() : clearSelection())}
                    />
                  </TableHead>
                ) : null}
                <TableHead className="h-9 text-xs font-medium text-slate-600">שם</TableHead>
                <TableHead className="h-9 text-xs font-medium text-slate-600">טלפון</TableHead>
                <TableHead className="h-9 text-xs font-medium text-slate-600">שירות</TableHead>
                <TableHead className="h-9 text-xs font-medium text-slate-600">מקור</TableHead>
                <TableHead className="h-9 text-center text-xs font-medium text-slate-600">
                  סטטוס
                </TableHead>
                <TableHead
                  className="h-9 cursor-pointer select-none text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
                  onClick={toggleSort}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSort();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="מיון לפי תאריך"
                >
                  <span className="inline-flex items-center gap-1">
                    תאריך
                    <ChevronsUpDown
                      className={cn("size-3.5", sortDir ? "text-slate-900" : "text-slate-400")}
                      aria-hidden
                    />
                  </span>
                </TableHead>
                {interactive ? (
                  <TableHead className="h-9 text-xs font-medium text-slate-600">פעולות</TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={colSpan} className="h-16 text-sm text-slate-600">
                    אין לידים להצגה
                  </TableCell>
                </TableRow>
              ) : (
                sorted.map((lead) => {
                  const wa = whatsappHref(
                    lead.phone,
                    `היי ${lead.name}, כאן יוסף מ-JT Solutions. ראיתי את הפנייה שלך לגבי ${lead.service}.`,
                  );
                  const tel = telHref(lead.phone);
                  const isSelected = selected.has(lead.id);
                  return (
                    <TableRow
                      key={lead.id}
                      className={cn(
                        "bg-white hover:bg-slate-50",
                        isSelected && "bg-blue-50/60 hover:bg-blue-50",
                      )}
                    >
                      {interactive ? (
                        <TableCell className={cn(compact ? "h-10 py-1.5" : "h-11")}>
                          <input
                            type="checkbox"
                            className="size-3.5 accent-[#1e3a8a]"
                            checked={isSelected}
                            aria-label={`בחר ${lead.name}`}
                            onChange={() => toggleOne(lead.id)}
                          />
                        </TableCell>
                      ) : null}
                      <TableCell
                        className={cn(
                          "min-w-[7rem] font-medium text-slate-900",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        <div className="text-sm">{lead.name}</div>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap text-sm text-slate-700",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        <span dir="ltr">{lead.phone}</span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap text-sm text-slate-800",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        {lead.service}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap text-sm text-slate-700",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        {leadSourceLabels[lead.source]}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-center",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        {interactive ? (
                          <Select
                            value={lead.status}
                            disabled={pendingId === lead.id}
                            onValueChange={(value) =>
                              updateStatus(lead.id, value as LeadStatus)
                            }
                          >
                            <SelectTrigger
                              size="sm"
                              aria-label={`סטטוס של ${lead.name}`}
                              className={cn(
                                "mx-auto h-8 min-w-[8.75rem] justify-center gap-1 border px-2 font-medium shadow-none",
                                statusTone[lead.status],
                                "hover:opacity-95 focus-visible:ring-2 focus-visible:ring-cyan-400/40",
                                "[&_svg]:text-white/90 *:data-[slot=select-value]:justify-center",
                              )}
                            >
                              <SelectValue placeholder="סטטוס" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              align="start"
                              sideOffset={6}
                              className="z-[90] min-w-[10rem] border border-border bg-white p-1 text-slate-900 shadow-md"
                            >
                              {(Object.keys(leadStatusLabels) as LeadStatus[]).map((status) => (
                                <SelectItem key={status} value={status}>
                                  <span className="inline-flex items-center gap-2">
                                    <span
                                      className={cn(
                                        "inline-block size-2 rounded-full",
                                        statusTone[status].split(" ")[0],
                                      )}
                                    />
                                    {leadStatusLabels[status]}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge
                            variant="outline"
                            className={cn("mx-auto rounded-md", statusTone[lead.status])}
                          >
                            {leadStatusLabels[lead.status]}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap text-sm text-slate-600",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        {new Date(lead.createdAt).toLocaleDateString("he-IL")}
                      </TableCell>
                      {interactive ? (
                        <TableCell className={cn(compact ? "h-10 py-1.5" : "h-11")}>
                          <div className="flex items-center gap-0.5">
                            {wa ? (
                              <Button asChild size="icon" variant="ghost" className="size-8">
                                <a
                                  href={wa}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label="וואטסאפ"
                                >
                                  <WhatsAppIcon className="size-4 text-emerald-600" />
                                </a>
                              </Button>
                            ) : null}
                            {tel ? (
                              <Button asChild size="icon" variant="ghost" className="size-8">
                                <a href={tel} aria-label="התקשרות">
                                  <Phone className="size-4 text-slate-700" />
                                </a>
                              </Button>
                            ) : null}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8"
                              type="button"
                              aria-label="העתק סיכום"
                              onClick={() => copySummary(lead)}
                            >
                              <Copy className="size-4 text-slate-700" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                              type="button"
                              aria-label={`מחק את ${lead.name}`}
                              onClick={() => setConfirm({ mode: "one", ids: [lead.id] })}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        {showAction ? (
          <div className="mt-2 flex gap-2">
            {interactive ? (
              <Button
                variant="outline"
                className="admin-control shrink-0 border-border bg-white font-medium text-slate-800 hover:bg-slate-50"
                type="button"
                onClick={() => setImportOpen(true)}
                aria-label="ייבוא CSV"
              >
                <FileUp className="size-4" />
                ייבוא
              </Button>
            ) : null}
            <Button
              variant="outline"
              className="admin-control w-full border-border bg-white font-medium text-slate-800 hover:bg-slate-50"
              type="button"
              onClick={() => setCreateOpen(true)}
            >
              {actionLabel}
              <Plus className="size-4" />
            </Button>
          </div>
        ) : null}
      </section>
      <CreateLeadSheet open={createOpen} onOpenChange={setCreateOpen} />
      <ImportLeadsSheet open={importOpen} onOpenChange={setImportOpen} />
      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm?.mode === "one" ? "מחיקת ליד" : "מחיקת לידים"}
        description={
          confirm?.mode === "one"
            ? "הליד יימחק לצמיתות. משימות מקושרות יישארו ללא ליד."
            : `יימחקו ${confirm?.ids.length ?? 0} לידים לצמיתות. פעולה זו לא ניתנת לביטול.`
        }
        confirmLabel="מחק"
        destructive
        loading={busy}
        onCancel={() => (busy ? undefined : setConfirm(null))}
        onConfirm={() => void runDelete()}
      />
    </>
  );
}
