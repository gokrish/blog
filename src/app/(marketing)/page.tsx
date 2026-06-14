import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedTopics from "@/components/home/FeaturedTopics";
import LatestArticles from "@/components/home/LatestArticles";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import NewsletterSection from "@/components/home/NewsletterSection";
import SocialProof from "@/components/home/SocialProof";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Gopikrishna AI Security | AI Security Engineer & Thought Leader",
  description:
    "Exploring AI Security, Agentic AI, AWS Bedrock, Cybersecurity, Prompt Engineering, and Emerging Technologies. Practical insights from an AI Security Engineer.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Social proof bar */}
      <SocialProof />

      {/* Featured topics grid */}
      <FeaturedTopics />

      {/* Latest articles */}
      <LatestArticles posts={latestPosts} />

      {/* Featured projects */}
      <FeaturedProjects />

      {/* Newsletter CTA */}
      <NewsletterSection />
    </>
  );
}
