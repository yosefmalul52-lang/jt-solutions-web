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

function resolveOgImage(ogImage?: OgImageInput) {
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  return {
    url: image.url,
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
  const url = `${SITE_URL}${path}`;
  const displayTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;
  const image = resolveOgImage(ogImage);

  return {
    title: absoluteTitle ? { absolute: title } : title,
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
      url: path,
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
