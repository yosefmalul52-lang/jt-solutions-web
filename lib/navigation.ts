export const MAIN_NAV_LINKS = [
  { label: "שירותים", href: "/services" },
  { label: "פרויקטים", href: "/projects" },
  { label: "מדריכים", href: "/blog" },
  { label: "הוכחות", href: "/#projects" },
  { label: "צור קשר", href: "/contact" },
] as const;

export type MainNavLink = (typeof MAIN_NAV_LINKS)[number];

export function isHashNavLink(href: string) {
  return href.startsWith("/#");
}

export function isNavLinkActive(href: string, pathname: string, activeHash: string) {
  if (isHashNavLink(href)) {
    return pathname === "/" && activeHash === href.slice(1);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Full homepage scroll order — includes sections not shown in the nav. */
export const HOME_SECTION_ORDER = [
  "#hero",
  "#problem",
  "#solution",
  "#projects",
  "#process",
  "#services",
  "#testimonials",
  "#pricing",
  "#faq",
  "#contact",
] as const;

export const HOME_NAV_HASHES = MAIN_NAV_LINKS.filter((link) =>
  isHashNavLink(link.href),
).map((link) => link.href.slice(1));

/** @deprecated Use HOME_SECTION_ORDER */
export const HOME_SECTION_HASHES = HOME_SECTION_ORDER;
