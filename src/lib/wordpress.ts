import type { BlogPost } from "./blog";

/**
 * Headless WordPress source for blog posts + case studies, via WPGraphQL.
 *
 * Enabled only when WORDPRESS_API_URL is set (e.g. https://cms.unexus.ai/graphql).
 * When it's unset — or WP is unreachable — callers fall back to the existing
 * Neon CMS / hardcoded defaults, so the public site never breaks on a WP outage.
 *
 * Blog posts map from *native* WordPress fields (post + category + featured
 * image), so editors just write a normal post — no custom fields needed.
 * Reading time is computed from the body and the accent colour is derived from
 * the category, so the client never has to fill those in.
 *
 * Case studies come from a `caseStudy` custom post type with an ACF field group
 * exposed to GraphQL as `caseStudyFields`. See the setup checklist in the PR /
 * chat for the exact plugins and field names this contract expects.
 */

const WP_API = process.env.WORDPRESS_API_URL;

export function wordpressConfigured(): boolean {
  return !!WP_API;
}

/** Accent colours by blog category, so editors don't pick colours by hand. */
const CATEGORY_ACCENTS: Record<string, string> = {
  GEO: "#7c3aed",
  Strategy: "#ec4899",
  Research: "#f59e0b",
  SEO: "#06b6d4",
  Marketing: "#6366f1",
  AI: "#10b981",
};
const DEFAULT_ACCENT = "#6366f1";

async function wpQuery<T>(query: string): Promise<T | null> {
  if (!WP_API) return null;
  try {
    const res = await fetch(WP_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      // ISR: cache the CMS response and refresh in the background every 60s, so
      // a published edit shows up within a minute without rebuilding the site.
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: T; errors?: unknown };
    if (json.errors) {
      console.error("[wordpress] GraphQL errors:", JSON.stringify(json.errors));
      return null;
    }
    return json.data ?? null;
  } catch (e) {
    console.error("[wordpress] fetch failed:", e);
    return null;
  }
}

/** Strip HTML tags and collapse whitespace — for excerpts and word counts. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/** "Jun 2026" from an ISO date string. */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Rough reading time from body HTML, at ~200 words/min, floored at 1. */
function readingTime(html: string): string {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

// ── Blog ─────────────────────────────────────────────────────────────────────

interface WpPostNode {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  featuredImage?: { node?: { sourceUrl?: string } } | null;
  categories?: { nodes?: { name: string }[] } | null;
  // Exposed by the "Add WPGraphQL SEO" plugin (bridges Yoast into GraphQL).
  seo?: { title?: string; metaDesc?: string } | null;
}

// The `seo { ... }` block requires the "Add WPGraphQL SEO" plugin (which surfaces
// Yoast's fields). With Yoast + that bridge installed, editors control the meta
// title/description per post; when a field is left blank we fall back to the
// post title / excerpt so nothing ends up empty.
const POSTS_QUERY = `
  query Posts {
    posts(first: 100, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        title
        excerpt
        date
        content
        featuredImage { node { sourceUrl } }
        categories(first: 1) { nodes { name } }
        seo { title metaDesc }
      }
    }
  }
`;

function mapPost(n: WpPostNode): BlogPost {
  const cat = n.categories?.nodes?.[0]?.name ?? "Article";
  const title = stripHtml(n.title || "");
  const excerpt = stripHtml(n.excerpt || "");
  return {
    slug: n.slug,
    image: n.featuredImage?.node?.sourceUrl || undefined,
    cat,
    title,
    excerpt,
    date: formatDate(n.date),
    read: readingTime(n.content || ""),
    accent: CATEGORY_ACCENTS[cat] ?? DEFAULT_ACCENT,
    // Prefer Yoast's values; fall back to the title / excerpt when blank.
    metaTitle: n.seo?.title?.trim() || title,
    metaDescription: n.seo?.metaDesc?.trim() || excerpt,
    body: n.content || "",
  };
}

/** All published posts from WordPress, or null when WP is off/unreachable. */
export async function fetchWpPosts(): Promise<BlogPost[] | null> {
  const data = await wpQuery<{ posts?: { nodes?: WpPostNode[] } }>(POSTS_QUERY);
  const nodes = data?.posts?.nodes;
  if (!nodes) return null;
  return nodes.map(mapPost);
}

// ── Case studies ──────────────────────────────────────────────────────────────

export interface CaseStudyRaw {
  category: string;
  flag: string;
  headline: string;
  quote: string;
  tags: string[];
  metrics: string[]; // "value | label" per entry, parsed downstream
}

interface WpCaseNode {
  caseStudyFields?: {
    category?: string;
    flag?: string;
    headline?: string;
    quote?: string;
    tags?: string;
    metrics?: string;
  } | null;
}

const CASES_QUERY = `
  query CaseStudies {
    caseStudies(first: 100, where: { status: PUBLISH }) {
      nodes {
        caseStudyFields {
          category
          flag
          headline
          quote
          tags
          metrics
        }
      }
    }
  }
`;

/** Split an ACF textarea (one entry per line) into a trimmed array. */
function lines(v?: string): string[] {
  return (v || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function mapCase(n: WpCaseNode): CaseStudyRaw {
  const f = n.caseStudyFields ?? {};
  return {
    category: f.category ?? "",
    flag: f.flag ?? "",
    headline: f.headline ?? "",
    quote: f.quote ?? "",
    tags: lines(f.tags),
    metrics: lines(f.metrics),
  };
}

/** All published case studies from WordPress, or null when WP is off/unreachable. */
export async function fetchWpCaseStudies(): Promise<CaseStudyRaw[] | null> {
  const data = await wpQuery<{ caseStudies?: { nodes?: WpCaseNode[] } }>(CASES_QUERY);
  const nodes = data?.caseStudies?.nodes;
  if (!nodes) return null;
  return nodes.map(mapCase);
}
