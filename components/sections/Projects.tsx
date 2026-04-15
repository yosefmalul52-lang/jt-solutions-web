"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-16 md:py-24 lg:py-32 section-shell"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #F9FAFB 52%, #F6F8FF 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[9%] top-14 h-36 w-36 rounded-full"
        style={{ background: "rgba(91,33,182,0.08)", filter: "blur(38px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[7%] bottom-10 h-32 w-32 rounded-full"
        style={{ background: "rgba(14,165,233,0.08)", filter: "blur(34px)" }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 pb-6 text-center" viewportKey="section" y={22} duration={0.62}>
          <span className="premium-badge mb-4">פרויקטים נבחרים</span>
          <h2 className="premium-title mt-1">
            פרויקטים שמייצרים צמיחה אמיתית
          </h2>
          <p className="premium-subtitle mx-auto mt-3 max-w-2xl">
            עיצוב נקי, חוויית משתמש מדויקת ותהליך ברור שמחבר בין נראות גבוהה לתוצאות עסקיות.
          </p>
        </Reveal>

        <Reveal
          className="relative w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]"
          viewportKey="section"
          y={18}
          duration={0.58}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.22) 12%, rgba(0,0,0,0.58) 24%, rgba(0,0,0,0.9) 38%, rgba(0,0,0,0.94) 46%, rgba(0,0,0,0.94) 78%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.22) 12%, rgba(0,0,0,0.58) 24%, rgba(0,0,0,0.9) 38%, rgba(0,0,0,0.94) 46%, rgba(0,0,0,0.94) 78%, transparent 100%)",
          }}
        >
          <Image
            src="/projects-hero.png"
            alt="תצוגת מוקאפ לפרויקט לקוח"
            width={1024}
            height={768}
            sizes="100vw"
            quality={100}
            unoptimized
            className="mx-auto h-auto w-full object-cover object-center"
            priority
          />
        </Reveal>

      </div>
    </section>
  );
}
