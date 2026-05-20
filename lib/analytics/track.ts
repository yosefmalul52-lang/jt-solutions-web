export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}

export function trackPhoneClick(location: string) {
  trackEvent("click_phone", { location });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("click_whatsapp", { location });
}

export function trackCtaClick(location: string, label?: string) {
  trackEvent("click_cta", label ? { location, label } : { location });
}
