import { ExternalLink, Mail, Download, Shield, Database, Layout } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Resume | Gopikrishna AI Security",
  description: "Professional resume and certifications of Gopi Krishna Pamidala.",
};

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Gopi Krishna Pamidala</h1>
          <p className="text-lg text-cyan-400 font-mono">Software Engineer & AI Security Specialist</p>
        </div>
        <div className="flex gap-3">
          <a
            href="mailto:gopikrishnapamidala@gmail.com"
            className="p-2 rounded-lg border border-border bg-card hover:border-cyan-500/40 text-foreground transition-all"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/gopikrishnapamidala"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-border bg-card hover:border-cyan-500/40 text-foreground transition-all"
            title="LinkedIn"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid gap-12">
        {/* Summary */}
        <section>
          <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Professional Summary</h2>
          <p className="text-muted-foreground leading-relaxed">
            Software Engineer with 5+ years of experience across Canadian Banking and Healthcare sectors. 
            Currently specializing in AI Security, AWS Bedrock agent development, and enterprise incident management. 
            Proven track record of maintaining rigorous OWASP compliance in highly regulated environments (TD Bank). 
            Deeply experienced in network security through Fortinet systems (NSE 1-5, FortiAnalyzer) and 
            home lab experimentation using Wazuh XDR and Oracle Cloud Infrastructure (OCI).
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold border-b border-border pb-2 mb-6">Work Experience</h2>
          
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground">Software Engineer</h3>
              <span className="text-sm font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded self-start">2022 – 2025</span>
            </div>
            <div className="text-muted-foreground font-medium mb-3">TD Bank (Canada)</div>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-1">›</span>
                Built and integrated advanced AI workflows and agents utilizing AWS Bedrock.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-1">›</span>
                Spearheaded Incident and Release Management pipelines using ServiceNow, drastically reducing MTTR.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-1">›</span>
                Enforced OWASP security standards across critical banking infrastructure, ensuring robust compliance.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-1">›</span>
                Developed and implemented AI Guardrails and system prompts for production-ready language models.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground">Software & Network Security Engineer</h3>
              <span className="text-sm font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded self-start">Prior to 2022</span>
            </div>
            <div className="text-muted-foreground font-medium mb-3">Healthcare & Enterprise Sectors (Canada)</div>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-1">›</span>
                Administered FortiGate Firewalls, optimizing SD-WAN policies, web filtering, and content filtering.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-1">›</span>
                Maintained internal Fortinet labs to simulate and mitigate network-based vulnerabilities.
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-cyan-400 mt-1">›</span>
                Supported software development and deployment lifecycles within strict healthcare compliance frameworks.
              </li>
            </ul>
          </div>
        </section>

        {/* Education & Home Lab */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Education & Home Lab</h2>
            <ul className="space-y-4">
              <li>
                <div className="font-semibold text-foreground">Npower Canada NSP Program</div>
                <div className="text-sm text-cyan-400">FCP Graduate</div>
              </li>
              <li>
                <div className="font-semibold text-foreground">Advanced Home Lab Environment</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Built and currently maintain a sophisticated home lab integrating Wazuh XDR for threat detection and log 
                  aggregation, hosted on Oracle Cloud Infrastructure (OCI).
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Certifications</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-400" />
                <span className="font-medium text-sm">Fortinet NSE 5 - FortiAnalyzer</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-400" />
                <span className="font-medium text-sm">Fortinet NSE 1-5</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="font-medium text-sm">AI Security (TryHackMe)</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
