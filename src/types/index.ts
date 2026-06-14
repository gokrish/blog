// Global TypeScript types

export interface PostFrontmatter {
  title: string;
  date: string;
  updatedAt?: string;
  description: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  author?: string;
  image?: string;
  ogImage?: string;
  published?: boolean;
  featured?: boolean;
  draft?: boolean;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: number;
  readingTimeText: string;
}

export interface PostWithContent extends PostMeta {
  content: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDesc?: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  status?: "active" | "archived" | "wip";
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  url?: string;
  badgeColor?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}
