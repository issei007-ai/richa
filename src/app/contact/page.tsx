import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import LeadForm from "@/components/ui/LeadForm";
import PhoneField from "@/components/ui/PhoneField";
import BookingScheduler from "@/components/ui/BookingScheduler";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getSection } from "@/lib/cms";
import { CONTACT_HERO_DEFAULTS, CONTACT_INFO_DEFAULTS, CONTACT_BOOK_DEFAULTS, CONTACT_MESSAGE_DEFAULTS } from "@/lib/cms-schema";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Contact",
    description: "Talk to us before you decide anything. Book a free 30-minute call or send a message — you'll hear back from a real person within one business day.",
    path: "/contact",
  });
}

const NEEDS = ["Digital Marketing", "Website Development", "AI Automation", "AI Training", "Market Research", "GEO", "Not sure yet"];

const sw = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// Icons + accent colours, fixed by card position.
const ICON_META = [
  {
    color: "#25D366",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    color: "#818cf8",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...sw}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    color: "#34d399",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...sw}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    color: "#f59e0b",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...sw}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

export default async function ContactPage() {
  const [hero, info, book, message] = await Promise.all([
    getSection("contact.hero", CONTACT_HERO_DEFAULTS),
    getSection("contact.info", CONTACT_INFO_DEFAULTS),
    getSection("contact.book", CONTACT_BOOK_DEFAULTS),
    getSection("contact.message", CONTACT_MESSAGE_DEFAULTS),
  ]);

  return (
    <>
      <Nav />
      <main>
        <PageHero align="center" eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />

        {/* Contact info */}
        <section style={{ paddingTop: "0.5rem" }}>
          <div className="container" style={{ maxWidth: "62rem" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {info.items.map((item, i) => {
                const meta = ICON_META[i % ICON_META.length];
                const inner = (
                  <div className="glow-card h-full p-6" style={{ border: "1px solid var(--color-border)" }}>
                    <div
                      style={{
                        width: 42, height: 42, borderRadius: "var(--radius-md)", marginBottom: "1rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${meta.color}1f`, border: `1px solid ${meta.color}40`, color: meta.color,
                      }}
                    >
                      {meta.icon}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-brand-500)" }}>{item.label}</div>
                    <div className="font-semibold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>{item.value}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>{item.sub}</p>
                  </div>
                );
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block h-full">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "2.5rem" }}>
          <div className="container grid md:grid-cols-2 gap-6" style={{ maxWidth: "62rem" }}>
            {/* Book a call */}
            <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-brand-500)" }}>{book.eyebrow}</div>
              <h2 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>{book.title}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-brand-300)" }}>{book.body}</p>
              <div className="mb-4">
                <BookingScheduler source="contact-book" />
              </div>
              <p className="text-xs" style={{ color: "var(--color-brand-500)" }}>{book.note}</p>
            </div>

            {/* Message form */}
            <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-brand-500)" }}>{message.eyebrow}</div>
              <h2 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)" }}>{message.title}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-brand-300)" }}>{message.body}</p>
              <LeadForm source="contact" submitLabel="Send message" note="We respond within one business day. No newsletters, no spam.">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Name</label>
                    <input className="form-input" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="form-label">Company</label>
                    <input className="form-input" name="company" type="text" placeholder="Your company" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-input" name="email" type="email" placeholder="you@company.com" required />
                </div>
                <PhoneField />
                <div>
                  <label className="form-label" htmlFor="contact-need">What do you need help with?</label>
                  <select className="form-select" name="need" id="contact-need" defaultValue="" required>
                    <option value="" disabled>Select a service</option>
                    {NEEDS.map((opt) => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Tell us more</label>
                  <textarea className="form-textarea" name="message" placeholder="What's the problem you're trying to solve?" />
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
