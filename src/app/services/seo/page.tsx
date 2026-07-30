import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_SEO_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.seo",
    defaults: SVC_SEO_DEFAULTS,
    path: "/services/seo",
    fallbackTitle: "SEO — Search Engine Optimisation",
    fallbackDescription: "Technical SEO, local SEO, content, and link building that grows rankings and revenue — not vanity traffic. SEO for businesses across the UAE and India.",
  });
}

export default async function SEOPage() {
  const c = await getSection("services.seo", SVC_SEO_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
