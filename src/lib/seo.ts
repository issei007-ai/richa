import type { Metadata } from "next";
import { getSection } from "./cms";
import { SEO_GLOBAL_DEFAULTS } from "./cms-schema";

export const SITE_URL = "https://www.unexusai.com";

export type GlobalSeo = typeof SEO_GLOBAL_DEFAULTS;

/** The global SEO/social settings, merged over their defaults. */
export function getGlobalSeo(): Promise<GlobalSeo> {
  return getSection("seo.global", SEO_GLOBAL_DEFAULTS);
}

export interface PageSeo {
  /** Page title without the site-name suffix. Omit for the global default title. */
  title?: string;
  description?: string;
  /** Path from the site root, e.g. "/services/seo" — used for canonical + og:url. */
  path?: string;
  /** Override the social share image (else the global default is used). */
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
}

/**
 * Build a Next Metadata object for a page, merged over the global SEO defaults —
 * title suffix, description fallback, canonical URL, and Open Graph + Twitter
 * card. Pages pass only what's specific to them.
 */
export async function buildMetadata(page: PageSeo = {}): Promise<Metadata> {
  const g = await getGlobalSeo();
  const siteName = g.siteName || "Unexus AI";
  const title = page.title ? `${page.title} — ${siteName}` : g.defaultTitle || siteName;
  const description = page.description || g.defaultDescription || "";
  const url = page.path ? `${SITE_URL}${page.path}` : SITE_URL;
  const image = page.image || g.ogImage || "";
  const imageAlt = page.imageAlt || g.ogImageAlt || siteName;
  const images = image ? [{ url: image, alt: imageAlt }] : undefined;

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName, title, description, url, images },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
      site: g.twitterHandle || undefined,
    },
  };
  if (page.noindex) metadata.robots = { index: false, follow: false };
  return metadata;
}

/**
 * Metadata for a page backed by a CMS section — reads the section's optional
 * metaTitle/metaDescription overrides, falling back to the page's built-in
 * defaults, and runs them through buildMetadata (canonical + OG + Twitter).
 */
export async function sectionMetadata(opts: {
  key: string;
  defaults: Record<string, unknown>;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
}): Promise<Metadata> {
  const c = await getSection(opts.key, opts.defaults);
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return buildMetadata({
    title: s(c.metaTitle) || opts.fallbackTitle,
    description: s(c.metaDescription) || opts.fallbackDescription,
    path: opts.path,
  });
}

/** BlogPosting schema.org JSON-LD for an article page. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
}): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    author: { "@type": "Organization", name: "Unexus AI" },
    publisher: { "@type": "Organization", name: "Unexus AI" },
  };
  if (opts.image) ld.image = opts.image;
  return ld;
}

/** FAQPage schema.org JSON-LD from a list of Q&A pairs. */
export function faqJsonLd(faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => f.q && f.a)
      .map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
  };
}

/** Organization schema.org JSON-LD, from the global SEO section. */
export async function organizationJsonLd(): Promise<Record<string, unknown>> {
  const g = await getGlobalSeo();
  const sameAs = Array.isArray(g.socialLinks) ? g.socialLinks.filter(Boolean) : [];
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: g.organizationName || g.siteName || "Unexus AI",
    url: SITE_URL,
  };
  if (g.organizationLogo) jsonLd.logo = g.organizationLogo;
  if (sameAs.length) jsonLd.sameAs = sameAs;
  return jsonLd;
}
