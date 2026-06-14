import fs from "fs";
import path from "path";

const TITLES = [
  // AI Security
  "The Comprehensive Guide to AI Red Teaming in 2026",
  "Securing LLMs Against Prompt Injection and Jailbreaks",
  "Zero Trust Architecture for Autonomous AI Agents",
  "How to Implement AI Guardrails in Production",
  "Threat Modeling for Generative AI Applications",
  "Understanding Data Poisoning in Machine Learning",
  "Data Privacy in the Era of Large Language Models",
  "Securing RAG Pipelines: A Practitioner's Guide",
  "The OWASP Top 10 for Large Language Models Explained",
  "Compliance and Governance for AI Systems",
  // Agentic AI
  "Building Multi-Agent Systems with the MCP Protocol",
  "Agent-to-Agent (A2A) Communication Patterns",
  "State Management in Autonomous AI Agents",
  "Evaluating the Reasoning Capabilities of Agentic AI",
  "The Future of Tool Use and Function Calling in LLMs",
  "Orchestrating Complex Workflows with AI Agents",
  "Monitoring and Observability for AI Agents",
  "Designing Robust Feedback Loops for Agents",
  "Human-in-the-Loop vs Fully Autonomous Agents",
  "Best Practices for Memory Management in Agents",
  // AWS Bedrock
  "Getting Started with Amazon Bedrock and Nova Lite",
  "Deploying Enterprise Grade AI on AWS Bedrock",
  "Cost Optimization Strategies for AWS Bedrock",
  "Fine-Tuning Foundation Models on AWS Bedrock",
  "Building RAG Applications with Amazon Knowledge Bases",
  "Securing Bedrock Endpoints with IAM and VPC Endpoints",
  "Comparing Claude 3.5 Sonnet and Amazon Nova on Bedrock",
  "Implementing Guardrails for Amazon Bedrock",
  "Streaming Responses with the Bedrock Converse API",
  "Serverless AI Architectures with Bedrock and Lambda",
  // Cybersecurity & Architecture
  "Modern DevSecOps Practices for AI Workloads",
  "Identity and Access Management for AI Services",
  "Securing API Gateways in the Age of AI",
  "Cryptographic Best Practices for Data at Rest and in Transit",
  "Building Resilient Microservices with Rust and Go",
  "Event-Driven Architecture for Scalable AI Systems",
  "Automating Penetration Testing with AI",
  "Log Analysis and Threat Hunting using LLMs",
  "The Role of eBPF in Cloud Native Security",
  "Implementing CI/CD Pipelines for Machine Learning",
  // Prompt Engineering & Emerging Tech
  "Advanced Prompt Engineering Techniques for Complex Tasks",
  "Chain of Thought vs Tree of Thoughts Prompting",
  "Few-Shot Prompting Strategies for Improved Accuracy",
  "Metaprompting: Teaching Models to Write Their Own Prompts",
  "Reducing Hallucinations through Grounding and Context",
  "The Impact of Context Window Sizes on Model Performance",
  "Optimizing Prompts for Latency and Cost",
  "Evaluating Prompt Robustness Against Adversarial Inputs",
  "The Rise of Small Language Models (SLMs)",
  "Multimodal AI: Processing Text, Image, and Audio",
];

const CATEGORIES = [
  "AI Security",
  "Agentic AI",
  "AWS Bedrock",
  "Cybersecurity",
  "Prompt Engineering"
];

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

function getRandomCategory(index: number) {
  return CATEGORIES[Math.floor(index / 10)];
}

function generateMDX(title: string, category: string, index: number) {
  const date = new Date(Date.now() - index * 86400000).toISOString();
  
  return `---
title: "${title}"
description: "An in-depth guide and practical insights on ${title.toLowerCase()}."
date: "${date}"
updatedAt: "${date}"
author: "Gopi Krishna Pamidala"
category: "${category}"
tags: ["${category.toLowerCase()}", "tutorial", "insights"]
featured: ${index < 3 ? "true" : "false"}
published: true
---

## Introduction

Welcome to this comprehensive guide on **${title}**. In the rapidly evolving landscape of ${category}, staying updated with the latest methodologies and best practices is critical.

This post will cover:
- Core concepts and definitions
- Architectural considerations
- Implementation details and code snippets
- Security and performance optimization

## Core Concepts

In ${category}, it's essential to understand the underlying mechanics...

\`\`\`typescript
// Example Implementation
export function demonstrateConcept() {
  console.log("Exploring ${category}");
  return true;
}
\`\`\`

## Deep Dive

Here we dive deeper into the technical specifics...

> [!NOTE]
> Always ensure your implementations follow industry standard security guidelines, especially when dealing with AI and Cloud infrastructure.

## Conclusion

By applying these principles, you can build more robust, secure, and scalable solutions in the realm of ${category}.
`;
}

async function main() {
  const blogDir = path.join(process.cwd(), "content/blog");
  
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  let count = 0;
  for (let i = 0; i < TITLES.length; i++) {
    const title = TITLES[i];
    const category = getRandomCategory(i);
    const slug = generateSlug(title);
    const filePath = path.join(blogDir, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, generateMDX(title, category, i));
      count++;
    }
  }

  console.log(`✅ Scaffolded ${count} new SEO-optimized MDX blog posts.`);
}

main();
