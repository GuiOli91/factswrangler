"use client";

import { useMemo, useState } from "react";
import type { ProjectMeta } from "@/lib/projects";
import { ProjectCard } from "./project-card";

/** Grid with category filter chips (filters only appear when there are 2+ categories). */
export function ProjectGrid({ projects, filter = true }: { projects: ProjectMeta[]; filter?: boolean }) {
  const categories = useMemo(() => [...new Set(projects.map((p) => p.category))], [projects]);
  const [active, setActive] = useState<string>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {filter && categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === c ? "bg-fg text-bg" : "border border-line text-muted hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
