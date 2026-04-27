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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Projects />
        <Proof />
        <About />
        <Pricing />
        <Contact />
      </main>
      <MobileStickyCta />
      <Footer />
    </>
  );
}
