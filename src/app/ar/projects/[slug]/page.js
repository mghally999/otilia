import { notFound } from "next/navigation";
import Script from "next/script";
import { projects, getProject } from "@/data/projects.ar";
import ProjectClientAr from "./ProjectClientAr";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.subtitle}`,
    description: p.summary,
    alternates: {
      canonical: `/ar/projects/${p.slug}`,
      languages: { "en-AE": `/projects/${p.slug}` },
    },
    openGraph: {
      title: `${p.title} — أوتيليا للتصميم الداخلي`,
      description: p.summary,
      type: "article",
      url: `/ar/projects/${p.slug}`,
      locale: "ar_AE",
      images: [{ url: p.hero, width: 1800, height: 1200, alt: p.title }],
    },
  };
}

export default function ProjectPageAr({ params }) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    inLanguage: "ar",
    headline: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    image: project.images,
    datePublished: project.year,
    creator: { "@type": "Organization", name: "أوتيليا للتصميم الداخلي" },
    locationCreated: project.location,
    keywords: project.discipline.join(", "),
  };

  return (
    <>
      <ProjectClientAr project={project} />
      <Script
        id={`ld-ar-${project.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
