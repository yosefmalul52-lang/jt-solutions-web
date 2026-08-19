"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BulkSelectionBarProps = {
  open: boolean;
  count: number;
  label: string;
  children: ReactNode;
  tone?: "default" | "danger";
  className?: string;
};

export function BulkSelectionBar({
  open,
  count,
  label,
  children,
  tone = "default",
  className,
}: BulkSelectionBarProps) {
  return (
    <div className={cn("mb-2 h-9 shrink-0", className)} aria-live="polite">
      <div
        className={cn(
          "flex h-full items-center gap-2 rounded-md border px-2.5 transition-opacity duration-150",
          tone === "danger"
            ? "border-red-100 bg-red-50"
            : "border-slate-200 bg-slate-50",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <span
          className={cn(
            "shrink-0 text-xs font-medium",
            tone === "danger" ? "text-red-800" : "text-slate-700",
          )}
        >
          {count} {label}
        </span>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{children}</div>
      </div>
    </div>
  );
}
