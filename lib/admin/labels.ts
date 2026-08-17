import type { Lead } from "@/lib/admin/types";

export const leadStatusLabels: Record<Lead["status"], string> = {
  new: "חדש",
  contacted: "נוצר קשר",
  qualified: "מתאים",
  won: "נסגר",
  lost: "לא רלוונטי",
};

export const leadSourceLabels: Record<Lead["source"], string> = {
  site: "טופס באתר",
  whatsapp: "וואטסאפ",
  referral: "המלצה",
  meta: "Meta Ads",
};

export const leadSourceColors: Record<Lead["source"], string> = {
  site: "bg-blue-600",
  whatsapp: "bg-emerald-500",
  referral: "bg-sky-500",
  meta: "bg-violet-600",
};
