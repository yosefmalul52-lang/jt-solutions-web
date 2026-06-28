import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LightPageShell from "@/components/layout/LightPageShell";
import PremiumReveal from "@/components/motion/PremiumReveal";
import ScribbleUnderline from "@/components/motion/ScribbleUnderline";
import JsonLd from "@/components/seo/JsonLd";
import { getAllBlogPosts } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getBlogCollectionJsonLd } from "@/lib/seo/organization";

export const metadata: Metadata = createPageMetadata({
  title: "מדריכים לבעלי עסקים — אתרים, פניות ומדידה",
  description:
    "מאמרים מעשיים על אתרים, דפי נחיתה, מדידה, מיתוג וסדר בלידים — כדי לקבל החלטות נכונות לפני שמתחילים לבנות.",
  path: "/blog",
  keywords: ["מדריכים דיגיטל", "בניית אתרים", "דף נחיתה", "מדידת פניות"],
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <JsonLd data={getBlogCollectionJsonLd(posts.length)} />
      <Navbar />
      <LightPageShell>
        <main className="flex-1">
          <section className="studio-service-hero-zone relative section-shell pt-28 pb-10 md:pt-36 md:pb-14">
            <div className="studio-service-hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <div className="page-hero-mesh" aria-hidden />
            <PremiumReveal as="div" className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center" variant="rise">
              <div dir="rtl">
                <span className="home-badge mb-6 inline-flex">מדריכים</span>
                <h1 className="home-headline">
                  מדריכים ל
                  <span className="accent-word">
                    צמיחה
                    <ScribbleUnderline color="#06B6D4" />
                  </span>{" "}
                  דיגיטלית
                </h1>
                <p className="home-subline mx-auto mt-5 max-w-2xl">
                  תוכן מעשי בעברית לעסקים בישראל — החלטות, מחירים, תהליכים והמרות.
                </p>
              </div>
            </PremiumReveal>
          </section>

          <section className="home-section section-shell pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" dir="rtl">
              <ul className="space-y-4">
                {posts.map((post, index) => (
                  <li key={post.slug}>
                    <PremiumReveal as="div" variant="rise" delay={0.03 + index * 0.05}>
                      <Link href={`/blog/${post.slug}`} className="blog-card group">
                        <div className="flex items-center justify-between gap-3">
                          <span className="blog-tag">
                            {new Date(post.publishedAt).toLocaleDateString("he-IL")}
                          </span>
                          <ArrowLeft
                            size={16}
                            className="shrink-0 text-slate-300 transition-all group-hover:-translate-x-0.5 group-hover:text-sky-600"
                            aria-hidden
                          />
                        </div>
                        <h2 className="mt-3 text-lg font-bold text-slate-900">{post.title}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.description}</p>
                      </Link>
                    </PremiumReveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </LightPageShell>
      <Footer />
    </>
  );
}
