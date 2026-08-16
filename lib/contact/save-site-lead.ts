import type { ContactApiPayload } from "@/lib/validation/contact";
import { getSupabaseAdmin, hasServiceRole, isSupabaseConfigured } from "@/lib/supabase/admin";

export type SaveSiteLeadResult =
  | { ok: true; leadId: string }
  | { ok: false; error: string };

function buildLeadNotes(payload: ContactApiPayload): string | null {
  const parts: string[] = [];

  if (payload.message?.trim()) {
    parts.push(payload.message.trim());
  }

  if (payload.pagePath?.trim()) {
    parts.push(`עמוד מקור: ${payload.pagePath.trim()}`);
  }

  if (payload.submittedAt) {
    parts.push(`נשלח: ${payload.submittedAt}`);
  }

  return parts.length > 0 ? parts.join("\n\n") : null;
}

export async function saveSiteLeadToCrm(payload: ContactApiPayload): Promise<SaveSiteLeadResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured" };
  }

  const supabase = getSupabaseAdmin();
  const notes = buildLeadNotes(payload);

  try {
    if (hasServiceRole()) {
      const { data: lead, error: leadError } = await supabase
        .from("leads")
        .insert({
          name: payload.name,
          phone: payload.phone,
          email: payload.email ?? null,
          service: payload.service,
          source: "site",
          status: "new",
          notes,
          page_path: payload.pagePath ?? null,
        })
        .select("id")
        .single();

      if (leadError || !lead?.id) {
        console.error("Supabase lead insert failed:", leadError);
        return { ok: false, error: leadError?.message ?? "Lead insert failed" };
      }

      const due = new Date();
      due.setDate(due.getDate() + 1);
      const { error: taskError } = await supabase.from("tasks").insert({
        title: "שיחת אבחון",
        lead_id: lead.id,
        due_date: due.toISOString().slice(0, 10),
        done: false,
      });

      if (taskError) {
        console.error("Supabase follow-up task insert failed:", taskError);
      }

      return { ok: true, leadId: lead.id };
    }

    const { data: leadId, error: rpcError } = await supabase.rpc("submit_site_lead", {
      p_name: payload.name,
      p_phone: payload.phone,
      p_email: payload.email ?? null,
      p_service: payload.service,
      p_notes: notes,
      p_page_path: payload.pagePath ?? null,
    });

    if (rpcError || !leadId) {
      console.error("Supabase submit_site_lead failed:", rpcError);
      return { ok: false, error: rpcError?.message ?? "submit_site_lead failed" };
    }

    return { ok: true, leadId: String(leadId) };
  } catch (error) {
    console.error("Supabase lead save error:", error);
    return { ok: false, error: error instanceof Error ? error.message : "Unknown database error" };
  }
}
