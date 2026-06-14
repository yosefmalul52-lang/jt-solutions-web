import JsonLd from "@/components/seo/JsonLd";
import type { ServiceFaqItem } from "@/lib/types/faq";
import { getPillarBySlug, type PillarSlug } from "@/lib/pillars";
import { getPillarPageJsonLd } from "@/lib/seo/pillars";
import { SITE_URL } from "@/lib/seo/constants";

type PillarStructuredDataProps = {
  slug: PillarSlug;
  faq?: ServiceFaqItem[];
};

export default function PillarStructuredData({ slug, faq }: PillarStructuredDataProps) {
  const config = getPillarBySlug(slug);
  const pageUrl = `${SITE_URL}${config.path}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "שירותים", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: config.title, item: pageUrl },
    ],
  };

  const schemas: Record<string, unknown>[] = [breadcrumb, getPillarPageJsonLd(slug)];

  if (faq && faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return <JsonLd data={schemas} />;
}
