import { NextResponse } from "next/server";
import { z } from "zod";
import { mapLeadRow } from "@/lib/admin/mappers";
import { getSupabaseAdmin, isSupabaseConfigured, type LeadRow } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const patchSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "won", "lost"]).optional(),
  notes: z.string().trim().max(2000).optional().nullable(),
  name: z.string().trim().min(2).optional(),
  service: z.string().trim().min(2).optional(),
});

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const { id } = await ctx.params;
  const raw = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "נתונים לא תקינים" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  if (parsed.data.status !== undefined) updates.status = parsed.data.status;
  if (parsed.data.notes !== undefined) updates.notes = parsed.data.notes;
  if (parsed.data.name !== undefined) updates.name = parsed.data.name;
  if (parsed.data.service !== undefined) updates.service = parsed.data.service;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    console.error("leads PATCH:", error);
    return NextResponse.json({ success: false, error: error?.message ?? "שגיאה" }, { status: 500 });
  }

  return NextResponse.json({ success: true, lead: mapLeadRow(data as LeadRow) });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const { id } = await ctx.params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    console.error("leads DELETE:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
