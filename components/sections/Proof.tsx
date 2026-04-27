"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

type PillarKind = "metrics" | "availability" | "responsibility";

const pillars = [
  {
    kind: "metrics" as PillarKind,
    title: "תוצאות מדודות",
    text: "כל החלטה מבוססת נתונים ברורים ולא תחושות בטן.",
  },
  {
    kind: "availability" as PillarKind,
    title: "זמינות גבוהה",
    text: "מענה מהיר ועדכונים שוטפים לאורך כל התהליך.",
  },
  {
    kind: "responsibility" as PillarKind,
    title: "ליווי אחראי",
    text: "שותף אחד שמחזיק את התמונה המלאה מקצה לקצה.",
  },
];

const trustStats = [
  {
    target: 50,
    suffix: "+",
    label: "פרויקטים שעלו לאוויר",
    sub: "בסטנדרט גבוה",
    context: "ממחקר ואפיון ועד עליה מלאה עם מדידה",
  },
  {
    target: 24,
    suffix: "h",
    label: "מענה אישי ראשוני",
    sub: "בימי עסקים",
    context: "כדי שלא תאבדו זמן יקר על החלטות פתוחות",
  },
  {
    target: 1,
    suffix: ":1",
    label: "ליווי אישי מולנו",
    sub: "ללא תיווך",
    context: "אחריות אחת שמחברת תכנון, ביצוע ותוצאה",
  },
];

function CountUpValue({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 1200;
    let frameId = 0;
    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [start, target]);

  return <>{count}{suffix}</>;
}

function LivePillarIcon({ kind }: { kind: PillarKind }) {
  if (kind === "metrics") {
    return (
      <svg viewBox="0 0 48 48" className="h-[22px] w-[22px]" aria-hidden>
        <path d="M8 36H40" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 30L16 22L24 26L32 16L40 20" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" fill="none" />
        <motion.path
          d="M8 30L16 22L24 26L32 16L40 20"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.35, ease: "easeInOut" }}
        />
        <motion.circle
          r="2.2"
          fill="currentColor"
          animate={{ cx: [8, 16, 24, 32, 40], cy: [30, 22, 26, 16, 20] }}
          transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.35, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (kind === "availability") {
    return (
      <svg viewBox="0 0 48 48" className="h-[22px] w-[22px]" aria-hidden>
        <motion.path
          d="M15.5 9.5C14.7 8.7 13.5 8.8 12.9 9.8L9.8 14.9C9.1 16 9.3 17.5 10.3 18.4L16.2 23.7C17.1 24.5 17.3 25.8 16.8 26.8L15.6 29C14.9 30.2 15.1 31.8 16.1 32.8L23.2 39.9C24.2 40.9 25.8 41.1 27 40.4L29.2 39.2C30.2 38.7 31.5 38.9 32.3 39.8L37.6 45.7C38.5 46.7 40 46.9 41.1 46.2L46.2 43.1C47.2 42.5 47.3 41.3 46.5 40.5L39.8 33.8C39 33 37.8 32.9 36.9 33.5L33.9 35.5C33.1 36 32.1 36.1 31.3 35.7C27.4 33.9 22.1 28.6 20.3 24.7C19.9 23.9 20 22.9 20.5 22.1L22.5 19.1C23.1 18.2 23 17 22.2 16.2L15.5 9.5Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
          fill="none"
          animate={{ rotate: [0, -10, 8, -6, 0] }}
          transition={{ duration: 1.35, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.75, ease: "easeInOut" }}
          style={{ transformOrigin: "24px 24px" }}
        />
        <motion.path
          d="M31.5 14.2C33.2 15.2 34.6 16.6 35.6 18.3"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.25, 0.95, 0.25] }}
          transition={{ duration: 1.35, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.75, ease: "easeInOut" }}
        />
        <motion.path
          d="M34.8 10.6C37.1 11.9 39.1 13.9 40.4 16.2"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.1, 0.75, 0.1] }}
          transition={{ duration: 1.35, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.75, ease: "easeInOut", delay: 0.08 }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-[22px] w-[22px]" aria-hidden>
      <motion.path
        d="M24 8L36 13V22C36 30 31 36 24 40C17 36 12 30 12 22V13L24 8Z"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="none"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.path
        d="M18 24L22.5 28.5L30.5 20.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.45, ease: "easeInOut" }}
      />
    </svg>
  );
}

