"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                    // Wrap images responsively
                    img: ({ ...props }) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            {...props}
                            alt={props.alt || ""}
                            loading="lazy"
                            style={{ borderRadius: "var(--radius)", maxWidth: "100%" }}
                        />
                    ),
                    // Open external links in new tab
                    a: ({ href, children, ...props }) => {
                        const isExternal = href?.startsWith("http");
                        return (
                            <a
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                {...props}
                            >
                                {children}
                            </a>
                        );
                    },
                    // Handle video embeds (YouTube, etc.)
                    p: ({ children, ...props }) => {
                        // Check if the paragraph contains a YouTube link
                        const childArray = Array.isArray(children) ? children : [children];
                        for (const child of childArray) {
                            if (typeof child === "string") {
                                const youtubeMatch = child.match(
                                    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                                );
                                if (youtubeMatch) {
                                    return (
                                        <div className="relative my-6 aspect-video rounded-xl overflow-hidden border border-[hsl(var(--border))]">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                                                title="YouTube video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 h-full w-full"
                                            />
                                        </div>
                                    );
                                }
                            }
                        }
                        return <p {...props}>{children}</p>;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
