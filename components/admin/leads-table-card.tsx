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
import { BulkSelectionBar } from "@/components/admin/bulk-selection-bar";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { CopiedToast, useCopiedToast } from "@/components/admin/copied-toast";
import { CreateLeadSheet } from "@/components/admin/create-lead-sheet";
import { ImportLeadsSheet } from "@/components/admin/import-leads-sheet";
import { LeadDetailDialog } from "@/components/admin/lead-detail-dialog";
import { LeadLostReasonDialog } from "@/components/admin/lead-lost-reason-dialog";
import { LeadLostReasonNote } from "@/components/admin/lead-lost-reason-note";
import { leadSourceLabels, leadStatusLabels } from "@/lib/admin/labels";
import { leadStatusChip, leadStatusChipClass, leadStatusDot } from "@/lib/admin/status-styles";
import { telHref, whatsappHref } from "@/lib/admin/phone";
import type { Lead, LeadStatus } from "@/lib/admin/types";
import { cn } from "@/lib/utils";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

type LeadsTableCardProps = {
  title?: string;
  leads: Lead[];
  actionLabel?: string;
  compact?: boolean;
  /** Tighter rows/columns for dashboard overview table. */
  dense?: boolean;
  showAction?: boolean;
  interactive?: boolean;
  /** Renders without outer card shell — parent provides the surface. */
  embedded?: boolean;
};

