"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check, Megaphone, Server, Share2 } from "lucide-react";
import MaskedHeadline from "@/components/motion/MaskedHeadline";
import Reveal from "@/components/motion/Reveal";
import CtaButton from "@/components/ui/CtaButton";
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

const retainerAccentStyles = [
  {
    border: "rgba(14,165,233,0.35)",
    glow: "rgba(14,165,233,0.18)",
    bg: "linear-gradient(165deg, rgba(240,249,255,0.95) 0%, rgba(255,255,255,0.92) 100%)",
    iconWrap: "linear-gradient(145deg, rgba(14,165,233,0.2) 0%, rgba(59,130,246,0.14) 100%)",
    iconBorder: "rgba(14,165,233,0.35)",
    iconColor: "#0369a1",
    number: "#0284c7",
  },
  {
    border: "rgba(124,58,237,0.32)",
    glow: "rgba(124,58,237,0.15)",
    bg: "linear-gradient(165deg, rgba(245,243,255,0.95) 0%, rgba(255,255,255,0.92) 100%)",
    iconWrap: "linear-gradient(145deg, rgba(124,58,237,0.2) 0%, rgba(168,85,247,0.14) 100%)",
    iconBorder: "rgba(124,58,237,0.35)",
    iconColor: "#6d28d9",
    number: "#7c3aed",
  },
  {
    border: "rgba(5,150,105,0.32)",
    glow: "rgba(5,150,105,0.14)",
    bg: "linear-gradient(165deg, rgba(236,253,245,0.95) 0%, rgba(255,255,255,0.92) 100%)",
    iconWrap: "linear-gradient(145deg, rgba(5,150,105,0.2) 0%, rgba(16,185,129,0.14) 100%)",
    iconBorder: "rgba(5,150,105,0.35)",
    iconColor: "#047857",
    number: "#059669",
  },
];

const tiers = [
  {
    id: "quick-start",
    name: "התחלה מהירה",
    tagline: "נכס דיגיטלי אחד — מהר להשקה",
    description: "מתאים לעסק שרוצה לצאת לדרך מהר עם נכס דיגיטלי ברור וממיר.",
    items: ["מיתוג בסיסי", "דף נחיתה ממיר", "חיבור לטפסים/וואטסאפ", "השקה מהירה"],
    ctaLabel: "מתאים לי — בואו נדבר",
    ctaLocation: "pricing-fast-start",
  },
  {
    id: "growing-business",
    name: "עסק בצמיחה",
    tagline: "נוכחות מקצועית וליווי מתמשך",
    description: "מעטפת מלאה לעסק שרוצה נוכחות מקצועית וצמיחה עקבית לאורך זמן.",
    items: ["מיתוג מלא", "אתר תדמית עד 10 עמודים", "אוטומציות ותשתית מדידה", "ליווי חודשי ממוקד תוצאות"],
    popular: true,
    ctaLabel: "רוצה מעטפת מלאה",
    ctaLocation: "pricing-growth",
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
    ctaLabel: "יש לי מערכת מורכבת",
    ctaLocation: "pricing-deep-system",
  },
];

