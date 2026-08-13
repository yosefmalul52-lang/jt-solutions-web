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
