import { heroCopy } from "@/lib/hero-content";

export default function HomeHeroHeadline() {
  return (
    <h1 className="home-hero-title">
      <span className="block text-slate-900">{heroCopy.h1Line1}</span>
      <span className="home-hero-accent mt-1 block sm:mt-2">{heroCopy.h1Line2}</span>
    </h1>
  );
}
