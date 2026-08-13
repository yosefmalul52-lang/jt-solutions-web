"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CalendarPlus,
  CheckCheck,
  CheckCircle2,
  Circle,
  ClipboardList,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { CreateTaskSheet } from "@/components/admin/create-task-sheet";
import { googleCalendarUrl } from "@/lib/admin/calendar";
import {
  dueKindLabel,
  filterTasks,
  formatDueDate,
  isTaskViewFilter,
  sortTasksByUrgency,
  taskCounts,
  taskDueKind,
  type TaskDueKind,
  type TaskViewFilter,
} from "@/lib/admin/task-due";
import { playTaskCompleteSound } from "@/lib/admin/task-sound";
import type { Lead, Task } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

type TasksPageViewProps = {
  tasks: Task[];
  leads: Lead[];
};

const FILTERS: { id: TaskViewFilter; label: string }[] = [
  { id: "open", label: "פתוחות" },
  { id: "overdue", label: "באיחור" },
  { id: "today", label: "היום" },
  { id: "done", label: "בוצעו" },
  { id: "all", label: "הכל" },
];

const dueTone: Record<TaskDueKind, string> = {
  overdue: "bg-red-50 text-red-800 ring-1 ring-red-200",
  today: "bg-amber-50 text-amber-900 ring-1 ring-amber-200",
  upcoming: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  done: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200",
};

