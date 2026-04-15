"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BotMessageSquare,
  Building2,
  ChevronDown,
  FileText,
  LayoutGrid,
  Layers,
  Megaphone,
  Palette,
  Share2,
  ShieldCheck,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { staggerVariants, viewport as motionViewport } from "@/lib/motion";

const DROPDOWN_PANEL_BG_DEFAULT =
  "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.96) 55%, rgba(244,247,255,0.5) 100%)";

type PhaseId = "phase-a" | "phase-b" | "phase-c";

/** צבעי אייקון לפי שירות — מגוון שמתיישר עם הגרדיאנט של המותג */
type ServiceIconAccent = {
  wrapBg: string;
  wrapBorder: string;
  color: string;
};

const ICON_ACCENTS = {
  violet: {
    wrapBg: "rgba(124, 58, 237, 0.12)",
    wrapBorder: "rgba(124, 58, 237, 0.26)",
    color: "#7c3aed",
  },
  rose: {
    wrapBg: "rgba(225, 29, 72, 0.09)",
    wrapBorder: "rgba(225, 29, 72, 0.22)",
    color: "#e11d48",
  },
  sky: {
    wrapBg: "rgba(14, 165, 233, 0.13)",
    wrapBorder: "rgba(14, 165, 233, 0.28)",
    color: "#0284c7",
  },
  emerald: {
    wrapBg: "rgba(5, 150, 105, 0.11)",
    wrapBorder: "rgba(5, 150, 105, 0.24)",
    color: "#059669",
  },
  amber: {
    wrapBg: "rgba(217, 119, 6, 0.12)",
    wrapBorder: "rgba(217, 119, 6, 0.26)",
    color: "#d97706",
  },
  green: {
    wrapBg: "rgba(22, 163, 74, 0.11)",
    wrapBorder: "rgba(22, 163, 74, 0.24)",
    color: "#16a34a",
  },
  pink: {
    wrapBg: "rgba(219, 39, 119, 0.1)",
    wrapBorder: "rgba(219, 39, 119, 0.24)",
    color: "#db2777",
  },
  slate: {
    wrapBg: "rgba(71, 85, 105, 0.11)",
    wrapBorder: "rgba(71, 85, 105, 0.22)",
    color: "#475569",
  },
} satisfies Record<string, ServiceIconAccent>;

type PhaseService = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  blurb: string;
  iconAccent: ServiceIconAccent;
  /** כפתור ראשי — ברירת מחדל לדפי שירות */
  primaryCta?: string;
};

const PHASE_THEMES: Record<
  PhaseId,
  {
    cardGradient: string;
    cardBorder: string;
    rowIdle: string;
    rowHover: string;
    rowBorder: string;
    /** רקע פנימי בדרופ־דאון — אופציונלי; ברירת מחדל עם נגיעה סגולה־כחולה */
    dropdownPanelBg?: string;
  }
> = {
  "phase-a": {
    cardGradient: "#ffffff",
    cardBorder: "rgba(15, 23, 42, 0.1)",
    rowIdle: "rgba(248, 250, 252, 0.95)",
    rowHover: "rgba(241, 245, 249, 0.98)",
    rowBorder: "rgba(15, 23, 42, 0.08)",
  },
  "phase-b": {
    cardGradient: "linear-gradient(165deg, rgba(14,165,233,0.12) 0%, rgba(255,255,255,0.95) 42%, #f8fafc 100%)",
    cardBorder: "rgba(14, 165, 233, 0.28)",
    rowIdle: "rgba(248, 250, 252, 0.95)",
    rowHover: "rgba(241, 245, 249, 0.98)",
    rowBorder: "rgba(15, 23, 42, 0.08)",
    dropdownPanelBg:
      "linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(249,250,251,0.98) 100%)",
  },
  "phase-c": {
    cardGradient: "#ffffff",
    cardBorder: "rgba(15, 23, 42, 0.1)",
    rowIdle: "rgba(248, 250, 252, 0.95)",
    rowHover: "rgba(241, 245, 249, 0.98)",
    rowBorder: "rgba(15, 23, 42, 0.08)",
  },
};

