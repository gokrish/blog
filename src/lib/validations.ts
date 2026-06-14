import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1).max(50).optional(),
  source: z.string().max(50).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(20, "Message must be at least 20 characters").max(5000),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export const postSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(300).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED", "SCHEDULED"]),
  featured: z.boolean().optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  metaTitle: z.string().max(70).optional(),
  metaDesc: z.string().max(160).optional(),
  scheduledAt: z.string().datetime().optional(),
});

export const commentSchema = z.object({
  body: z.string().min(1, "Comment cannot be empty").max(2000),
  guestName: z.string().min(1).max(100).optional(),
  guestEmail: z.string().email().optional(),
  postId: z.string().cuid(),
  parentId: z.string().cuid().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
