import type { ReactNode } from "react";
import { Icon } from "../icons";

/** Frame used around every interactive demo, so they look consistent. */
export function DemoFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
          <Icon name="sparkles" className="size-3" /> Live demo
        </span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

/** Turns a YouTube / Loom / Vimeo URL into an embeddable URL. */
export function toEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const loom = url.match(/loom\.com\/(?:share|embed)\/([\w]+)/);
  if (loom) return `https://www.loom.com/embed/${loom[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

/** <Video src="https://youtu.be/..." title="Walkthrough" /> */
export function Video({ src, title = "Video walkthrough" }: { src: string; title?: string }) {
  return (
    <figure className="not-prose my-8">
      <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-black">
        <iframe
          src={toEmbedUrl(src)}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <figcaption className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <Icon name="play" className="size-3.5" /> {title}
      </figcaption>
    </figure>
  );
}

/** <Callout title="Key insight">...</Callout> */
export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-2xl border-l-4 border-accent bg-accent-soft/40 px-5 py-4">
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-[15px] leading-relaxed text-fg/90">{children}</div>
    </aside>
  );
}

/** Side-by-side before/after or any 2-column content. */
export function Columns({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">{title}</p>
      <div className="text-[15px] leading-relaxed text-muted">{children}</div>
    </div>
  );
}
