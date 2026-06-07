import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PillarsGrid } from "@/components/sections/FourPillars";
import JsonLd from "@/components/seo/JsonLd";
import GlassCard from "@/components/ui/GlassCard";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getServicesHubJsonLd } from "@/lib/seo/organization";

export const metadata: Metadata = createPageMetadata({
  title: "שירותי סוכנות דיגיטל בישראל | JT Solutions",
  description:
    "ארבעה תחומי מומחיות: בניית אתרים, מיתוג, אוטומציות ושיווק דיגיטלי — מעטפת אחת מהאפיון ועד לידים, עם ליווי ישיר 1:1.",
  path: "/services",
  keywords: [
    "שירותי סוכנות דיגיטל",
    "בניית אתרים",
    "מיתוג דיגיטלי",
    "אוטומציה לעסקים",
    "שיווק דיגיטלי",
  ],
});

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={getServicesHubJsonLd()} />
      <Navbar />
      <main className="flex-1 bg-[#0B0F19]">
        <section
          className="relative overflow-hidden section-shell pt-32 pb-16 md:pt-40 md:pb-20"
          style={{ background: "var(--section-gradient)" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
            <h1 className="display-title max-w-4xl mx-auto">
              <span className="gradient-text">ארבעה תחומים.</span>{" "}
              <span className="text-slate-100">מעטפת אחת.</span>
            </h1>
            <p className="premium-subtitle max-w-3xl mx-auto mt-6">
              מיתוג, אתרים, אוטומציה ושיווק דיגיטלי — הכל תחת ליווי אחד, מהאפיון ועד תוצאות מדידות.
            </p>
          </div>
        </section>

        <section
          className="pb-16 md:pb-24 section-shell"
          style={{ background: "var(--section-gradient)" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <PillarsGrid />
          </div>
        </section>

        <section
          className="pb-24 md:pb-32 section-shell"
          style={{ background: "var(--section-gradient)" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <GlassCard className="p-8 sm:p-10 text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                לא בטוחים מה מתאים לעסק?
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
                בשיחת התאמה של כ-15 דקות נבין את המטרה, נציע מסלול וניתן טווח מחיר ברור.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-soft)] px-6 py-3 text-sm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-[1.03] hover:-translate-y-0.5"
                style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
              >
                קובעים שיחת התאמה
              </Link>
            </GlassCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
