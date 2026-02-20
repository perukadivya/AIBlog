import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-8xl font-extrabold gradient-text mb-6">404</div>
                <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
                <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[hsl(var(--primary)/0.25)] transition-all hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Link>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-3 text-sm font-semibold transition-all hover:bg-[hsl(var(--muted))]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Read Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
