import type { FetchedMetaLead } from "@/lib/meta/fetch-lead";
import { getSupabaseAdmin, hasServiceRole, isSupabaseConfigured } from "@/lib/supabase/admin";
import { normalizeIsraeliPhone } from "@/lib/validation/contact";

export type SaveMetaLeadResult =
  | { ok: true; leadId: string; duplicate: boolean }
  | { ok: false; error: string };

export async function saveMetaLeadToCrm(lead: FetchedMetaLead): Promise<SaveMetaLeadResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured" };
  }

  if (!hasServiceRole()) {
    return { ok: false, error: "Service role key required for Meta leads" };
  }

  if (!lead.phone.trim()) {
    return { ok: false, error: "Meta lead is missing a phone number" };
  }

  const supabase = getSupabaseAdmin();
  const phone = normalizeIsraeliPhone(lead.phone);

  const { data: existing } = await supabase
    .from("leads")
    .select("id")
    .eq("meta_leadgen_id", lead.leadgenId)
    .maybeSingle();

  if (existing?.id) {
    return { ok: true, leadId: existing.id, duplicate: true };
  }

  try {
    const { data: inserted, error: leadError } = await supabase
      .from("leads")
      .insert({
        name: lead.name,
        phone,
        email: lead.email,
        service: lead.service,
        source: "meta",
        status: "new",
        notes: lead.notes,
        page_path: null,
        meta_leadgen_id: lead.leadgenId,
      })
      .select("id")
      .single();

    if (leadError || !inserted?.id) {
      if (leadError?.code === "23505") {
        const { data: duplicateRow } = await supabase
          .from("leads")
          .select("id")
          .eq("meta_leadgen_id", lead.leadgenId)
          .maybeSingle();
        if (duplicateRow?.id) {
          return { ok: true, leadId: duplicateRow.id, duplicate: true };
        }
      }
      console.error("Meta lead insert failed:", leadError);
      return { ok: false, error: leadError?.message ?? "Lead insert failed" };
    }

    const due = new Date();
    due.setDate(due.getDate() + 1);
    const { error: taskError } = await supabase.from("tasks").insert({
      title: "שיחת אבחון",
      lead_id: inserted.id,
      due_date: due.toISOString().slice(0, 10),
      done: false,
    });

    if (taskError) {
      console.error("Meta lead follow-up task insert failed:", taskError);
    }

    return { ok: true, leadId: inserted.id, duplicate: false };
  } catch (error) {
    console.error("Meta lead save error:", error);
    return { ok: false, error: error instanceof Error ? error.message : "Unknown database error" };
  }
}
