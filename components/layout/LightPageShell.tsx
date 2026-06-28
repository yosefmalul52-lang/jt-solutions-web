import type { ReactNode } from "react";

type LightPageShellProps = {
  children: ReactNode;
  className?: string;
};

/** Shared light canvas for inner pages. */
export default function LightPageShell({ children, className = "" }: LightPageShellProps) {
  return (
    <div className={`light-page-shell flex-1 ${className}`.trim()}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
