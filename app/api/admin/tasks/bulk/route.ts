import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const bulkSchema = z.object({
  action: z.enum(["complete", "delete"]),
  ids: z.array(z.string().uuid()).min(1).max(200),
});

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const raw = await req.json().catch(() => null);
  const parsed = bulkSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "נתונים לא תקינים" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (parsed.data.action === "complete") {
    const { error, count } = await supabase
      .from("tasks")
      .update({ done: true, updated_at: new Date().toISOString() }, { count: "exact" })
      .in("id", parsed.data.ids)
      .eq("done", false);

    if (error) {
      console.error("tasks bulk complete:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: count ?? parsed.data.ids.length });
  }

  const { error, count } = await supabase
    .from("tasks")
    .delete({ count: "exact" })
    .in("id", parsed.data.ids);

  if (error) {
    console.error("tasks bulk DELETE:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, deleted: count ?? parsed.data.ids.length });
}
