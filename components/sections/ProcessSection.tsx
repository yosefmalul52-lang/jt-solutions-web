"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import ScrollTimeline from "@/components/motion/ScrollTimeline";
import SectionHeader from "@/components/ui/SectionHeader";
import { processSteps } from "@/lib/home-funnel";
import { EASE_OUT, timelineNodeVariants } from "@/lib/motion";

const STEP_COLORS = ["#2563EB", "#06B6D4", "#7C3AED", "#10B981"] as const;

export default function ProcessSection() {
  const reduce = useReducedMotion();
  const nodeVariants = timelineNodeVariants(reduce);

  const mobileSteps = processSteps.map((step) => ({
    id: step.step,
    label: (
      <>
        <span className="text-xs font-bold text-sky-600">{step.step}</span>
        <h3 className="mt-1 text-lg font-bold text-slate-900">{step.title}</h3>
      </>
    ),
    content: <p className="text-sm leading-relaxed text-slate-600">{step.text}</p>,
  }));

  return (
    <section id="process" className="home-section home-section--alt section-shell" dir="rtl">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="איך עובדים איתנו"
          before="תהליך "
          accent="ברור"
          after=" — ארבעה שלבים"
          accentColor="#10B981"
          subline="אבחון, אפיון, בנייה ומדידה — עם שקיפות מלאה לאורך הדרך."
        />

        <div className="mt-10 hidden lg:block">
          <div className="relative mb-10 h-0.5 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="absolute inset-y-0 right-0 rounded-full"
              style={{ background: "linear-gradient(270deg, #2563eb, #06b6d4, #7c3aed, #10b981)" }}
              initial={{ width: reduce ? "100%" : 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduce ? 0.01 : 1, ease: EASE_OUT }}
            />
          </div>

          <ol className="grid grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.li
                key={step.title}
                className="home-process-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={nodeVariants}
                transition={{ delay: reduce ? 0 : index * 0.08 }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: STEP_COLORS[index % STEP_COLORS.length] }}
                  >
                    {step.step}
                  </span>
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: `color-mix(in srgb, ${STEP_COLORS[index % STEP_COLORS.length]} 14%, #fff)`, color: STEP_COLORS[index % STEP_COLORS.length] }}
                    aria-hidden
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-10 lg:hidden">
          <ScrollTimeline steps={mobileSteps} orientation="vertical" />
        </div>
      </div>
    </section>
  );
}
