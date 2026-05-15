import { projects } from "@/data/projects";

const SITE = "https://www.otiliainteriors.com";

export default function sitemap() {
  const now = new Date();

  const en = [
    { url: "", priority: 1.0, changeFrequency: "monthly" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { url: "/services", priority: 0.8, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ].map((r) => ({
    url: `${SITE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const ar = [
    { url: "/ar", priority: 1.0, changeFrequency: "monthly" },
    { url: "/ar/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/ar/projects", priority: 0.9, changeFrequency: "monthly" },
    { url: "/ar/services", priority: 0.8, changeFrequency: "monthly" },
    { url: "/ar/contact", priority: 0.7, changeFrequency: "yearly" },
  ].map((r) => ({
    url: `${SITE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const enProjects = projects.map((p) => ({
    url: `${SITE}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const arProjects = projects.map((p) => ({
    url: `${SITE}/ar/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...en, ...ar, ...enProjects, ...arProjects];
}
