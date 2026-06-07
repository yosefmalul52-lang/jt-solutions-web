"use client";

import { useMemo } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

function buildStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: (id * 17.31) % 100,
    y: 22 + ((id * 23.77) % 78),
    size: 0.5 + (id % 4) * 0.3,
    opacity: 0.12 + (id % 6) * 0.06,
    duration: 32 + (id % 11) * 8,
    delay: (id % 13) * 0.85,
  }));
}

/** CSS-only starfield — avoids Framer Motion SSR hydration mismatches */
export default function Starfield() {
  const stars = useMemo(() => buildStars(75), []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="hero-star absolute rounded-full bg-white motion-reduce:animate-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
