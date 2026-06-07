"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics/track";
import { useHydrated } from "@/hooks/useHydrated";
import { isHashNavLink, isNavLinkActive, MAIN_NAV_LINKS } from "@/lib/navigation";
import { SPRING_SNAPPY } from "@/lib/motion";
import { contactLinks } from "@/lib/site";

type NavbarMenuProps = {
  pathname: string;
  activeHash: string;
  mobileOpen: boolean;
  onNavClick: (href: string) => void;
  onCloseMobile: () => void;
};

export default function NavbarMenu({
  pathname,
  activeHash,
  mobileOpen,
  onNavClick,
  onCloseMobile,
}: NavbarMenuProps) {
  const hydrated = useHydrated();

  return (
    <>
      <ul className="hidden md:flex items-center gap-1">
        {MAIN_NAV_LINKS.map((link) => {
          const active = isNavLinkActive(link.href, pathname, activeHash);

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
                className={`relative block px-4 py-2 text-sm font-semibold rounded-2xl transition-colors duration-200 ${
                  active ? "text-slate-100" : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {active && hydrated ? (
                  <motion.span
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-2xl bg-white/10 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] -z-10"
                    transition={{ type: "spring", ...SPRING_SNAPPY }}
                    aria-hidden
                  />
                ) : active && !hydrated ? (
                  <span
                    className="absolute inset-0 rounded-2xl bg-white/10 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] -z-10"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[88px] sm:top-[100px] left-3 right-3 sm:left-4 sm:right-4 z-40 md:hidden glass-panel backdrop-blur-xl"
            style={{
              borderRadius: "var(--radius-soft)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {MAIN_NAV_LINKS.map((link) => {
                const active = isNavLinkActive(link.href, pathname, activeHash);
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
                        } else {
                          onCloseMobile();
                        }
                      }}
                      className={`w-full block text-right px-4 py-3 text-sm font-medium rounded-2xl transition-colors duration-200 ${
                        active
                          ? "text-slate-100 bg-white/10 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                          : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-white/10">
                <a
                  href={`tel:${contactLinks.phone}`}
                  onClick={() => {
                    trackPhoneClick("navbar_mobile");
                    onCloseMobile();
                  }}
                  aria-label="התקשרו אל JT Solutions"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200"
                  style={{
                    background: "linear-gradient(120deg, rgba(59,130,246,0.14), rgba(109,40,217,0.14))",
                    borderColor: "rgba(109,40,217,0.28)",
                  }}
                >
                  <Phone size={18} stroke="url(#brandPhoneGradient)" />
                  <span className="gradient-text">052-8240230</span>
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
