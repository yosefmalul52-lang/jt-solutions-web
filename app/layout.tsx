import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import "@/components/ui/button-system.css";
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
  adjustFontFallback: true,
  preload: true,
});

const googleVerification = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "").trim();

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jt-solutions.org"),
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  title: {
    default: "תשתית דיגיטלית לפניות מסודרות | JT Solutions",
    template: "%s | JT Solutions",
  },
  description:
    "JT Solutions בונה לעסקים בישראל אתר או דף נחיתה, מדידה, וואטסאפ ומעקב פניות — כדי שתדע מאיפה כל ליד הגיע ומה כדאי לשפר.",
  keywords: [
    "תשתית דיגיטלית לעסק",
    "דף נחיתה ממיר",
    "בניית אתרים לעסקים",
    "מדידת פניות",
    "סדר בלידים",
    "JT Solutions",
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
    url: "https://www.jt-solutions.org/",
    siteName: "JT Solutions",
    title: "תשתית דיגיטלית לפניות מסודרות | JT Solutions",
    description:
      "אתר, דף נחיתה, מדידה ומעקב פניות — מעטפת אחת לעסקים בישראל שרוצים סדר בלידים.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "JT Solutions — תשתית דיגיטלית לפניות מסודרות",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "תשתית דיגיטלית לפניות מסודרות | JT Solutions",
    description:
      "אתר, דף נחיתה, מדידה ומעקב פניות — מעטפת אחת לעסקים בישראל שרוצים סדר בלידים.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = { themeColor: "#F8FAFC" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he-IL" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-950">
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
