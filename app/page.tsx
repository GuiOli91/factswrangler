import Image from "next/image";
import { Socials } from "@/components/footer";
import { Icon } from "@/components/icons";
import { ProjectGrid } from "@/components/project-grid";
import { ButtonLink, Container, Section, Tag } from "@/components/ui";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";
import { site } from "@/site.config";

const stripContent = <T extends { content: string }>({ content: _c, ...meta }: T) => meta;

export default function Home() {
  const featured = getFeaturedProjects(6).map(stripContent);
  const total = getAllProjects().length;

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-accent opacity-15 blur-3xl"
        />
        <Container className="relative grid items-center gap-12 pb-16 pt-20 sm:pb-24 sm:pt-28 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {site.available && (
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-medium">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Available for new projects
              </p>
            )}
            <p className="text-lg text-muted">Hi, I&apos;m {site.firstName} 👋 · {site.role}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              {/* the word "facts" in the tagline gets the accent colour */}
              {site.tagline.split(/(facts)/).map((part, i) =>
                part === "facts" ? (
                  <span key={i} className="text-accent">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.bookingUrl}>
                <Icon name="calendar" className="size-4" /> Book a free 30-min call
              </ButtonLink>
              <ButtonLink href="#work" variant="secondary">
                See my work <Icon name="arrowRight" className="size-4" />
              </ButtonLink>
            </div>
          </div>

          {site.heroPhoto && (
            <div className="relative mx-auto hidden w-full max-w-sm lg:block">
              <div aria-hidden className="absolute -inset-3 translate-x-4 translate-y-4 rounded-[2rem] bg-accent/20" />
              <Image
                src={site.heroPhoto}
                alt={`Portrait of ${site.owner}`}
                width={800}
                height={1000}
                priority
                sizes="(min-width: 1024px) 384px, 0px"
                className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-black/10 ring-1 ring-line"
              />
              <div className="absolute -bottom-5 -left-6 rounded-2xl border border-line bg-card px-4 py-3 shadow-xl shadow-black/10">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <Icon name="mapPin" className="size-4 text-accent" /> {site.location}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  {site.about.languages.map((l) => l.code).join(" · ")}
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ── Services ─────────────────────────── */}
      <Section id="services" eyebrow="Services" title="How I can help" intro="Pick one, or I'll handle the whole chain, from raw data to the decision.">
        <div className="grid gap-4 sm:grid-cols-2">
          {site.services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-line bg-card p-6 transition hover:border-accent/50">
              <div className="mb-4 grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon name={s.icon} />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-accent">→</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Work ─────────────────────────────── */}
      <Section id="work" eyebrow="Selected work" title="Projects & demos" intro="Case studies with real numbers, and live demos you can play with right here.">
        <ProjectGrid projects={featured} filter={false} />
        {total > featured.length && (
          <div className="mt-10 text-center">
            <ButtonLink href="/projects" variant="secondary">
              All {total} projects <Icon name="arrowRight" className="size-4" />
            </ButtonLink>
          </div>
        )}
      </Section>

      {/* ── Testimonials (hidden when empty) ─── */}
      {site.testimonials.length > 0 && (
        <Section eyebrow="Kind words" title="What clients say">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {site.testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-line bg-card p-6">
                <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted"> · {t.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {/* ── About ────────────────────────────── */}
      <Section id="about" eyebrow="About" title={`I'm ${site.firstName}.`}>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-8 flex items-center gap-5">
              {site.photo && (
                <Image
                  src={site.photo}
                  alt={`Portrait of ${site.owner}`}
                  width={144}
                  height={144}
                  title={site.photoCredit || undefined}
                  className="size-28 shrink-0 rounded-2xl object-cover ring-1 ring-line sm:size-36"
                />
              )}
              <div>
                <p className="text-xl font-semibold">{site.owner}</p>
                <p className="text-accent">{site.role}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Icon name="mapPin" className="size-4" /> {site.location}
                </p>
              </div>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              {site.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {site.cvUrl && (
                <ButtonLink href={site.cvUrl} variant="secondary" download>
                  <Icon name="download" className="size-4" /> Download CV
                </ButtonLink>
              )}
              <Socials />
            </div>
          </div>
          <div className="space-y-6">
            {site.about.skills.map((g) => (
              <div key={g.group}>
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted">{g.group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted">Languages</p>
              <p className="text-sm">
                {site.about.languages.map((l, i) => (
                  <span key={l.name}>
                    {i > 0 && <span className="text-muted"> · </span>}
                    {l.name} <span className="text-muted">({l.level})</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Experience ───────────────────────── */}
      <Section
        id="experience"
        eyebrow="Experience"
        title="From the factory floor to the data platform"
        intro="Ten years across manufacturing, industrial data and research, always closest to where the data is created."
      >
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ol className="relative space-y-10 border-l border-line pl-6">
            {site.about.experience.map((e) => (
              <li key={e.period + e.title} className="relative">
                <span className="absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent" />
                <p className="font-mono text-xs text-muted">
                  {e.period} · {e.location}
                </p>
                <p className="mt-1 text-lg font-semibold">{e.title}</p>
                <p className="text-sm font-medium text-accent">{e.org}</p>
                <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-muted">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-accent">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-accent">Education</p>
              <ul className="space-y-4">
                {site.about.education.map((ed) => (
                  <li key={ed.title}>
                    <p className="font-semibold">{ed.title}</p>
                    <p className="text-sm text-muted">{ed.org}</p>
                    <p className="font-mono text-xs text-muted">{ed.period}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">Certifications</p>
              <ul className="space-y-1.5 text-sm text-muted">
                {site.about.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* ── Contact ──────────────────────────── */}
      <section id="contact" className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-fg px-6 py-14 text-center text-bg sm:px-12">
            <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-accent opacity-30 blur-3xl" />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">Got messy data? Let&apos;s talk.</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg opacity-75">
              Tell me what you&apos;re trying to answer. In 30 minutes we&apos;ll know if I can help, and how.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={site.bookingUrl}>
                <Icon name="calendar" className="size-4" /> Book a call
              </ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-bg/20 px-5 py-2.5 text-sm font-semibold transition hover:bg-bg/10"
              >
                <Icon name="mail" className="size-4" /> {site.email}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
