"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      aria-label="Copy code"
    >
      {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export const mdxComponents = {
  pre: ({ children, raw, ...props }: any) => {
    // raw might not be automatically passed by rehype-pretty-code unless configured
    // so we extract text content from children manually if needed
    let text = raw;
    if (!text && children) {
      try {
        const extractText = (node: any): string => {
          if (typeof node === "string") return node;
          if (Array.isArray(node)) return node.map(extractText).join("");
          if (node?.props?.children) return extractText(node.props.children);
          return "";
        };
        text = extractText(children);
      } catch (e) {
        text = "";
      }
    }

    return (
      <div className="relative group my-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1117]">
        {text && <CopyButton text={text} />}
        <pre {...props} className={cn("overflow-x-auto p-4 text-sm font-mono leading-relaxed", props.className)}>
          {children}
        </pre>
      </div>
    );
  },
  code: ({ className, ...props }: any) => (
    <code
      className={cn(
        "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm bg-zinc-800/50 text-cyan-400",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: any) => (
    <a
      className={cn("font-medium text-cyan-400 underline underline-offset-4 hover:text-cyan-300 transition-colors", className)}
      {...props}
    />
  ),
  h1: ({ className, ...props }: any) => (
    <h1 className={cn("mt-2 scroll-m-20 text-4xl font-bold tracking-tight mb-6", className)} {...props} />
  ),
  h2: ({ className, ...props }: any) => (
    <h2 className={cn("mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4", className)} {...props} />
  ),
  h3: ({ className, ...props }: any) => (
    <h3 className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight mb-4", className)} {...props} />
  ),
  p: ({ className, ...props }: any) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground", className)} {...props} />
  ),
  ul: ({ className, ...props }: any) => (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }: any) => (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: any) => (
    <blockquote className={cn("mt-6 border-l-2 border-cyan-500 pl-6 italic text-muted-foreground bg-cyan-500/5 py-2 pr-4 rounded-r-lg", className)} {...props} />
  ),
};
