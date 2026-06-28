import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BrandingIntroBlocks from "@/components/sections/branding/BrandingIntroBlocks";
import ServiceTemplate from "@/components/templates/ServiceTemplate";
import ServiceStructuredData from "@/components/seo/ServiceStructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getPillarOgImage } from "@/lib/seo/og-images";
import {
  brandingDeliverables,
  brandingFaq,
  brandingHero,
  brandingSeoIntro,
  brandingTargetAudience,
} from "@/lib/services-branding-page";
import { FileText, Layers, MessageSquare, Palette, PenLine, Sparkles, SwatchBook, Target } from "lucide-react";

const slug = "branding" as const;

export const metadata = createPageMetadata({
  title: "מיתוג לעסקים שרוצים להיראות ברורים ואמינים",
  description:
    "מיתוג לעסקים בישראל: מסר ברור, שפה ויזואלית, התאמה לאתר ולפרסום — כדי שהעסק ייראה מקצועי ויזמין יותר לפנייה.",
  path: "/services/branding",
  keywords: ["מיתוג לעסק", "שפה ויזואלית", "מסר מותג", "אמון דיגיטלי"],
  ogImage: getPillarOgImage("branding"),
});

const deliverableIcons = [FileText, MessageSquare, Layers, SwatchBook, Palette, Target, Sparkles, PenLine] as const;

export default function BrandingPage() {
  return (
    <>
      <ServiceStructuredData
        path="/services/branding"
        serviceName="מיתוג לעסקים"
        description="מסר ברור, שפה ויזואלית והתאמה לאתר ולפרסום — כדי שהעסק ייראה מקצועי ויזמין יותר לפנייה."
        faq={[...brandingFaq]}
      />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <ServiceTemplate
          badge={brandingHero.badge}
          title={brandingHero.title}
          description={brandingHero.description}
          targetAudience={brandingTargetAudience}
          deliverables={brandingDeliverables.map((text, index) => ({
            icon: deliverableIcons[index] ?? FileText,
            text,
          }))}
          faq={[...brandingFaq]}
          seoIntro={[...brandingSeoIntro]}
          ctaLocation={slug}
          beforeSections={<BrandingIntroBlocks />}
        />
      </main>
      <Footer />
    </>
  );
}
