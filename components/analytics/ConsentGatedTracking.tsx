"use client";

import { Suspense, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import MetaPixel from "@/components/analytics/MetaPixel";
import { useAnalyticsConsent } from "@/hooks/useCookieConsent";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();
const hasValidGaId = /^G-[A-Z0-9]+$/i.test(gaId);
const gtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();
const jtPixelSrc = (process.env.NEXT_PUBLIC_JT_PIXEL_SRC ?? "").trim();
const jtPixelId = (process.env.NEXT_PUBLIC_JT_PIXEL_ID ?? "").trim();

function loadGtm() {
  if (typeof window === "undefined" || !gtmId) return;
  if (document.querySelector(`script[data-jt-gtm="${gtmId}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const gtmScript = document.createElement("script");
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  gtmScript.dataset.jtGtm = gtmId;
  document.head.appendChild(gtmScript);
}

export default function ConsentGatedTracking() {
  const hasConsent = useAnalyticsConsent();

  useEffect(() => {
    if (!hasConsent) return;
    loadGtm();
  }, [hasConsent]);

  if (!hasConsent) return null;

  return (
    <>
      {hasValidGaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {jtPixelSrc && jtPixelId ? (
        <Script
          id="jt-analytics-pixel"
          src={jtPixelSrc}
          strategy="afterInteractive"
          data-jt-id={jtPixelId}
        />
      ) : null}
      <Suspense fallback={null}>
        <MetaPixel />
      </Suspense>
    </>
  );
}
