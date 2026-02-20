import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { siteConfig } from "@/../site.config";

const socialIcons: Record<string, React.ElementType> = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    email: Mail,
};

export default function Footer() {
    return (
        <footer className="border-t border-[hsl(var(--border))]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: branding */}
                    <div className="text-center md:text-left">
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            © {new Date().getFullYear()} {siteConfig.name}. All rights
                            reserved.
                        </p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1 flex items-center justify-center md:justify-start gap-1">
                            Built with
                            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                            using{" "}
                            {siteConfig.footer.showSourceLink ? (
                                <a
                                    href="https://github.com/yourusername/ai-blog"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[hsl(var(--primary))] hover:underline"
                                >
                                    AI Blog Generator
                                </a>
                            ) : (
                                "AI Blog Generator"
                            )}
                        </p>
                    </div>

                    {/* Right: social */}
                    <div className="flex items-center gap-2">
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
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] transition-all hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                                    aria-label={key}
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
