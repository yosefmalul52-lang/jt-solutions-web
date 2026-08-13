"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import {
  DURATION_REVEAL,
  EASE_OUT,
  STAGGER_TIGHT,
  motionTransition,
  viewport,
  type ViewportKey,
} from "@/lib/motion";

type HeadlineTag = "h1" | "h2";

type MaskedHeadlineProps = {
  as: HeadlineTag;
  className?: string;
  children?: ReactNode;
  /** Explicit lines - each renders as a masked row (best for `<br />` + gradient spans). */
  lines?: ReactNode[];
  /** `line` = row-by-row; `word` = split text nodes by spaces (single-line plain text). */
  mode?: "line" | "word";
  viewportKey?: ViewportKey;
  delay?: number;
};

function splitChildrenIntoLines(children: ReactNode): ReactNode[] {
  const result: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "br") {
      return;
    }
    if (typeof child === "string") {
      const parts = child.split("\n").filter((p) => p.length > 0);
      parts.forEach((part) => result.push(part));
      return;
    }
    result.push(child);
  });
  return result.length > 0 ? result : [children];
}

function splitWords(node: ReactNode): ReactNode[] {
  if (typeof node === "string") {
    return node.split(/(\s+)/).filter((w) => w.length > 0);
  }
  return [node];
}

export default function MaskedHeadline({
  as,
  className = "",
  children,
  lines: linesProp,
  mode = "line",
  viewportKey = "section",
  delay = 0,
}: MaskedHeadlineProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const vp = viewport[viewportKey];
  const Tag = as === "h1" ? motion.h1 : motion.h2;

  const lines = linesProp ?? splitChildrenIntoLines(children);

  if (!hydrated) {
    const StaticTag = as;
    return (
      <StaticTag className={className} suppressHydrationWarning>
        {linesProp
          ? lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))
          : children}
      </StaticTag>
    );
  }

  if (reduce) {
    const StaticTag = as;
    return (
      <StaticTag className={className}>
        {linesProp
          ? lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))
          : children}
      </StaticTag>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: STAGGER_TIGHT,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: motionTransition(false, { duration: DURATION_REVEAL, ease: EASE_OUT }),
    },
  };

  if (mode === "word" && lines.length === 1 && typeof lines[0] === "string") {
    const words = splitWords(lines[0]);
    return (
      <Tag
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        {words.map((word, i) =>
          typeof word === "string" && /^\s+$/.test(word) ? (
            <span key={i}>{word}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={itemVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ),
        )}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span variants={itemVariants} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
