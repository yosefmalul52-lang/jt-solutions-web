import Link from "next/link";

export default function BoldStatementBanner() {
  return (
    <section aria-label="הצהרת מותג" className="statement-banner">
      <div className="statement-banner__topbar" aria-hidden />

      <div className="statement-banner__body">
        <div className="statement-banner__inner" dir="rtl">
          <div className="statement-banner__copy">
            <p className="statement-banner__line">
              כן, אנחנו בונים מעטפת דיגיטלית מלאה.
            </p>
            <p className="statement-banner__line statement-banner__line--accent">
              <span>וכן, אנחנו </span>
              <span className="statement-banner__highlight">
                ממש
                <svg
                  className="statement-banner__scribble"
                  viewBox="0 0 120 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8 C30 2, 50 10, 90 6 S 118 4, 118 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span> טובים בזה.</span>
            </p>
            <Link href="/contact" className="statement-banner__cta">
              בואו נדבר
            </Link>
          </div>

          <div className="statement-banner__visual" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banners/statement-astronaut-cutout.png"
              alt=""
              className="statement-banner__image"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
