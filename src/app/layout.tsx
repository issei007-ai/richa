import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import Analytics from "@/components/ui/Analytics";
import TagManager from "@/components/ui/TagManager";
import Attribution from "@/components/ui/Attribution";
import CookieConsent from "@/components/ui/CookieConsent";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWidgets from "@/components/ui/FloatingWidgets";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [orgLd, siteLd] = await Promise.all([organizationJsonLd(), websiteJsonLd()]);
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {/* Organization + WebSite structured data for rich results and AI
            engines — driven by the SEO section in /admin/content. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
        <ScrollProgress />
        {children}
        <FloatingWidgets />
        <CookieConsent />
        <Attribution />
      </body>
      <Analytics />
      <TagManager />
    </html>
  );
}
