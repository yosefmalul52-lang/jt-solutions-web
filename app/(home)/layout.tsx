import type { ReactNode } from "react";

const HERO_MOBILE_PRELOAD = {
  href: "/space/hero-mobile.webp",
  media: "(max-width: 767px)",
} as const;

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <head>
        <link
          rel="preload"
          href={HERO_MOBILE_PRELOAD.href}
          as="image"
          type="image/webp"
          media={HERO_MOBILE_PRELOAD.media}
        />
      </head>
      {children}
    </>
  );
}
