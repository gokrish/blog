import { getAllPosts } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.frontmatter.updatedAt ?? post.frontmatter.date),
    changeFrequency: "monthly",
    priority: post.frontmatter.featured ? 0.9 : 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: absoluteUrl("/blog"), lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/projects"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/resources"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/speaking"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/resume"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/newsletter"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  return [...staticPages, ...postEntries];
}
