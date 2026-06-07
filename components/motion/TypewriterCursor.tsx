"use client";

type TypewriterCursorProps = {
  visible?: boolean;
  className?: string;
};

export default function TypewriterCursor({ visible = true, className = "" }: TypewriterCursorProps) {
  return (
    <span
      aria-hidden
      className={`hero-typewriter-cursor inline-block w-[2px] shrink-0 bg-blue-400/90 ${visible ? "" : "opacity-0"} ${className}`.trim()}
    />
  );
}
