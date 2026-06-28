"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT, STAGGER_TIGHT } from "@/lib/motion";

const STEPS = [
  { num: "1", label: "שולחים פרטים", color: "#2563EB" },
  { num: "2", label: "בודקים את העסק", color: "#06B6D4" },
  { num: "3", label: "מקבלים כיוון", color: "#10B981" },
] as const;

export default function DiagnosticFormProgress() {
  const reduce = useReducedMotion();

  return (
    <ol className="diagnostic-form-progress" aria-label="שלבי האבחון">
      {STEPS.map((step, index) => (
        <li key={step.num} className="diagnostic-form-progress__step">
          <motion.span
            className="diagnostic-form-progress__num"
            style={{ background: step.color }}
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduce ? 0.01 : 0.35, delay: reduce ? 0 : index * STAGGER_TIGHT, ease: EASE_OUT }}
            aria-hidden
          >
            {step.num}
          </motion.span>
          <motion.span
            className="diagnostic-form-progress__label"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduce ? 0.01 : 0.4, delay: reduce ? 0 : index * STAGGER_TIGHT + 0.04, ease: EASE_OUT }}
          >
            {step.label}
          </motion.span>
          {index < STEPS.length - 1 ? (
            <span className="diagnostic-form-progress__connector" aria-hidden>
              <motion.span
                className="diagnostic-form-progress__connector-fill"
                initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: reduce ? 0.01 : 0.5, delay: reduce ? 0 : index * STAGGER_TIGHT + 0.12, ease: EASE_OUT }}
                style={{ transformOrigin: "right center" }}
              />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
