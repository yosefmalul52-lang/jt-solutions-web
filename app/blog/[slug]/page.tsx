import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostView from "@/components/blog/BlogPostView";
import JsonLd from "@/components/seo/JsonLd";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/constants";
import { getArticleAuthorJsonLd } from "@/lib/seo/author";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "מאמר לא נמצא" };
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      inLanguage: "he-IL",
      author: getArticleAuthorJsonLd(),
      publisher: {
        "@type": "Organization",
        name: "JT Solutions",
        url: SITE_URL,
      },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    },
  ];

  if (post.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main className="flex-1 py-16 md:py-24 section-shell">
        <div className="px-4 sm:px-6 lg:px-8">
          <BlogPostView post={post} />
        </div>
      </main>
      <Footer />
    </>
  );
}
