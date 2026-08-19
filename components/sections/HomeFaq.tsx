"use client";

import HomeFaqAccordion from "@/components/sections/HomeFaqAccordion";
import SectionHeader from "@/components/ui/SectionHeader";

export default function HomeFaq() {
  return (
    <section id="faq" className="home-section home-section--alt home-section--faq section-shell" dir="rtl">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="mb-8 md:mb-10"
          before="שאלות "
          accent="שחוזרות"
          after=" לפני שמתחילים.."
          accentColor="#2563EB"
        />

        <HomeFaqAccordion />
      </div>
    </section>
  );
}
