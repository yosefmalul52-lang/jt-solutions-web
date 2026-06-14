import SpaceSectionBackdrop from "@/components/motion/SpaceSectionBackdrop";
import HeroContent from "@/components/sections/HeroContent";

export default function Hero() {
  return (
    <SpaceSectionBackdrop slice="hero" blendTop={false} className="min-h-[100svh]">
      <HeroContent />
    </SpaceSectionBackdrop>
  );
}
