import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProjectDetail from "@/components/projects/ProjectDetail";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectById, projects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getProjectOgImage } from "@/lib/seo/og-images";
import { SITE_URL } from "@/lib/seo/constants";
import { servicePages } from "@/lib/seo/services";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "פרויקט לא נמצא" };
  }

  return createPageMetadata({
    title: project.seoTitle,
    description: project.projectGoal
      ? `${project.shortDescription} ${project.projectGoal}`
      : `${project.shortDescription} ${project.businessValue}`,
    path: `/projects/${project.id}`,
    keywords: [
      project.title,
      project.industry,
      "פרויקט דיגיטל",
      "סיפור הצלחה",
      "תוצאות לפני ואחרי",
    ].filter((k): k is string => Boolean(k)),
    ogImage: getProjectOgImage(project.image.src, project.image.alt),
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const service = servicePages[project.relatedServiceSlug];
  const pageUrl = `${SITE_URL}/projects/${project.id}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "תיק עבודות", item: `${SITE_URL}/projects` },
        { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.seoTitle,
      headline: project.seoTitle,
      description: project.projectGoal
        ? `${project.shortDescription} ${project.projectGoal}`
        : `${project.shortDescription} ${project.businessValue}`,
      url: pageUrl,
      inLanguage: "he-IL",
      about: service.serviceName,
      creator: {
        "@type": "Organization",
        name: "JT Solutions",
        url: SITE_URL,
      },
      image: `${SITE_URL}${project.image.src}`,
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main className="flex-1">
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}
