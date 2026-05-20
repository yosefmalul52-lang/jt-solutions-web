import { contactLinks } from "@/lib/site";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/jt-logo.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    telephone: contactLinks.phone,
    email: contactLinks.email,
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kiryat Ata",
      addressCountry: "IL",
    },
    sameAs: [contactLinks.facebook, contactLinks.instagram],
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
    },
  };
}
