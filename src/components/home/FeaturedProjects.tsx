"use client";

import { motion } from "framer-motion";
import { Terminal, ExternalLink, Star } from "lucide-react";

const PROJECTS = [
  {
    title: "AI Security Guardrails Framework",
    description: "A Python framework for implementing multi-layer AI guardrails on AWS Bedrock — content filtering, PII detection, and prompt injection prevention for production LLM workloads.",
    techStack: ["Python", "AWS Bedrock", "Lambda", "Boto3", "Pydantic"],
    githubUrl: "https://github.com/gopikrishnapamidala",
    demoUrl: undefined,
    stars: 47,
    category: "AI Security",
    color: "from-cyan-500/20 to-blue-600/20",
  },
  {
    title: "Bedrock Agent Security Toolkit",
    description: "Security evaluation toolkit for Amazon Bedrock Agents — automated red-teaming, action group permission auditing, and adversarial prompt testing suite.",
    techStack: ["TypeScript", "AWS CDK", "Bedrock", "Jest", "OpenAPI"],
    githubUrl: "https://github.com/gopikrishnapamidala",
    demoUrl: undefined,
    stars: 31,
    category: "AWS Bedrock",
    color: "from-orange-500/20 to-red-600/20",
  },
  {
    title: "Network Security Audit Automator",
    description: "Python-based automation framework for FortiGate security audits — queries REST API, evaluates against CIS benchmarks, generates reports and Slack/JIRA tickets.",
    techStack: ["Python", "FortiGate API", "Jinja2", "SQLite", "Docker"],
    githubUrl: "https://github.com/gopikrishnapamidala",
    demoUrl: undefined,
    stars: 28,
    category: "Cybersecurity",
    color: "from-red-500/20 to-pink-600/20",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground mb-4">
              Open Source
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Open-source tools and frameworks focused on AI security and infrastructure.
            </p>
          </div>
          <a
            href="https://github.com/gopikrishnapamidala"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:border-cyan-500/40 text-sm font-semibold transition-all group"
          >
            <Terminal className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            View all on GitHub
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group flex flex-col rounded-xl border border-border bg-card hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient header */}
              <div className={`h-2 w-full bg-gradient-to-r ${project.color}`} />

              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded-full border border-border">
                    {project.category}
                  </span>
                  {project.stars && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {project.stars}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
