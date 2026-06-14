export const COOKIE_CONSENT_KEY = "cookie_consent";

export type CookieConsentValue = "accepted" | "declined" | null;

export function getCookieConsent(): CookieConsentValue {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function subscribeToCookieConsent(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("jt-consent-change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("jt-consent-change", handler);
    window.removeEventListener("storage", handler);
  };
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === "accepted";
}
