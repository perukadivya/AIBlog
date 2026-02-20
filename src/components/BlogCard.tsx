import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

interface BlogCardProps {
    slug: string;
    title: string;
    description: string;
    date: string;
    readingTime: string;
    tags: string[];
    coverImage?: string;
}

export default function BlogCard({
    slug,
    title,
    description,
    date,
    readingTime,
    tags,
}: BlogCardProps) {
    return (
        <Link href={`/blog/${slug}`} className="group block">
            <article className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 card-hover overflow-hidden">
                {/* Gradient accent on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-[hsl(var(--primary)/0.1)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--primary))]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-[hsl(var(--primary))] flex items-start gap-1">
                    {title}
                    <ArrowUpRight className="h-4 w-4 mt-1 shrink-0 opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                </h3>

                {/* Description */}
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                    <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {readingTime}
                    </span>
                </div>
            </article>
        </Link>
    );
}
