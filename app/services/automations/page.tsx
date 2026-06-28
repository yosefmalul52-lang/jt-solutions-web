import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AutomationsBeforeAfter from "@/components/sections/automations/AutomationsBeforeAfter";
import AutomationsUseCases from "@/components/sections/automations/AutomationsUseCases";
import PillarStructuredData from "@/components/seo/PillarStructuredData";
import PillarTemplate from "@/components/templates/PillarTemplate";
import FloatingMockup from "@/components/ui/FloatingMockup";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getPillarOgImage } from "@/lib/seo/og-images";
import {
  automationsFaq,
  automationsHero,
  automationsSections,
  automationsSeoIntro,
} from "@/lib/services-automations-page";

const slug = "automations" as const;

export const metadata: Metadata = createPageMetadata({
  title: "אוטומציות ו-CRM לעסקים שרוצים סדר בלידים",
  description:
    "חיבור טפסים, וואטסאפ, CRM והתראות כדי שכל פנייה תיכנס למעקב מסודר — בלי עבודה ידנית ובלי לידים שנשכחים.",
  path: "/services/automations",
  keywords: [
    "סדר בלידים",
    "מעקב פניות",
    "חיבור טפסים ל-CRM",
    "וואטסאפ לעסק",
    "אוטומציה לעסקים",
  ],
  ogImage: getPillarOgImage(slug),
});

export default function AutomationsPillarPage() {
  return (
    <>
      <PillarStructuredData slug={slug} faq={[...automationsFaq]} />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <PillarTemplate
          pillarId={slug}
          badge={automationsHero.badge}
          title={automationsHero.title}
          description={automationsHero.description}
          seoIntro={automationsSeoIntro}
          faq={[...automationsFaq]}
          ctaLocation={slug}
          beforeSections={
            <>
              <AutomationsBeforeAfter />
              <AutomationsUseCases />
            </>
          }
          sections={[
            {
              ...automationsSections[0],
              visualProof: (
                <FloatingMockup
                  src="/projects/ai-automation.png"
                  alt="דוגמה לפרויקט — פניות נכנסות למעקב מסודר"
                  variant="laptop"
                  showCaption={false}
                />
              ),
            },
            {
              ...automationsSections[1],
              visualProof: (
                <FloatingMockup
                  src="/projects/ai-automation.png"
                  alt="דוגמה לתיעוד פניות מוואטסאפ"
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
