import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ContactCTA from "@/components/sections/ContactCTA";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ClientLogo from "@/components/ui/ClientLogo";
import { CLIENTS } from "@/lib/constants";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Portfolio",
    description: "Some of the brands and institutions we've worked with — from schools and D2C brands to enterprise tech.",
    path: "/portfolio",
  });
}

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Portfolio"
          title="The teams we get to work with"
          subtitle="From schools and D2C brands to enterprise tech, here are some of the people who've trusted us with their growth."
        />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container" style={{ maxWidth: "64rem" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CLIENTS.map((c, i) => (
                <ScrollReveal key={c.name} delay={(i % 4) * 0.06}>
                  <div
                    className="glow-card h-full p-6 flex flex-col items-center text-center gap-4"
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    <ClientLogo client={c} index={i} size={80} />
                    <div className="text-sm font-semibold text-white leading-snug">{c.name}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsGrid />

        <ContactCTA
          heading="Want to join them?"
          body="Tell us where things feel stuck right now, and we'll talk through specifically what we'd do about it — no pressure either way."
          imageSeed="unexus-clients"
        />
      </main>
      <Footer />
    </>
  );
}
