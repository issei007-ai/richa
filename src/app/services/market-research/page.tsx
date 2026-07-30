import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_MARKET_RESEARCH_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.market-research",
    defaults: SVC_MARKET_RESEARCH_DEFAULTS,
    path: "/services/market-research",
    fallbackTitle: "Market Research",
    fallbackDescription: "Audience research, competitor analysis, positioning, and market-entry research for the UAE and India — built to feed straight into your marketing.",
  });
}

export default async function MarketResearchPage() {
  const c = await getSection("services.market-research", SVC_MARKET_RESEARCH_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} serviceName="Market Research" servicePath="/services/market-research" />;
}
