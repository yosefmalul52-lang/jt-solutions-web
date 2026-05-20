import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/constants";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "he_IL",
      url: path,
      title,
      description,
      siteName: "JT Solutions",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "JT Solutions — סוכנות דיגיטל בישראל",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
