"use client";

import HomeFaqAccordion from "@/components/sections/HomeFaqAccordion";
import MaskedHeadline from "@/components/motion/MaskedHeadline";

export default function HomeFaq() {
  return (
    <section
      id="faq"
      className="py-16 md:py-24 pb-12 md:pb-16 section-shell bg-[#F9FAFB]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12" dir="rtl">
          <MaskedHeadline
            as="h2"
            className="premium-title"
            viewportKey="section"
            lines={[
              <>
                שאלות <span className="gradient-text">נפוצות</span>
              </>,
            ]}
          />
          <p className="premium-subtitle mt-3">תשובות קצרות לפני שמתחילים</p>
        </div>

        <div dir="rtl">
          <HomeFaqAccordion />
        </div>
      </div>
    </section>
  );
}
