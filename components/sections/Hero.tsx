"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, MoveLeft } from "lucide-react";
import { staggerVariants, viewport as motionViewport } from "@/lib/motion";
import CtaButton from "@/components/ui/CtaButton";

const trustItems = [
  { text: "מענה אישי תוך 24 שעות" },
  { text: "ליווי ישיר 1:1" },
  { text: "תהליך ברור מהיום הראשון" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const { container: heroStagger, item: heroItemUp } = staggerVariants(reduce);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative -mt-[90px] sm:-mt-[102px] pt-[90px] sm:pt-[102px] min-h-screen flex flex-col overflow-hidden section-shell"
      style={{ background: "linear-gradient(180deg, #F7F9FF 0%, #F9FAFB 70%, #F4F7FF 100%)" }}
    >
      <div
        aria-hidden
        className="absolute top-[8%] right-[4%] w-[22rem] h-[22rem] max-w-[50vw] rounded-full pointer-events-none"
        style={{ background: "rgba(91,33,182,0.24)", filter: "blur(48px)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[10%] left-[2%] w-[28rem] h-[28rem] max-w-[55vw] rounded-full pointer-events-none"
        style={{ background: "rgba(16,179,231,0.2)", filter: "blur(52px)" }}
      />
      <div
        aria-hidden
        className="absolute top-[32%] left-[-4%] w-[18rem] h-[18rem] max-w-[42vw] rounded-full pointer-events-none"
        style={{ background: "rgba(79,70,229,0.2)", filter: "blur(44px)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[36%] right-[2%] w-80 h-80 max-w-[44vw] rounded-full pointer-events-none"
        style={{ background: "rgba(129,140,248,0.18)", filter: "blur(46px)" }}
      />

      <div className="relative z-10 flex flex-1 flex-col w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          whileInView="show"
          viewport={motionViewport.sectionLoose}
          className="flex flex-1 flex-col"
        >
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex flex-col items-center text-center" dir="rtl">
              <motion.h1 variants={heroItemUp} className="display-title max-w-4xl mx-auto">
                פתרונות דיגיטל מקצה לקצה:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b3e7] to-[#7c3aed]">
                  מהמיתוג ועד המכירה הראשונה
                </span>
                .
              </motion.h1>

              <motion.h2
                variants={heroItemUp}
                className="max-w-3xl mx-auto text-lg sm:text-2xl font-medium leading-relaxed mt-6"
                style={{ color: "#6B7280" }}
              >
                בונים עבורך את התשתית הטכנולוגית שתעבוד בשבילך – אפיון חכם, עיצוב מנצח ואוטומציות שחוסכות זמן.
              </motion.h2>

              <motion.div
                variants={heroItemUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
              >
                <CtaButton
                  id="hero-main-cta"
                  onClick={() => scrollTo("#contact")}
                  icon={MoveLeft}
                  label="אני רוצה אבחון לעסק שלי"
                />
                <CtaButton
                  onClick={() => scrollTo("#services")}
                  icon={MoveLeft}
                  variant="secondary"
                  label="איך זה עובד?"
                />
              </motion.div>

              <motion.div variants={heroItemUp} className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
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
              </motion.div>

              <motion.p variants={heroItemUp} className="text-sm mt-4 max-w-xl" style={{ color: "#64748B" }}>
                בשיחת התאמה של כ-15 דקות תקבלו החלטה ברורה מה הצעד הבא לעסק שלכם.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
