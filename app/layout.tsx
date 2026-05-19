import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Heebo } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import TrackingProvider from "@/components/providers/TrackingProvider";
import JtPixel from "@/components/analytics/JtPixel";
import MetaPixel from "@/components/analytics/MetaPixel";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CookieConsent from "@/components/layout/CookieConsent";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jt-solutions.org"),
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
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
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
  const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();
  const hasValidGaId = /^G-[A-Z0-9]+$/i.test(gaId);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "JT Solutions",
    url: "https://www.jt-solutions.org",
    logo: "https://www.jt-solutions.org/logo.png",
    image: "https://www.jt-solutions.org/logo.png",
    telephone: "0528240230",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kiryat Ata",
      addressCountry: "IL",
    },
  };

  return (
    <html lang="he-IL" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <head>
        <JtPixel />
      </head>
      <body className="min-h-full flex flex-col bg-[#F9FAFB] text-gray-900">
        <ScrollProgress />
        <TrackingProvider>{children}</TrackingProvider>
        <CookieConsent />
        {hasValidGaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
