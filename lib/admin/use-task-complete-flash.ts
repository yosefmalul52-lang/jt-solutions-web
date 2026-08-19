"use client";

import * as React from "react";
import { playTaskCompleteSound } from "@/lib/admin/task-sound";
import {
  TASK_COMPLETE_POP_MS,
  TASK_COMPLETE_STAGGER_MS,
} from "@/lib/admin/task-complete-animation";
import type { Task } from "@/lib/admin/types";

type FlashOptions = {
  silent?: boolean;
  delayMs?: number;
};

export function useTaskCompleteFlash(tasks: Task[]) {
  /** Optimistic "done" until server data confirms or row is removed */
  const [completing, setCompleting] = React.useState<Set<string>>(new Set());
  /** Short pop/flash animation window only */
  const [popping, setPopping] = React.useState<Set<string>>(new Set());
  const popTimersRef = React.useRef<Map<string, number>>(new Map());

  React.useEffect(() => {
    const timers = popTimersRef.current;
    return () => {
      for (const id of timers.values()) window.clearTimeout(id);
      timers.clear();
    };
  }, []);

  React.useEffect(() => {
    setCompleting((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set(prev);
      let changed = false;
      for (const id of prev) {
        const task = tasks.find((t) => t.id === id);
        if (!task || task.done) {
          next.delete(id);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [tasks]);

  const clearFlash = React.useCallback((id: string) => {
    const timer = popTimersRef.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      popTimersRef.current.delete(id);
    }
    setCompleting((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setPopping((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const flashDone = React.useCallback((id: string, options?: FlashOptions) => {
    const delayMs = options?.delayMs ?? 0;

    const start = () => {
      if (!options?.silent) playTaskCompleteSound();

      setCompleting((prev) => new Set(prev).add(id));
      setPopping((prev) => new Set(prev).add(id));

      const existing = popTimersRef.current.get(id);
      if (existing !== undefined) window.clearTimeout(existing);

      const timer = window.setTimeout(() => {
        popTimersRef.current.delete(id);
        setPopping((prev) => {
          if (!prev.has(id)) return prev;
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, TASK_COMPLETE_POP_MS);

      popTimersRef.current.set(id, timer);
    };

    if (delayMs > 0) {
      window.setTimeout(start, delayMs);
    } else {
      start();
    }
  }, []);

  const flashMany = React.useCallback(
    (ids: string[], options?: { silent?: boolean }) => {
      if (!ids.length) return;
      if (!options?.silent) playTaskCompleteSound();
      ids.forEach((id, index) => {
        flashDone(id, {
          silent: true,
          delayMs: index * TASK_COMPLETE_STAGGER_MS,
        });
      });
    },
    [flashDone],
  );

  return { completing, popping, flashDone, flashMany, clearFlash };
}
