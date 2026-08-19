"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LeadLostReasonDialogProps = {
  open: boolean;
  leadName: string;
  loading?: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
};

export function LeadLostReasonDialog({
  open,
  leadName,
  loading = false,
  onConfirm,
  onCancel,
}: LeadLostReasonDialogProps) {
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (open) setReason("");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 p-4"
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lost-reason-title"
        aria-describedby="lost-reason-desc"
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-lg"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="lost-reason-title" className="text-base font-semibold text-slate-900">
          סימון כלא רלוונטי
        </h2>
        <p id="lost-reason-desc" className="mt-2 text-sm text-slate-600">
          {leadName} יסומן כלא רלוונטי. אפשר להוסיף סיבה קצרה לעיון עתידי.
        </p>
        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="lost-reason">
          סיבה (אופציונלי)
        </label>
        <textarea
          id="lost-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="לדוגמה: מחפש עבודה, מחיר גבוה מדי, לא בתחום…"
          className={cn(
            "mt-1.5 w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-slate-900 outline-none",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          )}
        />
        <p className="mt-1 text-xs text-slate-500">{reason.length}/500</p>
        <div className="mt-5 flex flex-row-reverse gap-2">
          <Button
            type="button"
            disabled={loading}
            onClick={() => onConfirm(reason.trim())}
            className="bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
          >
            {loading ? "שומר…" : "סמן כלא רלוונטי"}
          </Button>
          <Button type="button" variant="outline" disabled={loading} onClick={onCancel}>
            ביטול
          </Button>
        </div>
      </div>
    </div>
  );
}
