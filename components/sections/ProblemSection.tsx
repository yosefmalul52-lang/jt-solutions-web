"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { problemSection } from "@/lib/home-funnel";
import ProblemScrollThreadJourney from "@/components/sections/ProblemScrollThreadJourney";

export default function ProblemSection() {
  return (
    <section id="problem" className="home-section home-section--alt section-shell stjourney-section" dir="rtl">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="הבעיה"
          before="רוב העסקים לא נופלים בגלל שאין להם אתר — "
          accent="הם נופלים בנקודות החיבור"
          accentColor="#2563EB"
          subline={problemSection.subline}
        />

        <div className="mt-10 lg:mt-12">
          <ProblemScrollThreadJourney />
        </div>
      </div>
    </section>
  );
}
