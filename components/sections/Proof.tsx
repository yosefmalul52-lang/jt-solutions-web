"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone } from "lucide-react";
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
    return <Phone size={22} strokeWidth={2} stroke="#10b3e7" aria-hidden />;
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
      badgeStyle: { background: "rgba(37, 99, 235, 0.12)", border: "1px solid rgba(37, 99, 235, 0.26)" },
      iconClass: "text-[#2563eb]",
    };
  }
  if (kind === "availability") {
    return {
      badgeStyle: { background: "rgba(16, 179, 231, 0.12)", border: "1px solid rgba(16, 179, 231, 0.28)" },
      iconClass: "text-[#10b3e7]",
    };
  }
  return {
    badgeStyle: { background: "rgba(124, 58, 237, 0.12)", border: "1px solid rgba(124, 58, 237, 0.28)" },
    iconClass: "text-[#7c3aed]",
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
          className="mt-8 mb-12 rounded-[var(--radius)] p-6 sm:p-8 border shadow-premium relative overflow-hidden"
          viewportKey="sectionTight"
          y={22}
          duration={0.6}
          style={{
            borderColor: "rgba(79,70,229,0.18)",
            background:
              "linear-gradient(160deg, rgba(239,246,255,0.78) 0%, rgba(238,242,255,0.72) 38%, rgba(250,245,255,0.66) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full"
            style={{ background: "rgba(79,70,229,0.18)", filter: "blur(52px)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-14 h-64 w-64 rounded-full"
            style={{ background: "rgba(16,179,231,0.16)", filter: "blur(56px)" }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_0.4fr] gap-8 md:gap-10 items-center" dir="ltr">
            <div className="order-2 lg:order-1" ref={leadVideoWrapRef}>
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl aspect-square shadow-premium overflow-hidden border border-white/60">
                <video
                  ref={leadVideoRef}
                  className="h-full w-full object-cover"
                  src="/jt site lead animation.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-label="אנימציית הדגמה של אתר JT"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 text-right relative z-[1]" dir="rtl">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 text-balance">
                תפסיקו לרדוף אחרי לידים:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed]">
                  המערכת שעושה עבורכם את העבודה
                </span>
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
