import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/seo/constants";
import { servicePages } from "@/lib/seo/services";
import { projects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...Object.values(servicePages).map((service) => ({
      url: `${SITE_URL}${service.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${SITE_URL}/accessibility`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
