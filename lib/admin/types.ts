export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type LeadSource = "site" | "whatsapp" | "referral" | "meta";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
  lostReason?: string;
};

export type Task = {
  id: string;
  title: string;
  leadName: string;
  leadId?: string;
  dueDate: string;
  done: boolean;
};

export type LeadSourceStat = {
  name: string;
  count: number;
  share: string;
  color: string;
};

export type ChartPoint = {
  day: string;
  value: number;
};

export type StatItem = {
  label: string;
  value: string;
  detail: string;
  /** Full-card tint + border */
  surface: string;
  /** Circular icon chip */
  chip: string;
  /** Label / primary ink on tinted surface */
  ink: string;
  /** Supporting detail on tinted surface */
  muted: string;
  icon: "inbox" | "phone" | "list" | "clock";
};
