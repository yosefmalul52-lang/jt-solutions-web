"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics/track";
import {
  HOME_NAV_HASHES,
  HOME_SECTION_ORDER,
  MAIN_NAV_LINKS,
} from "@/lib/navigation";
import {
  getActiveSectionHash,
  isSectionReached,
  mapSectionToNavHash,
  scrollToHash,
} from "@/lib/scroll";
import { EASE_OUT } from "@/lib/motion";
import { getNavShellTheme } from "@/lib/studio-shell";
import { contactLinks } from "@/lib/site";

const NavbarMenu = dynamic(() => import("@/components/layout/NavbarMenu"), {
  ssr: false,
  loading: () => (
    <ul className="hidden md:flex items-center gap-1" aria-hidden>
      {Array.from({ length: MAIN_NAV_LINKS.length }, (_, i) => (
        <li key={i}>
          <span className="block h-9 w-[4.25rem] rounded-2xl" />
        </li>
      ))}
    </ul>
  ),
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const navScrollLockTargetRef = useRef<string | null>(null);
  const navScrollLockTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  const navTheme = useMemo(
    () => getNavShellTheme(pathname, activeHash),
    [pathname, activeHash],
  );
  const isDark = navTheme === "dark";

  const syncActiveSection = useCallback(() => {
    const lockedTarget = navScrollLockTargetRef.current;
    if (lockedTarget) {
      setActiveHash(lockedTarget);
      if (isSectionReached(lockedTarget)) {
        navScrollLockTargetRef.current = null;
      }
      return;
    }

    const rawSection = getActiveSectionHash(HOME_SECTION_ORDER);
    setActiveHash(mapSectionToNavHash(rawSection, HOME_NAV_HASHES));
  }, []);

  const scheduleSync = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      syncActiveSection();
    });
  }, [syncActiveSection]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const lastY = lastScrollYRef.current;
      const delta = currentY - lastY;

      setScrolled(currentY > 40);

      // Keep chrome stable for reduced-motion users
      if (reduceMotion || mobileOpen || currentY < 80) {
        setNavHidden(false);
      } else if (delta > 8) {
        setNavHidden(true);
      } else if (delta < -8) {
        setNavHidden(false);
      }

      lastScrollYRef.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen, reduceMotion]);

  useEffect(() => {
    if (mobileOpen) setNavHidden(false);
  }, [mobileOpen]);  useEffect(() => {
    if (!hydrated || pathname !== "/") return;

    syncActiveSection();

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("hashchange", scheduleSync);

    requestAnimationFrame(() => {
      const hash = window.location.hash;
      if (hash && HOME_NAV_HASHES.includes(hash)) {
        setActiveHash(mapSectionToNavHash(hash, HOME_NAV_HASHES));
      } else if (hash && HOME_SECTION_ORDER.includes(hash as (typeof HOME_SECTION_ORDER)[number])) {
        setActiveHash(mapSectionToNavHash(hash, HOME_NAV_HASHES));
      } else {
        syncActiveSection();
      }
    });

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", scheduleSync);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (navScrollLockTimerRef.current !== null) {
        window.clearTimeout(navScrollLockTimerRef.current);
        navScrollLockTimerRef.current = null;
      }
      navScrollLockTargetRef.current = null;
    };
  }, [hydrated, pathname, scheduleSync, syncActiveSection]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const targetHash = href.slice(1);
      const navHash = mapSectionToNavHash(targetHash, HOME_NAV_HASHES);
      setActiveHash(navHash);
      navScrollLockTargetRef.current = targetHash;

      if (navScrollLockTimerRef.current !== null) {
        window.clearTimeout(navScrollLockTimerRef.current);
      }
      navScrollLockTimerRef.current = window.setTimeout(() => {
        navScrollLockTargetRef.current = null;
        navScrollLockTimerRef.current = null;
        syncActiveSection();
      }, 2000);
    }

    if (pathname === "/" && href.startsWith("/#")) {
      scrollToHash(href.slice(1));
    }
  };

  return (
    <>
      <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <linearGradient id="brandPhoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b3e7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <motion.header
        initial={hydrated && !reduceMotion ? { y: -80, opacity: 0 } : false}
        animate={{
          y: navHidden && !reduceMotion ? -120 : 0,
          opacity: navHidden && !reduceMotion ? 0 : 1,
        }}
        transition={
          !hydrated || reduceMotion
            ? { duration: 0 }
            : { duration: 0.28, ease: EASE_OUT }
        }
        className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 transition-all duration-500 sm:top-4 sm:px-4"
      >
        <nav
          dir="rtl"
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] sm:h-[84px] rounded-[var(--radius)] flex items-center justify-between pointer-events-auto border backdrop-blur-[14px] transition-all duration-300 ${
            isDark ? "nav-shell--dark" : "nav-shell--light"
          } ${scrolled ? "backdrop-blur-[18px] nav-shell--scrolled" : ""}`}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center py-1"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          >
            <Image
              src="/logo.png"
              alt="JT Solutions Logo"
              width={490}
              height={430}
              className={`h-8 w-auto max-h-8 object-contain sm:h-9 sm:max-h-9 transition-[filter] duration-300 ${
                isDark ? "brightness-110" : ""
              }`}
              style={{ width: "auto", height: "auto" }}
              sizes="(min-width: 640px) 108px, 96px"
              priority
            />
          </Link>

          <NavbarMenu
            pathname={pathname}
            activeHash={activeHash}
            mobileOpen={mobileOpen}
            navTheme={navTheme}
            onNavClick={handleNavClick}
            onCloseMobile={() => setMobileOpen(false)}
          />

          <div className="flex items-center gap-3">
            <a
              href={`tel:${contactLinks.phone}`}
              onClick={() => trackPhoneClick("navbar")}
              aria-label="התקשרו אל JT Solutions"
              className={`hidden md:inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                isDark
                  ? "border-white/15 bg-white/5 hover:border-cyan-400/30 hover:shadow-[0_8px_20px_rgba(16,179,231,0.15)]"
                  : "hover:shadow-[0_8px_20px_rgba(124,58,237,0.18)]"
              }`}
              style={
                isDark
                  ? undefined
                  : {
                      background: "linear-gradient(120deg, rgba(16,179,231,0.14), rgba(124,58,237,0.14))",
                      borderColor: "rgba(124,58,237,0.22)",
                    }
              }
            >
              <Phone size={18} stroke="url(#brandPhoneGradient)" />
            </a>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className={`md:hidden p-2 rounded-xl transition-all ${
                isDark
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-black/5"
              }`}
              aria-label="פתח תפריט"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
