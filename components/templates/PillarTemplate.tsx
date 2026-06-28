import type { ReactNode } from "react";
import StudioServiceTemplate, {
  type ServiceFaqItem,
  type StudioServiceSection,
} from "@/components/templates/StudioServiceTemplate";
import type { PillarSlug } from "@/lib/pillars";

export type PillarSection = StudioServiceSection;

export type PillarTemplateProps = {
  pillarId: PillarSlug;
  badge: string;
  title: string;
  description: string;
  seoIntro?: string[];
  sections: PillarSection[];
  faq?: ServiceFaqItem[];
  ctaLocation?: string;
  beforeSections?: ReactNode;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export default function PillarTemplate({
  badge,
  title,
  description,
  seoIntro,
  sections,
  faq,
  ctaLocation = "pillar",
  beforeSections,
  secondaryCtaHref,
  secondaryCtaLabel,
}: PillarTemplateProps) {
  return (
    <StudioServiceTemplate
      badge={badge}
      title={title}
      description={description}
      seoIntro={seoIntro}
      sections={sections}
      faq={faq}
      ctaLocation={ctaLocation}
      beforeSections={beforeSections}
      secondaryCtaHref={secondaryCtaHref}
      secondaryCtaLabel={secondaryCtaLabel}
      problemContext={seoIntro?.[0]}
    />
  );
}
