import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpaceOdyssey from "@/components/sections/SpaceOdyssey";
import BoldStatementBanner from "@/components/sections/BoldStatementBanner";
import ClienteleGrid from "@/components/sections/ClienteleGrid";
import PortfolioBento from "@/components/sections/PortfolioBento";
import Contact from "@/components/sections/Contact";
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
        <SpaceOdyssey>
          <PortfolioBento />
          <BoldStatementBanner />
          <ClienteleGrid />
          <Contact />
          <Footer />
        </SpaceOdyssey>
      </main>
    </>
  );
}
