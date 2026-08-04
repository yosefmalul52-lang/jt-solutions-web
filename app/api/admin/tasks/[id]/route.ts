import { NextResponse } from "next/server";
import { z } from "zod";
import { mapTaskRow } from "@/lib/admin/mappers";
import { getSupabaseAdmin, isSupabaseConfigured, type TaskRow } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const patchSchema = z.object({
  done: z.boolean().optional(),
  title: z.string().trim().min(2).optional(),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
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
  if (parsed.data.done !== undefined) updates.done = parsed.data.done;
  if (parsed.data.title !== undefined) updates.title = parsed.data.title;
  if (parsed.data.dueDate !== undefined) updates.due_date = parsed.data.dueDate;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select("*, leads(name)")
    .single();

  if (error || !data) {
    console.error("tasks PATCH:", error);
    return NextResponse.json({ success: false, error: error?.message ?? "שגיאה" }, { status: 500 });
  }

  return NextResponse.json({ success: true, task: mapTaskRow(data as TaskRow) });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const { id } = await ctx.params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error("tasks DELETE:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
