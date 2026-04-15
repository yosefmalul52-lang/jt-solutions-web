"use client";

import { BarChart3, Clock3, MoveLeft, Quote, ShieldCheck } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CtaButton from "@/components/ui/CtaButton";

const pillars = [
  {
    icon: BarChart3,
    title: "תוצאות מדודות",
    text: "כל החלטה מבוססת נתונים ברורים ולא תחושות בטן.",
  },
  {
    icon: Clock3,
    title: "זמינות גבוהה",
    text: "מענה מהיר ועדכונים שוטפים לאורך כל התהליך.",
  },
  {
    icon: ShieldCheck,
    title: "ליווי אחראי",
    text: "שותף אחד שמחזיק את התמונה המלאה מקצה לקצה.",
  },
];

const trustStats = [
  { value: "50+", label: "פרויקטים שעלו לאוויר", sub: "בסטנדרט גבוה" },
  { value: "24h", label: "מענה אישי ראשוני", sub: "בימי עסקים" },
  { value: "1:1", label: "ליווי ישיר מול יוסף", sub: "ללא תיווך" },
];

const testimonials = [
  {
    quote:
      "השירות האישי הורגש מהשיחה הראשונה. קיבלנו זמינות גבוהה, פתרונות מהירים וביצוע מדויק בלי לרדוף אחרי כמה ספקים במקביל.",
    name: "אורי כהן",
    role: "בעלים, חנות איקומרס",
  },
  {
    quote:
      "המעבר היה מהיר וחלק - מתהליך ידני למערכת מסודרת. זמן הטיפול ירד משמעותית והלקוחות מרגישים את הרמה המקצועית מיד.",
    name: "מיכל לוי",
    role: "מנכ\"לית, עסק לשירותי מזון",
  },
  {
    quote:
      "יש כאן שילוב חזק של מומחיות טכנית עם הבנה שיווקית. כל החלטה קודמה עם חשיבה עסקית ותוצאה שמורגשת בשטח.",
    name: "דניאל פרץ",
    role: "מנהל שיווק, חברת שירותים",
  },
  {
    quote:
      "הזמינות והאחריות היו יוצאות דופן. כל שאלה קיבלה מענה מהיר, והפרויקט התקדם בקצב גבוה עם שקיפות מלאה לכל אורך הדרך.",
    name: "נועה אברג'יל",
    role: "בעלים, סטודיו לעיצוב",
  },
  {
    quote:
      "מה שאהבנו במיוחד זה היכולת לקחת מורכבות טכנולוגית ולהפוך אותה למערכת פשוטה לתפעול יומיומי. מקצוענות ברמה גבוהה מאוד.",
    name: "רועי חדד",
    role: "שותף, מותג קמעונאות דיגיטלית",
  },
  {
    quote:
      "מהפגישה הראשונה ועד העלייה לאוויר, הכל היה ברור ומדויק. קיבלנו אתר שמייצר פניות איכותיות ומסודר לעבודת צוות יומיומית.",
    name: "שירה בן-דוד",
    role: "מנהלת פיתוח עסקי, חברת שירותים",
  },
];

