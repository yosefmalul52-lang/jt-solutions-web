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
      "שותף דיגיטלי לעסקים בישראל: בניית אתרים, דפי נחיתה, מדידה, וואטסאפ ומעקב פניות - מעטפת אחת שמכניסה סדר ללידים.",
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
