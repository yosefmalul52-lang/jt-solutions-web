import { cn } from "@/lib/utils";

type LeadLostReasonNoteProps = {
  reason?: string | null;
  /** compact = table row under status; card = detail dialog callout */
  variant?: "compact" | "card";
  className?: string;
};

export function LeadLostReasonNote({
  reason,
  variant = "compact",
  className,
}: LeadLostReasonNoteProps) {
  if (!reason?.trim()) return null;

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5",
          className,
        )}
      >
        <p className="text-xs font-medium text-slate-500">סיבת אי-רלוונטיות</p>
        <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">
          {reason}
        </p>
      </div>
    );
  }

  return (
    <p
      className={cn(
        "line-clamp-2 max-w-full whitespace-normal break-words text-[11px] leading-snug text-slate-500",
        className,
      )}
      title={reason}
    >
      {reason}
    </p>
  );
}
