"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import MaskedHeadline from "@/components/motion/MaskedHeadline";
import Reveal from "@/components/motion/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import SectionShell from "@/components/ui/SectionShell";

const aboutBullets = [
  "ליווי ישיר 1:1 — תמיד יודעים עם מי מדברים",
  "תהליך ברור — מהיום הראשון ועד עלייה לאוויר",
  "מענה תוך 24 שעות — החלטות מהירות, בלי המתנה",
] as const;

export default function AboutBrief() {
  return (
    <SectionShell id="about">
      <Reveal viewportKey="sectionLoose" y={20} duration={0.6}>
        <GlassCard className="overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center" dir="rtl">
            <div>
              <MaskedHeadline
                as="h2"
                className="premium-title mb-5"
                viewportKey="sectionLoose"
                lines={["מי אנחנו"]}
              />
              <p className="text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl">
                JT Solutions היא מעטפת דיגיטלית אחת לעסקים בישראל. יוסף מלול מלווה אתכם
                מהאפיון ועד לידים שמגיעים — בלי לרדוף אחרי מספר ספקים, בלי כאב ראש טכני.
              </p>
              <ul className="mt-6 space-y-3">
                {aboutBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 transition-colors hover:text-white"
              >
                קראו עוד עלינו
                <ArrowLeft className="h-4 w-4 scale-x-[-1]" aria-hidden />
              </Link>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-[var(--radius)] border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <Image
                  src="/logo.png"
                  alt="JT Solutions"
                  width={120}
                  height={120}
                  className="h-16 w-auto sm:h-20 object-contain opacity-95"
                  sizes="120px"
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </SectionShell>
  );
}
