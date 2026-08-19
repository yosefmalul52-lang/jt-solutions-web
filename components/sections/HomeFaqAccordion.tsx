"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { accordionPanelTransition } from "@/lib/motion";
import { homeFaqItems } from "@/lib/seo/home-faq";

export default function HomeFaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const panelTransition = accordionPanelTransition(reduce);

  return (
    <div className="flex flex-col gap-4">
      {homeFaqItems.map((item, i) => {
        const isOpen = open === i;

        return (
          <div key={item.question} className={`home-faq-item overflow-hidden ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className={`flex w-full items-center justify-between gap-5 px-6 py-5 text-right transition-colors duration-200 sm:px-7 sm:py-6 ${
                isOpen ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
              }`}
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-base font-semibold leading-snug sm:text-lg">
                {item.question}
              </span>

              <span className="faq-plus" aria-hidden />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={panelTransition}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-[0.9375rem] leading-relaxed text-slate-600 sm:px-7 sm:pb-6 sm:text-base sm:leading-[1.75]">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
