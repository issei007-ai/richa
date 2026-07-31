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
  // Falls back to the code-generated default (app/opengraph-image.tsx) so every
  // page has a share image, even before the CMS default is set. A per-page or
  // CMS image takes precedence.
  const image = page.image || g.ogImage || `${SITE_URL}/opengraph-image`;
  const imageAlt = page.imageAlt || g.ogImageAlt || siteName;
  // Only attach images when the page has its own; otherwise omit the key so
  // Next's file-convention default (app/opengraph-image.tsx) fills it in.
  // Passing `images: undefined` explicitly would suppress that default.
  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: "website",
    siteName,
    title,
    description,
    url,
    locale: "en_US",
  };
  const twitter: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image", // a branded default OG image always exists
    title,
    description,
  };
  if (image) {
    openGraph.images = [{ url: image, alt: imageAlt }];
    twitter.images = [image];
  }
  if (g.twitterHandle) twitter.site = g.twitterHandle;

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    manifest: "/site.webmanifest",
    openGraph,
    twitter,
  };
  // Only set a canonical when the page identifies its own path. Setting it in
  // the root layout (no path) makes every page that doesn't override it inherit
  // the homepage URL as its canonical — which de-indexes those pages. Pages
  // without a path self-canonicalize (Google defaults to the page's own URL).
  if (page.path) metadata.alternates = { canonical: url };
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
  authorName?: string;
}): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    author: { "@type": "Person", name: opts.authorName || "Unexus AI" },
    publisher: { "@type": "Organization", name: "Unexus AI" },
  };
  if (opts.image) ld.image = opts.image;
  return ld;
}

/** Service schema.org JSON-LD for a service page. */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  provider: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@type": "Organization", name: opts.provider },
  };
}

/** BreadcrumbList schema.org JSON-LD from an ordered list of {name, url}. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
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

/**
 * Organization schema.org JSON-LD, from the global SEO section. Typed as
 * ProfessionalService (a LocalBusiness subtype) so AI/search engines get the
 * full entity: what we do, where, who founded it, and how to reach us.
 */
export async function organizationJsonLd(): Promise<Record<string, unknown>> {
  const g = await getGlobalSeo();
  const sameAs = Array.isArray(g.socialLinks) ? g.socialLinks.filter(Boolean) : [];
  const areaServed = Array.isArray(g.areaServed) ? g.areaServed.filter(Boolean) : [];
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: g.organizationName || g.siteName || "Unexus AI",
    url: SITE_URL,
  };
  if (g.organizationDescription) ld.description = g.organizationDescription;
  if (g.organizationLogo) {
    ld.logo = g.organizationLogo;
    ld.image = g.organizationLogo;
  }
  if (g.organizationEmail) ld.email = g.organizationEmail;
  if (g.organizationPhone) ld.telephone = g.organizationPhone;
  if (g.organizationCity || g.organizationCountry) {
    ld.address = {
      "@type": "PostalAddress",
      ...(g.organizationCity ? { addressLocality: g.organizationCity } : {}),
      ...(g.organizationCountry ? { addressCountry: g.organizationCountry } : {}),
    };
  }
  if (areaServed.length) ld.areaServed = areaServed;
  if (g.founderName) ld.founder = { "@type": "Person", name: g.founderName };
  if (sameAs.length) ld.sameAs = sameAs;
  return ld;
}

/** WebSite schema.org JSON-LD — helps engines model the site as an entity. */
export async function websiteJsonLd(): Promise<Record<string, unknown>> {
  const g = await getGlobalSeo();
  const name = g.siteName || "Unexus AI";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: SITE_URL,
    publisher: { "@type": "Organization", name: g.organizationName || name },
  };
}
