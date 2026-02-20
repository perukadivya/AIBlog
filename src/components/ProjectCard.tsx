import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    url: string;
    tags: string[];
    featured?: boolean;
}

export default function ProjectCard({
    title,
    description,
    url,
    tags,
    featured,
}: ProjectCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 card-hover overflow-hidden h-full">
                {/* Featured badge */}
                {featured && (
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                            Featured
                        </span>
                    </div>
                )}

                {/* Gradient line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 transition-colors group-hover:text-[hsl(var(--primary))] flex items-center gap-2 pr-16">
                    {title}
                    <ExternalLink className="h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                </h3>

                {/* Description */}
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md border border-[hsl(var(--border))] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--muted-foreground))] transition-colors group-hover:border-[hsl(var(--primary)/0.3)] group-hover:text-[hsl(var(--primary))]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
}
