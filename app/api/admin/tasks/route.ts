import { NextResponse } from "next/server";
import { z } from "zod";
import { mapTaskRow } from "@/lib/admin/mappers";
import { getSupabaseAdmin, isSupabaseConfigured, type TaskRow } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const createTaskSchema = z.object({
  title: z.string().trim().min(2),
  leadId: z.string().uuid().optional().nullable(),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("tasks")
    .select("*, leads(name)")
    .order("due_date", { ascending: true });

  if (error) {
    console.error("tasks GET:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    tasks: (data as TaskRow[]).map(mapTaskRow),
  });
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const raw = await req.json().catch(() => null);
  const parsed = createTaskSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "נתונים לא תקינים" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: parsed.data.title,
      lead_id: parsed.data.leadId ?? null,
      due_date: parsed.data.dueDate,
      done: false,
    })
    .select("*, leads(name)")
    .single();

  if (error || !data) {
    console.error("tasks POST:", error);
    return NextResponse.json({ success: false, error: error?.message ?? "שגיאה" }, { status: 500 });
  }

  return NextResponse.json({ success: true, task: mapTaskRow(data as TaskRow) }, { status: 201 });
}
