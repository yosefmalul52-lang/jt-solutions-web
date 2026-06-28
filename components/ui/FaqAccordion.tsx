"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { accordionPanelTransition } from "@/lib/motion";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const panelTransition = accordionPanelTransition(reduce);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <div key={item.question} className="home-faq-item overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-right transition-colors duration-200 ${
                isOpen ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
              }`}
              aria-expanded={isOpen}
            >
              <span className="flex-1 text-sm font-semibold leading-snug md:text-base">
                {item.question}
              </span>
              <ChevronDown
                size={17}
                className="shrink-0 text-slate-400 transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                aria-hidden
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={panelTransition}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600 md:text-[0.9375rem] md:leading-[1.8]">
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
