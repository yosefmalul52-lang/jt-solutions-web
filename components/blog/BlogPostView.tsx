import Link from "next/link";
import type { BlogPost } from "@/lib/blog/posts";
import { servicePages } from "@/lib/seo/services";

type BlogPostViewProps = {
  post: BlogPost;
};

export default function BlogPostView({ post }: BlogPostViewProps) {
  return (
    <article className="max-w-3xl mx-auto" dir="rtl">
      <header className="mb-8">
        <p className="text-xs font-semibold text-slate-500 mb-2">
          {new Date(post.publishedAt).toLocaleDateString("he-IL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{post.description}</p>
      </header>

      <div className="space-y-8">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-slate-600 mb-3">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      {post.faq.length > 0 ? (
        <section className="mt-10 rounded-[var(--radius-soft)] border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">שאלות נפוצות</h2>
          <div className="space-y-4">
            {post.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10 rounded-[var(--radius-soft)] border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">שירותים קשורים</h2>
        <ul className="space-y-2">
          {post.relatedServices.map((slug) => {
            const service = servicePages[slug];
            return (
              <li key={slug}>
                <Link href={service.path} className="text-sm font-semibold text-indigo-600 hover:underline">
                  {service.serviceName}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/#contact" className="btn-primary text-sm">
          קובעים שיחת התאמה
        </Link>
        <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
          חזרה למדריכים
        </Link>
      </div>
    </article>
  );
}
