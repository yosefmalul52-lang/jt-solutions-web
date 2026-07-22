import DeferredGrainient from "@/components/hero/DeferredGrainient";
import HeroContent from "@/components/sections/HeroContent";

export default function Hero() {
  return (
    <div className="homepage-hero-wrap relative flex min-h-[100dvh] flex-col overflow-hidden">
      <DeferredGrainient
        color1="#919fff"
        color2="#f1f4ff"
        color3="#b0b0ff"
        timeSpeed={0.65}
        colorBalance={-0.21}
        warpStrength={0.9}
        warpFrequency={5.3}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.04}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={0.95}
        saturation={1.2}
        centerX={0}
        centerY={0}
        zoom={1.15}
      />
      <div aria-hidden className="home-hero-grainient-veil pointer-events-none absolute inset-0 z-[1]" />
      <div aria-hidden className="home-hero-grid pointer-events-none absolute inset-0 z-[1]" />
      <HeroContent />
    </div>
  );
}
