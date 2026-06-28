import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PillarStructuredData from "@/components/seo/PillarStructuredData";
import WebsitesFitTable from "@/components/sections/websites/WebsitesFitTable";
import WebsitesSharedDeliverables from "@/components/sections/websites/WebsitesSharedDeliverables";
import PillarTemplate from "@/components/templates/PillarTemplate";
import FloatingMockup from "@/components/ui/FloatingMockup";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getPillarOgImage } from "@/lib/seo/og-images";
import {
  websitesFaq,
  websitesHero,
  websitesSections,
  websitesSeoIntro,
} from "@/lib/services-websites-page";

const slug = "websites" as const;

export const metadata: Metadata = createPageMetadata({
  title: "בניית אתרים ודפי נחיתה שמובילים לפניות",
  description:
    "אתרי תדמית, דפי נחיתה וחנויות אונליין לעסקים בישראל — עם מסר ברור, מובייל, CTA ומדידה שמראה מאיפה הפניות מגיעות.",
  path: "/services/websites",
  keywords: [
    "אתר תדמית לעסק",
    "דף נחיתה ממיר",
    "חנות אונליין",
    "בניית אתרים",
    "אתר לעסק קטן",
  ],
  ogImage: getPillarOgImage(slug),
});

export default function WebsitesPillarPage() {
  return (
    <>
      <PillarStructuredData slug={slug} faq={[...websitesFaq]} />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <PillarTemplate
          pillarId={slug}
          badge={websitesHero.badge}
          title={websitesHero.title}
          description={websitesHero.description}
          seoIntro={websitesSeoIntro}
          faq={[...websitesFaq]}
          ctaLocation={slug}
          secondaryCtaHref={websitesHero.secondaryCtaHref}
          secondaryCtaLabel={websitesHero.secondaryCtaLabel}
          beforeSections={
            <>
              <WebsitesFitTable />
              <WebsitesSharedDeliverables />
            </>
          }
          sections={[
            {
              ...websitesSections[0],
              visualProof: (
                <FloatingMockup
                  src="/projects/eb-hair.png"
                  alt="צילום מסך של אתר תדמית — EB Hair"
                  variant="laptop"
                  showCaption={false}
                />
              ),
            },
            {
              ...websitesSections[1],
              visualProof: (
                <FloatingMockup
                  src="/projects/eb-hair.png"
                  alt="צילום מסך של דף נחיתה ממיר"
                  variant="mobile"
                  showCaption={false}
                />
              ),
            },
            {
              ...websitesSections[2],
              visualProof: (
                <FloatingMockup
                  src="/projects/magadim.png"
                  alt="צילום מסך של חנות אונליין — Magadim"
                  variant="auto"
                  showCaption={false}
                />
              ),
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
