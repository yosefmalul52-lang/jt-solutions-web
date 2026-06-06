import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import FooterPhoneLink from "@/components/layout/FooterPhoneLink";
import { contactLinks } from "@/lib/site";

const quickLinks = [
  { label: "אודות", href: "/about" },
  { label: "שירותים", href: "/services" },
  { label: "מדריכים", href: "/blog" },
  { label: "פרויקטים", href: "/projects" },
  { label: "הוכחות", href: "/#proof" },
  { label: "צור קשר", href: "/contact" },
] as const;

const serviceLinks = [
  { label: "כל השירותים", href: "/services" },
  { label: "דפי נחיתה ממירים", href: "/services/landing-pages" },
  { label: "אתרי תדמית מותאמים", href: "/services/business-websites" },
  { label: "חנויות איקומרס חכמות", href: "/services/ecommerce" },
  { label: "מיתוג וזהות", href: "/services/branding" },
  { label: "ניהול קמפיינים ותשתית פרסום", href: "/services/ad-infrastructure" },
  { label: "בוט וואטסאפ ללקוחות", href: "/services/whatsapp-bot" },
  { label: "אוטומציה לעסקים", href: "/services/ai-automation" },
  { label: "פיתוח אתרים ומערכות", href: "/services/web-development" },
] as const;

const socialLinks = [
  {
    icon: Facebook,
    href: contactLinks.facebook,
    label: "JT Solutions בפייסבוק",
    className:
      "border-[rgba(24,119,242,0.28)] bg-[rgba(24,119,242,0.12)] text-[#1877F2] hover:bg-[rgba(24,119,242,0.2)]",
  },
  {
    icon: Instagram,
    href: contactLinks.instagram,
    label: "@jt.solutions.il באינסטגרם",
    className:
      "border-[rgba(225,48,108,0.3)] bg-gradient-to-br from-[rgba(225,48,108,0.14)] to-[rgba(131,58,180,0.14)] text-[#E1306C] hover:from-[rgba(225,48,108,0.22)] hover:to-[rgba(131,58,180,0.22)]",
  },
] as const;

const footerLinkClass =
  "text-sm text-[#6B7280] transition-colors duration-200 hover:text-[#111827]";

export default function Footer() {
  return (
    <footer
      className="section-shell"
      style={{
        background: "linear-gradient(180deg, #F7F9FF 0%, #F9FAFB 70%, #F4F7FF 100%)",
        borderTop: "1px solid rgba(15,23,42,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10"
          style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}
        >
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">JT Solutions</h4>
            <p className="max-w-xs text-sm leading-relaxed text-[#6B7280]">
              מעטפת דיגיטלית אחת: אתרים ממירים, מיתוג, פרסום ואוטומציה — מהאפיון ועד לידים שמגיעים.
            </p>
            <p className="text-xs font-semibold text-gray-900 mt-6 mb-3">יצירת קשר</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${contactLinks.email}`}
                  className={`${footerLinkClass} hover:text-[#10b3e7]`}
                >
                  {contactLinks.email}
                </a>
              </li>
              <li>
                <FooterPhoneLink />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">ניווט</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">שירותים</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={footerLinkClass}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">עקבו אחרינו</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, className }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-[var(--radius-soft)] border shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition-all duration-200 ${className}`}
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" dir="rtl">
          <p className="text-xs text-[#94A3B8]">&copy; 2025 JT Solutions. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-[#94A3B8] transition-colors hover:text-slate-700">
              מדיניות פרטיות
            </Link>
            <span className="text-[#CBD5E1]">|</span>
            <Link href="/accessibility" className="text-xs text-[#94A3B8] transition-colors hover:text-slate-700">
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
