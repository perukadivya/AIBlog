"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
    title: string;
    description: string;
}

export default function ShareButton({ title, description }: ShareButtonProps) {
    return (
        <button
            className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium transition-colors hover:bg-[hsl(var(--muted))]"
            onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({
                        title,
                        text: description,
                        url: window.location.href,
                    });
                } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                }
            }}
        >
            <Share2 className="h-4 w-4" />
            Share
        </button>
    );
}
