import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const bulkSchema = z.object({
  action: z.literal("delete"),
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
  const { error, count } = await supabase
    .from("leads")
    .delete({ count: "exact" })
    .in("id", parsed.data.ids);

  if (error) {
    console.error("leads bulk DELETE:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, deleted: count ?? parsed.data.ids.length });
}
