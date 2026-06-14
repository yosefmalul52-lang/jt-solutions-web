import { createPageMetadata } from "@/lib/seo/metadata";
import { getPillarOgImage } from "@/lib/seo/og-images";
import { getAllPillarPaths, getPillarBySlug, pillarList, type PillarSlug } from "@/lib/pillars";
import { SITE_URL } from "@/lib/seo/constants";

export function getPillarMetadata(slug: PillarSlug) {
  const config = getPillarBySlug(slug);
  return createPageMetadata({
    title: config.seo.title,
    description: config.seo.description,
    path: config.path,
    keywords: config.seo.keywords,
    ogImage: getPillarOgImage(slug),
  });
}

export function getPillarPageJsonLd(slug: PillarSlug) {
  const config = getPillarBySlug(slug);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.title,
    description: config.seo.description,
    url: `${SITE_URL}${config.path}`,
    provider: {
      "@type": "Organization",
      name: "JT Solutions",
      url: SITE_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: config.title,
      itemListElement: config.sections.map((section, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: section.title,
        url: `${SITE_URL}${config.path}#${section.id}`,
      })),
    },
  };
}

export { getAllPillarPaths, pillarList, type PillarSlug };
