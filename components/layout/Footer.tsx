import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import SpaceSectionBackdrop from "@/components/motion/SpaceSectionBackdrop";
import FooterPhoneLink from "@/components/layout/FooterPhoneLink";
import { contactLinks } from "@/lib/site";

const quickLinks = [
  { label: "אודות", href: "/about" },
  { label: "שירותים", href: "/services" },
  { label: "פרויקטים", href: "/projects" },
  { label: "מדריכים", href: "/blog" },
  { label: "צור קשר", href: "/contact" },
] as const;

const serviceLinks = [
  { label: "כל השירותים", href: "/services" },
  { label: "בניית אתרים", href: "/services/websites" },
  { label: "מיתוג וזהות", href: "/services/branding" },
  { label: "אוטומציות", href: "/services/automations" },
  { label: "שיווק דיגיטלי", href: "/services/digital-marketing" },
] as const;

const socialLinks = [
  {
    icon: Facebook,
    href: contactLinks.facebook,
    label: "JT Solutions בפייסבוק",
    className:
      "border-[rgba(24,119,242,0.35)] bg-[rgba(24,119,242,0.12)] text-[#60A5FA] hover:bg-[rgba(24,119,242,0.2)]",
  },
  {
    icon: Instagram,
    href: contactLinks.instagram,
    label: "@jt.solutions.il באינסטגרם",
    className:
      "border-[rgba(225,48,108,0.35)] bg-gradient-to-br from-[rgba(225,48,108,0.14)] to-[rgba(131,58,180,0.14)] text-[#F472B6] hover:from-[rgba(225,48,108,0.22)] hover:to-[rgba(131,58,180,0.22)]",
  },
] as const;

const footerLinkClass =
  "text-sm text-slate-400 transition-colors duration-200 hover:text-slate-100";

const footerHeadingClass = "text-sm font-semibold text-slate-100 mb-4";

type FooterProps = {
  /** @deprecated Footer always uses the hero space backdrop */
  transparent?: boolean;
};

export default function Footer(_props: FooterProps = {}) {
  const footer = (
    <footer
      className="section-shell border-t border-white/10 bg-transparent"
      style={{ background: "transparent" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div className="md:col-span-1">
            <h4 className={footerHeadingClass}>JT Solutions</h4>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              מעטפת דיגיטלית אחת: אתרים ממירים, מיתוג, פרסום ואוטומציה — מהאפיון ועד לידים שמגיעים.
            </p>
            <p className="text-xs font-semibold text-slate-200 mt-6 mb-3">יצירת קשר</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${contactLinks.email}`}
                  className={`${footerLinkClass} hover:text-[#60A5FA]`}
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
            <h4 className={footerHeadingClass}>ניווט</h4>
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
            <h4 className={footerHeadingClass}>שירותים</h4>
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
            <h4 className={footerHeadingClass}>עקבו אחרינו</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, className }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-[var(--radius-soft)] border shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-200 ${className}`}
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" dir="rtl">
          <p className="text-xs text-slate-500">&copy; 2025 JT Solutions. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-slate-500 transition-colors hover:text-slate-300">
              מדיניות פרטיות
            </Link>
            <span className="text-white/15">|</span>
            <Link href="/accessibility" className="text-xs text-slate-500 transition-colors hover:text-slate-300">
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <SpaceSectionBackdrop slice="hero" blendTop blendBottom={false}>
      {footer}
    </SpaceSectionBackdrop>
  );
}
