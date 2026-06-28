import HeroContent from "@/components/sections/HeroContent";
import ServiceMarquee from "@/components/home/ServiceMarquee";

export default function Hero() {
  return (
    <div className="homepage-hero-wrap relative overflow-hidden">
      <div aria-hidden className="home-hero-mesh" />
      <div aria-hidden className="home-hero-grid pointer-events-none absolute inset-0" />
      <HeroContent />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <ServiceMarquee />
      </div>
    </div>
  );
}
