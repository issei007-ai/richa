import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_SEM_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.sem",
    defaults: SVC_SEM_DEFAULTS,
    path: "/services/sem",
    fallbackTitle: "Search Engine Marketing (SEM)",
    fallbackDescription: "Google Ads and paid search management built around a profitable, trackable cost per lead — for businesses across the UAE and beyond.",
  });
}

export default async function SEMPage() {
  const c = await getSection("services.sem", SVC_SEM_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} serviceName="SEM — Search Engine Marketing" servicePath="/services/sem" />;
}
