"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import JourneyPathBgCorner from "@/components/sections/JourneyPathBgCorner";
import ProblemScrollThreadJourney from "@/components/sections/ProblemScrollThreadJourney";
import { problemSection } from "@/lib/home-funnel";

export default function ProblemSection() {
  return (
    <section id="problem" className="home-section home-section--alt section-shell stjourney-section" dir="rtl">
      <JourneyPathBgCorner position="top-right" />
      <JourneyPathBgCorner position="bottom-left" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          before="כל השירותים שהעסק שלך צריך עובדים יחד, תחת "
          accent="ספק אחד"
          accentColor="#2563EB"
          subline={problemSection.subline}
        />

        <div className="mt-6 lg:mt-8">
          <ProblemScrollThreadJourney />
        </div>
      </div>
    </section>
  );
}