function getPillarIconTone(kind: PillarKind) {
  if (kind === "metrics") {
    return {
      badgeStyle: { background: "rgba(37, 99, 235, 0.1)", border: "1px solid rgba(37, 99, 235, 0.22)" },
      iconClass: "text-blue-600",
    };
  }
  if (kind === "availability") {
    return {
      badgeStyle: { background: "rgba(22, 163, 74, 0.1)", border: "1px solid rgba(22, 163, 74, 0.22)" },
      iconClass: "text-emerald-600",
    };
  }
  return {
    badgeStyle: { background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.22)" },
    iconClass: "text-violet-600",
  };
}

export default function Proof() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const leadVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const leadVideoRef = useRef<HTMLVideoElement | null>(null);
  const statsInView = useInView(statsRef, { amount: 0.35 });
  const leadVideoInView = useInView(leadVideoWrapRef, { amount: 0.5 });

  useEffect(() => {
    const video = leadVideoRef.current;
    if (!video) return;

    if (leadVideoInView) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      return;
    }

    video.pause();
  }, [leadVideoInView]);

  return (
    <section
      id="proof"
      className="py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F2F6FC 50%, #F9FAFB 100%)" }}
    >
      <div aria-hidden className="section-blob-layer overflow-hidden">
        <div
          className="absolute top-10 right-[8%] w-36 h-36 rounded-full"
          style={{ background: "rgba(37,99,235,0.2)", filter: "blur(34px)" }}
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14" viewportKey="sectionProof" y={20} duration={0.65}>
          <h2 className="premium-title">
            אתר שנראה מעולה.
            <br />
            <span className="gradient-text">וחשוב יותר — עובד מעולה.</span>
          </h2>
          <p className="text-sm mt-4" style={{ color: "#64748B" }}>
            פחות ניחושים, יותר מדדים שמחוברים ישירות לתהליך עבודה ותוצאה עסקית.
          </p>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[var(--radius)] p-6 sm:p-8 bg-white border border-slate-200 shadow-premium"
          viewportKey="sectionTight"
          y={22}
          duration={0.6}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-7">
            {pillars.map((pillar) => {
              const tone = getPillarIconTone(pillar.kind);
              return (
                <article
                  key={pillar.title}
                  className="rounded-[var(--radius-soft)] border border-slate-200/80 bg-white p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={tone.badgeStyle}
                    >
                      <span className={tone.iconClass}>
                        <LivePillarIcon kind={pillar.kind} />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">{pillar.title}</h3>
                      <p className="text-sm leading-relaxed mt-1" style={{ color: "#64748B" }}>
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-0 text-center rounded-[var(--radius-soft)] overflow-hidden border border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-white"
          >
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="py-5 px-4 bg-white"
              >
                <div className="text-3xl font-extrabold tracking-tight text-slate-900">
                  <CountUpValue target={stat.target} suffix={stat.suffix} start={statsInView} />
                </div>
                <div className="text-xs mt-1 font-semibold" style={{ color: "#334155" }}>{stat.label}</div>
                <div className="mx-auto mt-2 h-px w-12 bg-slate-200/80" />
                <div className="text-[11px] mt-1" style={{ color: "#64748B" }}>{stat.sub}</div>
                <div className="text-[11px] mt-1.5 leading-relaxed px-2" style={{ color: "#475569" }}>{stat.context}</div>
              </div>
            ))}
          </div>

        </Reveal>

        <Reveal
          as="article"
          className="mt-8 mb-12 rounded-[var(--radius)] p-6 sm:p-8 bg-white border border-slate-200 shadow-premium"
          viewportKey="sectionTight"
          y={22}
          duration={0.6}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_0.4fr] gap-8 md:gap-10 items-center" dir="ltr">
            <div className="order-2 lg:order-1" ref={leadVideoWrapRef}>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl aspect-square shadow-premium overflow-hidden border border-white/40">
                <video
                  ref={leadVideoRef}
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

      </div>
    </section>
  );
}
