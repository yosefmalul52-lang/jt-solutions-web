"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "אישור",
  cancelLabel = "ביטול",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4"
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-lg"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-base font-semibold text-slate-900">
          {title}
        </h2>
        <p id="confirm-desc" className="mt-2 text-sm text-slate-600">
          {description}
        </p>
        <div className="mt-5 flex flex-row-reverse gap-2">
          <Button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={cn(
              destructive
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-[#1e3a8a] text-white hover:bg-[#1e40af]",
            )}
          >
            {loading ? "מבצע…" : confirmLabel}
          </Button>
          <Button type="button" variant="outline" disabled={loading} onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
