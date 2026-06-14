import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import CtaButton from "@/components/ui/CtaButton";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getAboutPageJsonLd } from "@/lib/seo/organization";
import { servicePages } from "@/lib/seo/services";

export const metadata: Metadata = createPageMetadata({
  title: "אודות | יוסף מלול — שותף דיגיטל מקצה לקצה",
  description:
    "יוסף מלול מלווה עסקים בישראל במעטפת דיגיטלית אחת: מיתוג, אתרים, דפי נחיתה, איקומרס, פרסום ואוטומציה. משרד בקריית אתא, שירות בכל הארץ.",
  path: "/about",
  keywords: [
    "אודות JT Solutions",
    "יוסף מלול",
    "סוכנות דיגיטל בישראל",
    "סוכנות דיגיטל צפון",
    "בניית אתרים קריית אתא",
  ],
});

const processSteps = [
  "שיחת התאמה ואפיון — מגדירים מטרה, קהל ומדידה",
  "מיתוג ותוכן — מסר ברור לפני עיצוב",
  "פיתוח ועלייה לאוויר — אתר מהיר, נגיש וממיר",
  "מדידה וצמיחה — לידים, אוטומציה ושיפור מתמשך",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getAboutPageJsonLd()} />
      <Navbar />
      <main className="flex-1 bg-[#F9FAFB]">
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
            <h1 className="display-title">
              <span className="gradient-text">יוסף מלול</span>
              <span className="block text-slate-900 mt-2 text-2xl sm:text-3xl font-bold">
                שותף טכנולוגי ואסטרטג דיגיטל
              </span>
            </h1>
            <p className="premium-subtitle mt-6 max-w-2xl mx-auto">
              JT Solutions היא מעטפת דיגיטלית אחת לעסקים בישראל — מהאפיון ועד לידים שמגיעים. בלי לרדוף אחרי
              מספר ספקים, בלי כאב ראש טכני.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm sm:text-base leading-relaxed text-slate-600" dir="rtl">
            <p>
              אני מלווה עסקים בכל שלבי הנוכחות הדיגיטלית: מיתוג וזהות, אתרי תדמית, דפי נחיתה ממירים, חנויות
              איקומרס, תשתית פרסום, בוט וואטסאפ ואוטומציות שמחברות לידים ל-CRM. העבודה מתבצעת בליווי ישיר
              1:1 — עם תהליך ברור, מענה תוך 24 שעות ושקיפות מלאה.
            </p>
            <p>
              <strong className="text-slate-900">מיקום:</strong> משרד בקריית אתא, שירות לעסקים בצפון, במרכז
              ובכל ישראל (פרונטלי ומרחוק). המטרה היא לא רק אתר יפה — אלא נכס דיגיטלי שמייצר פניות איכותיות
              ומדידות.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">איך אנחנו עובדים</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {processSteps.map((step, i) => (
                <li
                  key={step}
                  className="rounded-[var(--radius-soft)] border border-slate-200 bg-white p-5 shadow-premium"
                >
                  <span className="text-xs font-bold text-indigo-600">שלב {i + 1}</span>
                  <p className="mt-2 text-sm text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">השירותים שלנו</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(servicePages).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.path}
                    className="block rounded-[var(--radius-soft)] border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                  >
                    {s.serviceName}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <CtaButton href="/#contact" ctaLocation="about" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
