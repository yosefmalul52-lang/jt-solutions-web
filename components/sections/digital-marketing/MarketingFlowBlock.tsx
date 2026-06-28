import { ArrowLeft } from "lucide-react";
import { digitalMarketingFlowSteps } from "@/lib/services-digital-marketing-page";

export default function MarketingFlowBlock() {
  return (
    <section className="border-t border-slate-200 py-12 md:py-16" aria-labelledby="marketing-flow-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <h2 id="marketing-flow-heading" className="text-section text-center text-slate-900">
          מה קורה אחרי הקליק?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          פרסום שאפשר למדוד ולשפר — מהמודעה ועד השיפור הבא.
        </p>
        <ol className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {digitalMarketingFlowSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-2 sm:gap-3">
              <span className="premium-card inline-flex min-h-[2.75rem] items-center px-4 py-2 text-sm font-semibold text-slate-800 shadow-none">
                {step}
              </span>
              {index < digitalMarketingFlowSteps.length - 1 ? (
                <ArrowLeft size={16} className="shrink-0 text-slate-500" aria-hidden />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
