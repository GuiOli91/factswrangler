import { site } from "@/site.config";
import { Icon } from "./icons";
import { Container } from "./ui";

export function Socials({ className = "" }: { className?: string }) {
  const links = [
    { href: site.socials.github, icon: "github" as const, label: "GitHub" },
    { href: site.socials.linkedin, icon: "linkedin" as const, label: "LinkedIn" },
    { href: `mailto:${site.email}`, icon: "mail" as const, label: "Email" },
  ];
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          aria-label={l.label}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="grid size-9 place-items-center rounded-full text-muted transition hover:bg-line hover:text-fg"
        >
          <Icon name={l.icon} className="size-[18px]" />
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.owner} · {site.brand}
        </p>
        <Socials />
      </Container>
    </footer>
  );
}
