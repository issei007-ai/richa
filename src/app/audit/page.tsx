import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import PhoneField from "@/components/ui/PhoneField";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Free Growth Audit",
    description: "Get a free, no-obligation audit of your website, SEO, ads, and conversion funnel.",
    path: "/audit",
  });
}

const CHALLENGES = [
  "Not enough traffic",
  "Low conversion rate",
  "High ad spend / low ROI",
  "Poor search rankings",
  "Not sure — that's why I'm here",
];

export default function AuditPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="✓ Free — no obligation"
          title="Get your free growth audit"
          subtitle="We'll go through your website, SEO, ad performance, and conversion funnel, then tell you straight what we think is worth fixing first."
          pills={["Technical SEO analysis", "Conversion review", "Competitor benchmarking", "Opportunity report"]}
        />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container" style={{ maxWidth: "34rem" }}>
            <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
              <h2 className="text-h3 mb-6" style={{ fontFamily: "var(--font-display)" }}>Request your free audit</h2>
              <LeadForm source="audit" submitLabel="Request my free audit" note="We review every submission personally. You'll hear from us within 48 hours.">
                <div>
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <PhoneField />
                <div>
                  <label className="form-label">Website URL</label>
                  <input className="form-input" name="website" type="url" placeholder="https://yoursite.com" />
                </div>
                <div>
                  <label className="form-label">What&apos;s your biggest challenge?</label>
                  <select className="form-select" name="challenge">
                    {CHALLENGES.map((opt) => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
              </LeadForm>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
