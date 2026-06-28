import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/og-images";

const TITLE_SUFFIX = ` | ${SITE_NAME}`;

export type OgImageInput = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type PageMetadataInput = {
  /** Segment passed to the layout title template (`%s | JT Solutions`), unless `absoluteTitle` is true */
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  /** When true, uses `title: { absolute }` and skips the layout template (no duplicate suffix) */
  absoluteTitle?: boolean;
  /** Set false for 404 and other non-canonical pages */
  includeCanonical?: boolean;
  /** Per-page Open Graph / Twitter image (defaults to site-wide OG asset) */
  ogImage?: OgImageInput;
};

/** Canonical URLs must not include hash fragments. */
export function toCanonicalPath(path: string): string {
  const [pathname] = path.split("#");
  if (!pathname || pathname === "") return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function normalizeTitleSegment(title: string): string {
  const trimmed = title.trim();
  if (trimmed.endsWith(TITLE_SUFFIX)) {
    return trimmed.slice(0, -TITLE_SUFFIX.length).trim();
  }
  return trimmed;
}

function resolveOgImage(ogImage?: OgImageInput) {
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const imageUrl = image.url.startsWith("http") ? image.url : `${SITE_URL}${image.url}`;
  return {
    url: imageUrl,
    width: image.width ?? DEFAULT_OG_IMAGE.width,
    height: image.height ?? DEFAULT_OG_IMAGE.height,
    alt: image.alt ?? DEFAULT_OG_IMAGE.alt,
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  absoluteTitle = false,
  includeCanonical = true,
  ogImage,
}: PageMetadataInput): Metadata {
  const canonicalPath = toCanonicalPath(path);
  const url = `${SITE_URL}${canonicalPath}`;
  const titleSegment = normalizeTitleSegment(title);
  const displayTitle = absoluteTitle ? titleSegment : `${titleSegment}${TITLE_SUFFIX}`;
  const image = resolveOgImage(ogImage);

  return {
    title: absoluteTitle ? { absolute: displayTitle } : titleSegment,
    description,
    keywords,
    ...(includeCanonical
      ? {
          alternates: {
            canonical: url,
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: "he_IL",
      url,
      title: displayTitle,
      description,
      siteName: SITE_NAME,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
