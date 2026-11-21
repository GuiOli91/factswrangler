import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/projects`, priority: 0.8 },
    ...getAllProjects().map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: p.date, priority: 0.7 })),
  ];
}
