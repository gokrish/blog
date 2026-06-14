"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "Please check your email to confirm your subscription.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="py-24 border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, hsl(188 94% 43% / 0.07) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Mail className="w-6 h-6 text-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Stay Ahead in <span className="gradient-text">AI Security</span>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Get practical AI Security insights, AWS Bedrock tutorials, and emerging threat intelligence delivered to your inbox. No spam — only signal.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "Weekly AI Security digest",
              "AWS Bedrock tutorials",
              "Prompt engineering tips",
              "No spam, unsubscribe anytime",
            ].map((item) => (
              <span
                key={item}
                className="text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                {item}
              </span>
            ))}
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p className="text-sm">{message}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={status === "loading"}
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-50 transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center whitespace-nowrap"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe Free"
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mt-3 text-xs text-red-400"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {message}
            </motion.p>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our{" "}
            <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
            {" "}Double opt-in — you'll receive a confirmation email.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
