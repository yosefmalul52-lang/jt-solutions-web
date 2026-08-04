import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/ui/button-system.css";
import TrackingProvider from "@/components/providers/TrackingProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ConsentGatedTracking from "@/components/analytics/ConsentGatedTracking";
import DeferredScrollProgress from "@/components/layout/DeferredScrollProgress";
import CookieConsent from "@/components/layout/CookieConsent";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import JsonLd from "@/components/seo/JsonLd";
import { getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/seo/organization";
import { cn } from "@/lib/utils";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

/** Tel Aviv Brutalist Bold — section / hero headers */
const telAvivDisplay = localFont({
  src: [
    {
      path: "./fonts/tel-aviv/telaviv-brutalistbold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tel-aviv",
  display: "swap",
  preload: true,
});

const googleVerification = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "").trim();

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jt-solutions.org"),
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  title: {
    default: "בניית אתר לעסק | JT Solutions",
    template: "%s | JT Solutions",
  },
  description:
    "בניית אתרים, דפי נחיתה ומעקב לידים לעסקים בישראל — אתר או דף נחיתה, מדידה, וואטסאפ, CRM ואוטומציות במעטפת אחת. אבחון חינם.",
  keywords: [
    "בניית אתרים לעסקים",
    "דף נחיתה",
    "בניית אתרים",
    "מעקב לידים",
    "מדידת פניות",
    "אתר לעסק",
    "JT Solutions",
  ],
  alternates: {
    canonical: "https://www.jt-solutions.org/",
  },
  robots: {
    index: true,
    follow: true,
  },
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
    title: "בניית אתר לעסק | JT Solutions",
    description:
      "בניית אתרים, דפי נחיתה ומעקב לידים — מעטפת אחת לעסקים בישראל שרוצים סדר בפניות.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "JT Solutions — בניית אתר לעסק",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "בניית אתר לעסק | JT Solutions",
    description:
      "בניית אתרים, דפי נחיתה ומעקב לידים — מעטפת אחת לעסקים בישראל שרוצים סדר בפניות.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = { themeColor: "#F8FAFC" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he-IL"
      dir="rtl"
      className={cn("h-full antialiased font-sans", heebo.variable, telAvivDisplay.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-950">
        <SmoothScroll>
          <DeferredScrollProgress />
          <TrackingProvider>{children}</TrackingProvider>
          <CookieConsent />
          <ConsentGatedTracking />
          <FloatingWhatsApp />
          <JsonLd data={[getOrganizationJsonLd(), getWebSiteJsonLd()]} />
        </SmoothScroll>
      </body>
    </html>
  );
}
