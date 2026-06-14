"use client";

import { motion } from "framer-motion";
import {
  Shield, Brain, Cloud, Lock, Cpu, Terminal,
  AlertTriangle, Filter, Key, Database, Search, Bot,
  Network, FileCode2, BarChart3
} from "lucide-react";
import Link from "next/link";

const TOPICS = [
  { icon: Shield, label: "AI Security", href: "/blog/category/ai-security", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/25 hover:border-cyan-500/50" },
  { icon: Cloud, label: "AWS Bedrock", href: "/blog/category/aws-bedrock", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/25 hover:border-orange-500/50" },
  { icon: Bot, label: "AI Agents", href: "/blog/category/agentic-ai", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/25 hover:border-violet-500/50" },
  { icon: Lock, label: "Cybersecurity", href: "/blog/category/cybersecurity", color: "text-red-400", bg: "bg-red-500/10 border-red-500/25 hover:border-red-500/50" },
  { icon: Network, label: "Cloud Security", href: "/blog/category/cloud-security", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/25 hover:border-blue-500/50" },
  { icon: Brain, label: "Prompt Engineering", href: "/blog/category/prompt-engineering", color: "text-green-400", bg: "bg-green-500/10 border-green-500/25 hover:border-green-500/50" },
  { icon: Terminal, label: "System Prompt Design", href: "/blog/category/prompt-engineering", color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/25 hover:border-teal-500/50" },
  { icon: Filter, label: "Guardrails", href: "/blog/category/guardrails", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/25 hover:border-cyan-500/50" },
  { icon: AlertTriangle, label: "Content Filters", href: "/blog/category/guardrails", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/25 hover:border-yellow-500/50" },
  { icon: Cpu, label: "LLM Security", href: "/blog/category/llm-security", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/25 hover:border-pink-500/50" },
  { icon: Database, label: "RAG Security", href: "/blog/category/llm-security", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/25 hover:border-purple-500/50" },
  { icon: Search, label: "Agent Evaluation", href: "/blog/category/agentic-ai", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/25 hover:border-indigo-500/50" },
  { icon: Key, label: "MCP Protocol", href: "/blog/category/agentic-ai", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25 hover:border-emerald-500/50" },
  { icon: FileCode2, label: "AI Governance", href: "/blog/category/ai-security", color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/25 hover:border-sky-500/50" },
  { icon: BarChart3, label: "A2A Protocol", href: "/blog/category/agentic-ai", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/25 hover:border-rose-500/50" },
];

export default function FeaturedTopics() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground mb-4">
            Topics I Write About
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Featured <span className="gradient-text">Topic Areas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deep-dive articles across the full spectrum of AI Security, from building secure agents to defending against LLM attacks.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {TOPICS.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <Link
                  href={topic.href}
                  className={`group flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.03] cursor-pointer ${topic.bg}`}
                >
                  <div className={`p-2.5 rounded-lg bg-background/50 ${topic.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors leading-tight">
                    {topic.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
