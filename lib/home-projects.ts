import { projects } from "@/lib/projects";

const SERVICE_TAG_LABELS: Record<string, string> = {
  ecommerce: "חנות אונליין",
  "landing-pages": "דף נחיתה",
  websites: "אתר",
  "business-websites": "אתר תדמית",
  automations: "אוטומציה",
  "ai-automation": "אוטומציה",
  "digital-marketing": "קמפיינים",
  branding: "מיתוג",
};

export type HomeProjectCard = {
  id: string;
  name: string;
  businessType: string;
  problem: string;
  built: string;
  operationalResult: string;
  serviceTag: string;
  imageSrc: string;
  imageAlt: string;
};

export const homeProjectCards: HomeProjectCard[] = projects.map((project) => {
  const summary = project.cardSummary;

  return {
    id: project.id,
    name: project.title,
    businessType: summary?.businessType ?? project.industry ?? project.clientType ?? "",
    problem: summary?.problemBefore ?? project.businessProblem ?? project.problem,
    built:
      summary?.whatBuilt ??
      ((project.whatWeBuilt ?? []).slice(0, 2).join(" · ") || project.shortDescription),
    operationalResult:
      summary?.operationalResult ?? project.results[0] ?? project.measurableResults?.[0] ?? "",
    serviceTag: SERVICE_TAG_LABELS[project.relatedServiceSlug] ?? "",
    imageSrc: project.image.src,
    imageAlt: project.image.alt,
  };
});
