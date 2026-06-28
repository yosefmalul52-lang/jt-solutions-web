import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Handshake, Eye, Clock, Target } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LightPageShell from "@/components/layout/LightPageShell";
import PremiumReveal from "@/components/motion/PremiumReveal";
import ScribbleUnderline from "@/components/motion/ScribbleUnderline";
import JsonLd from "@/components/seo/JsonLd";
import CtaButton from "@/components/ui/CtaButton";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getAboutPageJsonLd } from "@/lib/seo/organization";
import { servicePages } from "@/lib/seo/services";

export const metadata: Metadata = createPageMetadata({
  title: "יוסף מלול — ליווי דיגיטלי מקצה לקצה",
  description:
    "יוסף מלול מלווה עסקים בישראל בבניית תשתית דיגיטלית: אתר, דף נחיתה, מדידה, וואטסאפ ומעקב פניות — מעטפת אחת, בלי לרדוף אחרי כמה ספקים.",
  path: "/about",
  keywords: [
    "אודות JT Solutions",
    "יוסף מלול",
    "שותף דיגיטלי לעסקים",
    "תשתית דיגיטלית לעסק",
    "בניית אתרים קריית אתא",
  ],
});

const processSteps = [
  "שיחת התאמה ואפיון — מגדירים מטרה, קהל ומדידה",
  "מיתוג ותוכן — מסר ברור לפני עיצוב",
  "פיתוח ועלייה לאוויר — אתר מהיר, נגיש וממיר",
  "מדידה וצמיחה — לידים, אוטומציה ושיפור מתמשך",
];

const values = [
  { icon: Handshake, title: "ליווי 1:1", text: "אדם אחד אחראי על כל המסלול — בלי לרדוף אחרי כמה ספקים." },
  { icon: Eye, title: "שקיפות מלאה", text: "אתה מבין מה נבנה, למה, ואיך זה אמור להביא פניות." },
  { icon: Clock, title: "מענה מהיר", text: "מענה תוך 24 שעות ותהליך ברור בלי הפתעות." },
  { icon: Target, title: "תוצאה עסקית", text: "לא רק אתר יפה — נכס שמייצר פניות איכותיות ומדידות." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getAboutPageJsonLd()} />
      <Navbar />
      <LightPageShell>
        <main className="flex-1">
          <section className="studio-service-hero-zone relative section-shell pt-32 pb-14 md:pt-40 md:pb-20">
            <div className="studio-service-hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <div className="page-hero-mesh" aria-hidden />
            <PremiumReveal as="div" className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" variant="rise">
              <div dir="rtl">
                <span className="home-badge mb-6 inline-flex">אודות</span>
                <h1 className="home-headline">
                  <span className="gradient-text">יוסף מלול</span>
                  <span className="mt-2 block text-2xl font-bold text-slate-900 sm:text-3xl">
                    שותף טכנולוגי ואסטרטג דיגיטל
                  </span>
                </h1>
                <ScribbleUnderline color="#7C3AED" className="scribble-underline--inline mt-4" />
                <p className="home-subline mx-auto mt-6 max-w-2xl">
                  JT Solutions היא מעטפת דיגיטלית אחת לעסקים בישראל — מהאפיון ועד לידים שמגיעים. בלי לרדוף
                  אחרי מספר ספקים, בלי כאב ראש טכני.
                </p>
              </div>
            </PremiumReveal>
          </section>

          <section className="home-section section-shell">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <PremiumReveal as="div" className="home-card p-6 sm:p-8" variant="rise">
                <div className="space-y-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                  <p>
                    אני מלווה עסקים בכל שלבי הנוכחות הדיגיטלית: מיתוג וזהות, אתרי תדמית, דפי נחיתה ממירים,
                    חנויות איקומרס, תשתית פרסום, בוט וואטסאפ ואוטומציות שמחברות לידים ל-CRM. העבודה מתבצעת
                    בליווי ישיר 1:1 — עם תהליך ברור, מענה תוך 24 שעות ושקיפות מלאה.
                  </p>
                  <p>
                    <strong className="text-slate-900">מיקום:</strong> משרד בקריית אתא, שירות לעסקים בצפון,
                    במרכז ובכל ישראל (פרונטלי ומרחוק). המטרה היא לא רק אתר יפה — אלא נכס דיגיטלי שמייצר
                    פניות איכותיות ומדידות.
                  </p>
                </div>
              </PremiumReveal>
            </div>
          </section>

          <section className="home-section home-section--alt section-shell">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <PremiumReveal as="div" className="mx-auto mb-8 max-w-2xl text-center" variant="rise">
                <p className="home-eyebrow">למה איתי</p>
                <h2 className="home-headline mt-3">איך זה מרגיש לעבוד יחד</h2>
              </PremiumReveal>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <li key={value.title}>
                      <PremiumReveal as="div" className="about-value-card h-full" variant="rise" delay={0.04 + index * 0.06}>
                        <span className="home-bento__icon">
                          <Icon size={18} strokeWidth={2} aria-hidden />
                        </span>
                        <h3 className="text-base font-bold text-slate-900">{value.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.text}</p>
                      </PremiumReveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section className="home-section section-shell">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <h2 className="home-headline mb-8 text-center">איך אנחנו עובדים</h2>
              <ol className="process-rail grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, i) => (
                  <li key={step}>
                    <PremiumReveal as="div" className="studio-process-step relative h-full p-5" variant="rise" delay={0.04 + i * 0.07}>
                      <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{step}</p>
                    </PremiumReveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="home-section home-section--alt section-shell pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <h2 className="home-headline mb-8 text-center">השירותים שלנו</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.values(servicePages).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.path}
                      className="group flex items-center justify-between rounded-[var(--radius-soft)] border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:text-sky-700"
                    >
                      {s.serviceName}
                      <ArrowLeft size={15} className="shrink-0 text-slate-400 transition-all group-hover:-translate-x-0.5 group-hover:text-sky-600" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex justify-center">
                <CtaButton href="/#contact" ctaLocation="about" shine="auto" />
              </div>
            </div>
          </section>
        </main>
      </LightPageShell>
      <Footer />
    </>
  );
}
