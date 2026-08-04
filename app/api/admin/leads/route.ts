import { NextResponse } from "next/server";
import { z } from "zod";
import { parseImportDate } from "@/lib/admin/csv";
import { mapLeadRow } from "@/lib/admin/mappers";
import { getSupabaseAdmin, isSupabaseConfigured, type LeadRow } from "@/lib/supabase/admin";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/validation/contact";

export const runtime = "nodejs";

const createLeadSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.preprocess(
    (value) => (typeof value === "string" ? normalizeIsraeliPhone(value) : value),
    z.string().refine(isValidIsraeliPhone),
  ),
  email: z.string().trim().email().optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  service: z.string().trim().min(2),
  source: z.enum(["site", "whatsapp", "referral"]).default("whatsapp"),
  notes: z.string().trim().max(2000).optional(),
  createdAt: z.string().trim().optional(),
  createFollowUpTask: z.boolean().optional().default(true),
});

export async function GET(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.trim().toLowerCase();

  const supabase = getSupabaseAdmin();
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (status && status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    console.error("leads GET:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  let leads = (data as LeadRow[]).map(mapLeadRow);
  if (q) {
    leads = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.service.toLowerCase().includes(q) ||
        (lead.email?.toLowerCase().includes(q) ?? false),
    );
  }

  return NextResponse.json({ success: true, leads });
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const raw = await req.json().catch(() => null);
  const parsed = createLeadSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "נתונים לא תקינים";
    return NextResponse.json(
      { success: false, error: first === "Invalid input" ? "בדוק שם, טלפון ושירות" : first },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  const supabase = getSupabaseAdmin();

  let created_at: string | undefined;
  if (payload.createdAt?.trim()) {
    const parsedDate = parseImportDate(payload.createdAt);
    if (!parsedDate) {
      return NextResponse.json({ success: false, error: "תאריך לא תקין" }, { status: 400 });
    }
    created_at = parsedDate;
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: payload.name,
      phone: payload.phone,
      email: payload.email ?? null,
      service: payload.service,
      source: payload.source,
      status: "new",
      notes: payload.notes ?? null,
      ...(created_at ? { created_at } : {}),
    })
    .select("*")
    .single();

  if (error || !data) {
    console.error("leads POST:", error);
    return NextResponse.json({ success: false, error: error?.message ?? "שגיאה" }, { status: 500 });
  }

  if (payload.createFollowUpTask) {
    const due = new Date();
    due.setDate(due.getDate() + 1);
    await supabase.from("tasks").insert({
      title: "שיחת אבחון",
      lead_id: data.id,
      due_date: due.toISOString().slice(0, 10),
      done: false,
    });
  }

  return NextResponse.json({ success: true, lead: mapLeadRow(data as LeadRow) }, { status: 201 });
}
