import type { ReactNode } from "react";
import HeroTypewriterHeadline from "@/components/motion/HeroTypewriterHeadline";
import SpaceSectionBackdrop from "@/components/motion/SpaceSectionBackdrop";
import ServiceGlitchCard from "@/components/sections/ServiceGlitchCard";
import SectionShell from "@/components/ui/SectionShell";
import { heroCopy } from "@/lib/hero-content";
import { pillarList } from "@/lib/pillars";

const ABOUT_LINES = [
  "אנחנו לא רק בונים אתרים.",
  "אנחנו מהנדסים חוויות דיגיטליות, מתכננים מערכות אוטומטיות, וכותבים מסרים שממירים — מאפיון ראשון ועד פנייה בפועל, הכל במעטפת אחת, בלי לרדוף אחרי חמישה ספקים שונים.",
  "כל מה שאנחנו בונים מכוון להמרה: פחות בזבוז, יותר פניות איכותיות, ויותר מכירות לעסק שלך.",
] as const;

function ScribbleMark({ variant }: { variant: 1 | 2 }) {
  const path =
    variant === 1
      ? "M2 8 C28 3, 52 11, 88 5 S 118 3, 118 3"
      : "M2 6 C36 10, 58 2, 96 8 S 118 5, 118 5";
  const gradientId = `about-scribble-grad-${variant}`;

  return (
    <svg
      className="about-scribble-mark"
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type SpaceOdysseyProps = {
  children?: ReactNode;
};

export default function SpaceOdyssey({ children }: SpaceOdysseyProps) {
  return (
    <div className="bg-[#06060a]">
      <SpaceSectionBackdrop slice="hero">
        <section
          id="hero"
          aria-label="מבוא"
          className="flex min-h-[calc(78svh+260px)] items-center justify-center px-6 py-24 sm:px-10 sm:py-28"
        >
          <div className="max-w-4xl text-center -translate-y-8 sm:-translate-y-12" dir="rtl">
            <HeroTypewriterHeadline
              lines={[heroCopy.h1Line1, heroCopy.h1Line2]}
              titleClassName="hero-ref-title"
              lineClassName="block min-h-[1.05em] contact-headline__line contact-headline__line--white"
              accentClassName="contact-headline__line contact-headline__line--spectrum mt-2 block min-h-[1.05em] sm:mt-3"
              charDelay={42}
              linePause={420}
              startDelay={650}
            />
            <p className="premium-subtitle mx-auto mt-8 max-w-2xl">{heroCopy.subline}</p>
          </div>
        </section>
      </SpaceSectionBackdrop>

      <SectionShell
        id="about"
        ariaLabel="מי אנחנו"
        className="!bg-transparent -mt-6 !py-8 md:-mt-10 md:!py-10 lg:!py-12"
        style={{ background: "transparent" }}
      >
        <div dir="rtl">
          <div className="about-section__heading">
            <h2 className="premium-title about-section__title text-center">מי אנחנו</h2>
            <div className="about-scribble-marks" aria-hidden>
              <ScribbleMark variant={1} />
              <ScribbleMark variant={2} />
            </div>
          </div>

          <div className="about-copy-lines">
            {ABOUT_LINES.map((line) => (
              <p key={line} className="about-copy-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="services"
        ariaLabel="שירותים"
        className="py-16 md:py-20"
        style={{ background: "#06060a" }}
      >
        <div dir="rtl">
          <div className="service-cards-row flex flex-col gap-3 lg:h-[min(520px,58vh)] lg:flex-row lg:items-stretch">
            {pillarList.map((pillar) => (
              <ServiceGlitchCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>
        </div>
      </SectionShell>

      {children}
    </div>
  );
}
