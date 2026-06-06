"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, MoveLeft } from "lucide-react";
import { staggerVariants } from "@/lib/motion";
import CtaButton from "@/components/ui/CtaButton";
import { useHydrated } from "@/hooks/useHydrated";
import { trackCtaClick } from "@/lib/analytics/track";

const trustItems = [
  { text: "מענה אישי תוך 24 שעות" },
  { text: "ליווי ישיר 1:1" },
  { text: "תהליך ברור מהיום הראשון" },
];

const heroBlobs = [
  {
    className: "absolute top-[8%] right-[4%] w-[22rem] h-[22rem] max-w-[50vw] rounded-full",
    style: { backgroundColor: "rgba(91,33,182,0.34)", filter: "blur(42px)" },
  },
  {
    className: "absolute bottom-[10%] left-[2%] w-[28rem] h-[28rem] max-w-[55vw] rounded-full",
    style: { backgroundColor: "rgba(16,179,231,0.3)", filter: "blur(46px)" },
  },
  {
    className: "absolute top-[32%] left-[-4%] w-[18rem] h-[18rem] max-w-[42vw] rounded-full",
    style: { backgroundColor: "rgba(79,70,229,0.28)", filter: "blur(38px)" },
  },
  {
    className: "absolute bottom-[36%] right-[2%] w-80 h-80 max-w-[44vw] rounded-full",
    style: { backgroundColor: "rgba(129,140,248,0.28)", filter: "blur(40px)" },
  },
] as const;

export default function Hero() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const useMotion = hydrated && reduce !== true;
  const { container: heroStagger, item: heroItemUp } = staggerVariants(useMotion ? reduce : null);

  const Wrap = useMotion ? motion.div : "div";
  const Item = useMotion ? motion.div : "div";
  const Text = useMotion ? motion.p : "p";

  const wrapProps = useMotion
    ? { variants: heroStagger, initial: false as const, animate: "show" as const }
    : {};
  const itemProps = useMotion ? { variants: heroItemUp } : {};

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] grid grid-rows-[auto_1fr] overflow-hidden section-shell"
      style={{
        background: "linear-gradient(180deg, #F9FAFB 0%, #F3F6FF 42%, #F9FAFB 100%)",
      }}
    >
      <div
        aria-hidden
        className="shrink-0 h-[calc(0.75rem+74px+2.5rem)] sm:h-[calc(1rem+84px+3rem)]"
      />

      <div aria-hidden className="section-blob-layer overflow-hidden">
        {heroBlobs.map((blob) => (
          <div key={blob.className} className={blob.className} style={blob.style} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 pb-[min(10vh,5rem)]">
        <Wrap
          className="flex flex-col items-center text-center w-full"
          dir="rtl"
          {...wrapProps}
        >
          <Item className="max-w-4xl mx-auto w-full" {...itemProps}>
            <h1 className="display-title max-w-4xl mx-auto">
              <span className="block text-slate-900">מעטפת מקצה לקצה –</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10b3e7] to-[#7c3aed]">
                ממיתוג פרימיום ועד לתשתית לידים חכמה.
              </span>
            </h1>
          </Item>

          <Text
            className="max-w-3xl mx-auto w-full mt-8 sm:mt-10 text-lg sm:text-2xl font-medium leading-relaxed text-slate-500"
            {...itemProps}
          >
            בונים עבורך אתרים ממירים, דפי נחיתה, חנויות איקומרס, מיתוג ואוטומציה — אפיון חכם, עיצוב מקצועי
            ותהליך ברור שמחבר הכל לפניות אמיתיות.
          </Text>

          <Item
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 sm:mt-12"
            {...itemProps}
          >
            <CtaButton
              id="hero-main-cta"
              onClick={() => {
                trackCtaClick("hero", "אני רוצה אבחון לעסק שלי");
                scrollTo("#contact");
              }}
              icon={MoveLeft}
              label="אני רוצה אבחון לעסק שלי"
            />
          </Item>

          <Item className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5" {...itemProps}>
            {trustItems.map((item) => (
              <span
                key={item.text}
                className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-soft)] inline-flex items-center gap-1.5 border border-gray-200 bg-white"
                style={{ boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}
              >
                <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#4f46e5" }} />
                {item.text}
              </span>
            ))}
          </Item>

          <Text className="text-sm mt-5 sm:mt-6 max-w-xl mx-auto" style={{ color: "#64748B" }} {...itemProps}>
            בשיחת התאמה של כ-15 דקות תקבלו החלטה ברורה מה הצעד הבא לעסק שלכם.
          </Text>
        </Wrap>
      </div>
    </section>
  );
}
