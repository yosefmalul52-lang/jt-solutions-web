import { brandingProblem, brandingSolution } from "@/lib/services-branding-page";

export default function BrandingIntroBlocks() {
  return (
    <section className="border-t border-slate-200 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section text-slate-900">{brandingProblem.title}</h2>
          <p className="text-lead mx-auto mt-4 text-slate-600">{brandingProblem.text}</p>
        </div>
        <div className="premium-card mx-auto mt-10 max-w-3xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-slate-900">מה מיתוג נכון נותן</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{brandingSolution}</p>
        </div>
      </div>
    </section>
  );
}
