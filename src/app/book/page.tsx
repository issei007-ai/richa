import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BookingScheduler from "@/components/ui/BookingScheduler";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Book a Call",
    description: "Book a free 30-minute strategy call. No pitch, no pressure.",
    path: "/book",
  });
}

const EXPECT = [
  "We look at where things actually stand — not what you think the problem is, but what the data says",
  "We tell you the two or three things we'd tackle first — and why",
  "You get a rough idea of timeline, approach, and cost",
  "You leave with something useful, whether you work with us or not",
];

export default function BookPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          align="center"
          eyebrow="Book a free call"
          title="Book a free 30-minute call"
          subtitle="No pitch deck. No pressure. Just an honest look at where your marketing stands — and what we'd do about it."
        />

        <section className="section" style={{ paddingTop: "1rem" }}>
         <div
  className="container grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
  style={{
    maxWidth: "62rem",
    overflowX: "hidden",
  }}
>
            {/* What to expect */}
            <ScrollReveal direction="right">
              <div className="p-2">
                <h2 className="text-h3 mb-6" style={{ fontFamily: "var(--font-display)" }}>What you&apos;ll walk away with</h2>
                <ul className="space-y-4">
                  {EXPECT.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-white" style={{ fontWeight: 500 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="divider my-8" />
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--color-accent-500), var(--color-glow))" }}>R</div>
                  <div>
                    <div className="text-sm font-semibold text-white">Richa Gupta</div>
                    <div className="text-xs" style={{ color: "var(--color-brand-400)" }}>Founder, Unexus AI</div>
                  </div>
                </div>
                <div className="mt-6 rounded-xl px-4 py-3 flex items-start gap-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-400)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                  </svg>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-brand-400)" }}>
                    Times shown in Gulf Standard Time (GST, UTC+4). If you&apos;re joining from India or elsewhere, we&apos;ll confirm your timezone when you book.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Scheduler */}
            <ScrollReveal>
              <div
  className="glow-card p-4 md:p-7 w-full"
  style={{
    border: "1px solid var(--color-border)",
    maxWidth: "100%",
    overflow: "hidden",
  }}
>
                <BookingScheduler />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
