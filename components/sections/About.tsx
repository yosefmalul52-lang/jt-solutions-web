"use client";

import { CheckCircle2, Layers, Radar } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const pillars = [
  {
    title: "מאפיון ועד קוד שרץ — באותה יד אחראית",
    lead:
      "כשהאפיון, העיצוב והפיתוח לא מתפצלים בין שלושה ספקים, פחות טעויות תרגום, פחות סיבובים — ויותר ביטחון שהאתר או המערכת באמת עומדים במה שהבטחנו.",
    points: [
      "אחריות אחת על המימוש, בלי „זה אצל המתכנת”",
      "פחות תיאום ופחות חיכוך בין גורמים",
      "התאמה ליעדים העסקיים, לא רק ל„איך שיוצא”",
    ],
    icon: Layers,
    accent: {
      border: "rgba(37, 99, 235, 0.2)",
      bg: "#ffffff",
      iconBg: "rgba(37, 99, 235, 0.09)",
      iconBorder: "rgba(37, 99, 235, 0.18)",
      iconColor: "#1d4ed8",
      titleColor: "#1e40af",
    },
  },
  {
    title: "תשתית שמודדת — לא רק „אתר יפה”",
    lead:
      "אנחנו מחברים בין הנכס הדיגיטלי לבין מה שקורה אחרי הקליק: CRM, פיקסלים, אוטומציות ומדידה — כדי שתדעו מה עובד, מה לשפר ואיפה להשקיע את התקציב.",
    points: [
      "חיבור לידים ומעקב אחר מקורות פניות",
      "הטמעות מדידה והמרות בצורה נכונה",
      "אוטומציות שמקטינות עבודה ידנית חוזרת",
    ],
    icon: Radar,
    accent: {
      border: "rgba(30, 64, 175, 0.16)",
      bg: "#ffffff",
      iconBg: "rgba(30, 64, 175, 0.08)",
      iconBorder: "rgba(30, 64, 175, 0.18)",
      iconColor: "#1e40af",
      titleColor: "#1e3a8a",
    },
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F2F5FB 50%, #F9FAFB 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10 md:mb-14 max-w-3xl mx-auto" viewportKey="section" y={20} duration={0.6}>
          <h2 className="premium-title text-slate-900">
            כשהטכנולוגיה והעסק נפגשים אצל <span className="gradient-text">אותו שותף</span>
          </h2>
          <p className="premium-subtitle mt-4 text-balance">
            היתרון הוא לא רק „מפתח שיודע הכל” — אלא אחריות אחת על השרשרת: מאפיון ופיתוח ועד חיבורים, מדידה וצמיחה.
            פחות פערים בין אנשים, יותר שליטה בתהליך — ותוצאה שאפשר לסמוך עליה.
          </p>
        </Reveal>

        <Reveal
          className="relative overflow-hidden rounded-[var(--radius)] border border-slate-200 bg-white shadow-premium"
          viewportKey="sectionTight"
          y={32}
          duration={0.7}
        >
          <div className="relative p-5 sm:p-7 md:p-9" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {pillars.map((item, i) => {
                const Icon = item.icon;
                const a = item.accent;
                return (
                  <Reveal
                    key={item.title}
                    as="article"
                    viewportKey="inView"
                    y={22}
                    duration={0.55}
                    delay={i * 0.06}
                    className="rounded-[var(--radius-soft)] border p-5 md:p-6 flex flex-col h-full"
                    style={{
                      borderColor: a.border,
                      background: a.bg,
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-soft)] border"
                        style={{
                          background: a.iconBg,
                          borderColor: a.iconBorder,
                        }}
                        aria-hidden
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={2} style={{ color: a.iconColor }} />
                      </div>
                      <h3
                        className="text-base sm:text-lg font-bold leading-snug tracking-tight pt-0.5"
                        style={{ color: a.titleColor }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-[1.7] text-slate-600 flex-1">{item.lead}</p>
                    <ul className="mt-4 space-y-2.5 pt-4 border-t border-slate-200/70">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 mt-0.5"
                            strokeWidth={2}
                            style={{ color: a.iconColor }}
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              })}
            </div>

            <div
              className="mt-6 rounded-[var(--radius-soft)] border px-4 py-4 md:px-6 md:py-5"
              style={{
                borderColor: "rgba(15, 23, 42, 0.08)",
                background: "#f8fafc",
              }}
            >
              <p className="text-sm md:text-[0.9375rem] leading-relaxed text-slate-600 text-center md:text-right">
                זה בדיוק מה שמבדיל ליווי <span className="font-semibold text-slate-800">מקצה לקצה</span> מפיצול בין
                מעצב, מתכנת ומנהל קמפיינים — פחות נקודות כשל, יותר בהירות, ותחושת ביטחון שהפרויקט לא „נופל בין הכיסאות”.
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
