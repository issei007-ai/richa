import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getSection } from "@/lib/cms";
import { SVC_DIGITAL_MARKETING_DEFAULTS } from "@/lib/cms-schema";
import { toServiceProps } from "@/lib/service-cms";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.digital-marketing",
    defaults: SVC_DIGITAL_MARKETING_DEFAULTS,
    path: "/services/digital-marketing",
    fallbackTitle: "Digital Marketing",
    fallbackDescription: "SEO, GEO, paid media, email, and conversion tracking — run as one connected system, measured on revenue. For businesses across the UAE and India.",
  });
}

export default async function DigitalMarketingPage() {
  const c = await getSection("services.digital-marketing", SVC_DIGITAL_MARKETING_DEFAULTS);
  return <ServicePageTemplate {...toServiceProps(c)} />;
}
