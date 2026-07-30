import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Thank you",
    description: "We've received your request and will be in touch within one business day.",
    path: "/thank-you",
    noindex: true,
  });
}

const NEXT_STEPS = [
  { step: "01", title: "We review your submission", desc: "Every request is read by a real person, not a bot." },
  { step: "02", title: "We do our homework", desc: "Before we speak, we look at your current position so the conversation is useful from minute one." },
  { step: "03", title: "We reach out within 24 hours", desc: "Usually sooner. Occasionally a bit longer on Fridays." },
];

const WHILE_YOU_WAIT = [
  { label: "Read a case study", href: "/case-studies", desc: "See how we've helped businesses like yours." },
  { label: "Browse our resources", href: "/resources", desc: "Free tools, templates, and guides." },
  { label: "Read the blog", href: "/blog", desc: "Playbooks and field notes from the team." },
];

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          align="center"
          eyebrow="✓ Request received"
          title="You're in."
          titleSplit="char"
          subtitle="We've received your request and someone from our team will reach out within one business day."
        >
          <a href="/book" className="btn btn-primary btn-lg">Book a call now →</a>
          <a href="/" className="btn btn-secondary btn-lg">Back to home</a>
        </PageHero>

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container max-w-2xl">
            <h2 className="text-h3 text-center mb-10" style={{ fontFamily: "var(--font-display)" }}>What happens next</h2>
            <div className="space-y-4">
              {NEXT_STEPS.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 0.1}>
                  <div className="card p-6 flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white"
                      style={{ background: "linear-gradient(135deg, var(--color-accent-500), var(--color-glow))" }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-white">{item.title}</div>
                      <p className="text-sm" style={{ color: "var(--color-brand-400)" }}>{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container max-w-3xl">
            <h2 className="text-h3 text-center mb-10" style={{ fontFamily: "var(--font-display)" }}>While you wait</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {WHILE_YOU_WAIT.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.08}>
                  <a href={item.href} className="glow-card h-full p-6 block group" style={{ border: "1px solid var(--color-border)" }}>
                    <div className="font-semibold mb-1 text-white group-hover:text-[var(--color-accent-300)] transition-colors">{item.label} →</div>
                    <p className="text-sm" style={{ color: "var(--color-brand-400)" }}>{item.desc}</p>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
