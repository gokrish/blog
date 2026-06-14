import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/mdx";
import { formatDateShort, getCategoryBadgeClass } from "@/lib/utils";
import { Clock, Calendar, Tag, Rss } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on AI Security, AWS Bedrock, Agentic AI, Cybersecurity, Prompt Engineering, and Emerging Technologies.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags().slice(0, 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground mb-4">
          Knowledge Base
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              AI Security <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-muted-foreground">
              Explore the latest articles on AI Security, AWS Bedrock, Agentic AI, and Cybersecurity
            </p>
          </div>
          <a
            href="/feed.xml"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
          >
            <Rss className="w-4 h-4" />
            RSS
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Featured post */}
          {posts.filter((p) => p.frontmatter.featured)[0] && (
            <FeaturedPostCard post={posts.filter((p) => p.frontmatter.featured)[0]} />
          )}

          {/* All posts grid */}
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {posts
              .filter((p) => !p.frontmatter.featured)
              .map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Categories */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map(({ name, count }) => (
                <li key={name}>
                  <Link
                    href={`/blog/category/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-cyan-400 transition-colors group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{name}</span>
                    <span className="text-xs bg-secondary border border-border px-2 py-0.5 rounded-full">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(({ name }) => (
                <Link
                  key={name}
                  href={`/blog/tag/${name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs font-mono px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
                >
                  #{name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <h2 className="text-sm font-semibold text-foreground mb-2">
              Weekly AI Security Digest
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Get the latest articles and security insights delivered to your inbox.
            </p>
            <Link
              href="/newsletter"
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors"
            >
              Subscribe Free
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  const badgeClass = getCategoryBadgeClass(post.frontmatter.category ?? "");
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-border bg-card/50 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full aspect-[2.5/1] bg-secondary flex items-center justify-center">
        <Image src="/images/blog-banner.png" alt="Featured article" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      <div className="p-6 relative">
        <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${badgeClass} mb-3 inline-block`}>
          {post.frontmatter.category} · Featured
        </span>
        <h2 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors mb-2">
          {post.frontmatter.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {post.frontmatter.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDateShort(post.frontmatter.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  const badgeClass = getCategoryBadgeClass(post.frontmatter.category ?? "");
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card/50 hover:border-cyan-500/30 transition-all duration-300 p-5"
    >
      <span className={`self-start text-xs font-mono font-medium px-2 py-0.5 rounded-full border ${badgeClass} mb-3`}>
        {post.frontmatter.category}
      </span>
      <h2 className="text-sm font-semibold text-foreground group-hover:text-cyan-400 transition-colors leading-snug mb-2 line-clamp-2">
        {post.frontmatter.title}
      </h2>
      <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-4">
        {post.frontmatter.description}
      </p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDateShort(post.frontmatter.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {post.readingTime}m
        </span>
      </div>
    </Link>
  );
}
