import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Proof from "@/components/sections/Proof";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import SectionDivider from "@/components/ui/SectionDivider";
import HomeFaq from "@/components/sections/HomeFaq";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getHomeOgImage } from "@/lib/seo/og-images";
import { getHomeFaqJsonLd } from "@/lib/seo/home-faq";

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
