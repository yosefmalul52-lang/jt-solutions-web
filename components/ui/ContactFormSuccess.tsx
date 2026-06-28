"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { contactFormCopy } from "@/lib/contact-form-copy";
import {
  getPostLeadWhatsAppUrl,
  serviceRelatedLinks,
} from "@/lib/contact/service-prefill";
import { trackWhatsAppClickPostLead, type LeadFormLocation } from "@/lib/analytics/lead-form";
import type { ContactPayload } from "@/lib/validation/contact";

type ContactFormSuccessProps = {
  formLocation: LeadFormLocation;
  service?: ContactPayload["service"];
  variant?: "section" | "card" | "glass" | "compact";
};

export default function ContactFormSuccess({
  formLocation,
  service,
  variant = "section",
}: ContactFormSuccessProps) {
  const relatedLink =
    service && service in serviceRelatedLinks
      ? serviceRelatedLinks[service as keyof typeof serviceRelatedLinks]
      : null;
  const isGlass = variant === "glass";
  const isSection = variant === "section";
  const isCompact = variant === "compact";
  const whatsappUrl = getPostLeadWhatsAppUrl();

  if (isCompact) {
    return (
      <div className="home-final-cta-form__success" dir="rtl">
        <div className="home-final-cta-form__success-icon" aria-hidden>
          <Check size={18} strokeWidth={2.5} />
        </div>
        <h3>{contactFormCopy.successTitle}</h3>
        <p>{contactFormCopy.successMessage}</p>
        <CtaButton
          href={whatsappUrl}
          variant="whatsapp"
          size="sm"
          shine
          className="mt-4"
          onClick={() => trackWhatsAppClickPostLead(formLocation)}
          label="המשך ב-WhatsApp"
          hideIcon
        />
      </div>
    );
  }

  const boxClass = isGlass
    ? "rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-5 py-6 sm:px-6 sm:py-7 text-center"
    : isSection
      ? "rounded-2xl border border-emerald-200 bg-emerald-50/90 px-5 py-6 sm:px-6 sm:py-7 text-center"
      : "rounded-2xl border border-emerald-200 bg-emerald-50/90 px-4 py-5 text-center";

  return (
    <div className={boxClass} dir="rtl">
      <h3
        className={`text-lg sm:text-xl font-extrabold ${isGlass ? "text-emerald-300" : "text-emerald-800"}`}
      >
        {contactFormCopy.successTitle}
      </h3>
      <p
        className={`mt-3 text-sm sm:text-base leading-relaxed ${isGlass ? "text-emerald-200/90" : "text-emerald-700"}`}
      >
        {contactFormCopy.successMessage}
      </p>

      <CtaButton
        href={whatsappUrl}
        variant="whatsapp"
        shine
        fullWidth
        className="mt-5 sm:w-auto"
        onClick={() => trackWhatsAppClickPostLead(formLocation)}
        label="להמשך מהיר ב-WhatsApp"
        hideIcon
      />

      <p className={`mt-5 text-xs sm:text-sm leading-relaxed ${isGlass ? "text-slate-400" : "text-slate-600"}`}>
        בינתיים אפשר לצפות בפרויקטים דומים או לבדוק את עמודי השירות.
      </p>

      {relatedLink ? (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={relatedLink.href}
            className={`text-sm font-semibold hover:underline ${isGlass ? "text-cyan-300 hover:text-cyan-200" : "text-indigo-700 hover:text-indigo-900"}`}
          >
            {relatedLink.label}
          </Link>
          <span className={`hidden sm:inline ${isGlass ? "text-white/20" : "text-slate-300"}`} aria-hidden>
            |
          </span>
          <Link
            href="/services"
            className={`text-sm font-semibold hover:underline ${isGlass ? "text-slate-300 hover:text-slate-100" : "text-slate-600 hover:text-slate-900"}`}
          >
            כל השירותים
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          <Link
            href="/projects"
            className={`text-sm font-semibold hover:underline ${isGlass ? "text-cyan-300 hover:text-cyan-200" : "text-indigo-700 hover:text-indigo-900"}`}
          >
            לצפייה בפרויקטים
          </Link>
        </div>
      )}
    </div>
  );
}
