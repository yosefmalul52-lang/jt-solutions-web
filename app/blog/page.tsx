import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { getAllBlogPosts } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getBlogCollectionJsonLd } from "@/lib/seo/organization";

export const metadata: Metadata = createPageMetadata({
  title: "מדריכים דיגיטל לעסקים בישראל",
  description:
    "מאמרים מעשיים על אתרים, דפי נחיתה, איקומרס, מיתוג, פרסום ואוטומציה — כדי לקבל החלטות חכמות ולהגדיל מכירות.",
  path: "/blog",
  keywords: ["מדריכים דיגיטל", "בניית אתרים", "שיווק דיגיטלי"],
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <JsonLd data={getBlogCollectionJsonLd(posts.length)} />
      <Navbar />
      <main className="flex-1 py-16 md:py-24 section-shell">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
          <header className="mb-10 text-center">
            <h1 className="premium-title mb-3">מדריכים לצמיחה דיגיטלית</h1>
            <p className="premium-subtitle max-w-2xl mx-auto">
              תוכן מעשי בעברית לעסקים בישראל — החלטות, מחירים, תהליכים והמרות.
            </p>
          </header>

          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-[var(--radius-soft)] border border-slate-200 bg-white p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
                >
                  <p className="text-xs text-slate-500 mb-1">
                    {new Date(post.publishedAt).toLocaleDateString("he-IL")}
                  </p>
                  <h2 className="text-lg font-bold text-slate-900">{post.title}</h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
