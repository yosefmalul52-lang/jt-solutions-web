"use client";

import type { ReactNode } from "react";
import { Copy, Phone, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopiedToast, useCopiedToast } from "@/components/admin/copied-toast";
import { leadSourceLabels, leadStatusLabels } from "@/lib/admin/labels";
import { LeadLostReasonNote } from "@/components/admin/lead-lost-reason-note";
import { telHref, whatsappHref } from "@/lib/admin/phone";
import { leadStatusChip } from "@/lib/admin/status-styles";
import type { Lead } from "@/lib/admin/types";
import { cn } from "@/lib/utils";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

type LeadDetailDialogProps = {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
};

function DetailRow({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-1 border-b border-slate-100 py-3 last:border-0", className)}>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="text-sm text-slate-900">{children}</dd>
    </div>
  );
}

export function LeadDetailDialog({ lead, open, onClose }: LeadDetailDialogProps) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  const { open: copiedOpen, showCopied } = useCopiedToast();

  if (!open || !lead) return null;

  const wa = whatsappHref(
    lead.phone,
    `היי ${lead.name}, כאן יוסף מ-JT Solutions. ראיתי את הפנייה שלך לגבי ${lead.service}.`,
  );
  const tel = telHref(lead.phone);

  const copySummary = async () => {
    const text = [
      `ליד: ${lead.name}`,
      `טלפון: ${lead.phone}`,
      lead.email ? `אימייל: ${lead.email}` : null,
      `שירות: ${lead.service}`,
      `מקור: ${leadSourceLabels[lead.source]}`,
      `סטטוס: ${leadStatusLabels[lead.status]}`,
      lead.lostReason ? `סיבת אי-רלוונטיות: ${lead.lostReason}` : null,
      `תאריך: ${new Date(lead.createdAt).toLocaleString("he-IL")}`,
      lead.notes ? `הערות:\n${lead.notes}` : null,
      bookingUrl ? `קביעת שיחה: ${bookingUrl}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    await navigator.clipboard.writeText(text);
    showCopied();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-detail-title"
        className="flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="min-w-0 flex-1">
            <h2 id="lead-detail-title" className="text-lg font-semibold text-slate-900">
              {lead.name}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {new Date(lead.createdAt).toLocaleString("he-IL")}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-slate-600"
            aria-label="סגור"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </div>

        {lead.status === "lost" ? (
          <div className="shrink-0 px-5 pb-3">
            <LeadLostReasonNote reason={lead.lostReason} variant="card" />
          </div>
        ) : null}

        <div className="min-h-0 flex-1 admin-scroll px-5">
          <dl>
            <DetailRow label="טלפון">
              <span dir="ltr" className="inline-block font-medium">
                {lead.phone}
              </span>
            </DetailRow>
            <DetailRow label="אימייל">
              {lead.email ? (
                <a href={`mailto:${lead.email}`} className="text-[#1e3a8a] hover:underline">
                  {lead.email}
                </a>
              ) : (
                <span className="text-slate-500">—</span>
              )}
            </DetailRow>
            <DetailRow label="שירות / עניין">
              <p className="whitespace-pre-wrap break-words">{lead.service}</p>
            </DetailRow>
            <DetailRow label="מקור">
              {leadSourceLabels[lead.source]}
            </DetailRow>
            <DetailRow label="סטטוס">
              <Badge
                variant="outline"
                className={cn("rounded-md border font-bold", leadStatusChip[lead.status])}
              >
                {leadStatusLabels[lead.status]}
              </Badge>
            </DetailRow>
            {lead.notes ? (
              <DetailRow label="הערות">
                <p className="whitespace-pre-wrap break-words text-slate-800">{lead.notes}</p>
              </DetailRow>
            ) : null}
          </dl>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 border-t border-slate-100 px-5 py-4">
          {wa ? (
            <Button asChild size="sm" variant="outline" className="gap-1.5">
              <a href={wa} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="size-4 text-emerald-600" />
                וואטסאפ
              </a>
            </Button>
          ) : null}
          {tel ? (
            <Button asChild size="sm" variant="outline" className="gap-1.5">
              <a href={tel}>
                <Phone className="size-4" />
                התקשר
              </a>
            </Button>
          ) : null}
          <Button type="button" size="sm" variant="outline" className="gap-1.5" onClick={() => void copySummary()}>
            <Copy className="size-4" />
            העתק סיכום
          </Button>
        </div>
      </div>
      <CopiedToast open={copiedOpen} />
    </div>
  );
}
