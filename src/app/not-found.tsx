import Link from "next/link";
import { Shield, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg opacity-40" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(188 94% 43% / 0.08) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative text-center max-w-md">
        {/* 404 display */}
        <div className="mb-6">
          <div className="text-8xl sm:text-9xl font-bold font-mono gradient-text leading-none select-none">
            404
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Page Not Found
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          This page doesn't exist
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          The page you're looking for may have been moved, deleted, or you might have typed the URL incorrectly.
        </p>

        {/* Terminal-style message */}
        <div className="rounded-xl border border-border bg-card p-4 mb-8 text-left font-mono text-xs">
          <div className="text-muted-foreground">
            <span className="text-cyan-400">$</span> curl -I gopikrishna.ai/{"{path}"}
          </div>
          <div className="text-red-400 mt-1">HTTP/2 404 Not Found</div>
          <div className="text-muted-foreground/60 mt-1"># Try one of the links below ↓</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:border-cyan-500/40 text-foreground font-semibold text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