export function LeadsTableCard({
  title = "לידים פתוחים",
  leads,
  actionLabel = "הוסף ליד",
  compact = false,
  dense = false,
  showAction = true,
  interactive = false,
  embedded = false,
}: LeadsTableCardProps) {
  const router = useRouter();
  const { open: copiedOpen, showCopied } = useCopiedToast();
  const [sortDir, setSortDir] = React.useState<"asc" | "desc" | null>("desc");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [importOpen, setImportOpen] = React.useState(false);
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [busy, setBusy] = React.useState(false);
  const [confirm, setConfirm] = React.useState<
    null | { mode: "one" | "selected"; ids: string[] }
  >(null);
  const [detailLead, setDetailLead] = React.useState<Lead | null>(null);
  const [lostReasonPrompt, setLostReasonPrompt] = React.useState<Lead | null>(null);
  const [statusSelectKey, setStatusSelectKey] = React.useState(0);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  React.useEffect(() => {
    setDetailLead((current) => {
      if (!current) return null;
      return leads.find((l) => l.id === current.id) ?? current;
    });
  }, [leads]);

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

  const updateStatus = async (
    id: string,
    status: LeadStatus,
    options?: { lostReason?: string | null },
  ) => {
    if (!interactive) return;
    setPendingId(id);
    try {
      const body: { status: LeadStatus; lostReason?: string | null } = { status };
      if (status === "lost" && options?.lostReason !== undefined) {
        body.lostReason = options.lostReason || null;
      }
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const handleStatusChange = (lead: Lead, status: LeadStatus) => {
    if (status === "lost" && lead.status !== "lost") {
      setLostReasonPrompt(lead);
      return;
    }
    void updateStatus(lead.id, status);
  };

  const confirmLostReason = async (reason: string) => {
    if (!lostReasonPrompt) return;
    setBusy(true);
    try {
      await updateStatus(lostReasonPrompt.id, "lost", { lostReason: reason || null });
      setDetailLead((current) =>
        current?.id === lostReasonPrompt.id
          ? {
              ...current,
              status: "lost",
              lostReason: reason.trim() || undefined,
            }
          : current,
      );
      setLostReasonPrompt(null);
    } finally {
      setBusy(false);
    }
  };

  const cancelLostReason = () => {
    setLostReasonPrompt(null);
    setStatusSelectKey((k) => k + 1);
  };

  const copySummary = async (lead: Lead) => {
    const text = [
      `ליד: ${lead.name}`,
      `טלפון: ${lead.phone}`,
      lead.email ? `אימייל: ${lead.email}` : null,
      `שירות: ${lead.service}`,
      `סטטוס: ${leadStatusLabels[lead.status]}`,
      lead.lostReason ? `סיבת אי-רלוונטיות: ${lead.lostReason}` : null,
      lead.notes ? `הערות: ${lead.notes}` : null,
      bookingUrl ? `קביעת שיחה: ${bookingUrl}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    await navigator.clipboard.writeText(text);
    showCopied();
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

  const stopRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const openLeadDetail = (lead: Lead) => {
    setDetailLead(lead);
  };

  const rowCellClass = dense ? "h-8 py-1" : compact ? "h-10 py-1.5" : "h-11";
  const headRowClass = dense ? "h-8" : "h-9";
  const bodyTextClass = dense ? "text-xs" : "text-sm";

  const shellClass = cn(
    "flex h-full min-h-0 flex-col overflow-hidden",
    !embedded && "admin-surface p-2.5",
  );

  return (
    <>
      <section className={shellClass}>
        <div
          className={cn(
            "mb-2 flex shrink-0 items-center justify-between gap-3",
            embedded && "px-0.5",
          )}
        >
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-slate-900">{title}</h2>
            {interactive ? (
              <p className="mt-0.5 text-xs text-slate-500 tabular-nums">
                {leads.length} לידים
              </p>
            ) : null}
          </div>
          {interactive ? (
            <div className="flex shrink-0 items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                type="button"
                onClick={() => setImportOpen(true)}
              >
                <FileUp className="size-3.5" />
                <span className="hidden sm:inline">ייבוא CSV</span>
                <span className="sm:hidden">ייבוא</span>
              </Button>
              {!showAction ? (
                <Button
                  size="sm"
                  className="h-8 gap-1.5 bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
                  type="button"
                  onClick={() => setCreateOpen(true)}
                >
                  <Plus className="size-3.5" />
                  {actionLabel}
                </Button>
              ) : null}
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

        {interactive ? (
          <BulkSelectionBar
            open={someSelected}
            count={selected.size}
            label="לידים נבחרו"
            tone="danger"
          >
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
          </BulkSelectionBar>
        ) : (
          <div className="mb-2 h-9 shrink-0" aria-hidden />
        )}

        <div
          className={cn(
            "admin-inset admin-data-table admin-scroll min-h-0 flex-1",
            dense && "admin-data-table--dense",
          )}
        >
          <Table>
            <TableHeader className="sticky top-0 z-[1] bg-slate-50">
              <TableRow className="hover:bg-transparent">
                {interactive ? (
                  <TableHead className={cn(headRowClass, dense ? "w-8 px-1" : "w-10")}>
                    <input
                      type="checkbox"
                      className="size-3.5 accent-[#1e3a8a]"
                      checked={allSelected}
                      aria-label="בחר הכל"
                      onChange={(e) => (e.target.checked ? selectAll() : clearSelection())}
                      onClick={stopRowClick}
                    />
                  </TableHead>
                ) : null}
                <TableHead className={cn(headRowClass, "w-[12%] px-1.5 text-xs font-medium text-slate-600")}>
                  שם
                </TableHead>
                <TableHead className={cn(headRowClass, "w-[11%] px-1.5 text-xs font-medium text-slate-600")}>
                  טלפון
                </TableHead>
                <TableHead className={cn(headRowClass, "w-[26%] px-1.5 text-xs font-medium text-slate-600")}>
                  שירות
                </TableHead>
                <TableHead className={cn(headRowClass, "w-[9%] px-1.5 text-xs font-medium text-slate-600")}>
                  מקור
                </TableHead>
                <TableHead
                  className={cn(
                    headRowClass,
                    "w-[12%] px-1.5 text-center text-xs font-medium text-slate-600",
                  )}
                >
                  סטטוס
                </TableHead>
                <TableHead
                  className={cn(
                    headRowClass,
                    "w-[9%] cursor-pointer select-none px-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900",
                  )}
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
                  <TableHead
                    className={cn(
                      headRowClass,
                      dense ? "w-[4.25rem] px-1" : "w-[5.5rem]",
                      "text-xs font-medium text-slate-600",
                    )}
                  >
                    פעולות
                  </TableHead>
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
                        "cursor-pointer bg-white hover:bg-slate-50",
                        isSelected && "bg-blue-50/60 hover:bg-blue-50",
                      )}
                      onClick={() => openLeadDetail(lead)}
                    >
                      {interactive ? (
                        <TableCell
                          className={cn(rowCellClass, dense && "px-1.5")}
                          onClick={stopRowClick}
                        >
                          <input
                            type="checkbox"
                            className={cn("accent-[#1e3a8a]", dense ? "size-3" : "size-3.5")}
                            checked={isSelected}
                            aria-label={`בחר ${lead.name}`}
                            onChange={() => toggleOne(lead.id)}
                            onClick={stopRowClick}
                          />
                        </TableCell>
                      ) : null}
                      <TableCell
                        className={cn(
                          "admin-table-cell font-medium text-slate-900",
                          rowCellClass,
                          dense && "px-1.5",
                        )}
                      >
                        <span className={cn("admin-table-cell__text", bodyTextClass)}>{lead.name}</span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "admin-table-cell text-slate-700",
                          rowCellClass,
                          dense && "px-1.5",
                          bodyTextClass,
                        )}
                      >
                        <span className="admin-table-cell__text" dir="ltr">
                          {lead.phone}
                        </span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "admin-table-cell text-slate-800",
                          rowCellClass,
                          dense && "px-1.5",
                          bodyTextClass,
                        )}
                      >
                        <span className="admin-table-cell__text">{lead.service}</span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "admin-table-cell text-slate-700",
                          rowCellClass,
                          dense && "px-1.5",
                          bodyTextClass,
                        )}
                      >
                        <span className="admin-table-cell__text">
                          {leadSourceLabels[lead.source]}
                        </span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "admin-table-cell text-center",
                          rowCellClass,
                          dense && "px-1.5",
                        )}
                        onClick={stopRowClick}
                      >
                        {interactive ? (
                          <div className="mx-auto flex min-w-0 max-w-full flex-col items-center gap-1">
                            <Select
                              key={`${lead.id}-${statusSelectKey}`}
                              value={lead.status}
                              disabled={pendingId === lead.id}
                              onValueChange={(value) =>
                                handleStatusChange(lead, value as LeadStatus)
                              }
                            >
                            <SelectTrigger
                              size="sm"
                              aria-label={`סטטוס של ${lead.name}`}
                              className={cn(
                                "mx-auto w-full justify-center gap-0.5 rounded-md",
                                dense
                                  ? "h-7 max-w-[6.75rem] px-1.5 text-xs"
                                  : "h-8 max-w-[8.75rem] gap-1 px-2.5",
                                leadStatusChipClass,
                                leadStatusChip[lead.status],
                                "focus-visible:ring-2 focus-visible:ring-cyan-400/40",
                                "[&_svg]:opacity-70 *:data-[slot=select-value]:justify-center",
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
                                        leadStatusDot[status],
                                      )}
                                    />
                                    {leadStatusLabels[status]}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {lead.status === "lost" ? (
                            <LeadLostReasonNote reason={lead.lostReason} />
                          ) : null}
                        </div>
                        ) : (
                          <div className="mx-auto flex min-w-0 max-w-full flex-col items-center gap-1">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-md border font-bold",
                                leadStatusChip[lead.status],
                              )}
                            >
                              {leadStatusLabels[lead.status]}
                            </Badge>
                            {lead.status === "lost" ? (
                              <LeadLostReasonNote reason={lead.lostReason} />
                            ) : null}
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "admin-table-cell text-slate-600",
                          rowCellClass,
                          dense && "px-1.5",
                          bodyTextClass,
                        )}
                      >
                        <span className="admin-table-cell__text">
                          {new Date(lead.createdAt).toLocaleDateString("he-IL")}
                        </span>
                      </TableCell>
                      {interactive ? (
                        <TableCell
                          className={cn(rowCellClass, dense && "px-1")}
                          onClick={stopRowClick}
                        >
                          <div className="flex items-center gap-0">
                            {wa ? (
                              <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className={dense ? "size-7" : "size-8"}
                              >
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
                              <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className={dense ? "size-7" : "size-8"}
                              >
                                <a href={tel} aria-label="התקשרות">
                                  <Phone className="size-4 text-slate-700" />
                                </a>
                              </Button>
                            ) : null}
                            <Button
                              size="icon"
                              variant="ghost"
                              className={dense ? "size-7" : "size-8"}
                              type="button"
                              aria-label="העתק סיכום"
                              onClick={() => copySummary(lead)}
                            >
                              <Copy className="size-4 text-slate-700" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className={cn(
                                dense ? "size-7" : "size-8",
                                "text-red-600 hover:bg-red-50 hover:text-red-700",
                              )}
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
      <LeadDetailDialog
        lead={detailLead}
        open={Boolean(detailLead)}
        onClose={() => setDetailLead(null)}
      />
      <LeadLostReasonDialog
        open={Boolean(lostReasonPrompt)}
        leadName={lostReasonPrompt?.name ?? ""}
        loading={busy || pendingId === lostReasonPrompt?.id}
        onConfirm={(reason) => void confirmLostReason(reason)}
        onCancel={cancelLostReason}
      />
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
      <CopiedToast open={copiedOpen} />
    </>
  );
}
