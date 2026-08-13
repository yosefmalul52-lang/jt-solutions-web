import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import JsonLd from "@/components/seo/JsonLd";
import HeroMobilePreload from "@/components/seo/HeroMobilePreload";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getHomeFaqJsonLd } from "@/lib/seo/home-faq";
import "../home-polish.css";

const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"), {
  loading: () => <section className="home-section min-h-[40vh]" aria-hidden />,
});
const SolutionSection = dynamic(() => import("@/components/sections/SolutionSection"), {
  loading: () => <section className="home-section min-h-[40vh]" aria-hidden />,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <section className="home-section min-h-[40vh]" aria-hidden />,
});
const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => <section className="home-section min-h-[30vh]" aria-hidden />,
});
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq"), {
  loading: () => <section className="home-section min-h-[30vh]" aria-hidden />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <section className="home-section min-h-[40vh]" aria-hidden />,
});

export const metadata: Metadata = createPageMetadata({
  title: "בניית אתר לעסק",
  description:
    "בניית אתרים, דפי נחיתה ומעקב לידים לעסקים בישראל - אתר או דף נחיתה, מדידה, וואטסאפ, CRM ואוטומציות במעטפת אחת. אבחון חינם.",
  path: "/",
  keywords: [
    "בניית אתרים לעסקים",
    "דף נחיתה",
    "בניית אתרים",
    "מעקב לידים",
    "מדידת פניות",
    "אתר לעסק",
    "JT Solutions",
  ],
});

export default function Home() {
  return (
    <>
      <HeroMobilePreload />
      <JsonLd data={getHomeFaqJsonLd()} />
      <Navbar />
      <main className="homepage-light-shell flex-1">
        <div className="homepage-light-content">
          <Hero />
          <div className="homepage-after-hero">
            <ProblemSection />
            <SolutionSection />
            <Projects />
            <Pricing />
            <HomeFaq />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
