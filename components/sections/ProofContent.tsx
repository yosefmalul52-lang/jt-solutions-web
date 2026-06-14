"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import MaskedHeadline from "@/components/motion/MaskedHeadline";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import TiltSurface from "@/components/motion/TiltSurface";
import { proofBentoStagger, TILT_PERSPECTIVE, viewport as motionViewport } from "@/lib/motion";

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
    target: 20,
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

    const duration = 1400;
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

  return (
    <motion.span
      initial={false}
      animate={start ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {start ? count : 0}
      {suffix}
    </motion.span>
  );
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
          initial={{ cx: 8, cy: 30 }}
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
      circleClass: "bg-[rgba(37,99,235,0.14)] ring-1 ring-[rgba(37,99,235,0.22)]",
      iconClass: "text-[#2563eb]",
    };
  }
  if (kind === "availability") {
    return {
      circleClass: "bg-[rgba(16,179,231,0.16)] ring-1 ring-[rgba(16,179,231,0.24)]",
      iconClass: "text-[#10b3e7]",
    };
  }
  return {
    circleClass: "bg-[rgba(124,58,237,0.14)] ring-1 ring-[rgba(124,58,237,0.24)]",
    iconClass: "text-[#7c3aed]",
  };
}

const proofCardClass =
  "group w-full rounded-[var(--radius-soft)] border border-gray-100 bg-white/95 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-300 ease-out hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]";

const CARD_INDEX = {
  pillar: (i: number) => i,
  stat: (i: number) => i + 3,
} as const;

export default function ProofContent() {
  const reduce = useReducedMotion();
  const bentoMotion = proofBentoStagger(reduce);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const statsTriggerRef = useRef<HTMLDivElement | null>(null);
  const leadVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const leadVideoRef = useRef<HTMLVideoElement | null>(null);
  const statsInView = useInView(statsTriggerRef, { once: false, amount: 0.35, margin: "-40px" });
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
      className="overflow-x-hidden py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F2F6FC 50%, #F9FAFB 100%)" }}
    >
      <div aria-hidden className="section-blob-layer overflow-hidden">
        <ParallaxLayer
          speed={0.11}
          className="absolute top-10 right-[8%] h-36 w-36 rounded-full"
          style={{ background: "rgba(37,99,235,0.2)", filter: "blur(34px)" }}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <MaskedHeadline
            as="h2"
            className="premium-title"
            viewportKey="section"
            lines={[
              "אתר שנראה מעולה.",
              <span key="grad" className="gradient-text">
                וחשוב יותר — עובד מעולה.
              </span>,
            ]}
          />
          <p className="mt-4 text-sm text-slate-500">
            פחות ניחושים, יותר מדדים שמחוברים ישירות לתהליך עבודה ותוצאה עסקית.
          </p>
        </header>

        <article
          className="relative mx-auto mt-10 mb-10 w-full max-w-6xl overflow-hidden rounded-[var(--radius)] border p-6 shadow-premium sm:p-8"
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
          <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-[0.6fr_0.4fr]" dir="ltr">
            <div className="order-2 lg:order-1" ref={leadVideoWrapRef}>
              <div className="aspect-square overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-slate-100 to-slate-200 shadow-premium">
                <video
                  ref={leadVideoRef}
                  className="h-full w-full object-cover"
                  src="/jt-site-lead-animation.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster="/opengraph-image.png"
                  aria-label="אנימציית הדגמה של מערכת לידים"
                />
              </div>
            </div>

            <div className="relative z-[1] order-1 text-right lg:order-2" dir="rtl">
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-balance text-slate-900 sm:text-3xl">
                תפסיקו לרדוף אחרי לידים:{" "}
                <span className="bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                  המערכת שעושה עבורכם את העבודה
                </span>
              </h3>

              <ol className="mt-5 list-inside list-decimal space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
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
                  <ul className="mt-2 list-inside list-disc space-y-1.5">
                    <li>נוצר כרטיס לקוח חדש באופן אוטומטי.</li>
                    <li>כל המידע מהטופס (כולל הערות הלקוח) מתועד ומסודר.</li>
                    <li>הליד משויך אוטומטית לסטטוס התואם כדי שתוכלו להתחיל לטפל בו.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </article>

        <motion.div
          ref={gridRef}
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6"
          style={{ perspective: TILT_PERSPECTIVE }}
          variants={bentoMotion.container}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport.sectionProof}
        >
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
            {pillars.map((pillar, index) => {
              const tone = getPillarIconTone(pillar.kind);
              return (
                <motion.div key={pillar.title} className="h-full" variants={bentoMotion.card} custom={CARD_INDEX.pillar(index)}>
                  <TiltSurface as="article" className={`${proofCardClass} flex h-full justify-center`}>
                    <div className="flex w-full max-w-xs flex-col items-center gap-4 text-center">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${tone.circleClass}`}
                      >
                        <span className={tone.iconClass}>
                          <LivePillarIcon kind={pillar.kind} />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">{pillar.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.text}</p>
                      </div>
                    </div>
                  </TiltSurface>
                </motion.div>
              );
            })}
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 sm:items-stretch">
            {trustStats.map((stat, index) => (
              <motion.div key={stat.label} className="h-full" variants={bentoMotion.card} custom={CARD_INDEX.stat(index)}>
                <TiltSurface as="article" className={`${proofCardClass} h-full text-center`}>
                  <div ref={index === 0 ? statsTriggerRef : undefined}>
                    <div className="bg-gradient-to-r from-[#10b3e7] via-[#4f46e5] to-[#7c3aed] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                      <CountUpValue target={stat.target} suffix={stat.suffix} start={statsInView} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">{stat.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">{stat.context}</p>
                  </div>
                </TiltSurface>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
