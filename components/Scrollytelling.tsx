"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import { Code, PenTool, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import HeroTypewriterHeadline from "@/components/motion/HeroTypewriterHeadline";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_COPY =
  "אנחנו לא רק בונים אתרים. אנחנו מהנדסים חוויות דיגיטליות, מתכננים מערכות אוטומטיות, וכותבים מסרים שממירים.";

const ABOUT_WORDS = ABOUT_COPY.split(/\s+/);

const NEUTRAL_700 = "#404040";
const WHITE = "#ffffff";

const SPACE_IMAGE_URL =
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=80";

const HERO_LINES = ["הנדסת אינטרנט.", "בקצה החדשנות."] as const;

const SERVICES: { title: string; icon: LucideIcon }[] = [
  { title: "פיתוח ווב מודרני", icon: Code },
  { title: "אוטומציה עסקית", icon: Workflow },
  { title: "קופירייטינג ממיר", icon: PenTool },
  { title: "עיצוב ומיתוג פרימיום", icon: Sparkles },
];

export default function Scrollytelling() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spaceImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const spaceImg = spaceImgRef.current;
      const hero = heroRef.current;
      const about = aboutRef.current;
      const services = servicesRef.current;
      const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      if (
        !wrapper ||
        !spaceImg ||
        !hero ||
        !about ||
        !services ||
        words.length === 0 ||
        cards.length !== SERVICES.length
      ) {
        return;
      }

      gsap.set(spaceImg, {
        scale: 1,
        rotation: 0,
        y: 0,
        filter: "blur(0px) brightness(1)",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(hero, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(about, { opacity: 0, y: 0 });
      gsap.set(words, { color: NEUTRAL_700 });
      gsap.set(services, { opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=3000",
          pin: wrapper,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Scene 1 — Hero dive (0% → 30%)
      tl.to(
        hero,
        {
          scale: 4,
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.3,
          ease: "power2.in",
        },
        0,
      ).to(
        spaceImg,
        {
          rotation: 15,
          scale: 3,
          duration: 0.3,
          ease: "power1.inOut",
        },
        0,
      );

      // Scene 2 — About reveal (30% → 68%)
      tl.to(
        spaceImg,
        {
          filter: "blur(10px) brightness(0.62)",
          duration: 0.06,
          ease: "none",
        },
        0.3,
      )
        .to(
          about,
          {
            opacity: 1,
            duration: 0.04,
            ease: "power1.out",
          },
          0.3,
        )
        .to(
          words,
          {
            color: WHITE,
            duration: 0.06,
            stagger: 0.016,
            ease: "none",
          },
          0.34,
        )
        .to({}, { duration: 0.08 }, 0.58)
        .to(
          about,
          {
            opacity: 0,
            y: -50,
            duration: 0.1,
            ease: "power2.in",
          },
          0.66,
        );

      // Scene 3 — Bento grid (68% → 100%)
      tl.to(
        services,
        {
          opacity: 1,
          duration: 0.04,
          ease: "power1.out",
        },
        0.7,
      )
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            duration: 0.12,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.74,
        )
        .to(
          spaceImg,
          {
            y: -60,
            duration: 0.26,
            ease: "power1.out",
          },
          0.7,
        );

      ScrollTrigger.refresh();

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <section ref={wrapperRef} aria-label="Scrollytelling" className="relative">
      <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
        {/* Background — z-0 */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element -- GSAP scrubs transform/filter on raw img */}
          <img
            ref={spaceImgRef}
            src={SPACE_IMAGE_URL}
            alt=""
            className="h-full w-full object-cover will-change-[transform,filter]"
            decoding="async"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-neutral-950/40" />
        </div>

        {/* Scene 1 — Hero — z-10 */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-10 flex h-full w-full items-center justify-center will-change-transform"
          aria-label="מבוא"
        >
          <div className="relative px-8 py-12 sm:px-14 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-2xl bg-blue-500/[0.06] blur-3xl sm:-inset-8"
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
              style={{
                background:
                  "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 45%, transparent 72%), rgba(255,255,255,0.05)",
                boxShadow:
                  "0 0 80px -12px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            />
            <HeroTypewriterHeadline
              lines={HERO_LINES}
              titleClassName="relative max-w-5xl text-center text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              lineClassName="block min-h-[1.15em] text-white"
              accentClassName="hero-display-accent mt-3 block min-h-[1.15em] sm:mt-4"
              charDelay={46}
              startDelay={400}
            />
          </div>
        </div>

        {/* Scene 2 — About — z-20 */}
        <div
          ref={aboutRef}
          className="absolute inset-0 z-20 flex h-full w-full items-center justify-center px-8 opacity-0 sm:px-12"
          aria-label="מי אנחנו"
        >
          <p
            dir="rtl"
            className="max-w-4xl text-center text-3xl font-medium leading-snug tracking-tight sm:text-4xl lg:text-5xl"
          >
            {ABOUT_WORDS.map((word, index) => (
              <span
                key={`${word}-${index}`}
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="inline-block text-neutral-700"
              >
                {word}
                {index < ABOUT_WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </p>
        </div>

        {/* Scene 3 — Services bento — z-30 */}
        <div
          ref={servicesRef}
          className="absolute inset-0 z-30 flex h-full w-full items-center justify-center px-6 opacity-0 sm:px-10"
          aria-label="שירותים"
        >
          <div className="grid w-full max-w-5xl grid-cols-2 gap-6" dir="rtl">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 hover:border-white/25 sm:p-8"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-white/20 group-hover:bg-white/[0.07]">
                    <Icon className="h-5 w-5 text-white/85" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white/95 sm:text-xl">
                    {service.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
