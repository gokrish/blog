"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield, Brain, Cloud, Code2, Lock, Cpu, Terminal,
  AlertTriangle, Filter, Key, Database, ArrowRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const TERMINAL_LINES = [
  { text: '> Initializing AI Security stack...', color: 'text-muted-foreground' },
  { text: '> Loading: AWS Bedrock · Guardrails · LLM Security', color: 'text-yellow-400' },
  { text: '> Configuring: Agentic AI · Prompt Engineering', color: 'text-blue-400' },
  { text: '> Scanning: Threat landscape · Attack surfaces', color: 'text-red-400' },
  { text: '> Status: All systems operational ✓', color: 'text-cyan-400' },
];

const TAGS = [
  "AI Security", "AWS Bedrock", "Agentic AI", "Prompt Engineering",
  "LLM Security", "Guardrails", "Cybersecurity", "Cloud Security",
  "MCP Protocol", "A2A", "RAG Security", "AI Governance",
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 dot-bg opacity-60 pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(188 94% 43% / 0.12) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <div>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_hsl(188_94%_43%)] animate-pulse" />
            Open to Security Engineering Opportunities
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08] mb-5"
          >
            <span className="text-foreground">AI Security Engineer</span>
            <br />
            <span className="gradient-text">& Full-Stack Developer</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8"
          >
            5+ years of Software Engineering experience in Canadian Banking and Healthcare.{" "}
            Specializing in <span className="text-cyan-400 font-medium">AI Security</span>,{" "}
            <span className="text-cyan-400 font-medium">AWS Bedrock Guardrails</span>,{" "}
            Incident Management, and Network Security (Fortinet).
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/35 hover:scale-[1.02]"
            >
              Read Blog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card/50 hover:border-cyan-500/40 hover:bg-card text-foreground font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            >
              View Projects
            </Link>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
            >
              Subscribe
            </Link>
          </motion.div>

          {/* Floating tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-xs font-mono px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right column: Terminal card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:block"
        >
          {/* Photo placeholder + terminal stack */}
          <div className="relative">
            {/* Photo card */}
            <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-4 overflow-hidden relative">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, hsl(188 94% 43% / 0.08) 0%, transparent 70%)",
                }}
              />
              <div className="flex flex-col items-center gap-3 z-10">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border-2 border-cyan-500/40 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-cyan-400" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-foreground">Gopi Krishna Pamidala</div>
                  <div className="text-xs font-mono text-cyan-400 mt-0.5">AI Security Engineer</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 px-2.5 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono">
                Wazuh XDR
              </div>
              <div className="absolute bottom-4 left-4 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                Fortinet NSE 5
              </div>
            </div>

            {/* Terminal card */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/50">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">~/ai-security</span>
              </div>
              <div className="p-4 space-y-2 font-mono text-xs">
                {TERMINAL_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.2, duration: 0.3 }}
                    className={line.color}
                  >
                    {line.text}
                  </motion.div>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="inline-block w-2 h-4 bg-cyan-400 cursor-blink align-middle"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
