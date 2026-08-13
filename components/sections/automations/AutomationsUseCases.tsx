import { CheckCircle2 } from "lucide-react";
import { automationsUseCases } from "@/lib/services-automations-page";

export default function AutomationsUseCases() {
  return (
    <section className="border-t border-slate-200 py-12 md:py-16" aria-labelledby="automations-use-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <h2 id="automations-use-heading" className="text-section text-center text-slate-900">
          מה זה נותן לעסק בפועל?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          דוגמאות שימוש יומיומיות - בלי לדבר על שמות כלים.
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {automationsUseCases.map((item) => (
            <li key={item.id} className="premium-card p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
