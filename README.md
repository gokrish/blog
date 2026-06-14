# Gopikrishna AI Security — Platform

> **AI Security Engineer | Cybersecurity Enthusiast | Agentic AI Builder**
>
> A production-ready personal branding and technical blogging platform built with Next.js 15, TypeScript, Tailwind CSS, ShadCN UI, PostgreSQL, and Prisma.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS, ShadCN UI |
| Animations | Framer Motion |
| Database | PostgreSQL 16 |
| ORM | Prisma |
| Auth | NextAuth v5 (GitHub OAuth) |
| Content | MDX + gray-matter + next-mdx-remote |
| Code Highlighting | Shiki |
| Caching | Redis (optional) |
| Deployment | Docker + Docker Compose |

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (marketing)/      # Public pages
│   ├── (admin)/          # Protected admin panel
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/               # ShadCN components
│   ├── layout/           # Navbar, Footer
│   ├── blog/             # Blog-specific components
│   ├── home/             # Homepage sections
│   └── shared/           # Reusable components
├── content/
│   └── blog/             # MDX blog posts
├── lib/                  # Utilities
│   ├── auth.ts           # NextAuth config
│   ├── db.ts             # Prisma client
│   ├── mdx.ts            # MDX processing
│   └── seo.ts            # Metadata helpers
└── types/                # TypeScript types
prisma/
└── schema.prisma         # Database schema
docker/
├── Dockerfile
└── docker-compose.yml
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- GitHub OAuth app credentials

### 1. Clone & Install

```bash
git clone https://github.com/gopikrishnapamidala/gopikrishna-ai-security
cd gopikrishna-ai-security
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Database Setup

```bash
# Start PostgreSQL with Docker
docker-compose up db -d

# Run migrations
npx prisma migrate dev

# Seed initial data
npx prisma db seed
```

### 4. Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Admin Access

Navigate to `/admin` — sign in with your GitHub account (must be in `ADMIN_EMAILS` env var).

---

## 🐳 Docker Deployment

```bash
# Development
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up -d
```

---

## ☁️ Deployment Targets

This app uses Next.js standalone output — compatible with:
- **Railway**: Connect GitHub repo, set env vars, deploy
- **Render**: Docker-based web service
- **Fly.io**: `fly launch --dockerfile docker/Dockerfile`
- **DigitalOcean App Platform**: Docker deploy
- **AWS ECS Fargate**: Push image to ECR, deploy task definition
- **Oracle Cloud Free Tier**: Docker on VM

---

## 🔒 Security

- Content Security Policy (CSP) headers
- CORS configuration
- Rate limiting on all API routes
- Input validation with Zod
- CSRF protection via NextAuth
- SQL injection protection via Prisma
- XSS protection via React + output encoding
- Secure session cookies
- Audit logging for admin actions
- `security.txt` at `/.well-known/security.txt`

---

## 📊 SEO Features

- Dynamic XML Sitemap
- RSS Feed
- robots.txt
- Open Graph + Twitter Cards
- Article, Person, Organization, FAQ, Breadcrumb schema.org markup
- Canonical URLs
- Auto-generated metadata per page

---

## 📝 Blog Content

10 seeded AI Security articles covering:
- AWS Bedrock Guardrails
- AI Agent Architecture
- System Prompt Design
- Prompt Injection Prevention
- LLM Security (OWASP Top 10 for LLMs)
- AI Red Teaming
- Content Filters
- Agentic AI Patterns
- AI Agent Evaluation
- Secure AI Agent Development

---

## 📜 License

MIT © Gopi Krishna Pamidala
