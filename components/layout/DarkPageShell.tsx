import type { ReactNode } from "react";

type DarkPageShellProps = {
  children: ReactNode;
  className?: string;
};

/** Shared dark cinematic canvas for inner pages (matches homepage Hero). */
export default function DarkPageShell({ children, className = "" }: DarkPageShellProps) {
  return (
    <div className={`dark-page-shell flex-1 ${className}`.trim()}>
      <div aria-hidden className="dark-page-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="dark-page-grid pointer-events-none absolute inset-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
