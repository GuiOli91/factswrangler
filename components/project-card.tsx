import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";
import { Icon } from "./icons";
import { Tag } from "./ui";

/** Hues for generated covers; picked deterministically from the slug. */
const HUES = [172, 199, 262, 330, 24, 142];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

export function ProjectCover({ project, className = "" }: { project: ProjectMeta; className?: string }) {
  if (project.cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.cover} alt="" className={`h-full w-full object-cover ${className}`} />;
  }
  const hue = HUES[hash(project.slug) % HUES.length];
  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden p-5 ${className}`}
      style={{
        background: `radial-gradient(circle at 80% 20%, hsl(${hue} 80% 65% / .9), transparent 55%), linear-gradient(135deg, hsl(${hue} 60% 30%), hsl(${(hue + 40) % 360} 55% 18%))`,
      }}
    >
      <svg viewBox="0 0 200 60" className="absolute inset-x-0 bottom-0 w-full opacity-30" preserveAspectRatio="none" aria-hidden>
        <polyline
          points="0,50 20,42 40,46 60,30 80,34 100,20 120,26 140,12 160,18 180,6 200,10"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
      <span className="relative font-mono text-sm font-semibold text-white/90">{project.category}</span>
    </div>
  );
}

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectCover project={project} className="transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {project.interactive && (
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <Icon name="sparkles" className="size-3" /> Interactive
            </span>
          )}
          {project.video && (
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <Icon name="play" className="size-3" /> Video
            </span>
          )}
          {project.draft && (
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-black">Draft</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs text-muted">
          {project.category} · {project.date.slice(0, 4)}
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-accent">
          View case study <Icon name="arrowRight" className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
