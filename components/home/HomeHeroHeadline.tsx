import { heroCopy } from "@/lib/hero-content";

export default function HomeHeroHeadline() {
  return (
    <h1 className="home-hero-title">
      <span className="home-hero-title__line">{heroCopy.h1Line1}</span>
      <span className="home-hero-title__line home-hero-accent mt-1 sm:mt-2">
        {heroCopy.h1Line2}
        <span className="home-hero-title__bang">!</span>
      </span>
    </h1>
  );
}
