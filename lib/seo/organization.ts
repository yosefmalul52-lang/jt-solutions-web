import { contactLinks } from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";

const localBusinessBase = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: `+972-${contactLinks.phone.replace(/^0/, "")}`,
  email: contactLinks.email,
  priceRange: "₪₪",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "קריית אתא",
    addressLocality: "Kiryat Ata",
    addressRegion: "Haifa District",
    postalCode: "2800000",
    addressCountry: "IL",
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: 32.8094,
    longitude: 35.0882,
  },
  areaServed: [
    { "@type": "Country" as const, name: "Israel" },
    { "@type": "AdministrativeArea" as const, name: "Northern District" },
  ],
  sameAs: [contactLinks.facebook, contactLinks.instagram],
  knowsAbout: [
    "בניית אתרים",
    "דפי נחיתה",
    "חנויות איקומרס",
    "מיתוג דיגיטלי",
    "שיווק דיגיטלי",
    "אוטומציה לעסקים",
  ],
};

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    ...localBusinessBase,
    description:
      "סוכנות דיגיטל בישראל: מיתוג, אתרים, דפי נחיתה, איקומרס, פרסום ואוטומציה — מעטפת אחת שמייצרת פניות.",
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "he-IL",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

export function getAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `אודות ${SITE_NAME}`,
    url: `${SITE_URL}/about`,
    inLanguage: "he-IL",
    mainEntity: {
      "@type": "Person",
      name: "יוסף מלול",
      jobTitle: "שותף טכנולוגי ואסטרטג דיגיטל",
      worksFor: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      description:
        "מלווה עסקים מקצה לקצה: מאפיון UX ומיתוג, דרך פיתוח אתרים ואוטומציה, ועד לידים ומדידה.",
    },
  };
}
