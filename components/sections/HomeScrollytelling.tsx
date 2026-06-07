"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import SpaceStoryVisuals from "@/components/motion/SpaceStoryVisuals";
import HomeHeroScene from "@/components/sections/HomeHeroScene";
import { useHydrated } from "@/hooks/useHydrated";
import { pillarList } from "@/lib/pillars";
import HomeScrollytellingFallback from "@/components/sections/HomeScrollytellingFallback";

gsap.registerPlugin(ScrollTrigger);

const aboutBullets = [
  "ליווי ישיר 1:1 — תמיד יודעים עם מי מדברים",
  "תהליך ברור — מהיום הראשון ועד עלייה לאוויר",
  "מענה תוך 24 שעות — החלטות מהירות, בלי המתנה",
] as const;

const SCROLL_DISTANCE = "+=420%";

export default function HomeScrollytelling() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();

  if (!hydrated || reduce) {
    return <HomeScrollytellingFallback />;
  }

  return <HomeScrollytellingCore />;
}

function HomeScrollytellingCore() {
  const trackRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroSceneRef = useRef<HTMLDivElement>(null);
  const aboutSceneRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutBodyRef = useRef<HTMLParagraphElement>(null);
  const aboutBulletsRef = useRef<HTMLUListElement>(null);
  const servicesSceneRef = useRef<HTMLDivElement>(null);
  const servicesHeaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const serviceCardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const nebulaRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const astronautRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const warpRef = useRef<HTMLDivElement>(null);
  const starsNearRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      const hero = heroSceneRef.current;
      const about = aboutSceneRef.current;
      const aboutTitle = aboutTitleRef.current;
      const aboutBody = aboutBodyRef.current;
      const aboutList = aboutBulletsRef.current;
      const services = servicesSceneRef.current;
      const servicesHeader = servicesHeaderRef.current;
      const progress = progressRef.current;
      const cards = serviceCardRefs.current.filter(Boolean) as HTMLAnchorElement[];

      const nebula = nebulaRef.current;
      const planet = planetRef.current;
      const astronaut = astronautRef.current;
      const ship = shipRef.current;
      const warp = warpRef.current;
      const starsNear = starsNearRef.current;

      if (
        !track ||
        !pin ||
        !hero ||
        !about ||
        !services ||
        !nebula ||
        !planet ||
        !astronaut ||
        !ship ||
        !warp ||
        !starsNear
      ) {
        return;
      }

      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      gsap.set(about, { opacity: 0, pointerEvents: "none" });
      gsap.set(aboutTitle, { opacity: 0, y: 56 });
      gsap.set(aboutBody, { opacity: 0, y: 40 });
      gsap.set(aboutList?.children ?? [], { opacity: 0, y: 28 });
      gsap.set(services, { opacity: 0, pointerEvents: "none" });
      gsap.set(servicesHeader, { opacity: 0, y: 36 });
      gsap.set(cards, { opacity: 0, y: 72, scale: 0.9 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "100% 50%" });

      gsap.set(astronaut, {
        x: 80,
        y: 60,
        opacity: 0,
        rotation: -18,
        scale: 0.75,
        transformOrigin: "50% 50%",
      });
      gsap.set(planet, { y: 120, opacity: 0, scale: 0.5, transformOrigin: "50% 50%" });
      gsap.set(ship, { y: -180, opacity: 0, scale: 0.55, transformOrigin: "50% 50%" });
      gsap.set(warp, { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" });
      gsap.set(nebula, { opacity: 0.35, scale: 1 });
      gsap.set(starsNear, { y: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: SCROLL_DISTANCE,
          pin: pin,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── פרק א׳: שיגור — אstronaut נכנס לחלל ──
      tl.to(
        astronaut,
        { opacity: 1, x: 0, y: 0, rotation: -8, scale: 1, duration: 0.14, ease: "power2.out" },
        0,
      )
        .to(starsNear, { y: -24, duration: 0.22, ease: "none" }, 0)
        .to(nebula, { opacity: 0.55, duration: 0.18, ease: "none" }, 0.04)

        // ── מעבר לפרק ב׳ ──
        .to(
          hero,
          { opacity: 0, y: -40, scale: 0.97, duration: 0.2, ease: "power2.inOut" },
          0.1,
        )
        .to(
          astronaut,
          {
            x: -100,
            y: -30,
            rotation: 12,
            scale: 0.82,
            duration: 0.2,
            ease: "power2.inOut",
          },
          0.1,
        )
        .to(
          about,
          {
            opacity: 1,
            duration: 0.1,
            onStart: () => gsap.set(about, { pointerEvents: "auto" }),
          },
          0.22,
        )
        .to(planet, { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "power3.out" }, 0.24)
        .to(
          astronaut,
          { x: 60, y: 10, rotation: -4, scale: 0.72, duration: 0.16, ease: "power2.out" },
          0.26,
        )
        .to(nebula, { opacity: 0.75, scale: 1.08, duration: 0.2, ease: "none" }, 0.24)
        .to(aboutTitle, { opacity: 1, y: 0, duration: 0.16, ease: "power3.out" }, 0.28)
        .to(aboutBody, { opacity: 1, y: 0, duration: 0.14, ease: "power3.out" }, 0.32)
        .to(
          aboutList?.children ?? [],
          { opacity: 1, y: 0, duration: 0.12, stagger: 0.04, ease: "power2.out" },
          0.36,
        )
        .to({}, { duration: 0.1 })

        // ── מעבר לפרק ג׳ ──
        .to(aboutTitle, { opacity: 0, y: -24, duration: 0.1, ease: "power2.in" }, 0.5)
        .to(aboutBody, { opacity: 0, y: -20, duration: 0.1, ease: "power2.in" }, 0.5)
        .to(
          aboutList?.children ?? [],
          { opacity: 0, y: -16, duration: 0.08, stagger: 0.02, ease: "power2.in" },
          0.5,
        )
        .to(
          about,
          {
            opacity: 0,
            duration: 0.08,
            onComplete: () => gsap.set(about, { pointerEvents: "none" }),
          },
          0.56,
        )
        .to(planet, { opacity: 0, y: 80, scale: 0.7, duration: 0.12, ease: "power2.in" }, 0.52)
        .to(
          astronaut,
          { opacity: 0.4, x: 0, y: -80, rotation: 0, scale: 0.5, duration: 0.14, ease: "power2.in" },
          0.52,
        )

        // ── פרק ג׳: חללית + warp לשירותים ──
        .to(
          services,
          {
            opacity: 1,
            duration: 0.1,
            onStart: () => gsap.set(services, { pointerEvents: "auto" }),
          },
          0.58,
        )
        .to(ship, { opacity: 1, y: 20, scale: 1, duration: 0.16, ease: "power3.out" }, 0.6)
        .to(
          astronaut,
          { opacity: 1, x: -260, y: -100, scale: 0.34, rotation: -6, duration: 0.12, ease: "power2.out" },
          0.64,
        )
        .to(warp, { opacity: 0.75, scale: 1.15, duration: 0.14, ease: "power2.out" }, 0.66)
        .to(starsNear, { scale: 1.35, y: -60, duration: 0.2, ease: "none" }, 0.62)
        .to(nebula, { opacity: 0.45, scale: 1.2, duration: 0.18, ease: "none" }, 0.64)
        .to(servicesHeader, { opacity: 1, y: 0, duration: 0.14, ease: "power3.out" }, 0.66)
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.16,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.72,
        )
        .to(ship, { y: 8, duration: 0.12, ease: "sine.inOut" }, 0.78)
        .to({}, { duration: 0.1 });

      tl.to(progress, { scaleX: 1, ease: "none", duration: 1 }, 0);

      ScrollTrigger.refresh();

      return () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: trackRef },
  );

  return (
    <section ref={trackRef} aria-label="סיפור הגלילה" className="relative">
      <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden bg-[#030014]">
        <SpaceStoryVisuals
          nebulaRef={nebulaRef}
          planetRef={planetRef}
          astronautRef={astronautRef}
          shipRef={shipRef}
          warpRef={warpRef}
          starsNearRef={starsNearRef}
        />

        <div
          ref={progressRef}
          aria-hidden
          className="absolute inset-x-0 top-0 z-[60] h-px origin-right scale-x-0 bg-gradient-to-l from-indigo-500/80 to-blue-400/60"
        />

        <div
          ref={heroSceneRef}
          id="hero"
          className="absolute inset-0 z-10 flex flex-col"
          aria-label="מבוא"
        >
          <HomeHeroScene />
        </div>

        <div
          ref={aboutSceneRef}
          id="about"
          className="absolute inset-0 z-20 flex items-center justify-center px-6 py-16 sm:px-10 lg:px-14"
          aria-label="מי אנחנו"
        >
          <div
            className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14"
            dir="rtl"
          >
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-violet-300/70">
                פרק ב׳ · כוכב LTS
              </p>
              <h2 ref={aboutTitleRef} className="premium-title mb-5">
                מי אנחנו
              </h2>
              <p
                ref={aboutBodyRef}
                className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
              >
                JT Solutions היא מעטפת דיגיטלית אחת לעסקים בישראל. יוסף מלול מלווה אתכם
                מהאפיון ועד לידים שמגיעים — בלי לרדוף אחרי מספר ספקים, בלי כאב ראש טכני.
              </p>
              <ul ref={aboutBulletsRef} className="mt-6 space-y-3">
                {aboutBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
              >
                קראו עוד עלינו
                <ArrowLeft className="h-4 w-4 scale-x-[-1]" aria-hidden />
              </Link>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-[var(--radius)] border border-white/10 bg-white/[0.03] backdrop-blur-sm sm:h-32 sm:w-32">
                <Image
                  src="/logo.png"
                  alt="JT Solutions"
                  width={120}
                  height={120}
                  className="h-16 w-auto object-contain opacity-95 sm:h-20"
                  sizes="120px"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={servicesSceneRef}
          id="services"
          className="absolute inset-0 z-30 flex items-center justify-center px-6 py-16 sm:px-10 lg:px-14"
          aria-label="שירותים"
        >
          <div className="w-full max-w-5xl" dir="rtl">
            <div ref={servicesHeaderRef} className="mb-8 text-center sm:mb-10">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-blue-300/70">
                פרק ג׳ · יעד
              </p>
              <h2 className="premium-title mb-3">
                <span className="gradient-text">ארבעה תחומים.</span> מעטפת אחת.
              </h2>
              <p className="premium-subtitle mx-auto max-w-2xl">
                מהקמה ועד צמיחה — בוחרים מסלול מלא או ממוקד לפי שלב העסק.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {pillarList.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    key={pillar.slug}
                    ref={(el) => {
                      serviceCardRefs.current[index] = el;
                    }}
                    href={pillar.path}
                    className="group relative flex flex-col gap-3 rounded-[var(--radius)] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.05] sm:p-6"
                    style={{
                      boxShadow: `0 0 0 1px rgba(${pillar.accentRgb}, 0.06) inset`,
                    }}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]"
                      style={{
                        boxShadow: `0 8px 24px -8px rgba(${pillar.accentRgb}, 0.35)`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: `rgb(${pillar.accentRgb})` }}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white/95 sm:text-lg">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {pillar.tagline}
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors group-hover:text-slate-300">
                      לפרטים
                      <ArrowLeft className="h-3.5 w-3.5 scale-x-[-1]" aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
