import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostFrontmatter, PostWithContent, PostMeta } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.(mdx|md)$/, ""));
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const extensions = [".mdx", ".md"];
  let filePath: string | null = null;

  for (const ext of extensions) {
    const candidate = path.join(CONTENT_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const { text: readTime, minutes } = readingTime(content);

  return {
    slug,
    content,
    frontmatter: data as PostFrontmatter,
    readingTime: Math.ceil(minutes),
    readingTimeText: readTime,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      return {
        slug,
        frontmatter: post.frontmatter,
        readingTime: post.readingTime,
        readingTimeText: post.readingTimeText,
      };
    })
    .filter((p): p is PostMeta => p !== null)
    .filter((p) => p.frontmatter.published !== false)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });

  return posts;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedPosts(currentSlug: string, count = 3): PostMeta[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.slug !== currentSlug);
  const currentTags = current.frontmatter.tags ?? [];
  const currentCategory = current.frontmatter.category;

  // Score by shared tags and category
  const scored = all.map((post) => {
    const sharedTags = (post.frontmatter.tags ?? []).filter((t) =>
      currentTags.includes(t)
    ).length;
    const sameCategory = post.frontmatter.category === currentCategory ? 2 : 0;
    return { post, score: sharedTags + sameCategory };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.post);
}

export function getAllCategories(): Array<{ name: string; count: number }> {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    const cat = post.frontmatter.category ?? "Uncategorized";
    counts[cat] = (counts[cat] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): Array<{ name: string; count: number }> {
  const posts = getAllPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.frontmatter.tags ?? []) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
