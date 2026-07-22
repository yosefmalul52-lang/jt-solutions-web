"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, STAGGER_TIGHT } from "@/lib/motion";

export type DiagnosticFormPhase = "ready" | "sending" | "done";

const STEPS = [
  { num: "1", label: "אתם שולחים פרטים" },
  { num: "2", label: "בודקים יחד את העסק" },
  { num: "3", label: "מקבלים כיוון ברור" },
] as const;

type DiagnosticFormProgressProps = {
  phase?: DiagnosticFormPhase;
};

function stepState(index: number, phase: DiagnosticFormPhase): "done" | "active" | "upcoming" {
  if (phase === "done") return "done";
  if (phase === "sending") {
    if (index === 0) return "done";
    if (index === 1) return "active";
    return "upcoming";
  }
  if (index === 0) return "active";
  return "upcoming";
}

export default function DiagnosticFormProgress({ phase = "ready" }: DiagnosticFormProgressProps) {
  const reduce = useReducedMotion();

  return (
    <ol className="diagnostic-form-progress" aria-label="שלבי האבחון">
      {STEPS.map((step, index) => {
        const state = stepState(index, phase);
        return (
          <li
            key={step.num}
            className={cn(
              "diagnostic-form-progress__step",
              state === "active" && "diagnostic-form-progress__step--active",
              state === "done" && "diagnostic-form-progress__step--done",
            )}
            aria-current={state === "active" ? "step" : undefined}
          >
            <motion.span
              className="diagnostic-form-progress__num"
              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduce ? 0.01 : 0.35,
                delay: reduce ? 0 : index * STAGGER_TIGHT,
                ease: EASE_OUT,
              }}
              aria-hidden
            >
              {state === "done" ? <Check size={12} strokeWidth={3} /> : step.num}
            </motion.span>
            <motion.span
              className="diagnostic-form-progress__label"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduce ? 0.01 : 0.4,
                delay: reduce ? 0 : index * STAGGER_TIGHT + 0.04,
                ease: EASE_OUT,
              }}
            >
              {step.label}
            </motion.span>
            {index < STEPS.length - 1 ? (
              <span
                className={cn(
                  "diagnostic-form-progress__connector",
                  (state === "done" || (phase === "sending" && index === 0) || phase === "done") &&
                    "diagnostic-form-progress__connector--filled",
                )}
                aria-hidden
              >
                <motion.span
                  className="diagnostic-form-progress__connector-fill"
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: reduce ? 0.01 : 0.5,
                    delay: reduce ? 0 : index * STAGGER_TIGHT + 0.12,
                    ease: EASE_OUT,
                  }}
                  style={{ transformOrigin: "right center" }}
                />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
