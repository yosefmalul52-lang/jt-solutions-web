import type { ReactNode } from "react";

type PricingCardShapeId = "digital-start" | "ready-to-advertise" | "leads-system";

type PricingCardShapeProps = {
  id: PricingCardShapeId;
};

const SHAPES: Record<PricingCardShapeId, ReactNode> = {
  "digital-start": (
    <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 192 256 C 192 220.654 163.346 192 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 L 64 0 C 64 35.346 92.654 64 128 64 C 163.346 64 192 35.346 192 0 Z" />
  ),
  "ready-to-advertise": (
    <path d="M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z" />
  ),
  "leads-system": (
    <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
  ),
};

export default function PricingCardShape({ id }: PricingCardShapeProps) {
  return (
    <svg
      className={`home-pricing-card__shape home-pricing-card__shape--${id}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden
    >
      {SHAPES[id]}
    </svg>
  );
}
