"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navLinks = [
  { label: "שירותים", href: "/#services" },
  { label: "אודות", href: "/#about" },
  { label: "הוכחות", href: "/#proof" },
  { label: "פרויקטים", href: "/#projects" },
  { label: "אחרי ההשקה", href: "/#tech-stack" },
  { label: "צור קשר", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sectionIds = [
      "#hero",
      "#services",
      "#about",
      "#proof",
      "#projects",
      "#pricing",
      "#tech-stack",
      "#contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveHash(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] },
    );
    sectionIds.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) setActiveHash(href.slice(1));
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.slice(1);
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
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
              className="h-12 w-auto object-contain"
              sizes="(min-width: 640px) 220px, 180px"
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
            <Link
              href="/#contact"
              onClick={() => handleNavClick("/#contact")}
              className="hidden md:inline-flex btn-primary text-sm"
            >
              קובעים שיחת התאמה
            </Link>
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
      <div className="h-[90px] sm:h-[102px]" />

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
                <Link
                  href="/#contact"
                  onClick={() => handleNavClick("/#contact")}
                  className="w-full inline-flex items-center justify-center btn-primary text-sm"
                >
                  קובעים שיחת התאמה
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
