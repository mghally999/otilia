import { notFound } from "next/navigation";
import Script from "next/script";
import { projects, getProject } from "@/data/projects";
import ProjectClient from "./ProjectClient";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.subtitle}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: `${p.title} — OTILÌA Interior Design`,
      description: p.summary,
      type: "article",
      url: `/projects/${p.slug}`,
      images: [{ url: p.hero, width: 1800, height: 1200, alt: p.title }],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    image: project.images,
    datePublished: project.year,
    creator: {
      "@type": "Organization",
      name: "OTILÌA Interior Design",
    },
    locationCreated: project.location,
    keywords: project.discipline.join(", "),
  };

  return (
    <>
      <ProjectClient project={project} />
      <Script
        id={`ld-${project.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
