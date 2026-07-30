import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Cookie Policy",
    description: "How and why Unexus AI uses cookies and similar technologies.",
    path: "/cookie-policy",
  });
}

export default function CookiePolicyPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero eyebrow="Legal" title="Cookie Policy" subtitle="Last updated 9 June 2026" />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container max-w-3xl prose-dark">
            <p>This Cookie Policy explains what cookies are, how we use them, and how you can control them.</p>

            <h2>What are cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help the site function, remember your preferences, and understand how it is used.</p>

            <h2>How we use cookies</h2>
            <ul>
              <li><strong>Essential cookies</strong> — required for the website to work; these cannot be switched off.</li>
              <li><strong>Analytics cookies</strong> — help us understand how visitors use the site so we can improve it.</li>
              <li><strong>Preference cookies</strong> — remember choices you make to give you a better experience.</li>
            </ul>

            <h2>Third-party cookies</h2>
            <p>Some cookies may be set by third-party services we use, such as analytics or scheduling tools. These providers have their own privacy and cookie policies.</p>

            <h2>Managing cookies</h2>
            <p>You can control and delete cookies through your browser settings. Blocking some cookies may affect how the website functions. For more detail, see your browser&apos;s help pages.</p>

            <h2>More information</h2>
            <p>For how we handle personal data more broadly, see our <a href="/privacy-policy">Privacy Policy</a>. Questions? Email <strong>privacy@unexus.ai</strong>.</p>

            <p style={{ color: "var(--color-brand-500)", fontSize: "0.85rem" }}>This document is a template and should be reviewed by qualified legal counsel before launch.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
