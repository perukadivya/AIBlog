import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ShareButton from "@/components/ShareButton";
import { siteConfig } from "@/../site.config";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [siteConfig.name],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
            {/* Back link */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors mb-10"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-[hsl(var(--primary)/0.1)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--primary))]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Description */}
                {post.description && (
                    <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                        {post.description}
                    </p>
                )}

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] pb-8 border-b border-[hsl(var(--border))]">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] flex items-center justify-center text-white text-xs font-bold">
                            {siteConfig.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>
                        <span className="font-medium text-[hsl(var(--foreground))]">
                            {post.author || siteConfig.name}
                        </span>
                    </div>
                    <span className="text-[hsl(var(--border))]">·</span>
                    <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                    <span className="text-[hsl(var(--border))]">·</span>
                    <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime}
                    </span>
                </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-[hsl(var(--border))]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full object-cover"
                    />
                </div>
            )}

            {/* Content */}
            <MarkdownRenderer content={post.content} />

            {/* Bottom share */}
            <div className="mt-16 pt-8 border-t border-[hsl(var(--border))] flex items-center justify-between">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Link>

                <ShareButton title={post.title} description={post.description} />
            </div>
        </article>
    );
}
