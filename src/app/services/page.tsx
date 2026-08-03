import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getSection } from "@/lib/cms";
import { SERVICES_OVERVIEW_DEFAULTS, SERVICES_CARDS_DEFAULTS } from "@/lib/cms-schema";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "services.overview",
    defaults: SERVICES_OVERVIEW_DEFAULTS,
    path: "/services",
    fallbackTitle: "Services",
    fallbackDescription: "Digital marketing, SEO, GEO, website development, AI automation, AI training, and market research — seven services run by one connected team.",
  });
}

export default async function ServicesPage() {
  const c = await getSection("services.overview", SERVICES_OVERVIEW_DEFAULTS);
  const whyCards = Array.isArray(c.whyCards) ? c.whyCards : [];
  const serviceCards = (await getSection("services.cards", SERVICES_CARDS_DEFAULTS)).items as { title: string; desc: string }[];

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={c.heroEyebrow}
          title={c.heroTitle}
          subtitle={c.heroSubtitle}
        >
          <a href={c.heroPrimaryHref} className="btn btn-primary btn-lg">{c.heroPrimaryLabel}</a>
          <a href={c.heroSecondaryHref} className="btn btn-secondary btn-lg">{c.heroSecondaryLabel}</a>
        </PageHero>

        <ServicesGrid heading={c.gridHeading} intro={c.gridIntro} cards={serviceCards} />

        {/* Why Unexus AI */}
        <section className="section section-alt">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-5 inline-flex">{c.whyBadge}</span>
              <h2 className="text-h2">{c.whyTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyCards.map((item: { title: string; desc: string }, i: number) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <div className="glow-card h-full p-6" style={{ border: "1px solid var(--color-border)" }}>
                    <h3 className="font-bold mb-2 text-white" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA
          heading="Not sure where to start?"
          body="Tell us a bit about your business and we'll help you work out where to start — it's often not the thing people expect."
          imageSeed="unexus-team"
        />
      </main>
      <Footer />
    </>
  );
}
