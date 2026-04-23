import Navbar from "@/components/layout/Navbar";
import MobileStickyCta from "@/components/layout/MobileStickyCta";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Proof from "@/components/sections/Proof";
import Projects from "@/components/sections/Projects";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

function SectionBlend() {
  return (
    <div
      aria-hidden
      className="pointer-events-none h-10 sm:h-12 -my-3 sm:-my-4 blur-[9px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(241,245,249,0.78) 50%, rgba(248,250,252,0) 100%)",
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionBlend />
        <Services />
        <SectionBlend />
        <Projects />
        <SectionBlend />
        <Proof />
        <SectionBlend />
        <About />
        <SectionBlend />
        <Pricing />
        <SectionBlend />
        <Contact />
      </main>
      <MobileStickyCta />
      <Footer />
    </>
  );
}
