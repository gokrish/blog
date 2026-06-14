"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { PostMeta } from "@/types";
import { formatDateShort, getCategoryBadgeClass, truncate } from "@/lib/utils";

interface LatestArticlesProps {
  posts: PostMeta[];
}

export default function LatestArticles({ posts }: LatestArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground mb-4">
              Fresh Content
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Latest <span className="gradient-text">Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors font-medium"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostCard({ post, index }: { post: PostMeta; index: number }) {
  const badgeClass = getCategoryBadgeClass(post.frontmatter.category ?? "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-xl border border-border bg-card/50 hover:border-cyan-500/30 hover:bg-card transition-all duration-300 overflow-hidden"
      >
        {/* Image placeholder */}
        <div className="w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "radial-gradient(circle at 50% 50%, hsl(188 94% 43% / 0.1) 0%, transparent 70%)" }}
          />
          <div className="text-xs font-mono text-muted-foreground/50">{post.frontmatter.category}</div>
        </div>

        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Category badge */}
          <span className={`self-start text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${badgeClass}`}>
            {post.frontmatter.category}
          </span>

          {/* Title */}
          <h3 className="text-base font-semibold text-foreground group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
            {post.frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
            {post.frontmatter.description}
          </p>

          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDateShort(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min read
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
