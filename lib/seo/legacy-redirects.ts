export type LegacyServiceRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

/** 301 map from deprecated granular service URLs to pillar pages + section anchors. */
export const LEGACY_SERVICE_REDIRECTS: LegacyServiceRedirect[] = [
  {
    source: "/services/business-websites",
    destination: "/services/websites#corporate",
    permanent: true,
  },
  {
    source: "/services/landing-pages",
    destination: "/services/websites#landing",
    permanent: true,
  },
  {
    source: "/services/ecommerce",
    destination: "/services/websites#ecommerce",
    permanent: true,
  },
  {
    source: "/services/whatsapp-bot",
    destination: "/services/automations#whatsapp",
    permanent: true,
  },
  {
    source: "/services/ai-automation",
    destination: "/services/automations#site-integration",
    permanent: true,
  },
  {
    source: "/services/web-development",
    destination: "/services/automations#site-integration",
    permanent: true,
  },
  {
    source: "/services/ad-infrastructure",
    destination: "/services/digital-marketing#full-funnel",
    permanent: true,
  },
];

export function getLegacyServiceRedirects() {
  return LEGACY_SERVICE_REDIRECTS.map(({ source, destination, permanent }) => ({
    source,
    destination,
    permanent,
  }));
}
