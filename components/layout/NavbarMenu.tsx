"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics/track";
import { useHydrated } from "@/hooks/useHydrated";
import { isHashNavLink, isNavLinkActive, MAIN_NAV_LINKS } from "@/lib/navigation";
import { heroCopy } from "@/lib/hero-content";
import { DURATION_UI, EASE_OUT, SPRING_SNAPPY } from "@/lib/motion";
import type { NavShellTheme } from "@/lib/studio-shell";
import { contactLinks } from "@/lib/site";
import CtaButton from "@/components/ui/CtaButton";

type NavbarMenuProps = {
  pathname: string;
  activeHash: string;
  mobileOpen: boolean;
  navTheme: NavShellTheme;
  onNavClick: (href: string) => void;
  onCloseMobile: () => void;
};

export default function NavbarMenu({
  pathname,
  activeHash,
  mobileOpen,
  navTheme,
  onNavClick,
  onCloseMobile,
}: NavbarMenuProps) {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const isDark = navTheme === "dark";
  const pillTransition = reduce
    ? { duration: 0.01 }
    : { type: "spring" as const, ...SPRING_SNAPPY };
  const drawerTransition = reduce
    ? { duration: 0.01 }
    : { duration: DURATION_UI, ease: EASE_OUT };
  return (
    <>
      <ul className="hidden md:flex items-center gap-1">
        {MAIN_NAV_LINKS.map((link) => {
          const active = isNavLinkActive(link.href, pathname, activeHash);
          const linkClass = isDark ? "nav-link--dark" : "nav-link--light";
          const activeClass = active
            ? isDark
              ? "nav-link--dark-active"
              : "nav-link--light-active"
            : "";

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(event) => {
                  if (isHashNavLink(link.href) && pathname === "/") {
                    event.preventDefault();
                    onNavClick(link.href);
                  } else if (isHashNavLink(link.href)) {
                    onNavClick(link.href);
                  }
                }}
                className={`relative block px-4 py-2 text-sm font-semibold rounded-2xl transition-colors duration-200 ${linkClass} ${activeClass}`}
              >
                {active && hydrated ? (
                  <motion.span
                    layoutId="navActivePill"
                    className={`absolute inset-0 rounded-2xl -z-10 ${
                      isDark ? "nav-active-pill--dark" : "nav-active-pill--light"
                    }`}
                    transition={pillTransition}
                    aria-hidden
                  />
                ) : active && !hydrated ? (
                  <span
                    className={`absolute inset-0 rounded-2xl -z-10 ${
                      isDark ? "nav-active-pill--dark" : "nav-active-pill--light"
                    }`}
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={drawerTransition}
            className={`fixed top-[88px] sm:top-[100px] left-3 right-3 sm:left-4 sm:right-4 z-40 md:hidden rounded-[var(--radius)] border backdrop-blur-[18px] ${
              isDark
                ? "border-white/12 bg-[rgba(8,10,18,0.94)] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                : "border-slate-200/80 bg-[rgba(255,255,255,0.96)] shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
            }`}
          >
            <ul className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-4">
              {MAIN_NAV_LINKS.map((link) => {
                const active = isNavLinkActive(link.href, pathname, activeHash);
                return (
                  <li key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      onClick={(event) => {
                        if (isHashNavLink(link.href) && pathname === "/") {
                          event.preventDefault();
                          onNavClick(link.href);
                        } else if (isHashNavLink(link.href)) {
                          onNavClick(link.href);
                        } else {
                          onCloseMobile();
                        }
                      }}
                      className={`block w-full rounded-2xl px-4 py-3 text-center text-sm font-medium transition-colors duration-200 ${
                        active
                          ? isDark
                            ? "bg-white/10 text-white"
                            : "bg-white/90 text-slate-900 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
                          : isDark
                            ? "text-slate-300 hover:bg-white/5 hover:text-slate-100"
                            : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li
                className={`w-full pt-3 ${
                  isDark ? "border-t border-white/10" : "border-t border-slate-200/80"
                }`}
              >
                <div className="flex w-full flex-col items-center gap-2">
                  <CtaButton
                    href="/#contact"
                    ctaLocation="navbar-mobile"
                    label={heroCopy.ctaLabel}
                    fullWidth
                    shine="auto"
                    className="text-sm"
                    onClick={onCloseMobile}
                  />
                  <a
                    href={`tel:${contactLinks.phone}`}
                    aria-label="התקשרו אל JT Solutions"
                    onClick={() => {
                      trackPhoneClick("navbar_mobile");
                      onCloseMobile();
                    }}
                    className={`grid min-h-12 w-full place-items-center rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      isDark
                        ? "border-white/15 bg-white/5 text-slate-200"
                        : "border-violet-200/40 text-slate-800"
                    }`}
                    style={
                      isDark
                        ? undefined
                        : {
                            background:
                              "linear-gradient(120deg, rgba(16,179,231,0.12), rgba(124,58,237,0.12))",
                          }
                    }
                  >
                    <span className="inline-flex items-center justify-center gap-2 text-[#2563eb]" dir="ltr">
                      <Phone size={18} strokeWidth={2.25} className="size-[18px] shrink-0" aria-hidden />
                      <span className="tabular-nums leading-none">052-8240230</span>
                    </span>
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
