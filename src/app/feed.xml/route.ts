import { getAllPosts } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/utils";

export async function GET() {
  const posts = getAllPosts().slice(0, 50);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Gopikrishna AI Security</title>
    <description>AI Security, AWS Bedrock, Agentic AI, Cybersecurity, and Emerging Technologies</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>gopikrishnapamidala@gmail.com (Gopi Krishna Pamidala)</managingEditor>
    <webMaster>gopikrishnapamidala@gmail.com (Gopi Krishna Pamidala)</webMaster>
    <category>AI Security</category>
    <category>Cybersecurity</category>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Gopikrishna AI Security</title>
      <link>${baseUrl}</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <author>gopikrishnapamidala@gmail.com (Gopi Krishna Pamidala)</author>
      ${post.frontmatter.category ? `<category><![CDATA[${post.frontmatter.category}]]></category>` : ""}
      ${(post.frontmatter.tags ?? []).map((t) => `<category><![CDATA[${t}]]></category>`).join("\n      ")}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
