import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";
import type { ProjectItem } from "@/lib/projects";

type ProjectHubCardProps = {
  project: ProjectItem;
};

export default function ProjectHubCard({ project }: ProjectHubCardProps) {
  const summary = project.cardSummary;
  const caseStudyHref = `/projects/${project.id}`;

  return (
    <article className="premium-card premium-card--interactive group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
        {summary?.businessType ? (
          <span className="absolute top-3 right-3 rounded-full border border-white/30 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {summary.businessType}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">{project.title}</h2>

        {summary ? (
          <dl className="mt-4 flex flex-1 flex-col gap-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-500">הבעיה לפני</dt>
              <dd className="mt-1 leading-relaxed text-slate-700">{summary.problemBefore}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">מה נבנה</dt>
              <dd className="mt-1 leading-relaxed text-slate-700">{summary.whatBuilt}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">מה השתנה אחרי</dt>
              <dd className="mt-1 leading-relaxed text-slate-700">{summary.whatChangedAfter}</dd>
            </div>
            <div className="mt-1 rounded-[var(--radius-soft)] border border-emerald-200 bg-emerald-50/70 p-3">
              <dt className="text-xs font-semibold text-emerald-700">תוצאה תפעולית</dt>
              <dd className="mt-1 text-sm font-medium leading-relaxed text-slate-800">
                {summary.operationalResult}
              </dd>
            </div>
          </dl>
        ) : null}

        <CtaButton
          href={caseStudyHref}
          ctaLocation={`project-card-${project.id}`}
          label="לצפייה בפרויקט"
          className="mt-6 w-full"
        />
      </div>
    </article>
  );
}
