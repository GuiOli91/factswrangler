import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-line bg-card text-fg hover:border-fg/30",
  ghost: "text-fg hover:bg-line",
};

type ButtonProps = { variant?: keyof typeof variants; className?: string } & ComponentProps<typeof Link>;

/** Link styled as a button. External URLs open in a new tab automatically. */
export function ButtonLink({ variant = "primary", className = "", href, ...props }: ButtonProps) {
  const external = typeof href === "string" && /^(https?:|mailto:)/.test(href);
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external && !String(href).startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <Container>
        <div className="mb-10 max-w-2xl">
          {eyebrow && <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">{children}</span>
  );
}
