import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketingFlowBlock from "@/components/sections/digital-marketing/MarketingFlowBlock";
import MarketingProblemBlock from "@/components/sections/digital-marketing/MarketingProblemBlock";
import PillarStructuredData from "@/components/seo/PillarStructuredData";
import PillarTemplate from "@/components/templates/PillarTemplate";
import FloatingMockup from "@/components/ui/FloatingMockup";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getPillarOgImage } from "@/lib/seo/og-images";
import {
  digitalMarketingFaq,
  digitalMarketingHero,
  digitalMarketingSections,
  digitalMarketingSeoIntro,
} from "@/lib/services-digital-marketing-page";

const slug = "digital-marketing" as const;

export const metadata: Metadata = createPageMetadata({
  title: "פרסום דיגיטלי שאפשר למדוד ולשפר",
  description:
    "תשתית פרסום לעסקים בישראל: דף נחיתה, מדידת מקורות פנייה, אירועי המרה ומעקב לידים — כדי להבין מה באמת עובד.",
  path: "/services/digital-marketing",
  keywords: [
    "פרסום דיגיטלי",
    "דף נחיתה לקמפיין",
    "מדידת פניות",
    "Meta Pixel",
    "GA4",
  ],
  ogImage: getPillarOgImage(slug),
});

export default function DigitalMarketingPillarPage() {
  return (
    <>
      <PillarStructuredData slug={slug} faq={[...digitalMarketingFaq]} />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <PillarTemplate
          pillarId={slug}
          badge={digitalMarketingHero.badge}
          title={digitalMarketingHero.title}
          description={digitalMarketingHero.description}
          seoIntro={digitalMarketingSeoIntro}
          faq={[...digitalMarketingFaq]}
          ctaLocation={slug}
          secondaryCtaHref={digitalMarketingHero.secondaryCtaHref}
          secondaryCtaLabel={digitalMarketingHero.secondaryCtaLabel}
          beforeSections={
            <>
              <MarketingProblemBlock />
              <MarketingFlowBlock />
            </>
          }
          sections={[
            {
              ...digitalMarketingSections[0],
              visualProof: (
                <FloatingMockup
                  src="/projects/eb-hair.png"
                  alt="דוגמה לדף נחיתה וקמפיין — EB Hair"
                  variant="mobile"
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
