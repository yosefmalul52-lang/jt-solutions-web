import type { Lead, Task } from "@/lib/admin/types";
import type { LeadRow, TaskRow } from "@/lib/supabase/admin";

export function mapLeadRow(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    service: row.service,
    source: row.source,
    status: row.status,
    createdAt: row.created_at,
    notes: row.notes ?? undefined,
    lostReason: row.lost_reason ?? undefined,
  };
}

export function mapTaskRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    leadName: row.leads?.name ?? "ללא ליד",
    leadId: row.lead_id ?? undefined,
    dueDate: row.due_date,
    done: row.done,
  };
}
