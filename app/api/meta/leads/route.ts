import { NextResponse } from "next/server";
import { saveMetaLeadToCrm } from "@/lib/contact/save-meta-lead";
import { getMetaConfig } from "@/lib/meta/config";
import { fetchMetaLead, type MetaLeadgenPayload } from "@/lib/meta/fetch-lead";
import { verifyMetaWebhookSignature } from "@/lib/meta/verify";

export const runtime = "nodejs";

type LeadgenChangeValue = {
  leadgen_id?: string;
  page_id?: string;
  form_id?: string;
  ad_id?: string;
  adgroup_id?: string;
  created_time?: number;
};

type MetaWebhookBody = {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{
      field?: string;
      value?: LeadgenChangeValue;
    }>;
  }>;
};

function collectLeadgenPayloads(body: MetaWebhookBody, expectedPageId: string): MetaLeadgenPayload[] {
  const payloads: MetaLeadgenPayload[] = [];

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "leadgen") continue;

      const value = change.value;
      const leadgenId = value?.leadgen_id;
      if (!leadgenId) continue;

      const pageId = value.page_id ?? entry.id;
      if (pageId && pageId !== expectedPageId) {
        console.warn(`Ignoring Meta leadgen for unexpected page ${pageId}`);
        continue;
      }

      payloads.push({
        leadgenId,
        formId: value.form_id,
        adId: value.ad_id,
        adgroupId: value.adgroup_id,
        createdTime: value.created_time,
      });
    }
  }

  return payloads;
}

export async function GET(req: Request) {
  const config = getMetaConfig();
  if (!config) {
    return NextResponse.json({ error: "Meta webhook is not configured" }, { status: 503 });
  }

  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === config.verifyToken && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

export async function POST(req: Request) {
  const config = getMetaConfig();
  if (!config) {
    return NextResponse.json({ error: "Meta webhook is not configured" }, { status: 503 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256");

  if (!verifyMetaWebhookSignature(rawBody, signature, config.appSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  let body: MetaWebhookBody;
  try {
    body = JSON.parse(rawBody) as MetaWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.object !== "page") {
    return NextResponse.json({ success: true, ignored: true });
  }

  const payloads = collectLeadgenPayloads(body, config.pageId);
  const results: Array<{ leadgenId: string; ok: boolean; duplicate?: boolean; error?: string }> = [];

  for (const payload of payloads) {
    const fetched = await fetchMetaLead(payload, config.pageAccessToken);
    if (!fetched) {
      results.push({ leadgenId: payload.leadgenId, ok: false, error: "fetch_failed" });
      continue;
    }

    const saved = await saveMetaLeadToCrm(fetched);
    if (!saved.ok) {
      results.push({ leadgenId: payload.leadgenId, ok: false, error: saved.error });
      continue;
    }

    results.push({
      leadgenId: payload.leadgenId,
      ok: true,
      duplicate: saved.duplicate,
    });
  }

  return NextResponse.json({ success: true, processed: results.length, results });
}
