import type { LeadStatus } from "@/lib/admin/types";

/** Google Sheets–style chips: light fill + bold label color */
export const leadStatusChip: Record<LeadStatus, string> = {
  new: "bg-[#cfe2f3] text-[#0b5394] border-[#a4c2f4]",
  contacted: "bg-[#d0e0e3] text-[#0d6e6e] border-[#a2c4c9]",
  qualified: "bg-[#d9d2e9] text-[#351c75] border-[#b4a7d6]",
  won: "bg-[#d9ead3] text-[#274e13] border-[#b6d7a8]",
  lost: "bg-[#eeeeee] text-[#666666] border-[#cccccc]",
};

export const leadStatusDot: Record<LeadStatus, string> = {
  new: "bg-[#0b5394]",
  contacted: "bg-[#0d6e6e]",
  qualified: "bg-[#351c75]",
  won: "bg-[#274e13]",
  lost: "bg-[#666666]",
};

export const leadStatusChipClass =
  "border font-bold shadow-none hover:brightness-[0.98]";

/** Status summary cards on leads page */
export const leadStatusCard: Record<
  LeadStatus,
  { active: string; ink: string; muted: string; dot: string }
> = {
  new: {
    active: "border-[#0b5394] bg-[#cfe2f3] ring-2 ring-[#0b5394]/25",
    ink: "text-[#0b5394]",
    muted: "text-[#0b5394]/80",
    dot: "bg-[#0b5394]",
  },
  contacted: {
    active: "border-[#0d6e6e] bg-[#d0e0e3] ring-2 ring-[#0d6e6e]/25",
    ink: "text-[#0d6e6e]",
    muted: "text-[#0d6e6e]/80",
    dot: "bg-[#0d6e6e]",
  },
  qualified: {
    active: "border-[#351c75] bg-[#d9d2e9] ring-2 ring-[#351c75]/25",
    ink: "text-[#351c75]",
    muted: "text-[#351c75]/80",
    dot: "bg-[#351c75]",
  },
  won: {
    active: "border-[#274e13] bg-[#d9ead3] ring-2 ring-[#274e13]/25",
    ink: "text-[#274e13]",
    muted: "text-[#274e13]/80",
    dot: "bg-[#274e13]",
  },
  lost: {
    active: "border-[#666666] bg-[#eeeeee] ring-2 ring-[#666666]/20",
    ink: "text-[#666666]",
    muted: "text-[#666666]/80",
    dot: "bg-[#666666]",
  },
};

export const LEAD_STATUS_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
];
