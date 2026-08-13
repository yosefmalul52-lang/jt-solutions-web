"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";

export type FloatingMockupProps = {
  src: string;
  alt: string;
  variant?: "laptop" | "mobile" | "auto";
  className?: string;
  showCaption?: boolean;
};

function LaptopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="floating-mockup-laptop">
      <div className="floating-mockup-laptop-lid">
        <div className="floating-mockup-laptop-camera" aria-hidden />
        <div className="floating-mockup-laptop-screen">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 90vw, 720px"
            priority={false}
            draggable={false}
          />
        </div>
      </div>
      <div className="floating-mockup-laptop-base" aria-hidden>
        <div className="floating-mockup-laptop-notch" />
      </div>
    </div>
  );
}

function MobileFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="floating-mockup-mobile">
      <div className="floating-mockup-mobile-island" aria-hidden />
      <div className="floating-mockup-mobile-screen">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 80vw, 320px"
          priority={false}
          draggable={false}
        />
      </div>
      <div className="floating-mockup-mobile-home" aria-hidden />
    </div>
  );
}

export default function FloatingMockup({
  src,
  alt,
  variant = "auto",
  className = "",
  showCaption = true,
}: FloatingMockupProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();

  const floatAnimation =
    hydrated && reduce !== true
      ? {
          y: [0, -10, 0],
          transition: {
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        }
      : undefined;

  return (
    <div className={`floating-mockup-wrap ${className}`.trim()} dir="rtl">
      {showCaption ? (
        <p className="text-center text-sm text-slate-500 mb-6">
          תצוגה חיה של נכס דיגיטלי - מהיר, מדויק ומוכן לצמיחה
        </p>
      ) : null}

      <motion.div
        className="floating-mockup-inner"
        animate={floatAnimation}
        initial={false}
      >
        {variant === "laptop" ? (
          <LaptopFrame src={src} alt={alt} />
        ) : variant === "mobile" ? (
          <MobileFrame src={src} alt={alt} />
        ) : (
          <>
            <div className="hidden md:block">
              <LaptopFrame src={src} alt={alt} />
            </div>
            <div className="md:hidden flex justify-center">
              <MobileFrame src={src} alt={alt} />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
