import { projects } from "@/lib/projects";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";

export function getProjectsCollectionPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "תיק עבודות - פרויקטים נבחרים",
    url: `${SITE_URL}/projects`,
    inLanguage: "he-IL",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${SITE_URL}/projects/${project.id}`,
      })),
    },
  };
}
