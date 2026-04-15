"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileStickyCta() {
  const pathname = usePathname();
  const [showCta, setShowCta] = useState(false);
  const [hideOnContact, setHideOnContact] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setShowCta(false);
      return;
    }

    const heroCta = document.querySelector("#hero-main-cta");
    const contactSection = document.querySelector("#contact");
    if (!heroCta || !contactSection) return;

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        // Show only after user scrolls past the main Hero CTA.
        setShowCta(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const contactObserver = new IntersectionObserver(
      (entries) => setHideOnContact(Boolean(entries[0]?.isIntersecting)),
      { threshold: 0.2 }
    );

    ctaObserver.observe(heroCta);
    contactObserver.observe(contactSection);

    return () => {
      ctaObserver.disconnect();
      contactObserver.disconnect();
    };
  }, [pathname]);

  const goToContact = () => {
    if (pathname === "/") {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = "/#contact";
  };

  return (
    <AnimatePresence>
      {showCta && !hideOnContact && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-3 left-5 right-5 z-[65]"
        >
          <div
            className="rounded-[var(--radius-soft)] p-1.5"
            style={{
              background: "rgba(255,255,255,0.76)",
              border: "1px solid rgba(15,23,42,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 18px rgba(15,23,42,0.1)",
            }}
          >
            <button onClick={goToContact} className="w-full btn-primary text-[13px] py-2.5">
              שיחת התאמה
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
