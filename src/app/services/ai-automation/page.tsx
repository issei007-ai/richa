import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_AI_AUTOMATION_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.ai-automation",
    defaults: SVC_AI_AUTOMATION_DEFAULTS,
    path: "/services/ai-automation",
    fallbackTitle: "AI Automation",
    fallbackDescription: "AI agents, WhatsApp automation, RAG pipelines, and voice systems built around your actual bottlenecks. For businesses across the UAE and Middle East.",
  });
}

export default async function AIAutomationPage() {
  const c = await getSection("services.ai-automation", SVC_AI_AUTOMATION_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