const phases: {
  id: PhaseId;
  title: string;
  summary: string;
  services: PhaseService[];
}[] = [
  {
    id: "phase-a",
    title: "שלב ההקמה: מיתוג ונוכחות",
    summary: "בשלב הזה בונים את היסודות שמציגים את העסק בצורה מקצועית ומדויקת.",
    services: [
      {
        id: "branding",
        title: "חבילת מיתוג",
        href: "/services/branding",
        icon: Palette,
        blurb:
          "זהות ויזואלית מלאה מהלוגו ועד שפה אחידה — כדי שכל מגע עם הלקוח ירגיש מקצועי ובולט.",
        iconAccent: ICON_ACCENTS.violet,
      },
      {
        id: "landing",
        title: "דף נחיתה",
        href: "/services/landing-pages",
        icon: FileText,
        blurb: "דף אחד ממוקד המרה — מהיר, ברור ומותאם להצעה או לקמפיין ספציפי.",
        iconAccent: ICON_ACCENTS.rose,
      },
    ],
  },
  {
    id: "phase-b",
    title: "שלב הגדילה: הנכסים הדיגיטליים",
    summary: "כאן בונים את הנכסים המרכזיים שיתמכו בצמיחה וייצרו אמון ומכירה.",
    services: [
      {
        id: "business-web",
        title: "אתר תדמית (עד 10 עמודים)",
        href: "/services/business-websites",
        icon: Building2,
        blurb: "אתר מלא שמציג את העסק, השירותים והאמון — מבנה נקי ונוח לניהול.",
        iconAccent: ICON_ACCENTS.sky,
      },
      {
        id: "ecommerce",
        title: "חנות איקומרס",
        href: "/services/ecommerce",
        icon: ShoppingCart,
        blurb: "חנות אונליין מוכנה למכירה — קטלוג, עגלה ותהליך רכישה ברור ללקוח.",
        iconAccent: ICON_ACCENTS.emerald,
      },
      {
        id: "whatsapp-bot",
        title: "בוט וואטסאפ לשיחות עם לקוחות",
        href: "/services/whatsapp-bot",
        icon: BotMessageSquare,
        blurb:
          "בוט בוואטסאפ שמקבל פניות, עונה על שאלות חוזרות ומסדר מידע — כדי שתחסכו זמן ולא תפספסו ליד.",
        iconAccent: ICON_ACCENTS.green,
      },
    ],
  },
  {
    id: "phase-c",
    title: "שלב הניהול: שיווק ותחזוקה",
    summary: "אחרי ההקמה, מפעילים שיווק מתמשך ומחזיקים את המערכת יציבה ומתקדמת.",
    services: [
      {
        id: "ads",
        title: "ניהול קמפיינים",
        href: "/services/ad-infrastructure",
        icon: Megaphone,
        blurb: "תשתית שיווקית מדידה — קמפיינים, מעקב והתאמות כדי להביא פניות איכותיות.",
        iconAccent: ICON_ACCENTS.amber,
      },
      {
        id: "social",
        title: "ניהול רשתות חברתיות",
        href: "/#contact",
        icon: Share2,
        primaryCta: "למעבר לצור קשר",
        blurb: "נוכחות עקבית ברשתות — תכנון, עיצובים ופרסום שמקל עליכם את העומס.",
        iconAccent: ICON_ACCENTS.pink,
      },
      {
        id: "maintenance",
        title: "תחזוקה ושקט נפשי",
        href: "/#contact",
        icon: ShieldCheck,
        primaryCta: "למעבר לצור קשר",
        blurb: "שקט טכני — עדכונים, גיבויים ותמיכה כדי שהאתר או החנות ימשיכו לעבוד בלי הפתעות.",
        iconAccent: ICON_ACCENTS.slate,
      },
    ],
  },
];

