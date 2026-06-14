import { Users, Globe, MessageCircle, PlayCircle, FileText } from "lucide-react";

const STATS = [
  { icon: Users, label: "LinkedIn", value: "500+", sublabel: "Connections", href: "https://linkedin.com/in/gopikrishnapamidala" },
  { icon: Globe, label: "GitHub", value: "100+", sublabel: "Followers", href: "https://github.com/gopikrishnapamidala" },
  { icon: FileText, label: "Medium", value: "50+", sublabel: "Articles", href: "https://medium.com/@gopikrishnapamidala" },
  { icon: MessageCircle, label: "X/Twitter", value: "200+", sublabel: "Followers", href: "https://twitter.com/gopikrishnapamidala" },
  { icon: PlayCircle, label: "YouTube", value: "Coming", sublabel: "Soon", href: "https://youtube.com/@gopikrishnapamidala" },
];

export default function SocialProof() {
  return (
    <section
      className="border-y border-border bg-card/30"
      aria-label="Social proof statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {STATS.map(({ icon: Icon, label, value, sublabel, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border group-hover:border-cyan-500/40 flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-foreground">{value}</span>
                <span className="text-xs text-muted-foreground">{sublabel}</span>
              </div>
            </a>
          ))}

          {/* Certification badges */}
          <div className="hidden lg:flex items-center gap-2 pl-8 border-l border-border">
            {[
              { label: "NSE 7", color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
              { label: "AWS SAA", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
              { label: "Sec+", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
            ].map((cert) => (
              <span
                key={cert.label}
                className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${cert.color}`}
              >
                {cert.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
