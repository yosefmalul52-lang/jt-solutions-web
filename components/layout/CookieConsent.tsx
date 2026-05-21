"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHydrated } from "@/hooks/useHydrated";

const STORAGE_KEY = "cookie_consent";

function getConsentSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function subscribeToConsent(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("jt-consent-change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("jt-consent-change", handler);
    window.removeEventListener("storage", handler);
  };
}

export default function CookieConsent() {
  const hydrated = useHydrated();
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => null,
  );
  const visible = hydrated && !consent;

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    window.dispatchEvent(new Event("jt-consent-change"));
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    window.dispatchEvent(new Event("jt-consent-change"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
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
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              האתר משתמש בעוגיות לצורך אנליטיקה ושיפור חוויית המשתמש.
            </p>
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={decline}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
              >
                דחה
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                אישור
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
