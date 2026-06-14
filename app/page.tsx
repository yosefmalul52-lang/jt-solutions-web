import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import SectionDivider from "@/components/ui/SectionDivider";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getHomeOgImage } from "@/lib/seo/og-images";
import { getHomeFaqJsonLd } from "@/lib/seo/home-faq";

const Projects = dynamic(() => import("@/components/sections/Projects"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Proof = dynamic(() => import("@/components/sections/Proof"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export const metadata: Metadata = createPageMetadata({
  title: "סוכנות דיגיטל בישראל | אתרים, דפי נחיתה ומעטפת צמיחה",
  description:
    "JT Solutions — סוכנות דיגיטל לעסקים בישראל: מיתוג, אתרי תדמית, חנויות איקומרס, דפי נחיתה ממירים, פרסום ואוטומציה. מעטפת אחת שמייצרת פניות ומכירות.",
  path: "/",
  keywords: [
    "סוכנות דיגיטל",
    "סוכנות דיגיטל בישראל",
    "בניית אתרים",
    "דף נחיתה",
    "מעטפת דיגיטלית",
    "שיווק דיגיטלי",
  ],
  ogImage: getHomeOgImage(),
});

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeFaqJsonLd()} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Proof />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <HomeFaq />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
