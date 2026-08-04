import { NextResponse } from "next/server";
import { z } from "zod";
import { leadSourceLabels, leadStatusLabels } from "@/lib/admin/labels";
import { parseImportDate } from "@/lib/admin/csv";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/validation/contact";
import type { LeadSource, LeadStatus } from "@/lib/admin/types";

export const runtime = "nodejs";

const rowSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim().min(7),
  email: z.string().trim().email().optional().or(z.literal("")),
  service: z.string().trim().optional(),
  source: z.string().trim().optional(),
  status: z.string().trim().optional(),
  createdAt: z.string().trim().optional(),
  notes: z.string().trim().max(2000).optional(),
});

const importSchema = z.object({
  rows: z.array(rowSchema).min(1).max(500),
  createFollowUpTasks: z.boolean().optional().default(false),
});

const sourceByLabel = Object.fromEntries(
  (Object.entries(leadSourceLabels) as [LeadSource, string][]).map(([k, v]) => [
    v.toLowerCase(),
    k,
  ]),
) as Record<string, LeadSource>;

const statusByLabel = Object.fromEntries(
  (Object.entries(leadStatusLabels) as [LeadStatus, string][]).map(([k, v]) => [
    v.toLowerCase(),
    k,
  ]),
) as Record<string, LeadStatus>;

function parseSource(raw?: string): LeadSource {
  if (!raw) return "whatsapp";
  const key = raw.trim().toLowerCase();
  if (key === "site" || key === "whatsapp" || key === "referral") return key;
  if (sourceByLabel[key]) return sourceByLabel[key];
  if (key.includes("whats") || key.includes("וואט")) return "whatsapp";
  if (key.includes("site") || key.includes("אתר") || key.includes("טופס")) return "site";
  if (key.includes("refer") || key.includes("המלצ")) return "referral";
  return "whatsapp";
}

function parseStatus(raw?: string): LeadStatus {
  if (!raw) return "new";
  const key = raw.trim().toLowerCase();
  if (key === "new" || key === "contacted" || key === "qualified" || key === "won" || key === "lost") {
    return key;
  }
  if (statusByLabel[key]) return statusByLabel[key];
  return "new";
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Supabase לא מוגדר" }, { status: 503 });
  }

  const raw = await req.json().catch(() => null);
  const parsed = importSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "נתונים לא תקינים (עד 500 שורות)" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  const errors: { row: number; error: string }[] = [];
  const inserts: {
    name: string;
    phone: string;
    email: string | null;
    service: string;
    source: LeadSource;
    status: LeadStatus;
    notes: string | null;
    created_at?: string;
  }[] = [];

  parsed.data.rows.forEach((row, index) => {
    const phone = normalizeIsraeliPhone(row.phone);
    if (!isValidIsraeliPhone(phone)) {
      errors.push({ row: index + 1, error: "טלפון לא תקין" });
      return;
    }

    let created_at: string | undefined;
    if (row.createdAt?.trim()) {
      const parsedDate = parseImportDate(row.createdAt);
      if (!parsedDate) {
        errors.push({ row: index + 1, error: "תאריך לא תקין" });
        return;
      }
      created_at = parsedDate;
    }

    const email = row.email?.trim() || null;
    const record = {
      name: row.name.trim(),
      phone,
      email,
      service: row.service?.trim() || "ליד מיובא",
      source: parseSource(row.source),
      status: parseStatus(row.status),
      notes: row.notes?.trim() || null,
      ...(created_at ? { created_at } : {}),
    };
    inserts.push(record);
  });

  if (inserts.length === 0) {
    return NextResponse.json(
      { success: false, error: "אין שורות תקינות לייבוא", errors },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.from("leads").insert(inserts).select("id");

  if (error) {
    console.error("leads import:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  if (parsed.data.createFollowUpTasks && data?.length) {
    const due = new Date();
    due.setDate(due.getDate() + 1);
    const dueDate = due.toISOString().slice(0, 10);
    await supabase.from("tasks").insert(
      data.map((lead) => ({
        title: "שיחת אבחון",
        lead_id: lead.id,
        due_date: dueDate,
        done: false,
      })),
    );
  }

  return NextResponse.json({
    success: true,
    imported: data?.length ?? inserts.length,
    skipped: errors.length,
    errors: errors.slice(0, 20),
  });
}
