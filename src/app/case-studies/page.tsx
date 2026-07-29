import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import { getSection } from "@/lib/cms";
import { CASESTUDIES_PAGE_DEFAULTS, CASESTUDIES_CASES_DEFAULTS } from "@/lib/cms-schema";

export const metadata = {
  title: "Case Studies — Unexus AI",
  description: "Real problems, real work, real results — across retail, hospitality, real estate, healthcare, and startups in the UAE and India.",
};

export default async function CaseStudiesPage() {
  const page = await getSection("casestudies.page", CASESTUDIES_PAGE_DEFAULTS);
  const raw = await getSection("casestudies.cases", CASESTUDIES_CASES_DEFAULTS);

  // Normalise metrics from "value | label" lines into { value, label }.
  const cases = raw.items.map((c) => ({
    category: c.category,
    flag: c.flag,
    headline: c.headline,
    quote: c.quote,
    tags: c.tags as string[],
    metrics: (c.metrics as string[]).map((m) => {
      const [value, ...rest] = m.split("|");
      return { value: (value || "").trim(), label: rest.join("|").trim() };
    }),
  }));

  return (
    <>
      <Nav />
      <main>
        <PageHero eyebrow={page.heroEyebrow} title={page.heroTitle} subtitle={page.heroSubtitle}>
          <a href="#contact" className="btn btn-primary btn-lg">Start your story</a>
        </PageHero>

        <CaseStudiesGrid cases={cases} />

        <ContactCTA heading={page.ctaHeading} body={page.ctaBody} imageSeed="unexus-results" />
      </main>
      <Footer />
    </>
  );
}
