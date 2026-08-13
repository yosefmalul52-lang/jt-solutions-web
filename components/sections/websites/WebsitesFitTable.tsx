import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { websitesFitRows } from "@/lib/services-websites-page";

export default function WebsitesFitTable() {
  return (
    <section className="border-t border-slate-200 py-12 md:py-16" aria-labelledby="websites-fit-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" dir="rtl">
        <h2 id="websites-fit-heading" className="text-section text-center text-slate-900">
          מה מתאים לעסק שלך?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          בחרו לפי מצב העסק - לא לפי מונחים טכניים.
        </p>

        <div className="mt-8 hidden md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-right">
                <th scope="col" className="px-4 py-3 font-bold text-slate-900">
                  מצב העסק
                </th>
                <th scope="col" className="px-4 py-3 font-bold text-slate-900">
                  הפתרון המתאים
                </th>
                <th scope="col" className="px-4 py-3 font-bold text-slate-900">
                  מה המטרה
                </th>
              </tr>
            </thead>
            <tbody>
              {websitesFitRows.map((row) => (
                <tr key={row.id} className="border-b border-slate-200 last:border-b-0">
                  <td className="px-4 py-4 text-slate-600">{row.situation}</td>
                  <td className="px-4 py-4">
                    <Link
                      href={row.anchor}
                      className="link-underline font-semibold text-sky-600"
                    >
                      {row.solution}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{row.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-8 flex flex-col gap-4 md:hidden">
          {websitesFitRows.map((row) => (
            <li key={row.id}>
              <Link
                href={row.anchor}
                className="studio-hub-pillar premium-card premium-card--interactive block p-5"
              >
                <p className="text-xs font-semibold text-slate-500">מצב העסק</p>
                <p className="mt-1 text-base font-bold text-slate-900">{row.situation}</p>
                <p className="mt-4 text-xs font-semibold text-slate-500">הפתרון המתאים</p>
                <p className="mt-1 text-sm font-semibold text-sky-600">{row.solution}</p>
                <p className="mt-4 text-xs font-semibold text-slate-500">מה המטרה</p>
                <p className="mt-1 text-sm text-slate-600">{row.goal}</p>
                <span className="mt-4 inline-flex min-h-[2.75rem] items-center gap-1.5 text-xs font-semibold text-sky-600">
                  לפרטים
                  <ArrowLeft size={14} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
