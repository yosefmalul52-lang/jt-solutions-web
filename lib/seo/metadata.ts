import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";

const TITLE_SUFFIX = ` | ${SITE_NAME}`;

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
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  absoluteTitle = false,
  includeCanonical = true,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const displayTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;

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
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — סוכנות דיגיטל בישראל`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: ["/opengraph-image.png"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
