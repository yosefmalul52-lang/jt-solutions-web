import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/ui/TrackedLink";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getServicesHubJsonLd } from "@/lib/seo/organization";
import { servicePages } from "@/lib/seo/services";

export const metadata: Metadata = createPageMetadata({
  title: "שירותי סוכנות דיגיטל בישראל | JT Solutions",
  description:
    "מעטפת שירותים דיגיטליים לעסקים: דפי נחיתה ממירים, אתרי תדמית, חנויות איקומרס, מיתוג, פרסום, בוט וואטסאפ ואוטומציה — הכל תחת קורת גג אחת.",
  path: "/services",
  keywords: [
    "שירותי סוכנות דיגיטל",
    "בניית אתרים",
    "דף נחיתה",
    "איקומרס",
    "מיתוג דיגיטלי",
    "אוטומציה לעסקים",
  ],
});

const serviceSummaries: Record<string, string> = {
  "landing-pages": "דף נחיתה ממיר לקמפיינים — מסר חד, CTA ברור ומדידה מלאה.",
  "business-websites": "אתר תדמית מקצועי עד 10 עמודים — אמון, SEO ופניות קבועות.",
  ecommerce: "חנות אונליין עם קטלוג, תשלום וניהול הזמנות — מוכנה לצמיחה.",
  branding: "זהות מותגית מלאה — לוגו, צבעים ושפה ויזואלית עקבית.",
  "ad-infrastructure": "תשתית פרסום וקמפיינים — מדידה, אופטימיזציה ו-ROI.",
  "whatsapp-bot": "בוט וואטסאפ שמסנן פניות, עונה אוטומטית ומעביר לידים.",
  "ai-automation": "אוטומציה חכמה לתהליכים — חיסכון בזמן ופחות לידים אבודים.",
  "web-development": "פיתוח אתרים ומערכות מותאמות — Next.js, ביצועים ואינטגרציות.",
};

export default function ServicesHubPage() {
  const services = Object.values(servicePages);

  return (
    <>
      <JsonLd data={getServicesHubJsonLd()} />
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden section-shell pt-32 pb-16 md:pt-40 md:pb-24"
          style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F3F6FF 48%, #F9FAFB 100%)" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
            <h1 className="display-title max-w-4xl mx-auto">
              שירותי <span className="gradient-text">סוכנות דיגיטל</span> לעסקים בישראל
            </h1>
            <p className="premium-subtitle max-w-3xl mx-auto mt-6">
              מעטפת אחת מהאפיון ועד לידים: מיתוג, אתרים, דפי נחיתה, חנויות, פרסום ואוטומציה — עם ליווי ישיר 1:1.
            </p>
          </div>
        </section>

        <section className="pb-24 md:pb-32 section-shell bg-[#F9FAFB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.path}
                    className="premium-card block p-6 lg:p-7 h-full hover:border-indigo-200 hover:shadow-md transition-all group"
                  >
                    <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {service.serviceName}
                    </h2>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {serviceSummaries[service.slug] ?? service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
                      לפרטים מלאים
                      <ArrowLeft size={16} aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-14 text-center premium-card p-8">
              <h2 className="text-xl font-extrabold text-slate-900">לא בטוחים מה מתאים לעסק?</h2>
              <p className="text-sm text-slate-600 mt-3 max-w-xl mx-auto">
                בשיחת התאמה של כ-15 דקות נבין את המטרה, נציע מסלול וניתן טווח מחיר ברור.
              </p>
              <TrackedLink
                href="/contact"
                ctaLocation="services-hub"
                ctaLabel="קובעים שיחת התאמה"
                className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-soft)] px-6 py-3 text-sm font-semibold text-white"
                style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
              >
                קובעים שיחת התאמה
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
