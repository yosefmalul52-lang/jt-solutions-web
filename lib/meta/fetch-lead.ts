import { parseMetaLeadFieldData } from "@/lib/meta/parse-lead-fields";

export type MetaLeadgenPayload = {
  leadgenId: string;
  formId?: string;
  adId?: string;
  adgroupId?: string;
  createdTime?: number;
};

type MetaGraphLeadResponse = {
  id?: string;
  created_time?: string;
  field_data?: Array<{ name: string; values: string[] }>;
  error?: { message: string; type: string; code: number };
};

export type FetchedMetaLead = {
  leadgenId: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  notes: string | null;
};

const GRAPH_VERSION = "v21.0";

function buildNotes(payload: MetaLeadgenPayload, extraNotes: string[]): string | null {
  const parts: string[] = [];

  if (payload.formId) parts.push(`טופס Meta: ${payload.formId}`);
  if (payload.adId) parts.push(`מודעה: ${payload.adId}`);
  if (payload.adgroupId) parts.push(`קבוצת מודעות: ${payload.adgroupId}`);
  if (payload.createdTime) {
    parts.push(`נוצר ב-Meta: ${new Date(payload.createdTime * 1000).toISOString()}`);
  }

  parts.push(...extraNotes);

  return parts.length > 0 ? parts.join("\n") : null;
}

export async function fetchMetaLead(
  payload: MetaLeadgenPayload,
  pageAccessToken: string,
): Promise<FetchedMetaLead | null> {
  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${payload.leadgenId}`);
  url.searchParams.set("access_token", pageAccessToken);
  url.searchParams.set("fields", "created_time,field_data");

  const response = await fetch(url, { method: "GET", cache: "no-store" });
  const data = (await response.json()) as MetaGraphLeadResponse;

  if (!response.ok || data.error) {
    console.error("Meta Graph API lead fetch failed:", data.error ?? response.status);
    return null;
  }

  const parsed = parseMetaLeadFieldData(data.field_data ?? []);

  return {
    leadgenId: payload.leadgenId,
    name: parsed.name,
    phone: parsed.phone,
    email: parsed.email,
    service: parsed.service,
    notes: buildNotes(payload, parsed.extraNotes),
  };
}