export function TasksPageView({ tasks, leads }: TasksPageViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawView = searchParams.get("view");
  const view: TaskViewFilter = isTaskViewFilter(rawView) ? rawView : "open";

  const [createOpen, setCreateOpen] = React.useState(false);
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [justDone, setJustDone] = React.useState<Set<string>>(new Set());
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [busy, setBusy] = React.useState(false);
  const [confirm, setConfirm] = React.useState<null | { ids: string[] }>(null);

  const counts = React.useMemo(() => taskCounts(tasks), [tasks]);
  const visible = React.useMemo(
    () => sortTasksByUrgency(filterTasks(tasks, view)),
    [tasks, view],
  );

  React.useEffect(() => {
    setSelected((prev) => {
      const valid = new Set(visible.map((t) => t.id));
      const next = new Set<string>();
      for (const id of prev) if (valid.has(id)) next.add(id);
      return next;
    });
  }, [visible]);

  const setView = (next: TaskViewFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "open") params.delete("view");
    else params.set("view", next);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const countFor = (id: TaskViewFilter) => {
    if (id === "all") return counts.all;
    if (id === "open") return counts.open;
    if (id === "overdue") return counts.overdue;
    if (id === "today") return counts.today;
    return counts.done;
  };

  const allSelected = visible.length > 0 && visible.every((t) => selected.has(t.id));
  const someSelected = selected.size > 0;

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(visible.map((t) => t.id)));
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

  const emptyCopy = (() => {
    switch (view) {
      case "overdue":
        return {
          title: "אין משימות באיחור",
          body: "הכל מעודכן - אין יעדים שעברו.",
        };
      case "today":
        return {
          title: "אין משימות להיום",
          body: "אפשר ליצור משימה חדשה עם יעד להיום.",
        };
      case "done":
        return {
          title: "עדיין אין משימות שבוצעו",
          body: "סמן משימה כבוצעה כדי לראות אותה כאן.",
        };
      case "all":
        return {
          title: "אין משימות עדיין",
          body: "צור משימת מעקב לליד - או חכה לפנייה חדשה מהאתר.",
        };
      default:
        return {
          title: "אין משימות פתוחות",
          body: "כל המשימות בוצעו, או שטרם נוצרה משימה.",
        };
    }
  })();

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div
            role="tablist"
            aria-label="סינון משימות"
            className="flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1"
          >
            {FILTERS.map((f) => {
              const active = view === f.id;
              const n = countFor(f.id);
              const hot = f.id === "overdue" && n > 0;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setView(f.id)}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-[#1e3a8a] text-white"
                      : "text-slate-700 hover:bg-slate-100",
                    !active && hot && "text-red-700",
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      "min-w-5 rounded px-1 text-center text-xs tabular-nums",
                      active
                        ? "bg-white/20 text-white"
                        : hot
                          ? "bg-red-100 text-red-800"
                          : "bg-slate-100 text-slate-600",
                    )}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            className="h-9 gap-1.5 bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="size-4" />
            משימה חדשה
          </Button>
        </div>

        {someSelected ? (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-sm font-medium text-slate-800">
              {selected.size} נבחרו
            </span>
            <Button
              type="button"
              size="sm"
              className="h-8 bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
              disabled={busy}
              onClick={() => void completeSelected(Array.from(selected))}
            >
              <CheckCheck className="size-3.5" />
              סמן כבוצע
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 border-red-200 text-red-700 hover:bg-red-50"
              disabled={busy}
              onClick={() => setConfirm({ ids: Array.from(selected) })}
            >
              <Trash2 className="size-3.5" />
              מחק
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 text-slate-700"
              onClick={clearSelection}
            >
              ביטול
            </Button>
          </div>
        ) : null}

        <section className="admin-surface flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-3 py-2">
            <p className="text-sm text-slate-600">
              {visible.length === 0
                ? "אין תוצאות בסינון זה"
                : `${visible.length} משימות · מסודר לפי דחיפות`}
            </p>
            {visible.length > 0 ? (
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="size-3.5 accent-[#1e3a8a]"
                  checked={allSelected}
                  onChange={(e) => (e.target.checked ? selectAll() : clearSelection())}
                />
                בחר הכל
              </label>
            ) : null}
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            {visible.length === 0 ? (
              <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <ClipboardList className="size-6" aria-hidden />
                </div>
                <div className="max-w-sm space-y-1">
                  <p className="text-base font-semibold text-slate-900">{emptyCopy.title}</p>
                  <p className="text-sm text-slate-600 text-pretty">{emptyCopy.body}</p>
                </div>
                {view === "open" || view === "all" || view === "today" ? (
                  <Button
                    type="button"
                    className="mt-1 h-9 gap-1.5 bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
                    onClick={() => setCreateOpen(true)}
                  >
                    <Plus className="size-4" />
                    משימה חדשה
                  </Button>
                ) : null}
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {visible.map((task) => {
                  const kind = taskDueKind(task);
                  const isSelected = selected.has(task.id);
                  const animating = justDone.has(task.id);
                  const pending = pendingId === task.id;
                  return (
                    <li
                      key={task.id}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 transition-colors duration-150",
                        isSelected && "bg-blue-50/70",
                        animating && "admin-task-done-flash",
                        !isSelected && "hover:bg-slate-50/80",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="size-3.5 shrink-0 accent-[#1e3a8a]"
                        checked={isSelected}
                        aria-label={`בחר ${task.title}`}
                        onChange={() => toggleOne(task.id)}
                      />

                      <button
                        type="button"
                        disabled={pending || busy}
                        onClick={() => void toggleDone(task)}
                        aria-pressed={task.done}
                        aria-label={task.done ? "סמן כפתוח" : "סמן כבוצע"}
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-md transition-colors duration-150",
                          task.done
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-[#1e3a8a]",
                          pending && "opacity-70",
                          animating && "admin-task-toggle--pop",
                        )}
                      >
                        {pending ? (
                          <Loader2 className="size-4 animate-spin" aria-hidden />
                        ) : task.done || animating ? (
                          <CheckCircle2
                            className={cn("size-5", animating && "admin-task-check-pop")}
                            aria-hidden
                          />
                        ) : (
                          <Circle className="size-5" aria-hidden />
                        )}
                      </button>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <p
                          className={cn(
                            "truncate text-[0.9375rem] font-semibold leading-snug text-slate-900",
                            task.done && "text-slate-500 line-through",
                          )}
                        >
                          {task.title}
                        </p>
                        <p className="truncate text-sm text-slate-600">
                          {task.leadName ? (
                            <>
                              ליד: <span className="font-medium text-slate-800">{task.leadName}</span>
                            </>
                          ) : (
                            <span className="text-slate-500">ללא ליד מקושר</span>
                          )}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold",
                          dueTone[kind],
                        )}
                      >
                        {dueKindLabel(kind)}
                        {kind !== "done" ? (
                          <span className="font-medium tabular-nums opacity-90">
                            · {formatDueDate(task.dueDate)}
                          </span>
                        ) : null}
                      </span>

                      <div className="flex shrink-0 items-center gap-0.5">
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
                              details: task.leadName ? `ליד: ${task.leadName}` : undefined,
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
                          className="size-8 text-slate-500 hover:bg-red-50 hover:text-red-700"
                          type="button"
                          aria-label={`מחק ${task.title}`}
                          onClick={() => setConfirm({ ids: [task.id] })}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>

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
