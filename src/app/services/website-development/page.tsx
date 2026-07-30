import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_WEBSITE_DEVELOPMENT_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.website-development",
    defaults: SVC_WEBSITE_DEVELOPMENT_DEFAULTS,
    path: "/services/website-development",
    fallbackTitle: "Website Development",
    fallbackDescription: "Fast, conversion-focused websites built in Next.js — designed to turn the traffic you already have into customers. For businesses across the UAE and India.",
  });
}

export default async function WebsiteDevelopmentPage() {
  const c = await getSection("services.website-development", SVC_WEBSITE_DEVELOPMENT_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} serviceName="Website Development" servicePath="/services/website-development" />;
}
