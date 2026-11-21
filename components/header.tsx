"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/site.config";
import { Icon } from "./icons";
import { ThemeToggle } from "./theme";
import { ButtonLink, Container } from "./ui";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2 font-bold tracking-tight">
      <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm text-accent-fg transition group-hover:rotate-6">
        FW
      </span>
      <span>{site.brand}</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3 py-2 text-sm text-muted transition hover:text-fg">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="ml-1 hidden sm:block">
            <ButtonLink href={site.bookingUrl}>
              <Icon name="calendar" className="size-4" /> Book a call
            </ButtonLink>
          </div>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full hover:bg-line md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-line bg-bg md:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-lg">
                {n.label}
              </Link>
            ))}
            <ButtonLink href={site.bookingUrl} className="mt-3 sm:hidden">
              <Icon name="calendar" className="size-4" /> Book a call
            </ButtonLink>
          </Container>
        </nav>
      )}
    </header>
  );
}
