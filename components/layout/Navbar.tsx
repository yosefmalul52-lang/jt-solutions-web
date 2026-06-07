"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
import { contactLinks } from "@/lib/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const hydrated = useHydrated();
  const pathname = usePathname();
  const navScrollLockTargetRef = useRef<string | null>(null);
  const navScrollLockTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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

  const navShellClass = `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] sm:h-[84px] flex items-center justify-between pointer-events-auto transition-all duration-500 ${
    scrolled
      ? "rounded-[var(--radius)] backdrop-blur-md border border-white/10 bg-[rgba(11,15,25,0.82)] shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
      : "rounded-none border border-transparent bg-transparent shadow-none backdrop-blur-none"
  }`;

  const headerInner = (
    <nav dir="rtl" className={navShellClass}>
          <Link
            href="/"
            className="flex shrink-0 items-center py-1"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/logo.png"
              alt="JT Solutions Logo"
              width={490}
              height={430}
              className="h-11 w-auto max-h-[52px] object-contain sm:h-12 sm:max-h-[58px]"
              style={{ width: "auto", height: "auto" }}
              sizes="(min-width: 640px) 160px, 140px"
              priority
            />
          </Link>

          <NavbarMenu
            pathname={pathname}
            activeHash={activeHash}
            mobileOpen={mobileOpen}
            onNavClick={handleNavClick}
            onCloseMobile={() => setMobileOpen(false)}
          />

          <div className="flex items-center gap-3">
            <a
              href={`tel:${contactLinks.phone}`}
              onClick={() => trackPhoneClick("navbar")}
              aria-label="התקשרו אל JT Solutions"
              className={`hidden md:inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                scrolled ? "hover:shadow-[0_8px_20px_rgba(124,58,237,0.18)]" : "border-transparent hover:border-white/10"
              }`}
              style={
                scrolled
                  ? {
                      background: "linear-gradient(120deg, rgba(59,130,246,0.14), rgba(109,40,217,0.14))",
                      borderColor: "rgba(109,40,217,0.28)",
                    }
                  : {
                      background: "transparent",
                    }
              }
            >
              <Phone size={18} stroke="url(#brandPhoneGradient)" />
            </a>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
              aria-label="פתח תפריט"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
  );

  return (
    <>
      <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <linearGradient id="brandPhoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
      </svg>
      {hydrated ? (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed top-3 sm:top-4 inset-x-0 z-50 transition-all duration-500 px-3 sm:px-4 pointer-events-none"
        >
          {headerInner}
        </motion.header>
      ) : (
        <header className="fixed top-3 sm:top-4 inset-x-0 z-50 transition-all duration-500 px-3 sm:px-4 pointer-events-none">
          {headerInner}
        </header>
      )}
    </>
  );
}
