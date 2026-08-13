import { CheckCircle2 } from "lucide-react";
import { websitesMeasurementNote, websitesSharedDeliverables } from "@/lib/services-websites-page";

export default function WebsitesSharedDeliverables() {
  return (
    <section className="border-t border-slate-200 py-12 md:py-16" aria-labelledby="websites-deliverables-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <h2 id="websites-deliverables-heading" className="text-section text-center text-slate-900">
          מה מקבלים בפועל
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          בכל מסלול - אתר תדמית, דף נחיתה או חנות - הבסיס דומה. ההבדל הוא במטרה ובמבנה.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {websitesSharedDeliverables.map((item) => (
            <li
              key={item}
              className="premium-card flex items-start gap-2.5 p-4 text-sm leading-relaxed text-slate-600"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
          {websitesMeasurementNote}
        </p>
      </div>
    </section>
  );
}
