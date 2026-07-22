export const MAIN_NAV_LINKS = [
  { label: "מה חוסם", href: "/#problem" },
  { label: "איך זה עובד", href: "/#solution" },
  { label: "עבודות", href: "/#projects" },
  { label: "מסלולים", href: "/#pathways" },
  { label: "אבחון", href: "/#contact" },
] as const;

export type MainNavLink = (typeof MAIN_NAV_LINKS)[number];

export function isHashNavLink(href: string) {
  return href.startsWith("/#") || href.startsWith("#");
}

export function isNavLinkActive(href: string, pathname: string, activeHash: string) {
  if (isHashNavLink(href)) {
    const hash = href.startsWith("/#") ? href.slice(1) : href;
    return pathname === "/" && activeHash === hash;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Full homepage scroll order — includes sections not shown in the nav. */
export const HOME_SECTION_ORDER = [
  "#hero",
  "#problem",
  "#solution",
  "#projects",
  "#pathways",
  "#faq",
  "#contact",
] as const;

export const HOME_NAV_HASHES = MAIN_NAV_LINKS.filter((link) =>
  isHashNavLink(link.href),
).map((link) => (link.href.startsWith("/#") ? link.href.slice(1) : link.href));

/** @deprecated Use HOME_SECTION_ORDER */
export const HOME_SECTION_HASHES = HOME_SECTION_ORDER;
