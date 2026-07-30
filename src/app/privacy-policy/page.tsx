import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Privacy Policy",
    description: "How Unexus AI collects, uses, and protects your personal data.",
    path: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated 9 June 2026" />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container max-w-3xl prose-dark">
            <p>This Privacy Policy explains how Unexus AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects information about you when you visit our website or engage our services.</p>

            <h2>Information we collect</h2>
            <p>We collect information you provide directly to us — such as your name, email address, company, and the details you share in enquiry forms — as well as limited technical data collected automatically, including:</p>
            <ul>
              <li>Device and browser type</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring source and approximate location (from your IP address)</li>
            </ul>

            <h2>How we use your information</h2>
            <p>We use the information we collect to respond to your enquiries, deliver and improve our services, send you material you have requested, and meet our legal obligations. We do not sell your personal data to third parties.</p>

            <h2>Legal basis for processing</h2>
            <p>Where the UK GDPR applies, we process personal data on the basis of your consent, our legitimate interests in operating and improving our business, and to perform a contract with you.</p>

            <h2>Data retention</h2>
            <p>We keep personal data only for as long as necessary for the purposes set out in this policy, after which it is deleted or anonymised.</p>

            <h2>Your rights</h2>
            <p>Subject to applicable law, you have the right to access, correct, or delete your personal data, to object to or restrict its processing, and to data portability. To exercise any of these rights, contact us using the details below.</p>

            <h2>Cookies</h2>
            <p>We use cookies and similar technologies as described in our <a href="/cookie-policy">Cookie Policy</a>.</p>

            <h2>Contact</h2>
            <p>For any privacy-related questions or requests, email <strong>privacy@unexus.ai</strong>.</p>

            <p style={{ color: "var(--color-brand-500)", fontSize: "0.85rem" }}>This document is a template and should be reviewed by qualified legal counsel before launch.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
