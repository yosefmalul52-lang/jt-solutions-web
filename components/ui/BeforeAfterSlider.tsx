"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { GripVertical } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { SPRING_SNAPPY } from "@/lib/motion";

export type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "לפני",
  afterAlt = "אחרי",
  beforeLabel = "לפני",
  afterLabel = "אחרי",
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);
  const [ariaValue, setAriaValue] = useState(50);

  const position = useMotionValue(50);
  const handleLeft = useTransform(position, (v) => `${v}%`);
  const beforeClip = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);

  useMotionValueEvent(position, "change", (latest) => {
    setAriaValue(Math.round(latest));
  });

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = clientX - rect.left;
      const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
      position.set(pct);
    },
    [position],
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduce) return;
      event.preventDefault();
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFromClientX(event.clientX);
    },
    [reduce, updateFromClientX],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || reduce) return;
      event.preventDefault();
      updateFromClientX(event.clientX);
    },
    [isDragging, reduce, updateFromClientX],
  );

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const step = event.shiftKey ? 10 : 2;
      const current = position.get();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        position.set(Math.max(0, current - step));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        position.set(Math.min(100, current + step));
      } else if (event.key === "Home") {
        event.preventDefault();
        position.set(0);
      } else if (event.key === "End") {
        event.preventDefault();
        position.set(100);
      }
    },
    [position],
  );

  return (
    <div className={`before-after-slider-wrap ${className}`.trim()} dir="ltr">
      <p className="text-center text-sm text-slate-500 mb-4" dir="rtl">
        גררו את המחוון להשוואה בין לפני לאחרי
      </p>

      <div
        ref={containerRef}
        className={`before-after-slider ${isDragging ? "before-after-slider--dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        role="slider"
        aria-label="השוואת לפני ואחרי"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValue}
        tabIndex={0}
      >
        <div className="before-after-slider-stage">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
            priority={false}
            draggable={false}
          />

          <motion.div className="before-after-slider-before" style={{ clipPath: beforeClip }}>
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              priority={false}
              draggable={false}
            />
          </motion.div>

          {hydrated && !reduce ? (
            <motion.div
              className="before-after-slider-handle"
              style={{ left: handleLeft }}
              transition={isDragging ? { duration: 0 } : { type: "spring", ...SPRING_SNAPPY }}
            >
              <div className="before-after-slider-handle-line" aria-hidden />
              <div className="before-after-slider-handle-grip" aria-hidden>
                <GripVertical size={16} className="text-slate-600" />
              </div>
            </motion.div>
          ) : (
            <div className="before-after-slider-handle" style={{ left: "50%" }}>
              <div className="before-after-slider-handle-line" aria-hidden />
              <div className="before-after-slider-handle-grip" aria-hidden>
                <GripVertical size={16} className="text-slate-600" />
              </div>
            </div>
          )}

          <span className="before-after-slider-label before-after-slider-label--before">{beforeLabel}</span>
          <span className="before-after-slider-label before-after-slider-label--after">{afterLabel}</span>
        </div>
      </div>
    </div>
  );
}