export default function Pricing() {
  const reduce = useReducedMotion();
  const { container: tiersStagger, item: tierItem } = staggerVariants(reduce);

  return (
    <section
      id="pricing"
      className="py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F2F5FB 50%, #F9FAFB 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <MaskedHeadline
            as="h2"
            className="premium-title mb-4"
            viewportKey="sectionLoose"
            lines={[
              <>
                בוחרים את המסלול <span className="gradient-text">שמתאים לשלב העסק</span>
              </>,
            ]}
          />
          <p className="premium-subtitle max-w-3xl mx-auto">
            שלוש רמות שירות ברורות עם תוצאה עסקית צפויה, זמן עליה לאוויר והתאמה לשלב שבו העסק נמצא עכשיו.
          </p>
        </div>

        <motion.div
          variants={tiersStagger}
          initial="hidden"
          whileInView="show"
          viewport={motionViewport.sectionLoose}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {tiers.map((tier) => (
            <motion.article
              variants={tierItem}
              key={tier.id}
              className={`relative isolate rounded-[12px] p-6 lg:p-7 bg-white transition-all duration-300 ease-out border ${
                tier.popular
                  ? "border-indigo-500 shadow-none"
                  : "border-slate-200 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.26)] hover:-translate-y-0.5"
              }`}
              style={
                tier.popular
                  ? {
                      background:
                        "linear-gradient(155deg, rgba(239,246,255,0.95) 0%, rgba(238,242,255,0.97) 45%, rgba(250,245,255,0.97) 100%)",
                    }
                  : {
                      borderColor: "rgba(14,165,233,0.32)",
                      background:
                        "linear-gradient(165deg, rgba(240,249,255,0.94) 0%, rgba(247,252,255,0.96) 55%, rgba(255,255,255,1) 100%)",
                    }
              }
            >
              {tier.popular && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3.5 py-1.5 rounded-[8px]"
                  style={{
                    color: "#ffffff",
                    background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 58%, #7c3aed 100%)",
                    border: "1px solid rgba(79,70,229,0.45)",
                  }}
                >
                  הנבחר ביותר
                </span>
              )}

              <h3
                className="text-[1.8rem] leading-tight font-extrabold"
                style={
                  tier.popular
                    ? { color: "#312e81" }
                    : { color: "#0c4a6e" }
                }
              >
                {tier.name}
              </h3>
              <p
                className="text-xs font-semibold mt-2"
                style={
                  tier.popular
                    ? { color: "#4f46e5" }
                    : { color: "#0369a1" }
                }
              >
                {tier.tagline}
              </p>
              <p className="text-sm leading-relaxed mt-4 min-h-[3.5rem]" style={{ color: "#64748B" }}>
                {tier.description}
              </p>

              <ul className="mt-5 space-y-3 border-t border-slate-200/80 pt-4">
                {tier.items.map((item) => (
                  <li key={item} className="text-sm flex items-start gap-2.5 leading-[1.55]" style={{ color: "#334155" }}>
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                      <Check size={11} className="text-emerald-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <CtaButton
                  href="#contact"
                  label={tier.ctaLabel}
                  ctaLocation={tier.ctaLocation}
                  variant={tier.popular ? "primary" : "secondary"}
                  className="w-full"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div
          id="tech-stack"
          className="scroll-mt-28 md:scroll-mt-32 pt-16 md:pt-20 lg:pt-24 mt-8 md:mt-10"
        >
          <div className="relative px-2 py-4 md:px-4">
            <Reveal className="mb-10 md:mb-12 relative z-[1]" viewportKey="sectionLoose" y={20} duration={0.6}>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm font-semibold tracking-wide text-slate-500 mb-3">
                  מה קורה אחרי ההשקה?
                </p>
                <h3 className="premium-title mb-4 text-balance leading-tight">
                  העסק{" "}
                  <span className="gradient-text">לא נעצר</span>
                  {" "}
                  <span className="text-slate-800">אחרי העלייה לאוויר</span>
                </h3>
                <p className="premium-subtitle text-pretty max-w-2xl mx-auto border-t border-slate-200/80 pt-5 mt-5">
                  ניהול קמפיינים ותפעול שוטף: אנחנו דואגים שהאתר ימשיך לעבוד בשבילכם עם אופטימיזציה שבועית, ניהול רשתות
                  חברתיות ותחזוקה טכנית מלאה.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 relative z-[1]">
              {retainers.map((item, i) => {
                const Icon = item.icon;
                const accent = retainerAccentStyles[i % retainerAccentStyles.length];
                return (
                  <Reveal
                    key={item.title}
                    viewportKey="sectionTight"
                    y={18}
                    duration={0.55}
                    delay={0.08 * i}
                    className="group relative rounded-[var(--radius-soft)] border border-s-2 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: accent.border,
                      background: accent.bg,
                      boxShadow: `0 12px 30px -22px ${accent.glow}`,
                    }}
                  >
                    <div className="flex flex-col gap-4 h-full">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                          style={{
                            borderColor: accent.iconBorder,
                            background: accent.iconWrap,
                            color: accent.iconColor,
                          }}
                        >
                          <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.85} aria-hidden />
                        </span>
                        <span className="text-[11px] font-bold tabular-nums" style={{ color: accent.number }}>
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
    </section>
  );
}
