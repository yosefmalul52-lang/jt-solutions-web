import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  source: "site" | "whatsapp" | "referral";
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  notes: string | null;
  page_path: string | null;
  created_at: string;
  updated_at: string;
};

export type TaskRow = {
  id: string;
  title: string;
  lead_id: string | null;
  due_date: string;
  done: boolean;
  created_at: string;
  updated_at: string;
  leads?: { name: string } | null;
};

let cached: SupabaseClient | null = null;

/** Server-only Supabase client. Prefer service role; anon cannot read/write tables after RLS lockdown. */
export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase URL or key (SUPABASE_SERVICE_ROLE_KEY / SUPABASE_ANON_KEY)");
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NODE_ENV === "production") {
    console.warn(
      "[supabase] SUPABASE_SERVICE_ROLE_KEY missing - admin table access will fail; contact uses submit_site_lead RPC only.",
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY;
  return Boolean(url && key);
}

export function hasServiceRole(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}
