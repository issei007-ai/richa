import type { MetadataRoute } from "next";

const SITE_URL = "https://www.unexusai.com";

// AI / answer-engine crawlers we explicitly welcome, so the site can be crawled
// and cited by ChatGPT, Perplexity, Gemini, and Claude (a GEO signal — many
// sites accidentally block these). All allowed everywhere except /admin.
const AI_BOTS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live browsing
  "ClaudeBot", // Anthropic training
  "Claude-Web", // Claude browsing
  "anthropic-ai",
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity live browsing
  "Google-Extended", // Gemini / AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLMs)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/admin" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
