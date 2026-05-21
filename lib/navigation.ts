export const MAIN_NAV_LINKS = [
  { label: "שירותים", href: "/#services" },
  { label: "פרויקטים", href: "/#projects" },
  { label: "הוכחות", href: "/#proof" },
  { label: "אחרי ההשקה", href: "/#tech-stack" },
  { label: "צור קשר", href: "/#contact" },
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

export const HOME_SECTION_HASHES = [
  "#hero",
  ...MAIN_NAV_LINKS.filter((link) => isHashNavLink(link.href)).map((link) => link.href.slice(1)),
] as const;
