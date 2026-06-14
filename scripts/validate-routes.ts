import fs from "fs";
import path from "path";

async function main() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:3001";
  
  // Extract routes from Navbar.tsx
  const navbarContent = fs.readFileSync(path.join(process.cwd(), "src/components/layout/Navbar.tsx"), "utf-8");
  const hrefRegex = /href:\s*"(.*?)"/g;
  let match;
  const routes = new Set<string>();
  
  while ((match = hrefRegex.exec(navbarContent)) !== null) {
    if (match[1].startsWith("/")) {
      routes.add(match[1]);
    }
  }

  // Also extract `<Link href="...">` just in case
  const linkRegex = /<Link[^>]*href="([^"]+)"/g;
  while ((match = linkRegex.exec(navbarContent)) !== null) {
    if (match[1].startsWith("/")) {
      routes.add(match[1]);
    }
  }

  console.log(`Validating ${routes.size} internal routes against ${BASE_URL}...`);
  
  let hasErrors = false;
  
  for (const route of routes) {
    try {
      const res = await fetch(`${BASE_URL}${route}`);
      if (res.ok) {
        console.log(`✅ ${route} (Status: ${res.status})`);
      } else {
        console.error(`❌ ${route} (Status: ${res.status})`);
        hasErrors = true;
      }
    } catch (err) {
      console.error(`❌ ${route} (Error: ${(err as Error).message})`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("\n❌ Route validation failed. Some routes returned errors or 404s.");
    process.exit(1);
  } else {
    console.log("\n✅ All routes validated successfully!");
  }
}

main();
