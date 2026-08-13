/** Fixed navbar clearance - keep in sync with Navbar height + top inset. */
export function getNavScrollOffset(): number {
  if (typeof window === "undefined") return 96;
  const sm = window.matchMedia("(min-width: 640px)").matches;
  // top-3/top-4 + nav height + breathing room
  return sm ? 84 + 16 + 20 : 74 + 12 + 16;
}

export function scrollToHash(hash: string) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector<HTMLElement>(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - getNavScrollOffset();
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReduced ? "auto" : "smooth",
  });

  if (window.location.hash !== id) {
    history.replaceState(null, "", id);
  }
}

/**
 * Classic scroll-spy: last section whose top crossed the activation line wins.
 * More stable than viewport-center distance when section heights differ.
 */
export function getActiveSectionHash(orderedHashes: readonly string[]): string {
  const line = window.scrollY + getNavScrollOffset() + 4;
  let active = orderedHashes[0] ?? "#hero";

  for (const hash of orderedHashes) {
    const id = hash.startsWith("#") ? hash : `#${hash}`;
    const el = document.querySelector<HTMLElement>(id);
    if (!el) continue;

    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= line) {
      active = id;
    } else {
      break;
    }
  }

  return active;
}

/** Map page sections (incl. pricing/faq) to a navbar hash for highlighting. */
export function mapSectionToNavHash(
  sectionHash: string,
  navHashes: readonly string[],
): string {
  const normalized = sectionHash.startsWith("#") ? sectionHash : `#${sectionHash}`;

  const sectionToNav: Record<string, string> = {
    "#hero": "#hero",
    "#problem": "#hero",
    "#solution": "#services",
    "#services": "#services",
    "#projects": "#projects",
    "#proof": "#projects",
    "#process": "#services",
    "#testimonials": "#projects",
    "#pricing": "#pricing",
    "#tech-stack": "#pricing",
    "#faq": "#faq",
    "#contact": "#contact",
  };

  const mapped = sectionToNav[normalized] ?? normalized;
  if (navHashes.includes(mapped)) return mapped;
  return normalized;
}

export function isSectionReached(hash: string): boolean {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector<HTMLElement>(id);
  if (!el) return true;

  const offset = getNavScrollOffset();
  const rect = el.getBoundingClientRect();
  return rect.top <= offset + 32 && rect.bottom > offset;
}
