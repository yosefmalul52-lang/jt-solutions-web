import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Proof from "@/components/sections/Proof";
import Projects from "@/components/sections/Projects";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import SectionDivider from "@/components/ui/SectionDivider";
import { createPageMetadata } from "@/lib/seo/metadata";

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
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Proof />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
