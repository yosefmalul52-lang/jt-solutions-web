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
    <div className="divide-y divide-slate-100">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full flex items-center justify-between gap-4 py-5 text-right transition-colors duration-150 cursor-pointer ${
              open === i ? "text-slate-900" : "text-slate-700 hover:text-slate-900"
            }`}
            aria-expanded={open === i}
          >
            <span className="text-[0.9375rem] font-semibold leading-snug">{item.question}</span>
            <ChevronDown
              size={17}
              className="shrink-0 transition-all duration-200"
              style={{
                color: open === i ? "#4f46e5" : "#94a3b8",
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={panelTransition}
                className="overflow-hidden"
              >
                <p className="pb-5 text-[0.9375rem] leading-[1.8] text-slate-500">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