export default function Proof() {
  return (
    <section
      id="proof"
      className="py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #F9FAFB 55%, #F6F8FF 100%)" }}
    >
      <div
        aria-hidden
        className="absolute top-10 right-[8%] w-36 h-36 rounded-full pointer-events-none"
        style={{ background: "rgba(91,33,182,0.07)", filter: "blur(36px)" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14" viewportKey="sectionProof" y={20} duration={0.65}>
          <span className="premium-badge mb-4">
            למה בוחרים בנו
          </span>
          <h2 className="premium-title">
            אתר שנראה מעולה.
            <br />
            <span className="gradient-text">וחשוב יותר — עובד מעולה.</span>
          </h2>
          <p className="text-sm mt-4" style={{ color: "#64748B" }}>
            פחות ניחושים, יותר תהליך מסודר שמוביל לפניות איכותיות.
          </p>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                key={pillar.title}
                viewportKey="sectionPillar"
                y={26}
                duration={0.55}
                delay={i * 0.08}
                className="p-5 md:p-6 flex-1 bg-white/80 backdrop-blur-md border border-white/40 shadow-premium hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out rounded-[var(--radius)]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.15)" }}
                  >
                    <Icon size={18} style={{ color: "#4f46e5" }} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed mt-1" style={{ color: "#64748B" }}>
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          className="mt-10 rounded-[var(--radius)] p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-white/40 shadow-premium"
          viewportKey="sectionTight"
          y={22}
          duration={0.6}
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(248,250,252,0.9))",
          }}
        >
          <div className="text-center mb-7">
            <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#64748B" }}>
              נתוני אמון
            </p>
            <p className="text-sm mt-2" style={{ color: "#475569" }}>
              אינדיקציות עבודה עקביות שמבוססות על תהליך מסודר
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 text-center rounded-[var(--radius-soft)] overflow-hidden border border-slate-200/80 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 bg-white/70 backdrop-blur-md">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="py-5 px-4 bg-white"
              >
                <div className="text-3xl font-extrabold tracking-tight text-slate-900">{stat.value}</div>
                <div className="text-xs mt-1 font-semibold" style={{ color: "#334155" }}>{stat.label}</div>
                <div className="mx-auto mt-2 h-px w-12 bg-slate-200/80" />
                <div className="text-[11px] mt-1" style={{ color: "#64748B" }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center gap-3">
            <CtaButton icon={MoveLeft} label="לצפייה בפרויקטים נבחרים" href="/#projects" />
            <p className="text-xs text-center" style={{ color: "#64748B" }}>
              מאחורי התהליך עומד שותף אחד שמוביל את הכל מקצה לקצה
            </p>
          </div>
        </Reveal>

        <Reveal
          as="article"
          className="mt-8 mb-12 rounded-[var(--radius)] p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-white/40 shadow-premium"
          viewportKey="sectionTight"
          y={22}
          duration={0.6}
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(248,250,252,0.9))",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_0.4fr] gap-8 md:gap-10 items-center" dir="ltr">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl aspect-square shadow-premium overflow-hidden border border-white/40">
                <video
                  className="h-full w-full object-cover"
                  src="/jt site lead animation.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="אנימציית הדגמה של אתר JT"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 text-right" dir="rtl">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900">
             תפסיקו לרדוף אחרי לידים: המערכת שעושה עבורכם את העבודה
              </h3>

              <ol className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed list-decimal list-inside" style={{ color: "#475569" }}>
                <li>
                  <strong className="text-slate-900">השארת פרטים </strong>
                  <p className="mt-1">
                    ברגע שלקוח פוטנציאלי ממלא טופס באתר שלך (שם, טלפון, צורך), המערכת &ldquo;מתעוררת&rdquo; לחיים באופן מיידי. הנתונים
                    נשלפים מהאתר באותו רגע, ללא צורך בהעתקה ידנית.
                  </p>
                </li>
                <li>
                  <strong className="text-slate-900">התראה מיידית במייל </strong>
                  <p className="mt-1">
                    אתה לא צריך לנחש אם נכנס ליד. המערכת שולחת הודעה אוטומטית למייל שלך או של אנשי המכירות עם כל פרטי הפנייה. כך אתם
                    נשארים מעודכנים בזמן אמת, גם כשאתם לא מול האתר.
                  </p>
                </li>
                <li>
                  <strong className="text-slate-900">רישום אוטומטי ב-CRM</strong>
                  <p className="mt-1">
                    במקום שהלידים &ldquo;יישכחו&rdquo; במייל, הם &ldquo;נוחתים&rdquo; ישירות בתוך ה-CRM שלך .
                  </p>
                  <ul className="mt-2 space-y-1.5 list-disc list-inside">
                    <li>נוצר כרטיס לקוח חדש באופן אוטומטי.</li>
                    <li>כל המידע מהטופס (כולל הערות הלקוח) מתועד ומסודר.</li>
                    <li>הליד משויך אוטומטית לסטטוס התואם כדי שתוכלו להתחיל לטפל בו.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8" viewportKey="sectionTight" y={22} duration={0.6}>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 text-center mb-14">
            מה אומרים העסקים שעשו את הקפיצה?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5" dir="rtl">
            {testimonials.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="rounded-[var(--radius)] p-5 sm:p-6 bg-white/70 backdrop-blur-md border border-white/40 shadow-premium hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.78), rgba(248,250,252,0.8))",
                }}
              >
                <div className="flex justify-end">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-soft)] border"
                    style={{ background: "rgba(37,99,235,0.08)", borderColor: "rgba(37,99,235,0.2)", color: "#2563eb" }}
                    aria-hidden
                  >
                    <Quote size={15} />
                  </span>
                </div>
                <p className="text-sm font-semibold leading-relaxed mt-3 text-right" style={{ color: "#475569" }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-white/40 text-right">
                  <p className="text-sm font-semibold" style={{ color: "#1d4ed8" }}>{item.name}</p>
                  <p className="text-xs mt-1" style={{ color: "#2563eb" }}>{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
