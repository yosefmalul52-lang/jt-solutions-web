import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProjectDetail from "@/components/projects/ProjectDetail";
import JsonLd from "@/components/seo/JsonLd";
import { getProjectById, projects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo/metadata";
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
    title: `${project.seoTitle} | JT Solutions`,
    description: `${project.shortDescription} ${project.businessValue}`,
    path: `/projects/${project.id}`,
    keywords: [project.title, "פרויקט דיגיטל", "case study"],
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
        { "@type": "ListItem", position: 2, name: "פרויקטים", item: `${SITE_URL}/#projects` },
        { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.seoTitle,
      description: project.shortDescription,
      url: pageUrl,
      about: service.serviceName,
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
