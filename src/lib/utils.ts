import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "MMMM d, yyyy");
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDateRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "…";
}

export function estimateReadingTime(text: string): number {
  const wpm = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${baseUrl}${path}`;
}

export function getCategoryBadgeClass(category: string): string {
  const map: Record<string, string> = {
    "AI Security": "badge-ai-security",
    "Agentic AI": "badge-agentic-ai",
    "AWS Bedrock": "badge-aws-bedrock",
    Cybersecurity: "badge-cybersecurity",
    "Cloud Security": "badge-cloud-security",
    "Prompt Engineering": "badge-prompt-engineering",
    "LLM Security": "badge-llm-security",
    Engineering: "badge-engineering",
  };
  return map[category] ?? "badge-default";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
