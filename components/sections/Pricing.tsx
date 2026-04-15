"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check, Megaphone, Server, Share2 } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { staggerVariants, viewport as motionViewport } from "@/lib/motion";

const retainers: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "ניהול קמפיינים ממומנים",
    text: "אופטימיזציה שבועית, A/B Testing למודעות ודוח ביצועים חודשי.",
    icon: Megaphone,
  },
  {
    title: "ניהול רשתות חברתיות",
    text: "גאנט תוכן חודשי (10 פוסטים/סטוריז), עיצוב גרפי, קופי ותזמון.",
    icon: Share2,
  },
  {
    title: "תחזוקת אתר ואחסון",
    text: "אחסון פרימיום, גיבויים יומיים, עדכוני אבטחה ותוספים.",
    icon: Server,
  },
];

const tiers = [
  {
    id: "quick-start",
    name: "התחלה מהירה",
    tagline: "נכס דיגיטלי אחד — מהר להשקה",
    description: "מתאים לעסק שרוצה לצאת לדרך מהר עם נכס דיגיטלי ברור וממיר.",
    items: ["מיתוג בסיסי", "דף נחיתה ממיר", "חיבור לטפסים/וואטסאפ", "השקה מהירה"],
  },
  {
    id: "growing-business",
    name: "עסק בצמיחה",
    tagline: "נוכחות מקצועית וליווי מתמשך",
    description: "מעטפת מלאה לעסק שרוצה נוכחות מקצועית וצמיחה עקבית לאורך זמן.",
    items: ["מיתוג מלא", "אתר תדמית עד 10 עמודים", "אוטומציות ותשתית מדידה", "ליווי חודשי ממוקד תוצאות"],
    popular: true,
  },
  {
    id: "enterprise-smb",
    name: "תשתית עמוקה וצמיחה",
    tagline: "לעסקים עם מערכות ונפח פעילות גבוה",
    description:
      "פתרון מתקדם לעסקים שצריכים תשתית שניתן להרחיב לפי הצמיחה, חיבורים בין מערכות ויכולות ניהול מתקדמות.",
    items: [
      "חנות אונליין או מערכת מורכבת",
      "חיבורים מתקדמים למערכות ניהול לקוחות ולכלי עבודה",
      "תשתית אוטומציה מלאה לתהליכים",
      "ניהול שיווק ותפעול שוטף",
    ],
  },
];

export default function Pricing() {
  const reduce = useReducedMotion();
  const { container: tiersStagger, item: tierItem } = staggerVariants(reduce);

  return (
    <section
      id="pricing"
      className="py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F7FAFF 0%, #F9FAFB 56%, #F4F7FF 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14" viewportKey="sectionLoose" y={20} duration={0.6}>
          <h2 className="premium-title mb-4">
            בוחרים את המסלול
            {" "}
            <span className="gradient-text">שמתאים לשלב העסק</span>
          </h2>
          <p className="premium-subtitle max-w-3xl mx-auto">
            שלוש רמות שירות ברורות — כדי לדעת מאיפה מתחילים ולאן מתקדמים. אחרי העלייה לאוויר המסע ממשיך: אופטימיזציה,
            ניהול שוטף ותחזוקה, כדי שהנכס ימשיך לעבוד בשבילכם.
          </p>
        </Reveal>

        <motion.div
          variants={tiersStagger}
          initial="hidden"
          whileInView="show"
          viewport={motionViewport.sectionLoose}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {tiers.map((tier) => (
            <motion.article
              variants={tierItem}
              key={tier.id}
              className={`relative isolate rounded-[var(--radius)] p-6 bg-white/80 backdrop-blur-md border border-white/40 hover:-translate-y-1 transition-all duration-300 ease-out ${
                tier.popular
                  ? "border-2 !border-blue-500 ring-1 ring-violet-300/40 shadow-none hover:shadow-none"
                  : "shadow-premium hover:shadow-xl"
              }`}
              style={
                tier.popular
                  ? { boxShadow: "none" }
                  : { boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.05)" }
              }
            >
              {tier.popular && (
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-[calc(var(--radius)+4px)] pointer-events-none -z-10"
                  style={{
                    background: "linear-gradient(120deg, #10b3e7, #7c3aed)",
                    opacity: 0.18,
                    filter: "blur(14px)",
                  }}
                />
              )}

              {tier.popular && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3.5 py-1.5 rounded-[var(--radius-soft)]"
                  style={{ color: "#ffffff", background: "#2563eb", border: "1px solid rgba(37,99,235,0.45)" }}
                >
                  הנבחר ביותר
                </span>
              )}

              <h3 className="text-2xl font-extrabold text-slate-900">{tier.name}</h3>
              <p className="text-xs font-semibold mt-1.5" style={{ color: "#64748B" }}>
                {tier.tagline}
              </p>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "#64748B" }}>
                {tier.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {tier.items.map((item) => (
                  <li key={item} className="text-sm flex items-start gap-2.5" style={{ color: "#475569" }}>
                    <Check size={15} className="shrink-0 mt-0.5" style={{ color: "#4f46e5" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <div
          id="tech-stack"
          className="scroll-mt-28 md:scroll-mt-32 pt-16 md:pt-20 lg:pt-24 mt-8 md:mt-10"
        >
          <div className="relative rounded-[var(--radius)] border border-slate-200/80 bg-white/70 backdrop-blur-md overflow-hidden shadow-[0_1px_0_rgba(15,23,42,0.04)]">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-slate-300/80 to-transparent"
            />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(165deg,rgba(248,250,252,0.9)_0%,transparent_42%,rgba(241,245,249,0.35)_100%)]" />

            <div className="relative px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
              <Reveal className="mb-10 md:mb-12" viewportKey="sectionLoose" y={20} duration={0.6}>
                <div className="max-w-3xl mx-auto text-center md:text-start">
                  <p className="text-sm font-semibold tracking-wide text-slate-500 mb-3">
                    מה קורה אחרי ההשקה?
                  </p>
                  <h3 className="premium-title mb-4 text-balance leading-tight">
                    העסק{" "}
                    <span className="gradient-text">לא נעצר</span>
                    {" "}
                    <span className="text-slate-800">אחרי העלייה לאוויר</span>
                  </h3>
                  <p className="premium-subtitle text-pretty max-w-2xl md:mx-0 mx-auto border-t border-slate-200/80 pt-5 mt-5">
                    ניהול קמפיינים ותפעול שוטף: אנחנו דואגים שהאתר ימשיך לעבוד בשבילכם עם אופטימיזציה שבועית, ניהול רשתות
                    חברתיות ותחזוקה טכנית מלאה.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {retainers.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal
                      key={item.title}
                      viewportKey="sectionTight"
                      y={18}
                      duration={0.55}
                      delay={0.08 * i}
                      className="group relative rounded-2xl border border-slate-200/90 border-s-2 border-s-indigo-400/25 bg-white/90 p-5 md:p-6 transition-colors duration-300 hover:border-slate-300 hover:border-s-indigo-400/35 hover:bg-white"
                    >
                      <div className="flex flex-col gap-4 h-full">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50 text-slate-700 transition-colors duration-300 group-hover:border-slate-300 group-hover:bg-white">
                            <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} aria-hidden />
                          </span>
                          <span className="text-[11px] font-bold tabular-nums text-slate-400">
                            {(i + 1).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h4>
                          <p className="text-sm leading-relaxed mt-2 text-slate-600">{item.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
