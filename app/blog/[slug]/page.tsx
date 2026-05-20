import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostView from "@/components/blog/BlogPostView";
import JsonLd from "@/components/seo/JsonLd";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog/posts";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/constants";

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "he-IL",
    author: {
      "@type": "Organization",
      name: "JT Solutions",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "JT Solutions",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
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
