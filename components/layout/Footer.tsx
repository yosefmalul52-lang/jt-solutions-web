"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "שירותים", href: "/#services" },
  { label: "אודות", href: "/#about" },
  { label: "הוכחות", href: "/#proof" },
  { label: "פרויקטים", href: "/#projects" },
  { label: "אחרי ההשקה", href: "/#tech-stack" },
  { label: "צור קשר", href: "/#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      className="section-shell"
      style={{ background: "linear-gradient(180deg, #F7F9FF 0%, #F9FAFB 70%, #F4F7FF 100%)", borderTop: "1px solid rgba(15,23,42,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/jt-logo.png"
                alt="JT Solutions לוגו"
                width={190}
                height={62}
                className="object-contain h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#6B7280" }}>
              שיחת התאמה קצרה, המלצה ברורה, וביצוע מקצה לקצה שמייצר תוצאות.
            </p>
            <div className="space-y-1">
              <a href="mailto:jtsolutions.officee@gmail.com" className="block text-sm transition-colors duration-200"
                style={{ color: "#6B7280" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#111827"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280"; }}>
                jtsolutions.officee@gmail.com
              </a>
              <a href="tel:0528240230" className="block text-sm transition-colors duration-200"
                style={{ color: "#6B7280" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#111827"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280"; }}>
                052-8240230
              </a>
            </div>
            <Link
              href="/#contact"
              className="btn-primary text-sm"
            >
              קובעים שיחת התאמה
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">ניווט</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: "#6B7280" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#111827"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280"; }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">שירותים</h4>
            <ul className="space-y-2.5">
              {[
                { label: "דפי נחיתה ממירים", href: "/services/landing-pages" },
                { label: "אתרי תדמית מותאמים", href: "/services/business-websites" },
                { label: "חנויות איקומרס חכמות", href: "/services/ecommerce" },
                { label: "מיתוג וזהות", href: "/services/branding" },
                { label: "ניהול קמפיינים ותשתית פרסום", href: "/services/ad-infrastructure" },
                { label: "בוט וואטסאפ ללקוחות", href: "/services/whatsapp-bot" },
              ].map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-sm transition-colors duration-200"
                    style={{ color: "#6B7280" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#111827"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280"; }}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">עקבו אחרינו</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-[var(--radius-soft)] flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.86)",
                    border: "1px solid rgba(15,23,42,0.08)",
                    boxShadow: "0 12px 28px rgba(15,23,42,0.08)",
                    color: "#94A3B8",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#5B21B6";
                    el.style.borderColor = "rgba(91,33,182,0.2)";
                    el.style.background = "rgba(91,33,182,0.08)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#94A3B8";
                    el.style.borderColor = "rgba(15,23,42,0.08)";
                    el.style.background = "rgba(255,255,255,0.86)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#94A3B8" }}>&copy; 2025 JT Solutions. כל הזכויות שמורות.</p>
          <p className="text-xs" style={{ color: "#94A3B8" }}>מעטפת דיגיטלית מלאה לעסקים בצמיחה</p>
        </div>
      </div>
    </footer>
  );
}
