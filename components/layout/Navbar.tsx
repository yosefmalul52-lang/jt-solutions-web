"use client";

import { useState, useEffect, useRef } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics/track";
import { HOME_SECTION_HASHES, MAIN_NAV_LINKS } from "@/lib/navigation";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hydrated || pathname !== "/") return;

    const sections = HOME_SECTION_HASHES.map((id) => document.querySelector<HTMLElement>(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    const pickClosestSectionToViewportCenter = () => {
      if (sections.length === 0) return;

      const lockedTarget = navScrollLockTargetRef.current;
      if (lockedTarget) {
        const targetSection = document.querySelector<HTMLElement>(lockedTarget);
        if (targetSection) {
          const reachedTarget = Math.abs(targetSection.getBoundingClientRect().top) <= 140;
          if (!reachedTarget) {
            setActiveHash(lockedTarget);
            return;
          }
        }
        navScrollLockTargetRef.current = null;
      }

      const centerY = window.innerHeight / 2;
      let closestId = "#hero";
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - centerY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = `#${section.id}`;
        }
      }

      setActiveHash(closestId);
    };

    const observer = new IntersectionObserver(pickClosestSectionToViewportCenter, {
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
    });
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", pickClosestSectionToViewportCenter, { passive: true });
    window.addEventListener("resize", pickClosestSectionToViewportCenter);
    window.addEventListener("hashchange", pickClosestSectionToViewportCenter);

    requestAnimationFrame(() => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      } else {
        pickClosestSectionToViewportCenter();
      }
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickClosestSectionToViewportCenter);
      window.removeEventListener("resize", pickClosestSectionToViewportCenter);
      window.removeEventListener("hashchange", pickClosestSectionToViewportCenter);
      if (navScrollLockTimerRef.current !== null) {
        window.clearTimeout(navScrollLockTimerRef.current);
        navScrollLockTimerRef.current = null;
      }
      navScrollLockTargetRef.current = null;
    };
  }, [hydrated, pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const targetHash = href.slice(1);
      setActiveHash(targetHash);
      navScrollLockTargetRef.current = targetHash;
      if (navScrollLockTimerRef.current !== null) {
        window.clearTimeout(navScrollLockTimerRef.current);
      }
      navScrollLockTimerRef.current = window.setTimeout(() => {
        navScrollLockTargetRef.current = null;
        navScrollLockTimerRef.current = null;
      }, 1800);
    }
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.slice(1);
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
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
        initial={hydrated ? { y: -80, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={hydrated ? { duration: 0.7, ease: EASE } : { duration: 0 }}
        className="fixed top-3 sm:top-4 inset-x-0 z-50 transition-all duration-500 px-3 sm:px-4 pointer-events-none"
      >
        <nav
          dir="rtl"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] sm:h-[84px] rounded-[var(--radius)] flex items-center justify-between pointer-events-auto"
          style={{
            background: scrolled ? "rgba(221,227,234,0.74)" : "rgba(221,227,234,0.58)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(15,23,42,0.12)",
            boxShadow: scrolled ? "0 16px 40px rgba(15,23,42,0.14)" : "0 10px 28px rgba(15,23,42,0.09)",
          }}
        >
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
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:shadow-[0_8px_20px_rgba(124,58,237,0.18)]"
              style={{
                background: "linear-gradient(120deg, rgba(16,179,231,0.14), rgba(124,58,237,0.14))",
                borderColor: "rgba(124,58,237,0.22)",
              }}
            >
              <Phone size={18} stroke="url(#brandPhoneGradient)" />
            </a>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-all"
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
