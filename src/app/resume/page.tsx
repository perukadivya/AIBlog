import { siteConfig } from "@/../site.config";
import {
    Briefcase,
    GraduationCap,
    Award,
    FileText,
    Download,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description: `${siteConfig.name}'s professional resume and experience.`,
};

export default function ResumePage() {
    const { resume } = siteConfig;

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-1.5 text-sm text-[hsl(var(--muted-foreground))] mb-6">
                    <FileText className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                    Resume
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                    My <span className="gradient-text">Experience</span>
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-6">
                    {resume.summary}
                </p>
            </div>

            {/* Experience */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                        <Briefcase className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    Work Experience
                </h2>
                <div className="space-y-0">
                    {resume.experience.map((exp, i) => (
                        <div key={i} className="relative pl-8 pb-10 last:pb-0 group">
                            {/* Timeline line */}
                            {i < resume.experience.length - 1 && (
                                <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-[hsl(var(--border))] group-hover:bg-[hsl(var(--primary)/0.3)] transition-colors" />
                            )}
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-[hsl(var(--primary))] bg-[hsl(var(--background))] flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                            </div>

                            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 card-hover">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                                    <h3 className="text-lg font-bold">{exp.role}</h3>
                                    <span className="text-xs font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-3 py-1 rounded-full w-fit">
                                        {exp.period}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3">
                                    {exp.company}
                                </p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 leading-relaxed">
                                    {exp.description}
                                </p>
                                {exp.highlights && (
                                    <ul className="space-y-1.5">
                                        {exp.highlights.map((h, j) => (
                                            <li
                                                key={j}
                                                className="text-sm text-[hsl(var(--muted-foreground))] flex items-start gap-2"
                                            >
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                        <GraduationCap className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    Education
                </h2>
                <div className="space-y-4">
                    {resume.education.map((edu, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 card-hover"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <div>
                                    <h3 className="text-lg font-bold">{edu.degree}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        {edu.institution}
                                    </p>
                                </div>
                                <span className="text-xs font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-3 py-1 rounded-full w-fit">
                                    {edu.period}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                        <Award className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    Skills
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(resume.skills).map(([category, skills]) => (
                        <div
                            key={category}
                            className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
                        >
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-lg border border-[hsl(var(--border))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.3)]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                            <Award className="h-5 w-5 text-[hsl(var(--primary))]" />
                        </div>
                        Certifications
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {resume.certifications.map((cert, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
                            >
                                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]" />
                                <span className="text-sm font-medium">{cert}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
