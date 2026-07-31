import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadForm from "@/components/ui/LeadForm";
import PhoneField from "@/components/ui/PhoneField";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Get a Quote",
    description: "Tell us what you need and we'll send a clear scope, timeline, and price within 48 hours.",
    path: "/quote",
  });
}

const SERVICES = ["Digital Marketing", "Website Development", "AI Automation", "AI Training", "Market Research", "Multiple / not sure"];
const BUDGETS = ["Under £2k / mo", "£2k–£5k / mo", "£5k–£10k / mo", "£10k+ / mo", "One-off project"];
const TIMELINES = ["As soon as possible", "Within a month", "This quarter", "Just exploring"];

const STEPS = [
  { step: "01", title: "Send us the brief", desc: "The form below covers most of it — we'll follow up if there's anything else we need." },
  { step: "02", title: "We scope it properly", desc: "Deliverables, timeline, fixed price — written clearly enough that you won't need a call just to understand it." },
  { step: "03", title: "You'll have it in 48 hours", desc: "Then it's over to you. No countdown, no 'this offer expires Friday'." },
];

export default function QuotePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Get a Quote"
          title="Get a custom proposal in 48 hours"
          subtitle="Tell us what you need and we'll come back with a clear scope, timeline, and price. We keep the sales process short, because honestly, nobody enjoys a long one."
        />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start" style={{ maxWidth: "64rem" }}>
            {/* Form */}
            <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
              <LeadForm source="quote" submitLabel="Request my proposal" note="We'll reply within 48 hours with a clear, fixed-scope proposal.">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="quote-name">Name</label>
                    <input className="form-input" id="quote-name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="quote-email">Email</label>
                    <input className="form-input" id="quote-email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <PhoneField />
                <div>
                  <label className="form-label" htmlFor="quote-company">Company</label>
                  <input className="form-input" id="quote-company" name="company" type="text" placeholder="Your company" />
                </div>
                <div>
                  <label className="form-label" htmlFor="quote-service">What do you need?</label>
                  <select className="form-select" id="quote-service" name="service">
                    {SERVICES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="quote-budget">Budget</label>
                    <select className="form-select" id="quote-budget" name="budget">
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="quote-timeline">Timeline</label>
                    <select className="form-select" id="quote-timeline" name="timeline">
                      {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="quote-message">Tell us about the project</label>
                  <textarea className="form-textarea" id="quote-message" name="message" placeholder="What are you trying to achieve, and where are you stuck?" />
                </div>
              </LeadForm>
            </div>

            {/* What happens next */}
            <ScrollReveal direction="left">
              <div className="p-2">
                <h2 className="text-h3 mb-6" style={{ fontFamily: "var(--font-display)" }}>What happens next</h2>
                <div className="space-y-5">
                  {STEPS.map((s) => (
                    <div key={s.step} className="flex gap-4 items-start">
                      <div className="text-sm font-bold flex-shrink-0" style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent-400)" }}>{s.step}</div>
                      <div>
                        <div className="font-semibold text-white mb-1">{s.title}</div>
                        <p className="text-sm" style={{ color: "var(--color-brand-400)" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider my-7" />
                <p className="text-sm" style={{ color: "var(--color-brand-300)" }}>
                  Prefer to talk it through first? <a href="/book" style={{ color: "var(--color-accent-300)", textDecoration: "underline" }}>Book a free call →</a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
