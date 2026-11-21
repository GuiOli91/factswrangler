import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Icon } from "@/components/icons";
import { Video } from "@/components/mdx/blocks";
import { mdxComponents } from "@/components/mdx";
import { ProjectCover } from "@/components/project-card";
import { ButtonLink, Container, Tag } from "@/components/ui";
import { getAllProjects, getProject } from "@/lib/projects";
import { site } from "@/site.config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: project.cover ? [project.cover] : undefined },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { content } = await compileMDX({ source: project.content, components: mdxComponents });

  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  const facts = [
    project.client && { label: "Client", value: project.client },
    project.role && { label: "Role", value: project.role },
    project.duration && { label: "Duration", value: project.duration },
    { label: "Year", value: project.date.slice(0, 4) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
          <Icon name="arrowLeft" className="size-4" /> All work
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">{project.category}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            {(project.live || project.github) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.live && (
                  <ButtonLink href={project.live}>
                    Open live app <Icon name="external" className="size-4" />
                  </ButtonLink>
                )}
                {project.github && (
                  <ButtonLink href={project.github} variant="secondary">
                    <Icon name="github" className="size-4" /> Source code
                  </ButtonLink>
                )}
              </div>
            )}
          </div>
          <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-card p-5">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="mt-0.5 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {project.video ? (
          <Video src={project.video} title="Watch me walk through this project" />
        ) : (
          <div className="mt-10 aspect-[3/1] overflow-hidden rounded-2xl border border-line">
            <ProjectCover project={project} />
          </div>
        )}

        {project.results && project.results.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {project.results.map((r) => (
              <div key={r.label} className="rounded-2xl border border-line bg-card p-5">
                <p className="text-3xl font-bold tracking-tight text-accent">{r.value}</p>
                <p className="mt-1 text-sm text-muted">{r.label}</p>
              </div>
            ))}
          </div>
        )}
      </Container>

      <Container className="py-12">
        <div className="prose prose-stone mx-auto max-w-3xl dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-code:before:content-none prose-code:after:content-none">
          {content}
        </div>
      </Container>

      <Container className="pb-20">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-accent-soft/50 p-6">
            <p className="font-semibold">Have a similar problem?</p>
            <p className="mt-1 text-sm text-muted">Let&apos;s spend 30 minutes figuring out if I can help.</p>
            <ButtonLink href={site.bookingUrl} className="mt-4">
              <Icon name="calendar" className="size-4" /> Book a call
            </ButtonLink>
          </div>
          {next && next.slug !== slug && (
            <Link href={`/projects/${next.slug}`} className="group rounded-2xl border border-line p-6 transition hover:border-accent/50">
              <p className="font-mono text-xs text-muted">Next project</p>
              <p className="mt-1 font-semibold">{next.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{next.summary}</p>
              <Icon name="arrowRight" className="mt-3 size-5 text-accent transition group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </Container>
    </article>
  );
}
