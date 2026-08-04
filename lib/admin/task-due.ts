import type { Task } from "@/lib/admin/types";

export type TaskDueKind = "overdue" | "today" | "upcoming" | "done";

export type TaskViewFilter = "open" | "overdue" | "today" | "done" | "all";

/** Local calendar day as YYYY-MM-DD */
export function todayKey(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function dueKey(dueDate: string): string {
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(dueDate.trim());
  return match ? match[1] : dueDate.slice(0, 10);
}

export function taskDueKind(task: Task, today = todayKey()): TaskDueKind {
  if (task.done) return "done";
  const due = dueKey(task.dueDate);
  if (due < today) return "overdue";
  if (due === today) return "today";
  return "upcoming";
}

export function dueKindLabel(kind: TaskDueKind): string {
  switch (kind) {
    case "overdue":
      return "באיחור";
    case "today":
      return "היום";
    case "upcoming":
      return "בהמשך";
    case "done":
      return "בוצע";
  }
}

export function formatDueDate(dueDate: string): string {
  const key = dueKey(dueDate);
  const [y, m, d] = key.split("-").map(Number);
  if (!y || !m || !d) return dueDate;
  return new Date(y, m - 1, d).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
  });
}

export function filterTasks(tasks: Task[], view: TaskViewFilter, today = todayKey()): Task[] {
  switch (view) {
    case "open":
      return tasks.filter((t) => !t.done);
    case "overdue":
      return tasks.filter((t) => taskDueKind(t, today) === "overdue");
    case "today":
      return tasks.filter((t) => taskDueKind(t, today) === "today");
    case "done":
      return tasks.filter((t) => t.done);
    case "all":
    default:
      return tasks;
  }
}

/** Open tasks: overdue → today → upcoming by date; done last when included. */
export function sortTasksByUrgency(tasks: Task[], today = todayKey()): Task[] {
  const rank: Record<TaskDueKind, number> = {
    overdue: 0,
    today: 1,
    upcoming: 2,
    done: 3,
  };
  return [...tasks].sort((a, b) => {
    const ka = taskDueKind(a, today);
    const kb = taskDueKind(b, today);
    if (rank[ka] !== rank[kb]) return rank[ka] - rank[kb];
    const da = dueKey(a.dueDate);
    const db = dueKey(b.dueDate);
    if (da !== db) return da.localeCompare(db);
    return a.title.localeCompare(b.title, "he");
  });
}

export function taskCounts(tasks: Task[], today = todayKey()) {
  let open = 0;
  let overdue = 0;
  let todayCount = 0;
  let done = 0;
  for (const task of tasks) {
    const kind = taskDueKind(task, today);
    if (kind === "done") done += 1;
    else {
      open += 1;
      if (kind === "overdue") overdue += 1;
      if (kind === "today") todayCount += 1;
    }
  }
  return { all: tasks.length, open, overdue, today: todayCount, done };
}

export function isTaskViewFilter(value: string | undefined | null): value is TaskViewFilter {
  return (
    value === "open" ||
    value === "overdue" ||
    value === "today" ||
    value === "done" ||
    value === "all"
  );
}
