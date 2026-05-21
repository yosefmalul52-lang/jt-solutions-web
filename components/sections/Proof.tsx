"use client";

import dynamic from "next/dynamic";

function ProofSkeleton() {
  return (
    <section
      id="proof"
      className="overflow-x-hidden py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F9FAFB 0%, #F2F6FC 50%, #F9FAFB 100%)" }}
      aria-hidden
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="mx-auto mb-14 h-28 max-w-3xl rounded-2xl bg-slate-200/40" />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`pillar-skel-${i}`} className="h-44 rounded-[var(--radius-soft)] bg-slate-200/40" />
            ))}
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`stat-skel-${i}`} className="h-40 rounded-[var(--radius-soft)] bg-slate-200/40" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ProofContent = dynamic(() => import("@/components/sections/ProofContent"), {
  ssr: false,
  loading: () => <ProofSkeleton />,
});

export default function Proof() {
  return <ProofContent />;
}
