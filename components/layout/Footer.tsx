import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import FooterPhoneLink from "@/components/layout/FooterPhoneLink";
import TrackedLink from "@/components/ui/TrackedLink";
import { MAIN_NAV_LINKS } from "@/lib/navigation";
import { contactLinks } from "@/lib/site";
import { WHATSAPP_URL } from "@/lib/floating-buttons";

const pageLinks = [
  ...MAIN_NAV_LINKS,
  { label: "שאלות נפוצות", href: "/#faq" },
] as const;

const socialLinks = [
  {
    icon: Facebook,
    href: contactLinks.facebook,
    label: "JT Solutions בפייסבוק",
  },
  {
    icon: Instagram,
    href: contactLinks.instagram,
    label: "@jt.solutions.il באינסטגרם",
  },
] as const;

export default function Footer() {
  return (
    <footer className="studio-footer section-shell" dir="rtl">
      <div className="studio-footer__inner">
        <div className="studio-footer__main">
          <div className="studio-footer__brand">
            <Link href="/" className="studio-footer__logo" aria-label="JT Solutions - דף הבית">
              <Image
                src="/logo.png"
                alt="JT Solutions"
                width={490}
                height={430}
                className="studio-footer__logo-img"
                sizes="120px"
              />
            </Link>
            <p className="studio-footer__tagline">
              מעטפת דיגיטלית אחת: אתרים ממירים, מיתוג, פרסום ואוטומציה - מהאפיון ועד לידים שמגיעים מסודר.
            </p>
          </div>

          <nav className="studio-footer__nav" aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className="studio-footer-heading">
              ניווט
            </h2>
            <ul className="studio-footer__nav-list">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="studio-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="studio-footer__contact" aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="studio-footer-heading">
              יצירת קשר
            </h2>
            <ul className="studio-footer__contact-list">
              <li>
                <a href={`mailto:${contactLinks.email}`} className="studio-footer-link">
                  {contactLinks.email}
                </a>
              </li>
              <li>
                <FooterPhoneLink className="studio-footer-link" />
              </li>
            </ul>

            <TrackedLink
              href={WHATSAPP_URL}
              ctaLocation="footer-whatsapp"
              ctaLabel="שיחה ב-WhatsApp"
              className="studio-footer__whatsapp"
            >
              <MessageCircle size={16} aria-hidden />
              שיחה ב-WhatsApp
            </TrackedLink>

            <div className="studio-footer__social">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="studio-footer__social-btn"
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="studio-footer__legal">
          <p className="studio-footer-quiet">&copy; 2026 JT Solutions. כל הזכויות שמורות.</p>
          <div className="studio-footer__legal-links">
            <Link href="/privacy-policy" className="studio-footer-quiet">
              מדיניות פרטיות
            </Link>
            <Link href="/accessibility" className="studio-footer-quiet">
              הצהרת נגישות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
