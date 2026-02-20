import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import ProjectCard from "@/components/ProjectCard";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/../site.config";
import { ArrowRight, BookOpen, Briefcase } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const featuredProjects = siteConfig.projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* About Section */}
      <section className="py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
              <BookOpen className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
            About Me
          </h2>
          <div className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed whitespace-pre-line">
            {siteConfig.about}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-24 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                  <Briefcase className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                Featured Projects
              </h2>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      <section className="py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                <BookOpen className="h-5 w-5 text-[hsl(var(--primary))]" />
              </div>
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-dashed border-[hsl(var(--border))]">
              <BookOpen className="h-12 w-12 mx-auto text-[hsl(var(--muted-foreground))] mb-4" />
              <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mx-auto">
                Push a <code className="text-[hsl(var(--primary))]">.md</code>{" "}
                file to the{" "}
                <code className="text-[hsl(var(--primary))]">blog_drafts/</code>{" "}
                folder and our AI will generate a polished blog post for you!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
