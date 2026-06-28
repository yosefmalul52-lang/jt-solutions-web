"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";
import { COOKIE_CONSENT_KEY, useCookieConsent } from "@/hooks/useCookieConsent";
import CtaButton from "@/components/ui/CtaButton";

export default function CookieConsent() {
  const hydrated = useHydrated();
  const consent = useCookieConsent();
  const visible = hydrated && !consent;

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("jt-consent-change"));
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    window.dispatchEvent(new Event("jt-consent-change"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="הסכמה לעוגיות"
          className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:left-auto sm:right-5 sm:max-w-sm z-50"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(15,23,42,0.1)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(15,23,42,0.10)",
          }}
        >
          <div className="p-5" dir="rtl">
            <p className="text-sm font-semibold text-gray-900 mb-1">שימוש בעוגיות</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              האתר משתמש בעוגיות לצורך אנליטיקה ושיפור חוויית המשתמש.
            </p>
            <div className="flex items-center gap-2 justify-end">
              <CtaButton variant="ghost" size="sm" onClick={decline} label="דחה" hideIcon shine={false} />
              <CtaButton size="sm" onClick={accept} label="אישור" hideIcon />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
