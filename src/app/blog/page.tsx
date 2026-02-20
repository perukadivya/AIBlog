import BlogCard from "@/components/BlogCard";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { BookOpen, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read the latest blog posts on AI, development, and more.",
};

export default function BlogPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-1.5 text-sm text-[hsl(var(--muted-foreground))] mb-6">
                    <BookOpen className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                    Blog
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                    Latest <span className="gradient-text">Posts</span>
                </h1>
                <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                    Thoughts on AI, technology, and building things that matter. All blog
                    posts are AI-generated from my analysis and research notes.
                </p>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    <span className="text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))] mr-2">
                        Topics:
                    </span>
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--muted-foreground))] cursor-pointer transition-colors hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.3)]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Posts grid */}
            {posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} {...post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 rounded-2xl border border-dashed border-[hsl(var(--border))]">
                    <Search className="h-16 w-16 mx-auto text-[hsl(var(--muted-foreground)/0.5)] mb-6" />
                    <h3 className="text-2xl font-bold mb-3">No blog posts yet</h3>
                    <p className="text-[hsl(var(--muted-foreground))] max-w-md mx-auto mb-6">
                        Blog posts will appear here once you push your first draft. Add a{" "}
                        <code className="text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-1.5 py-0.5 rounded">
                            .md
                        </code>{" "}
                        file to the{" "}
                        <code className="text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-1.5 py-0.5 rounded">
                            blog_drafts/
                        </code>{" "}
                        folder and push to generate your first AI blog post!
                    </p>
                    <div className="inline-flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-6 py-4 text-left text-sm">
                        <div>
                            <p className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                                # Quick start
                            </p>
                            <p className="font-mono text-xs mt-1">
                                <span className="text-[hsl(var(--primary))]">1.</span> Create a{" "}
                                <code>.md</code> file in <code>blog_drafts/</code>
                            </p>
                            <p className="font-mono text-xs mt-0.5">
                                <span className="text-[hsl(var(--primary))]">2.</span> Write
                                your analysis or notes
                            </p>
                            <p className="font-mono text-xs mt-0.5">
                                <span className="text-[hsl(var(--primary))]">3.</span> Git push
                                &mdash; AI generates the blog!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
