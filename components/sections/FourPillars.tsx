"use client";

import { motion, useReducedMotion } from "framer-motion";
import MaskedHeadline from "@/components/motion/MaskedHeadline";
import Reveal from "@/components/motion/Reveal";
import PillarCard from "@/components/ui/PillarCard";
import SectionShell from "@/components/ui/SectionShell";
import { useHydrated } from "@/hooks/useHydrated";
import { pillarList } from "@/lib/pillars";
import { viewport as motionViewport, staggerVariants } from "@/lib/motion";

type PillarsGridProps = {
  className?: string;
};

export function PillarsGrid({ className = "" }: PillarsGridProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const useMotion = hydrated && reduce !== true;
  const { container, item } = staggerVariants(useMotion ? reduce : null);

  const GridWrap = useMotion ? motion.ul : "ul";
  const GridItem = useMotion ? motion.li : "li";
  const gridWrapProps = useMotion
    ? {
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: motionViewport.sectionLoose,
      }
    : {};
  const gridItemProps = useMotion ? { variants: item } : {};

  return (
    <GridWrap
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 list-none p-0 m-0 ${className}`.trim()}
      {...gridWrapProps}
    >
      {pillarList.map((pillar) => (
        <GridItem key={pillar.slug} {...gridItemProps}>
          <PillarCard
            href={pillar.path}
            title={pillar.title}
            tagline={pillar.tagline}
            icon={pillar.icon}
            accentRgb={pillar.accentRgb}
            accentSecondaryRgb={pillar.accentSecondaryRgb}
            magnetic
          />
        </GridItem>
      ))}
    </GridWrap>
  );
}

type FourPillarsProps = {
  /** Hide section header — useful when embedding elsewhere */
  showHeader?: boolean;
};

export default function FourPillars({ showHeader = true }: FourPillarsProps) {
  return (
    <SectionShell id="services">
      {showHeader ? (
        <div className="text-center mb-12 md:mb-16" dir="rtl">
          <MaskedHeadline
            as="h2"
            className="premium-title mb-4"
            viewportKey="sectionLoose"
            lines={[
              <>
                <span className="gradient-text">ארבעה תחומים.</span> מעטפת אחת.
              </>,
            ]}
          />
          <p className="premium-subtitle max-w-2xl mx-auto">
            מהקמה ועד צמיחה — בוחרים מסלול מלא או ממוקד לפי שלב העסק.
          </p>
        </div>
      ) : null}

      <Reveal viewportKey="sectionLoose" y={16} duration={0.55}>
        <PillarsGrid />
      </Reveal>
    </SectionShell>
  );
}
