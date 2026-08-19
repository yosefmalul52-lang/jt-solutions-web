"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TOAST_MS = 2000;

export function useCopiedToast() {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    };
  }, []);

  const showCopied = React.useCallback(() => {
    if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
    setOpen(true);
    timerRef.current = window.setTimeout(() => setOpen(false), TOAST_MS);
  }, []);

  return { open, showCopied };
}

type CopiedToastProps = {
  open: boolean;
  message?: string;
  className?: string;
};

export function CopiedToast({
  open,
  message = "הועתק ללוח",
  className,
}: CopiedToastProps) {
  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-5 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 shadow-lg",
        className,
      )}
      dir="rtl"
    >
      <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Check className="size-3.5" aria-hidden />
      </span>
      {message}
    </div>
  );
}
