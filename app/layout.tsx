import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import TrackingProvider from "@/components/providers/TrackingProvider";
import ConsentGatedTracking from "@/components/analytics/ConsentGatedTracking";
import DeferredScrollProgress from "@/components/layout/DeferredScrollProgress";
import CookieConsent from "@/components/layout/CookieConsent";
import EqualWeb from "@/components/accessibility/EqualWeb";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import JsonLd from "@/components/seo/JsonLd";
import { getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/seo/organization";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const googleVerification = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "").trim();

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jt-solutions.org"),
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  title: {
    default: "JT Solutions | סוכנות דיגיטל ופיתוח",
    template: "%s | JT Solutions",
  },
  description:
    "פתרונות דיגיטל מקצה לקצה לעסקים: מאפיון ומיתוג, דרך פיתוח אתרי תדמית וחנויות איקומרס, ועד אוטומציות וניהול קמפיינים.",
  keywords: [
    "סוכנות דיגיטל",
    "פיתוח אתרים",
    "מיתוג",
    "שיווק דיגיטלי",
    "דפי נחיתה",
    "אתרי תדמית",
    "בוט וואטסאפ",
    "אוטומציה לעסקים",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: "JT Solutions",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "JT Solutions - השותף הטכנולוגי שלך בדיגיטל",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JT Solutions | סוכנות דיגיטל ופיתוח",
    description:
      "פתרונות דיגיטל מקצה לקצה לעסקים: מאפיון ומיתוג, דרך פיתוח אתרי תדמית וחנויות איקומרס, ועד אוטומציות וניהול קמפיינים.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = { themeColor: "#F9FAFB" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he-IL" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F9FAFB] text-gray-900">
        <DeferredScrollProgress />
        <TrackingProvider>{children}</TrackingProvider>
        <CookieConsent />
        <ConsentGatedTracking />
        <FloatingWhatsApp />
        <EqualWeb />
        <JsonLd data={[getOrganizationJsonLd(), getWebSiteJsonLd()]} />
      </body>
    </html>
  );
}
