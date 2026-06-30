import HeroContent from "@/components/sections/HeroContent";
import ServiceMarquee from "@/components/home/ServiceMarquee";

export default function Hero() {
  return (
    <div className="homepage-hero-wrap relative flex min-h-[100dvh] flex-col overflow-hidden">
      <div aria-hidden className="home-hero-mesh" />
      <div aria-hidden className="home-hero-aurora" />
      <div aria-hidden className="home-hero-grid pointer-events-none absolute inset-0" />
      <HeroContent />
      <div className="homepage-hero-trust relative z-10 mx-auto w-full max-w-6xl shrink-0 px-5 pb-4 sm:px-8 sm:pb-5 lg:px-12">
        <ServiceMarquee />
      </div>
    </div>
  );
}
