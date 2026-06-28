import { ArrowLeft } from "lucide-react";
import {
  automationsAfterSteps,
  automationsBeforeSteps,
} from "@/lib/services-automations-page";

function FlowColumn({
  label,
  steps,
  variant,
}: {
  label: string;
  steps: readonly string[];
  variant: "before" | "after";
}) {
  const isBefore = variant === "before";

  return (
    <div
      className={`premium-card flex flex-col p-5 sm:p-6 ${
        isBefore ? "border-rose-200" : "border-emerald-200"
      }`}
    >
      <p
        className={`text-xs font-bold tracking-wide ${
          isBefore ? "text-rose-400" : "text-emerald-400"
        }`}
      >
        {label}
      </p>
      <ol className="mt-4 flex flex-col gap-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2 text-sm text-slate-700">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                isBefore ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"
              }`}
            >
              {index + 1}
            </span>
            <span className="leading-snug">{step}</span>
            {index < steps.length - 1 ? (
              <ArrowLeft
                size={12}
                className="mr-auto shrink-0 rotate-90 text-slate-500 sm:hidden"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function AutomationsBeforeAfter() {
  return (
    <section className="border-t border-slate-200 py-12 md:py-16" aria-labelledby="automations-ba-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <h2 id="automations-ba-heading" className="text-section text-center text-slate-900">
          איך זה נראה ביום יום?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          לפני: פניות מתפזרות ונשכחות. אחרי: מסלול ברור מפנייה ועד מעקב.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <FlowColumn label="לפני" steps={automationsBeforeSteps} variant="before" />
          <FlowColumn label="אחרי" steps={automationsAfterSteps} variant="after" />
        </div>
      </div>
    </section>
  );
}
