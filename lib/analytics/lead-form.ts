import { hasAnalyticsConsent } from "@/lib/cookie-consent";
import { trackEvent } from "@/lib/analytics/track";

export type LeadFormLocation = "homepage_contact" | "contact_page";

type LeadFormEventParams = {
  service?: string;
  timeline?: string;
  budgetBand?: string;
  form_location: LeadFormLocation;
  source?: string;
  error_type?: string;
};

function trackLeadEvent(eventName: string, params: LeadFormEventParams) {
  if (!hasAnalyticsConsent()) return;
  trackEvent(eventName, {
    source: params.source ?? "website",
    form_location: params.form_location,
    ...(params.service ? { service: params.service } : {}),
    ...(params.timeline ? { timeline: params.timeline } : {}),
    ...(params.budgetBand ? { budget_band: params.budgetBand } : {}),
    ...(params.error_type ? { error_type: params.error_type } : {}),
  });
}

export function trackLeadFormSubmit(params: Omit<LeadFormEventParams, "source">) {
  trackLeadEvent("lead_form_submit", params);
}

export function trackLeadFormSuccess(params: Omit<LeadFormEventParams, "source" | "error_type">) {
  trackLeadEvent("lead_form_success", params);
}

export function trackLeadFormError(
  params: Omit<LeadFormEventParams, "source"> & { error_type: string },
) {
  trackLeadEvent("lead_form_error", params);
}

export function trackWhatsAppClickPostLead(formLocation: LeadFormLocation) {
  if (!hasAnalyticsConsent()) return;
  trackEvent("whatsapp_click_post_lead", {
    source: "website",
    form_location: formLocation,
  });
}

export function trackLeadConversion() {
  if (!hasAnalyticsConsent()) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", { currency: "ILS", value: 100 });
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
}
