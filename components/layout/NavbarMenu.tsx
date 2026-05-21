"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics/track";
import { isHashNavLink, isNavLinkActive, MAIN_NAV_LINKS } from "@/lib/navigation";
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
  return (
    <>
      <ul className="hidden md:flex items-center gap-1">
        {MAIN_NAV_LINKS.map((link) => {
          const active = isNavLinkActive(link.href, pathname, activeHash);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => isHashNavLink(link.href) && onNavClick(link.href)}
                className={`relative block px-4 py-2 text-sm font-semibold rounded-2xl transition-colors duration-200 ${
                  active ? "text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-2xl bg-white/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
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
            className="fixed top-[88px] sm:top-[100px] left-3 right-3 sm:left-4 sm:right-4 z-40 md:hidden"
            style={{
              background: "rgba(249,250,251,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "var(--radius-soft)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            }}
          >
            <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {MAIN_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    if (isHashNavLink(link.href)) onNavClick(link.href);
                    else onCloseMobile();
                  }}
                  className="w-full block text-right px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-2xl hover:bg-black/5 transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <a
                href={`tel:${contactLinks.phone}`}
                onClick={() => {
                  trackPhoneClick("navbar_mobile");
                  onCloseMobile();
                }}
                aria-label="התקשרו אל JT Solutions"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200"
                style={{
                  background: "linear-gradient(120deg, rgba(16,179,231,0.12), rgba(124,58,237,0.12))",
                  borderColor: "rgba(124,58,237,0.22)",
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
