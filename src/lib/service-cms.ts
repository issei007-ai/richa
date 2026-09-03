import type { ServiceTemplateProps } from "@/components/sections/ServicePageTemplate";

type Dict = Record<string, unknown>;

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

/** Map a flat CMS section payload to ServicePageTemplate props. */
export function toServiceProps(c: Dict): ServiceTemplateProps {
  const comparisonHeading = str(c.comparisonHeading);
  const comparison = comparisonHeading
    ? {
        heading: comparisonHeading,
        intro: str(c.comparisonIntro),
        query: str(c.comparisonQuery),
        without: str(c.comparisonWithout),
        with: str(c.comparisonWith),
        footnote: str(c.comparisonFootnote),
      }
    : undefined;

  const whyCards = arr<{ title: string; desc: string }>(c.whyCards);
  const primaryLabel = str(c.primaryCtaLabel);
  const secondaryLabel = str(c.secondaryCtaLabel);

  return {
    num: str(c.num),
    accent: str(c.accent) || "#6366f1",
    badge: str(c.badge),
    headline: str(c.headline),
    body: str(c.body),
    specialisms: arr<string>(c.specialisms),
    primaryCta: primaryLabel ? { label: primaryLabel, href: str(c.primaryCtaHref) || "#contact" } : undefined,
    secondaryCta: secondaryLabel ? { label: secondaryLabel, href: str(c.secondaryCtaHref) || "#contact" } : undefined,
    heroNote: str(c.heroNote) || undefined,
    comparison,
    outcomes: arr<{ value: string; label: string }>(c.outcomes),
    audienceTitle: str(c.audienceTitle) || undefined,
    audienceIntro: str(c.audienceIntro) || undefined,
    audience: arr<{ title: string; desc: string }>(c.audience),
    includedTitle: str(c.includedTitle) || undefined,
    includedIntro: str(c.includedIntro) || undefined,
    subServices: arr<{ title: string; desc: string; points?: string[] }>(c.subServices),
    approachTitle: str(c.approachTitle) || undefined,
    approachIntro: str(c.approachIntro) || undefined,
    approach: arr<{ title: string; desc: string }>(c.approach).length ? arr<{ title: string; desc: string }>(c.approach) : undefined,
    benefits: arr<string>(c.benefits).length ? arr<string>(c.benefits) : undefined,
    benefitsTitle: str(c.benefitsTitle) || undefined,
    benefitsIntro: str(c.benefitsIntro) || undefined,
    useCases: arr<string>(c.useCases).length ? arr<string>(c.useCases) : undefined,
    useCasesTitle: str(c.useCasesTitle) || undefined,
    useCasesIntro: str(c.useCasesIntro) || undefined,
    whyTitle: str(c.whyTitle) || undefined,
    whyIntro: str(c.whyIntro) || undefined,
    whyUs: arr<string>(c.whyUs).length ? arr<string>(c.whyUs) : undefined,
    whyCards: whyCards.length ? whyCards : undefined,
    faqIntro: str(c.faqIntro) || undefined,
    faqs: arr<{ q: string; a: string }>(c.faqs),
    closing: str(c.closing) || undefined,
  };
}
