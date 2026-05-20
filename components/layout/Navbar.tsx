"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics/track";
import { contactLinks } from "@/lib/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navLinks = [
  { label: "שירותים", href: "/#services" },
  { label: "פרויקטים", href: "/#projects" },
  { label: "הוכחות", href: "/#proof" },
  { label: "אחרי ההשקה", href: "/#tech-stack" },
  { label: "צור קשר", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const pathname = usePathname();
  const navScrollLockTargetRef = useRef<string | null>(null);
  const navScrollLockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["#hero", ...navLinks.map((link) => link.href.slice(1))];
    const sections = sectionIds
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter((el): el is HTMLElement => Boolean(el));

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

    // Respect direct hash navigation on first paint.
    if (window.location.hash) {
      setActiveHash(window.location.hash);
    } else {
      pickClosestSectionToViewportCenter();
    }

    const observer = new IntersectionObserver(pickClosestSectionToViewportCenter, {
      // "Center band" trigger: updates when sections pass middle viewport area.
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
    });
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", pickClosestSectionToViewportCenter, { passive: true });
    window.addEventListener("resize", pickClosestSectionToViewportCenter);
    window.addEventListener("hashchange", pickClosestSectionToViewportCenter);

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
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const targetHash = href.slice(1);
      setActiveHash(targetHash);
      navScrollLockTargetRef.current = targetHash;
      if (navScrollLockTimerRef.current !== null) {
        window.clearTimeout(navScrollLockTimerRef.current);
      }
      // Fallback unlock in case the scroll is interrupted.
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
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
            className="flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/j-t-logo.PNG"
              alt="JT Solutions לוגו"
              width={320}
              height={96}
              className="h-24 w-auto object-contain"
              sizes="(min-width: 640px) 260px, 210px"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeHash === link.href.slice(1);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
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
      <AnimatePresence>
        {mobileOpen && (
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
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
                    setMobileOpen(false);
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
        )}
      </AnimatePresence>
    </>
  );
}
