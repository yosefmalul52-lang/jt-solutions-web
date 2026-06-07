import type { CSSProperties, ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Wrap children in max-w-6xl container (default true) */
  contain?: boolean;
  ariaLabel?: string;
};

export default function SectionShell({
  children,
  id,
  className = "",
  style,
  contain = true,
  ariaLabel,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={[
        "section-shell bg-[#0B0F19] py-16 md:py-24 lg:py-32",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ background: "var(--section-gradient)", ...style }}
    >
      {contain ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
