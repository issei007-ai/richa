import type { MetadataRoute } from "next";
import { getSection } from "@/lib/cms";
import { BLOG_POSTS_DEFAULTS } from "@/lib/cms-schema";
import type { BlogPost } from "@/lib/blog";

const SITE_URL = "https://www.unexusai.com";

const SERVICE_SLUGS = [
  "digital-marketing",
  "seo",
  "sem",
  "geo",
  "website-development",
  "ai-automation",
  "ai-training",
  "market-research",
];

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/case-studies", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/book", changeFrequency: "monthly", priority: 0.6 },
  { path: "/audit", changeFrequency: "monthly", priority: 0.5 },
  { path: "/quote", changeFrequency: "monthly", priority: 0.5 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Blog posts come from the CMS (falling back to the hardcoded defaults) so
  // new posts added via /admin/content show up here automatically.
  const posts = ((await getSection("blog.posts", BLOG_POSTS_DEFAULTS)).items as BlogPost[]) ?? [];
  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
