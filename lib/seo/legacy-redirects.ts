export type SiteRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/**
 * All former marketing/SEO subpages redirect to the homepage landing.
 * Legal pages (privacy, accessibility) stay live.
 *
 * Path params use `([^/.]+)` so static assets under the same folder
 * (e.g. `/projects/magadim.webp`, `/services/websites.png`) are NOT redirected.
 * Destinations are plain paths (no hash) - crawlers ignore URL fragments.
 */
export const LANDING_PAGE_REDIRECTS: SiteRedirect[] = [
  { source: "/about", destination: "/", permanent: true },
  { source: "/contact", destination: "/", permanent: true },
  { source: "/blog", destination: "/", permanent: true },
  { source: "/blog/:slug([^/.]+)", destination: "/", permanent: true },
  { source: "/projects", destination: "/", permanent: true },
  { source: "/projects/:id([^/.]+)", destination: "/", permanent: true },
  { source: "/services", destination: "/", permanent: true },
  { source: "/services/:slug([^/.]+)", destination: "/", permanent: true },
  { source: "/areas/:slug([^/.]+)", destination: "/", permanent: true },
];

/** @deprecated kept for import compatibility - use LANDING_PAGE_REDIRECTS */
export const LEGACY_SERVICE_REDIRECTS = LANDING_PAGE_REDIRECTS;

export function getLegacyServiceRedirects() {
  return LANDING_PAGE_REDIRECTS.map(({ source, destination, permanent }) => ({
    source,
    destination,
    permanent,
  }));
}
