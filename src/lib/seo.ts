import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  canonical?: string;
  noIndex?: boolean;
}

const SITE_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Gopikrishna AI Security";
const DEFAULT_IMAGE = "/og-default.png";

export function generateMetadata({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  authors = ["Gopi Krishna Pamidala"],
  tags = [],
  canonical,
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);
  const canonicalUrl = canonical ?? undefined;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    authors: authors.map((name) => ({ name })),
    keywords: [
      ...tags,
      "AI Security",
      "AWS Bedrock",
      "Cybersecurity",
      "Agentic AI",
      "LLM Security",
      "Gopi Krishna Pamidala",
    ],
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(type === "article" && {
        authors: authors.map((a) => absoluteUrl(`/about`)),
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
      creator: "@gopikrishnapamidala",
      site: "@gopikrishnapamidala",
    },
  };
}

export function generateArticleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updatedAt?: string;
  tags?: string[];
  readingTime?: number;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    image: post.image ? absoluteUrl(post.image) : absoluteUrl(DEFAULT_IMAGE),
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    keywords: post.tags?.join(", "),
    timeRequired: `PT${post.readingTime ?? 5}M`,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Person",
      name: "Gopi Krishna Pamidala",
      url: absoluteUrl("/about"),
      sameAs: [
        "https://linkedin.com/in/gopikrishnapamidala",
        "https://github.com/gopikrishnapamidala",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
  };
}

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gopi Krishna Pamidala",
    jobTitle: "AI Security Engineer",
    description:
      "AI Security Engineer specializing in AWS Bedrock, Agentic AI, LLM Security, and Cybersecurity.",
    url: absoluteUrl("/"),
    sameAs: [
      "https://linkedin.com/in/gopikrishnapamidala",
      "https://github.com/gopikrishnapamidala",
    ],
    knowsAbout: [
      "AI Security",
      "AWS Bedrock",
      "Agentic AI",
      "Cybersecurity",
      "LLM Security",
      "Prompt Engineering",
      "Cloud Security",
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "Fortinet NSE 4" },
      { "@type": "EducationalOccupationalCredential", name: "Fortinet NSE 5" },
      { "@type": "EducationalOccupationalCredential", name: "Fortinet NSE 7 SD-WAN" },
      { "@type": "EducationalOccupationalCredential", name: "AWS Solutions Architect Associate" },
      { "@type": "EducationalOccupationalCredential", name: "CompTIA Security+" },
    ],
  };
}

export function generateBreadcrumbJsonLd(
  crumbs: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
