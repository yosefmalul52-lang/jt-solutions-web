import { contactLinks } from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";

export const NAP = {
  name: SITE_NAME,
  phone: "052-8240230",
  phoneE164: `+972-${contactLinks.phone.replace(/^0/, "")}`,
  email: contactLinks.email,
  url: SITE_URL,
  streetAddress: "רחוב הרצל 45",
  addressLocality: "קריית אתא",
  addressLocalityEn: "Kiryat Ata",
  addressRegion: "מחוז חיפה",
  addressRegionEn: "Haifa District",
  postalCode: "2800000",
  addressCountry: "IL",
} as const;

const israelDistricts = [
  "מחוז צפון",
  "מחוז חיפה",
  "מחוז מרכז",
  "מחוז תל אביב",
  "מחוז ירושלים",
  "מחוז דרום",
  "יהודה ושומרון",
] as const;

const localBusinessBase = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: NAP.phoneE164,
  email: NAP.email,
  priceRange: "₪₪",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: NAP.streetAddress,
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    postalCode: NAP.postalCode,
    addressCountry: NAP.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: 32.8094,
    longitude: 35.0882,
  },
  hasMap: "https://maps.google.com/?q=Kiryat+Ata,Israel",
  areaServed: [
    { "@type": "Country" as const, name: "Israel" },
    ...israelDistricts.map((name) => ({
      "@type": "AdministrativeArea" as const,
      name,
    })),
  ],
  sameAs: [contactLinks.facebook, contactLinks.instagram],
  knowsAbout: [
    "בניית אתרים",
    "דפי נחיתה",
    "חנויות איקומרס",
    "מיתוג דיגיטלי",
    "שיווק דיגיטלי",
    "אוטומציה לעסקים",
    "קידום אורגני",
  ],
};

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    ...localBusinessBase,
    description:
      "שותף דיגיטלי לעסקים בישראל: אתר, דף נחיתה, מדידה, וואטסאפ ומעקב פניות — מעטפת אחת שמכניסה סדר ללידים.",
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

export function getContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `אבחון דיגיטלי — ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    inLanguage: "he-IL",
    mainEntity: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: NAP.phoneE164,
      email: NAP.email,
      url: SITE_URL,
      address: localBusinessBase.address,
    },
  };
}

export function getBlogCollectionJsonLd(postCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "מדריכים דיגיטל לעסקים בישראל",
    url: `${SITE_URL}/blog`,
    inLanguage: "he-IL",
    description:
      "מאמרים מעשיים על אתרים, דפי נחיתה, מדידה, מיתוג וסדר בלידים לעסקים בישראל.",
    numberOfItems: postCount,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

export function getServicesHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "שירותים לפי הבעיה של העסק — JT Solutions",
    url: `${SITE_URL}/services`,
    inLanguage: "he-IL",
    description:
      "אתר, דף נחיתה, מדידה, סדר בלידים ופרסום מדיד — JT Solutions עוזרת לעסקים להפוך נראות דיגיטלית לפניות מסודרות.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