function ServiceRecordDropdown({
  service,
  isOpen,
  reduce,
  onToggle,
  onClose,
  theme,
}: {
  service: PhaseService;
  isOpen: boolean;
  reduce: boolean;
  onToggle: () => void;
  onClose: () => void;
  theme: (typeof PHASE_THEMES)[PhaseId];
}) {
  const Icon = service.icon;
  const accent = service.iconAccent;
  const panelId = `svc-dd-${service.id}`;
  const triggerId = `svc-tr-${service.id}`;

  return (
    <div
      className="rounded-[var(--radius-soft)] border overflow-hidden transition-[box-shadow,border-color] duration-200"
      style={{
        borderColor: isOpen ? accent.wrapBorder : theme.rowBorder,
        boxShadow: isOpen ? "var(--shadow-glow)" : "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group w-full flex items-center justify-between gap-2 px-3.5 py-3 text-right transition-colors duration-200"
        style={{
          background: isOpen ? theme.rowHover : theme.rowIdle,
          boxShadow: isOpen ? `inset 0 -1px 0 0 ${theme.rowBorder}` : undefined,
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-[var(--radius-soft)] flex items-center justify-center shrink-0 border"
            style={{
              background: accent.wrapBg,
              borderColor: accent.wrapBorder,
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            }}
          >
            <Icon size={16} style={{ color: accent.color }} />
          </div>
          <span className="text-sm font-semibold text-slate-800 truncate">{service.title}</span>
        </div>
        <ChevronDown
          size={18}
          strokeWidth={2.25}
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: accent.color }}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={reduce ? false : { height: 0 }}
            animate={{ height: "auto" }}
            exit={reduce ? undefined : { height: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200/80"
          >
            <div
              className="p-3.5 sm:p-4 space-y-4"
              dir="rtl"
              style={{
                background: theme.dropdownPanelBg ?? DROPDOWN_PANEL_BG_DEFAULT,
              }}
            >
              <p className="text-sm leading-[1.65] text-slate-600">{service.blurb}</p>

              <Link
                href={service.href}
                className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition-[filter,box-shadow] duration-200 hover:brightness-[1.05]"
                style={{
                  background: "var(--gradient-cta)",
                  boxShadow: "var(--shadow-glow)",
                }}
                onClick={onClose}
              >
                {service.primaryCta ?? "עוד פרטים"}
                <ArrowLeft className="h-4 w-4 scale-x-[-1]" aria-hidden strokeWidth={2.25} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const reduce = useReducedMotion();
  const { container: timelineStagger, item: phaseItem } = staggerVariants(reduce);
  const [openId, setOpenId] = useState<string | null>(null);

  const closeAll = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, closeAll]);

  return (
    <section
      id="services"
      className="py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F5F7FF 58%, #F7F9FF 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16" viewportKey="sectionLoose" y={24} duration={0.6}>
          <h2 className="premium-title mb-4">
            <span className="gradient-text">מסלול צמיחה</span> בשלושה שלבים
          </h2>
          <p className="premium-subtitle max-w-2xl mx-auto">
            במקום אוסף שירותים - תהליך ברור שמוביל מהקמה ועד מכירות שוטפות.
          </p>
        </Reveal>

        <Reveal className="relative" viewportKey="sectionLoose" y={20} duration={0.6}>
          <div
            aria-hidden
            className="hidden lg:block absolute top-[38px] left-[16.5%] right-[16.5%] h-px"
            style={{ background: "linear-gradient(90deg, rgba(16,179,231,0.2), rgba(124,58,237,0.24), rgba(16,179,231,0.2))" }}
          />

          <motion.div
            variants={timelineStagger}
            initial="hidden"
            whileInView="show"
            viewport={motionViewport.sectionLoose}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {phases.map((phase) => {
              const t = PHASE_THEMES[phase.id];
              return (
                <motion.article
                  variants={phaseItem}
                  key={phase.id}
                  className="relative rounded-[var(--radius)] p-5 sm:p-6 backdrop-blur-md shadow-premium hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out border"
                  style={{
                    background: t.cardGradient,
                    borderColor: t.cardBorder,
                  }}
                >
                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug">{phase.title}</h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: "#64748B" }}>
                    {phase.summary}
                  </p>

                  <div className="mt-5 space-y-3">
                    {phase.services.map((service) => (
                      <ServiceRecordDropdown
                        key={service.id}
                        service={service}
                        isOpen={openId === service.id}
                        reduce={reduce ?? false}
                        theme={t}
                        onToggle={() =>
                          setOpenId((prev) => (prev === service.id ? null : service.id))
                        }
                        onClose={closeAll}
                      />
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </Reveal>

        <Reveal
          className="mt-10 relative overflow-hidden rounded-[var(--radius)] border border-slate-200/80 bg-gradient-to-b from-white via-white to-[#f4f7ff] shadow-[0_1px_3px_rgba(15,23,42,0.06),0_12px_40px_-18px_rgba(124,58,237,0.08)]"
          viewportKey="sectionLoose"
          y={20}
          duration={0.6}
        >
          <div
            className="absolute inset-x-0 top-0 h-[3px] opacity-90"
            style={{ background: "var(--gradient-cta)" }}
            aria-hidden
          />
          <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10" dir="rtl">
            <div className="max-w-3xl">
              <span
                className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{
                  color: "#5b21b6",
                  background: "rgba(124, 58, 237, 0.07)",
                  borderColor: "rgba(124, 58, 237, 0.18)",
                }}
              >
                מעטפת Growth
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
                ליווי{" "}
                <span className="gradient-text">מקצה לקצה</span>
                {" או "}
                <span className="text-slate-800">שירותים נפרדים</span>
                {" — לפי צורך העסק"}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                שתי אפשרויות ברורות. בוחרים יחד מה מתאים לשלב שבו אתם נמצאים.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div
                className="rounded-[var(--radius-soft)] border p-5 sm:p-6 flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_28px_-12px_rgba(124,58,237,0.15)]"
                style={{
                  borderColor: "rgba(124, 58, 237, 0.2)",
                  background:
                    "linear-gradient(155deg, rgba(124, 58, 237, 0.07) 0%, rgba(255, 255, 255, 0.92) 55%, #ffffff 100%)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: "rgba(124, 58, 237, 0.22)",
                      background: "rgba(124, 58, 237, 0.1)",
                    }}
                    aria-hidden
                  >
                    <Layers className="h-4 w-4" strokeWidth={2} style={{ color: "#6d28d9" }} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h4 className="text-sm font-bold tracking-tight" style={{ color: "#5b21b6" }}>
                      מעטפת מלאה
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 leading-[1.65]">
                      ריכוז כל השלבים אצלנו — מהקמה ועד ניהול שוטף. קו אחיד, תיאום בין חלקים ואחריות על התוצאה.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-[var(--radius-soft)] border p-5 sm:p-6 flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_28px_-12px_rgba(14,165,233,0.18)]"
                style={{
                  borderColor: "rgba(14, 165, 233, 0.22)",
                  background:
                    "linear-gradient(155deg, rgba(14, 165, 233, 0.08) 0%, rgba(255, 255, 255, 0.92) 55%, #ffffff 100%)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: "rgba(14, 165, 233, 0.25)",
                      background: "rgba(14, 165, 233, 0.11)",
                    }}
                    aria-hidden
                  >
                    <LayoutGrid className="h-4 w-4" strokeWidth={2} style={{ color: "#0284c7" }} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h4 className="text-sm font-bold tracking-tight" style={{ color: "#0369a1" }}>
                      שירותים נפרדים
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 leading-[1.65]">
                      בחירה נקודתית לפי סדר עדיפויות: דף נחיתה, מיתוג, אתר, בוט, קמפיינים או תחזוקה — בלי התחייבות לכל המסלול.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-8 rounded-[var(--radius-soft)] border px-4 py-3.5 sm:px-5 sm:py-4"
              style={{
                borderColor: "rgba(79, 70, 229, 0.12)",
                background:
                  "linear-gradient(120deg, rgba(124, 58, 237, 0.05) 0%, rgba(255, 255, 255, 0.75) 45%, rgba(14, 165, 233, 0.06) 100%)",
              }}
            >
              <p className="text-center text-xs sm:text-sm text-slate-600 leading-relaxed">
                בשיחת התאמה קצרה נמפה את המצב ונציע מסלול מלא או ממוקד — שלב אחר שלב, עם שקיפות ואחריות.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
