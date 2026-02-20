import Link from "next/link";
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { siteConfig } from "@/../site.config";

const socialIcons: Record<string, React.ElementType> = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    email: Mail,
};

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-[hsl(var(--primary)/0.08)] blur-3xl animate-float" />
                <div
                    className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[hsl(var(--gradient-end)/0.06)] blur-3xl animate-float"
                    style={{ animationDelay: "3s" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-radial from-[hsl(var(--primary)/0.05)] to-transparent" />
            </div>

            <div className="mx-auto max-w-4xl px-4 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-1.5 text-sm text-[hsl(var(--muted-foreground))] mb-8 animate-fade-in-up opacity-0">
                    <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                    <span>AI-Powered Blog Generator</span>
                </div>

                {/* Avatar */}
                <div className="mb-6 animate-fade-in-up opacity-0 stagger-1">
                    <div className="relative mx-auto h-28 w-28 rounded-full bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] p-[3px] animate-pulse-glow">
                        <div className="h-full w-full rounded-full bg-[hsl(var(--background))] flex items-center justify-center">
                            <span className="text-4xl font-bold gradient-text">
                                {siteConfig.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Name & Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-up opacity-0 stagger-2">
                    {siteConfig.name}
                </h1>
                <p className="text-xl sm:text-2xl text-[hsl(var(--primary))] font-semibold mb-4 animate-fade-in-up opacity-0 stagger-2">
                    {siteConfig.profession}
                </p>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up opacity-0 stagger-3">
                    {siteConfig.tagline}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 mb-10 animate-fade-in-up opacity-0 stagger-3">
                    {Object.entries(siteConfig.social).map(([key, url]) => {
                        const Icon = socialIcons[key];
                        if (!Icon || !url) return null;
                        const href = key === "email" ? `mailto:${url}` : url;
                        return (
                            <a
                                key={key}
                                href={href}
                                target={key === "email" ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition-all duration-200 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)] hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] hover:-translate-y-1"
                                aria-label={key}
                            >
                                <Icon className="h-5 w-5" />
                            </a>
                        );
                    })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-4">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[hsl(var(--primary)/0.25)] transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(var(--primary)/0.35)] hover:-translate-y-0.5"
                    >
                        Read Blog
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-3 text-sm font-semibold transition-all duration-200 hover:bg-[hsl(var(--muted))] hover:-translate-y-0.5"
                    >
                        View Projects
                    </Link>
                </div>

                {/* Tech Stack */}
                <div className="mt-16 animate-fade-in-up opacity-0 stagger-4">
                    <p className="text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-4">
                        Tech Stack
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {siteConfig.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.3)]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
