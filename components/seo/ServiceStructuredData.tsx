import JsonLd from "@/components/seo/JsonLd";
import type { ServiceFaqItem } from "@/components/templates/ServiceTemplate";
import { SITE_URL } from "@/lib/seo/constants";

type ServiceStructuredDataProps = {
  path: string;
  serviceName: string;
  description: string;
  faq?: ServiceFaqItem[];
};

export default function ServiceStructuredData({
  path,
  serviceName,
  description,
  faq,
}: ServiceStructuredDataProps) {
  const pageUrl = `${SITE_URL}${path}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "דף הבית",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: serviceName,
        item: pageUrl,
      },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    url: pageUrl,
    provider: {
      "@type": "ProfessionalService",
      name: "JT Solutions",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
  };

  const schemas: Record<string, unknown>[] = [breadcrumb, service];

  if (faq && faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return <JsonLd data={schemas} />;
}
