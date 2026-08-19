import type { Lead, LeadStatus } from "@/lib/admin/types";

export function countLeadsByStatus(leads: Lead[]): Record<LeadStatus, number> {
  const counts: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    won: 0,
    lost: 0,
  };
  for (const lead of leads) counts[lead.status] += 1;
  return counts;
}
