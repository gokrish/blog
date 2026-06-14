import Link from "next/link";
import { Shield, ExternalLink, Mail, BookOpen, Rss } from "lucide-react";

const footerLinks = {
  Content: [
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Resources", href: "/resources" },
    { label: "RSS Feed", href: "/feed.xml" },
  ],
  Topics: [
    { label: "AI Security", href: "/blog/category/ai-security" },
    { label: "AWS Bedrock", href: "/blog/category/aws-bedrock" },
    { label: "Agentic AI", href: "/blog/category/agentic-ai" },
    { label: "Cybersecurity", href: "/blog/category/cybersecurity" },
    { label: "Prompt Engineering", href: "/blog/category/prompt-engineering" },
    { label: "LLM Security", href: "/blog/category/llm-security" },
  ],
  Personal: [
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Speaking", href: "/speaking" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/.well-known/security.txt" },
  ],
};

const socialLinks = [
  { icon: ExternalLink, href: "https://github.com/gopikrishnapamidala", label: "GitHub" },
  { icon: ExternalLink, href: "https://linkedin.com/in/gopikrishnapamidala", label: "LinkedIn" },
  { icon: BookOpen, href: "https://medium.com/@gopikrishnapamidala", label: "Medium" },
  { icon: Mail, href: "mailto:gopikrishnapamidala@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-foreground">Gopikrishna</span>
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">AI Security</span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mb-5">
              Exploring AI Security, Agentic AI, AWS Bedrock, Cybersecurity, and Emerging Technologies.
            </p>
            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary border border-border hover:border-cyan-500/40 hover:text-cyan-400 text-muted-foreground transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gopi Krishna Pamidala. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Built with Next.js 15 · TypeScript · Tailwind CSS</span>
            <span aria-hidden>·</span>
            <a href="/feed.xml" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
              <Rss className="w-3 h-3" /> RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
