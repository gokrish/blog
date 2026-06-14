import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const authConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "placeholder_id",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "placeholder_secret",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        // Assign role based on email whitelist
        session.user.role = ADMIN_EMAILS.includes(
          session.user.email?.toLowerCase() ?? ""
        )
          ? "ADMIN"
          : "VIEWER";
      }
      return session;
    },
    async signIn({ user }) {
      // Only allow admin emails to sign in
      if (!user.email) return false;
      if (ADMIN_EMAILS.length > 0 && !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/error",
  },
  trustHost: true,
} satisfies NextAuthConfig;
