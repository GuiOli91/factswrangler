"use client";

import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "./icons";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid size-9 place-items-center rounded-full text-muted transition hover:bg-line hover:text-fg"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {mounted ? <Icon name={isDark ? "sun" : "moon"} className="size-[18px]" /> : <span className="size-[18px]" />}
    </button>
  );
}
