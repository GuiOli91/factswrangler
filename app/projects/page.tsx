import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { Container } from "@/components/ui";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Data engineering case studies, analytics work and interactive demos.",
};

export default function ProjectsPage() {
  const projects = getAllProjects().map(({ content: _c, ...meta }) => meta);
  return (
    <Container className="py-16 sm:py-20">
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">Work</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">All projects</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">Case studies, side projects and demos you can try in the browser.</p>
      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    </Container>
  );
}
