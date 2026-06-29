import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getHomeOgImage } from "@/lib/seo/og-images";
import { getHomeFaqJsonLd } from "@/lib/seo/home-faq";
import { HERO_MOBILE_PRELOAD } from "@/lib/space-theme";
import "../home-polish.css";

const IdentificationSection = dynamic(() => import("@/components/sections/IdentificationSection"));
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"));
const SolutionSection = dynamic(() => import("@/components/sections/SolutionSection"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "מערכת דיגיטלית לפניות מסודרות",
    description:
      "JT Solutions בונה לעסקים בישראל אתר או דף נחיתה, מדידה, וואטסאפ, CRM ואוטומציות — כדי שתדע מאיפה כל ליד הגיע ומה באמת עובד.",
    path: "/",
    keywords: [
      "מערכת דיגיטלית לעסק",
      "דף נחיתה ממיר",
      "בניית אתרים לעסקים",
      "מדידה ולידים",
      "אוטומציה לעסקים",
      "JT Solutions",
    ],
    ogImage: getHomeOgImage(),
  }),
  icons: {
    other: [HERO_MOBILE_PRELOAD],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeFaqJsonLd()} />
      <Navbar />
      <main className="homepage-light-shell flex-1">
        <div className="homepage-light-content">
          <Hero />
          <IdentificationSection />
          <ProblemSection />
          <SolutionSection />
          <Projects />
          <Pricing />
          <HomeFaq />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
