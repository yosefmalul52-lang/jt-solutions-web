import { SITE_URL } from "@/lib/seo/constants";

export const SITE_AUTHOR = {
  name: "יוסף מלול",
  jobTitle: "שותף טכנולוגי ואסטרטג דיגיטל",
  aboutPath: "/about",
  aboutUrl: `${SITE_URL}/about`,
  bio: "מלווה עסקים במעטפת דיגיטלית אחת - מאפיון, פיתוח ועד לידים שמגיעים.",
} as const;

export function getArticleAuthorJsonLd() {
  return {
    "@type": "Person",
    name: SITE_AUTHOR.name,
    url: SITE_AUTHOR.aboutUrl,
    jobTitle: SITE_AUTHOR.jobTitle,
  };
}
