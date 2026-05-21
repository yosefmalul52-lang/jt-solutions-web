"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { accordionPanelTransition } from "@/lib/motion";
import { homeFaqItems } from "@/lib/seo/home-faq";

/** עיצוב כרטיסיית "תשתית עמוקה וצמיחה" ב-Pricing (מסלול לא-popular) */
const DEEP_GROWTH_CARD = {
  borderColor: "rgba(14,165,233,0.32)",
  background:
    "linear-gradient(165deg, rgba(240,249,255,0.94) 0%, rgba(247,252,255,0.96) 55%, rgba(255,255,255,1) 100%)",
  titleColor: "#0c4a6e",
  accentColor: "#0369a1",
  shadow: "0 14px 34px -24px rgba(15,23,42,0.26)",
} as const;

export default function HomeFaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const panelTransition = accordionPanelTransition(reduce);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {homeFaqItems.map((item, i) => {
        const isOpen = open === i;

        return (
          <div
            key={item.question}
            className={`relative overflow-hidden rounded-[var(--radius-soft)] border transition-all duration-300 ${
              isOpen
                ? "shadow-[0_14px_34px_-24px_rgba(15,23,42,0.26)]"
                : "border-slate-200/90 bg-white shadow-[0_1px_4px_rgba(15,23,42,0.05)] hover:border-slate-200 hover:bg-[rgba(79,70,229,0.03)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            }`}
            style={
              isOpen
                ? {
                    borderColor: DEEP_GROWTH_CARD.borderColor,
                    background: DEEP_GROWTH_CARD.background,
                    boxShadow: DEEP_GROWTH_CARD.shadow,
                  }
                : undefined
            }
          >
            {isOpen ? (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-3 right-0 w-[3px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(14,165,233,0.85) 0%, rgba(56,189,248,0.65) 100%)",
                }}
              />
            ) : null}

            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right transition-colors duration-200 md:px-6 md:py-5"
              aria-expanded={isOpen}
            >
              <span
                className="flex-1 text-[0.9375rem] font-semibold leading-snug md:text-base"
                style={isOpen ? { color: DEEP_GROWTH_CARD.titleColor } : { color: "#1e293b" }}
              >
                {item.question}
              </span>

              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  isOpen ? "border border-sky-200/80 bg-sky-50" : "bg-slate-100"
                }`}
              >
                <ChevronDown
                  size={18}
                  strokeWidth={2.25}
                  className="transition-transform duration-300 ease-out"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: isOpen ? DEEP_GROWTH_CARD.accentColor : "#64748b",
                  }}
                />
              </span>
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
                  <p
                    className="border-t px-5 pb-5 pt-3 text-[0.9375rem] leading-[1.85] md:px-6 md:pb-6"
                    style={{
                      borderColor: "rgba(14,165,233,0.18)",
                      color: "#334155",
                    }}
                  >
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
