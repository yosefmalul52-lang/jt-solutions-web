"use client";

import { useSyncExternalStore } from "react";
import {
  COOKIE_CONSENT_KEY,
  getCookieConsent,
  subscribeToCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

function getSnapshot(): CookieConsentValue {
  return getCookieConsent();
}

export function useCookieConsent(): CookieConsentValue {
  return useSyncExternalStore(subscribeToCookieConsent, getSnapshot, () => null);
}

export function useAnalyticsConsent(): boolean {
  return useCookieConsent() === "accepted";
}

export { COOKIE_CONSENT_KEY };
