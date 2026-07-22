import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import FooterPhoneLink from "@/components/layout/FooterPhoneLink";
import TrackedLink from "@/components/ui/TrackedLink";
import { contactLinks } from "@/lib/site";

const pageLinks = [
  { label: "מה חוסם", href: "/#problem" },
  { label: "איך זה עובד", href: "/#solution" },
  { label: "עבודות", href: "/#projects" },
  { label: "מסלולים", href: "/#pathways" },
  { label: "שאלות נפוצות", href: "/#faq" },
  { label: "אבחון", href: "/#contact" },
] as const;

const socialLinks = [
  {
    icon: Facebook,
    href: contactLinks.facebook,
    label: "JT Solutions בפייסבוק",
    className: "border-[rgba(24,119,242,0.35)] bg-[rgba(24,119,242,0.12)] text-[#60a5fa]",
  },
  {
    icon: Instagram,
    href: contactLinks.instagram,
    label: "@jt.solutions.il באינסטגרם",
    className:
      "border-[rgba(225,48,108,0.35)] bg-gradient-to-br from-[rgba(225,48,108,0.12)] to-[rgba(131,58,180,0.12)] text-[#f472b6]",
  },
] as const;

export default function Footer() {
  return (
    <footer className="studio-footer section-shell">
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 pb-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 border-b border-slate-200">
          <div className="lg:col-span-1" dir="rtl">
            <h4 className="studio-footer-heading text-base">JT Solutions</h4>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              מעטפת דיגיטלית אחת: אתרים ממירים, מיתוג, פרסום ואוטומציה — מהאפיון ועד לידים שמגיעים מסודר.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-700">
              בלי לרדוף אחרי ספקים. בלי כאב ראש טכני.
            </p>
          </div>

          <div dir="rtl">
            <h4 className="studio-footer-heading mb-4">ניווט</h4>
            <ul className="space-y-2.5">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="studio-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div dir="rtl">
            <h4 className="studio-footer-heading mb-4">יצירת קשר</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${contactLinks.email}`} className="studio-footer-link hover:text-sky-600">
                  {contactLinks.email}
                </a>
              </li>
              <li>
                <FooterPhoneLink className="studio-footer-link hover:text-emerald-600" />
              </li>
            </ul>
            <TrackedLink
              href={`https://wa.me/972${contactLinks.phone.replace(/^0/, "")}`}
              ctaLocation="footer-whatsapp"
              ctaLabel="שיחה ב-WhatsApp"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              <MessageCircle size={16} aria-hidden />
              שיחה ב-WhatsApp
            </TrackedLink>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, className }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-soft)] border transition-all duration-200 hover:opacity-90 ${className}`}
                >
                  <Icon size={15} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row" dir="rtl">
          <p className="studio-footer-quiet">&copy; 2026 JT Solutions. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="studio-footer-quiet hover:text-sky-600">
              מדיניות פרטיות
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/accessibility" className="studio-footer-quiet hover:text-sky-600">
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
