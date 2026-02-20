import ProjectCard from "@/components/ProjectCard";
import { siteConfig } from "@/../site.config";
import { Briefcase, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore my projects and open-source contributions.",
};

export default function ProjectsPage() {
    const { projects } = siteConfig;

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-1.5 text-sm text-[hsl(var(--muted-foreground))] mb-6">
                    <Briefcase className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                    Projects
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                    What I&apos;ve <span className="gradient-text">Built</span>
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                    A collection of projects I&apos;ve worked on — from AI-powered
                    applications to open-source tools.
                </p>
            </div>

            {/* Featured */}
            {projects.filter((p) => p.featured).length > 0 && (
                <div className="mb-16">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-6 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />
                        Featured
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {projects
                            .filter((p) => p.featured)
                            .map((project) => (
                                <ProjectCard key={project.title} {...project} />
                            ))}
                    </div>
                </div>
            )}

            {/* All Projects */}
            {projects.filter((p) => !p.featured).length > 0 && (
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-6">
                        All Projects
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects
                            .filter((p) => !p.featured)
                            .map((project) => (
                                <ProjectCard key={project.title} {...project} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
