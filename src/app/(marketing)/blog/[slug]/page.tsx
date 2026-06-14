import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/mdx";
import { generateMetadata as genMeta, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { formatDate, getCategoryBadgeClass } from "@/lib/utils";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Share2, Tag } from "lucide-react";
import { mdxComponents } from "@/components/blog/MdxComponents";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return genMeta({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    type: "article",
    publishedTime: post.frontmatter.date,
    modifiedTime: post.frontmatter.updatedAt,
    tags: post.frontmatter.tags,
    canonical: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.frontmatter.published === false) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const articleJsonLd = generateArticleJsonLd({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    slug,
    date: post.frontmatter.date,
    updatedAt: post.frontmatter.updatedAt,
    tags: post.frontmatter.tags,
    readingTime: post.readingTime,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.frontmatter.title, path: `/blog/${slug}` },
  ]);

  const badgeClass = getCategoryBadgeClass(post.frontmatter.category ?? "");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main article */}
          <article className="lg:col-span-3 min-w-0">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-xs">{post.frontmatter.title}</span>
            </nav>

            {/* Category badge */}
            <span className={`text-xs font-mono font-medium px-3 py-1.5 rounded-full border ${badgeClass} mb-6 inline-block`}>
              {post.frontmatter.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              {post.frontmatter.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
              {post.frontmatter.author && (
                <span className="text-muted-foreground">by {post.frontmatter.author}</span>
              )}
            </div>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                <Tag className="w-3.5 h-3.5 text-muted-foreground mt-0.5" />
                {post.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border border-border bg-secondary text-muted-foreground hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* MDX Content */}
            <div className="prose-custom">
              <MDXRemote 
                source={post.content} 
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark-dimmed",
                          keepBackground: false,
                        },
                      ],
                    ],
                    remarkPlugins: [
                      remarkGfm,
                      [remarkToc, { heading: "Table of Contents", maxDepth: 3, tight: true }],
                    ]
                  }
                }}
              />
            </div>

            {/* Share section */}
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share this article</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.frontmatter.title)}&url=${encodeURIComponent(`https://gopikrishna.ai/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author */}
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-cyan-400">GK</span>
              </div>
              <div className="font-semibold text-sm text-foreground">Gopi Krishna Pamidala</div>
              <div className="text-xs text-cyan-400 font-mono mt-0.5 mb-3">AI Security Engineer</div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Sharing insights on AI Security, AWS Bedrock, and Agentic AI.
              </p>
              <Link
                href="/about"
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Learn more →
              </Link>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Related Articles
                </h2>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <div className="text-xs text-cyan-400/60 font-mono mb-1">
                        {related.frontmatter.category}
                      </div>
                      <div className="text-xs font-medium text-foreground group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                        {related.frontmatter.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {related.readingTime} min read
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <h2 className="text-sm font-semibold text-foreground mb-2">
                Enjoyed this article?
              </h2>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Subscribe for weekly AI Security insights and new articles.
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
    </>
  );
}
