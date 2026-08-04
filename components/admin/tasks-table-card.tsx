"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  CheckCheck,
  CheckCircle2,
  Circle,
  Loader2,
  MoreVertical,
  Plus,
  Square,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { CreateTaskSheet } from "@/components/admin/create-task-sheet";
import { googleCalendarUrl } from "@/lib/admin/calendar";
import { playTaskCompleteSound } from "@/lib/admin/task-sound";
import type { Lead, Task } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

type TasksTableCardProps = {
  title?: string;
  tasks: Task[];
  leads?: Lead[];
  actionLabel?: string;
  compact?: boolean;
  showAction?: boolean;
  interactive?: boolean;
};

export function TasksTableCard({
  title = "משימות פתוחות",
  tasks,
  leads = [],
  actionLabel = "משימה חדשה",
  compact = false,
  showAction = true,
  interactive = false,
}: TasksTableCardProps) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = React.useState(false);
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [justDone, setJustDone] = React.useState<Set<string>>(new Set());
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [busy, setBusy] = React.useState(false);
  const [confirm, setConfirm] = React.useState<null | { ids: string[] }>(null);

  React.useEffect(() => {
    setSelected((prev) => {
      const valid = new Set(tasks.map((t) => t.id));
      const next = new Set<string>();
      for (const id of prev) if (valid.has(id)) next.add(id);
      return next;
    });
  }, [tasks]);

  const openTasks = React.useMemo(() => tasks.filter((t) => !t.done), [tasks]);
  const allSelected = tasks.length > 0 && tasks.every((t) => selected.has(t.id));
  const someSelected = selected.size > 0;

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(tasks.map((t) => t.id)));
  const clearSelection = () => setSelected(new Set());

  const flashDone = (id: string, options?: { silent?: boolean }) => {
    if (!options?.silent) playTaskCompleteSound();
    setJustDone((prev) => new Set(prev).add(id));
    window.setTimeout(() => {
      setJustDone((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 700);
  };

  const toggleDone = async (task: Task) => {
    if (!interactive) return;
    setPendingId(task.id);
    const nextDone = !task.done;
    if (nextDone) flashDone(task.id);
    try {
      const res = await fetch(`/api/admin/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: nextDone }),
      });
      if (res.ok) router.refresh();
    } finally {
      setPendingId(null);
    }
  };

  const completeSelected = async (ids: string[]) => {
    if (!ids.length) return;
    setBusy(true);
    playTaskCompleteSound();
    ids.forEach((id) => flashDone(id, { silent: true }));
    try {
      const res = await fetch("/api/admin/tasks/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete", ids }),
      });
      if (res.ok) {
        clearSelection();
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  };

  const runDelete = async () => {
    if (!confirm) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/tasks/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", ids: confirm.ids }),
      });
      if (res.ok) {
        clearSelection();
        setConfirm(null);
        router.refresh();
      }
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
            <div className="flex items-center gap-0.5">
              {showAction ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-slate-600 hover:bg-slate-100 hover:text-[#1e3a8a]"
                  aria-label={actionLabel}
                  type="button"
                  onClick={() => setCreateOpen(true)}
                >
                  <Plus className="size-4" />
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
              <DropdownMenuContent align="start" className="min-w-48 z-[80]">
                <DropdownMenuItem onSelect={selectAll} disabled={tasks.length === 0}>
                  בחר הכל
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={clearSelection} disabled={!someSelected}>
                  <Square className="size-4" />
                  נקה בחירה
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={openTasks.length === 0 || busy}
                  onSelect={() => void completeSelected(openTasks.map((t) => t.id))}
                >
                  <CheckCheck className="size-4" />
                  סמן הכל כבוצע ({openTasks.length})
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!someSelected || busy}
                  onSelect={() => void completeSelected(Array.from(selected))}
                >
                  <CheckCircle2 className="size-4" />
                  סמן נבחרים כבוצע
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={!someSelected}
                  onSelect={() => setConfirm({ ids: Array.from(selected) })}
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
          <div className="mb-2 flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5">
            <span className="text-xs font-medium text-slate-700">
              {selected.size} משימות נבחרו
            </span>
            <Button
              type="button"
              size="sm"
              className="h-7 bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
              disabled={busy}
              onClick={() => void completeSelected(Array.from(selected))}
            >
              סמן כבוצע
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 border-red-200 text-red-700 hover:bg-red-50"
              disabled={busy}
              onClick={() => setConfirm({ ids: Array.from(selected) })}
            >
              מחק
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
                <TableHead className="h-9 text-xs font-medium text-slate-600">משימה</TableHead>
                <TableHead className="h-9 text-xs font-medium text-slate-600">ליד</TableHead>
                <TableHead className="h-9 text-xs font-medium text-slate-600">יעד</TableHead>
                <TableHead className="h-9 text-xs font-medium text-slate-600">סטטוס</TableHead>
                {interactive ? (
                  <TableHead className="h-9 w-20 text-xs font-medium text-slate-600" />
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={interactive ? 6 : 4}
                    className="h-16 text-sm text-slate-600"
                  >
                    אין משימות להצגה
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => {
                  const isSelected = selected.has(task.id);
                  const animating = justDone.has(task.id);
                  const pending = pendingId === task.id;
                  return (
                    <TableRow
                      key={task.id}
                      className={cn(
                        "bg-white transition-colors hover:bg-slate-50",
                        isSelected && "bg-blue-50/60 hover:bg-blue-50",
                        animating && "admin-task-done-flash",
                      )}
                    >
                      {interactive ? (
                        <TableCell className={cn(compact ? "h-10 py-1.5" : "h-11")}>
                          <input
                            type="checkbox"
                            className="size-3.5 accent-[#1e3a8a]"
                            checked={isSelected}
                            aria-label={`בחר ${task.title}`}
                            onChange={() => toggleOne(task.id)}
                          />
                        </TableCell>
                      ) : null}
                      <TableCell
                        className={cn(
                          "min-w-[10rem] font-medium text-slate-900",
                          compact ? "h-10 py-1.5 text-sm" : "h-11",
                          task.done && "text-slate-500 line-through",
                        )}
                      >
                        {task.title}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap text-sm text-slate-800",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        {task.leadName}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap text-sm text-slate-600",
                          compact ? "h-10 py-1.5" : "h-11",
                        )}
                      >
                        {new Date(task.dueDate).toLocaleDateString("he-IL")}
                      </TableCell>
                      <TableCell className={cn(compact ? "h-10 py-1.5" : "h-11")}>
                        <button
                          type="button"
                          disabled={!interactive || pending || busy}
                          onClick={() => void toggleDone(task)}
                          aria-pressed={task.done}
                          aria-label={task.done ? "סמן כפתוח" : "סמן כבוצע"}
                          className={cn(
                            "admin-task-toggle inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-all",
                            task.done
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-800 hover:bg-amber-100",
                            interactive && "cursor-pointer active:scale-95",
                            animating && "admin-task-toggle--pop",
                            pending && "opacity-70",
                          )}
                        >
                          {pending ? (
                            <Loader2 className="size-4 animate-spin" aria-hidden />
                          ) : task.done || animating ? (
                            <CheckCircle2
                              className={cn("size-4", animating && "admin-task-check-pop")}
                              aria-hidden
                            />
                          ) : (
                            <Circle className="size-4" aria-hidden />
                          )}
                          {task.done ? "בוצע" : "פתוח"}
                        </button>
                      </TableCell>
                      {interactive ? (
                        <TableCell className={cn(compact ? "h-10 py-1.5" : "h-11")}>
                          <div className="flex items-center gap-0.5">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 text-slate-600 hover:bg-slate-100 hover:text-[#1e3a8a]"
                              type="button"
                              aria-label={`הוסף ליומן: ${task.title}`}
                              asChild
                            >
                              <a
                                href={googleCalendarUrl({
                                  title: task.title,
                                  dueDate: task.dueDate,
                                  details: task.leadName
                                    ? `ליד: ${task.leadName}`
                                    : undefined,
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <CalendarPlus className="size-4" />
                              </a>
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                              type="button"
                              aria-label={`מחק ${task.title}`}
                              onClick={() => setConfirm({ ids: [task.id] })}
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
          <Button
            variant="outline"
            className="admin-control mt-2 w-full border-border bg-white font-medium text-slate-800 hover:bg-slate-50"
            type="button"
            onClick={() => setCreateOpen(true)}
          >
            {actionLabel}
            <Plus className="size-4" />
          </Button>
        ) : null}
      </section>
      <CreateTaskSheet open={createOpen} onOpenChange={setCreateOpen} leads={leads} />
      <ConfirmDialog
        open={Boolean(confirm)}
        title="מחיקת משימות"
        description={
          confirm?.ids.length === 1
            ? "המשימה תימחק לצמיתות."
            : `יימחקו ${confirm?.ids.length ?? 0} משימות לצמיתות.`
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
