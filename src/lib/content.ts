import type { BlogPost } from "./blog";
import { getSection } from "./cms";
import { BLOG_POSTS_DEFAULTS, CASESTUDIES_CASES_DEFAULTS } from "./cms-schema";
import { fetchWpPosts, fetchWpCaseStudies, wordpressConfigured, type CaseStudyRaw } from "./wordpress";

/**
 * Single source of truth for blog + case-study content. Prefers headless
 * WordPress when it's configured and returns data; otherwise falls back to the
 * Neon CMS / hardcoded defaults. Every page reads through here, so switching to
 * WordPress is just setting WORDPRESS_API_URL — no page-level changes.
 */

export type { CaseStudyRaw };

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (wordpressConfigured()) {
    const wp = await fetchWpPosts();
    if (wp && wp.length) return wp;
  }
  const data = await getSection("blog.posts", BLOG_POSTS_DEFAULTS);
  return data.items as BlogPost[];
}

export async function getCaseStudies(): Promise<CaseStudyRaw[]> {
  if (wordpressConfigured()) {
    const wp = await fetchWpCaseStudies();
    if (wp && wp.length) return wp;
  }
  const raw = await getSection("casestudies.cases", CASESTUDIES_CASES_DEFAULTS);
  return raw.items as CaseStudyRaw[];
}
