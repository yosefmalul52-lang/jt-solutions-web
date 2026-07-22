"use client";

import { motion, useReducedMotion } from "framer-motion";
import CtaButton, { type CtaButtonProps } from "@/components/ui/CtaButton";
import { useMagnetic } from "@/hooks/useMagnetic";

/** Homepage hero CTA — enterprise primary + subtle magnetic pull on desktop. */
export default function HomeCtaButton({
  variant = "primary",
  shine = "auto",
  hideIcon = false,
  ...props
}: CtaButtonProps) {
  const reduce = useReducedMotion();
  const { ref, x, y, handlers, disabled } = useMagnetic({
    strength: 0.18,
    radius: 68,
    disabled: reduce === true,
  });

  return (
    <motion.div
      ref={ref}
      className="inline-flex max-w-full"
      style={disabled ? undefined : { x, y }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      {...(disabled ? {} : handlers)}
    >
      <CtaButton variant={variant} shine={shine} hideIcon={hideIcon} {...props} />
    </motion.div>
  );
}
