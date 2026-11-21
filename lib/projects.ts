import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, e.g. 2025-06-01. Used for sorting (newest first). */
  date: string;
  category: string;
  tags: string[];
  /** Path under /public, e.g. /projects/my-cover.svg. Optional: a generated cover is used otherwise. */
  cover?: string;
  /** Show on the homepage grid. */
  featured?: boolean;
  /** Project has an interactive demo embedded in its page. */
  interactive?: boolean;
  live?: string;
  github?: string;
  /** YouTube or Loom URL, shown at the top of the case study. */
  video?: string;
  client?: string;
  role?: string;
  duration?: string;
  results?: { value: string; label: string }[];
  /** Drafts are visible in `npm run dev` but hidden in production builds. */
  draft?: boolean;
};

export type Project = ProjectMeta & { content: string };

function readProject(file: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");

  if (!data.title || !data.summary || !data.date) {
    throw new Error(`content/projects/${file}: frontmatter needs at least title, summary and date`);
  }

  const meta = data as Omit<ProjectMeta, "slug">;
  return {
    ...meta,
    slug,
    category: meta.category ?? "Project",
    tags: meta.tags ?? [],
    date: new Date(meta.date).toISOString().slice(0, 10),
    content,
  };
}

const showDrafts = process.env.NODE_ENV !== "production";

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map(readProject)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 6): Project[] {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
