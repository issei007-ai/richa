import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Terms of Service",
    description: "The terms that govern your use of the Unexus AI website and services.",
    path: "/terms-of-service",
  });
}

export default function TermsOfServicePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero eyebrow="Legal" title="Terms of Service" subtitle="Last updated 9 June 2026" />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container max-w-3xl prose-dark">
            <p>These Terms of Service govern your access to and use of the Unexus AI website and any services we provide. By using our site, you agree to these terms.</p>

            <h2>Use of the website</h2>
            <p>You may use this website for lawful purposes only. You agree not to misuse the site, attempt to gain unauthorised access, or interfere with its normal operation.</p>

            <h2>Services and proposals</h2>
            <p>Any quotes, proposals, or estimates we provide are subject to a separate written agreement. The specific scope, deliverables, fees, and timelines for a project are defined in that agreement, which takes precedence over any general statements on this website.</p>

            <h2>Intellectual property</h2>
            <p>All content on this website — including text, design, graphics, and logos — is owned by or licensed to Unexus AI and is protected by applicable intellectual property laws. You may not reproduce it without our permission.</p>

            <h2>Client responsibilities</h2>
            <ul>
              <li>Providing accurate information and timely feedback</li>
              <li>Securing any rights to materials you supply to us</li>
              <li>Meeting agreed payment terms</li>
            </ul>

            <h2>Limitation of liability</h2>
            <p>To the fullest extent permitted by law, Unexus AI is not liable for any indirect, incidental, or consequential losses arising from your use of the website. Nothing in these terms excludes liability that cannot be excluded by law.</p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any disputes.</p>

            <h2>Contact</h2>
            <p>Questions about these terms? Email <strong>hello@unexus.ai</strong>.</p>

            <p style={{ color: "var(--color-brand-500)", fontSize: "0.85rem" }}>This document is a template and should be reviewed by qualified legal counsel before launch.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
