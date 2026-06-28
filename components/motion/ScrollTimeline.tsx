"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { timelineNodeVariants } from "@/lib/motion";

export type ScrollTimelineStep = {
  id: string;
  label: ReactNode;
  content?: ReactNode;
};

type ScrollTimelineProps = {
  steps: readonly ScrollTimelineStep[];
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export default function ScrollTimeline({
  steps,
  className = "",
  orientation = "vertical",
}: ScrollTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const nodeVariants = timelineNodeVariants(reduce);
  const isVertical = orientation === "vertical";

  return (
    <div
      ref={ref}
      className={`premium-scroll-timeline premium-scroll-timeline--${orientation} ${className}`.trim()}
      dir="rtl"
    >
      <div className="premium-scroll-timeline__track" aria-hidden>
        {hydrated && !reduce ? (
          <motion.div className="premium-scroll-timeline__progress" style={{ [isVertical ? "height" : "width"]: progress }} />
        ) : (
          <div className="premium-scroll-timeline__progress premium-scroll-timeline__progress--static" />
        )}
      </div>

      <ol className="premium-scroll-timeline__steps">
        {steps.map((step, index) => (
          <motion.li
            key={step.id}
            className="premium-scroll-timeline__step"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
            variants={nodeVariants}
            transition={{ delay: reduce ? 0 : index * 0.08 }}
          >
            <span className="premium-scroll-timeline__node" aria-hidden />
            <div className="premium-scroll-timeline__body">
              <div className="premium-scroll-timeline__label">{step.label}</div>
              {step.content ? <div className="premium-scroll-timeline__content">{step.content}</div> : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
