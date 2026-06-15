import type { Metadata } from "next";
import { generatePersonJsonLd } from "@/lib/seo";
import { Shield, Cloud, Brain, Lock, Network, Cpu, Award, ExternalLink, Mail, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Gopi Krishna Pamidala — AI and Cybersecurity Specialist focusing on Threat Modeling, LLM Security, and Fortinet NSE.",
};

const EXPERTISE = [
  { icon: Shield, label: "AI Security", desc: "Guardrails, threat modeling, red teaming LLM applications" },
  { icon: Cloud, label: "AWS Bedrock", desc: "Agents, knowledge bases, inference, fine-tuning" },
  { icon: Network, label: "Network Security", desc: "Fortinet labs, Fortigate, Firewall, SD Wan policies" },
  { icon: Lock, label: "Incident Management", desc: "ServiceNow, Release management, OWASP" },
  { icon: Cpu, label: "Home Lab", desc: "Wazuh XDR, Oracle Cloud Infrastructure (OCI)" },
  { icon: Brain, label: "Agentic AI", desc: "Multi-agent architectures, workflows" },
];

const CERTIFICATIONS = [
  { name: "Fortinet NSE 5 - FortiAnalyzer", issuer: "Fortinet", year: "2024", color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  { name: "Fortinet NSE 1-5", issuer: "Fortinet", year: "2023", color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  { name: "AI Security", issuer: "TryHackMe", year: "2024", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
];

const EXPERIENCE = [
  {
    role: "Cybersecurity Specialist",
    company: "TD Bank",
    period: "2022 – 2025",
    bullets: [
      "Specialized in Incident and Release management using ServiceNow",
      "Implemented OWASP security standards across banking infrastructure",
      "Maintained strict compliance for Canadian banking systems",
    ],
  },
  {
    role: "Network & Security Analyst",
    company: "Canadian Healthcare & Enterprise",
    period: "Prior to 2022",
    bullets: [
      "Configured Fortigate Firewalls, SD-WAN policies, Content and Web filtering",
      "Managed Fortinet labs for advanced threat detection",
      "Graduated from Npower Canada NSP program FCP",
      "Built home labs integrating Wazuh XDR and Oracle Cloud Infrastructure (OCI)",
    ],
  },
];

export default function AboutPage() {
  const personJsonLd = generatePersonJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-16">
          <div className="w-28 h-28 rounded-2xl bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center shrink-0">
            <Shield className="w-12 h-12 text-cyan-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground mb-3">
              Open to Opportunities
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Gopi Krishna Pamidala
            </h1>
            <p className="text-lg text-cyan-400 font-mono mb-4">
              AI Security Engineer & Agentic AI Builder
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
              I specialize in securing AI systems — from hardening AWS Bedrock deployments with 
              multi-layer guardrails to red-teaming LLM applications against adversarial attacks. 
              I believe the most important AI challenge of our era is not capability but 
              <em> security and trust</em>: making AI systems that work reliably and safely at scale.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/resume"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
              <a
                href="https://linkedin.com/in/gopikrishnapamidala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-cyan-500/40 text-foreground font-semibold text-sm transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/gopikrishnapamidala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-cyan-500/40 text-foreground font-semibold text-sm transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="mailto:gopikrishnapamidala@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:border-cyan-500/40 text-foreground font-semibold text-sm transition-all"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Areas of Expertise */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Areas of Expertise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPERTISE.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-4 rounded-xl border border-border bg-card hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Certifications
          </h2>
          <div className="flex flex-wrap gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className={`px-4 py-2 rounded-xl border text-sm font-medium ${cert.color}`}
              >
                <div>{cert.name}</div>
                <div className="text-xs opacity-70">{cert.issuer} · {cert.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-8">
            {EXPERIENCE.map((job) => (
              <div key={job.role} className="relative pl-6 border-l-2 border-border">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-cyan-400" />
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <span className="font-semibold text-foreground">{job.role}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">{job.company}</span>
                  <span className="ml-auto text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{job.period}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">›</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* This Blog */}
        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-bold mb-4">About This Blog</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I created this platform to share what I learn in the trenches of AI Security engineering. 
            My goal: provide the most practical, technically accurate AI Security content available — 
            the kind that helps you actually build secure AI systems, not just understand concepts.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This site is built with Next.js 15, TypeScript, Tailwind CSS, and PostgreSQL. 
            The source architecture is designed for 1M+ monthly visitors with Docker-based deployment.
          </p>
        </section>
      </div>
    </>
  );
}
