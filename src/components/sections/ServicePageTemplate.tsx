import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";
import FAQ from "@/components/ui/FAQ";
import { PROCESS_STEPS, WHY_US } from "@/lib/constants";
import { faqJsonLd, serviceJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

interface SubService {
  title: string;
  desc: string;
  points?: string[];
}
interface Outcome {
  value: string;
  label: string;
}
interface Step {
  title: string;
  desc: string;
}
interface Audience {
  title: string;
  desc: string;
}
interface Cta {
  label: string;
  href: string;
}

export interface ServiceTemplateProps {
  num: string;
  accent: string;
  badge: string;
  headline: string;
  body: string;
  specialisms: string[];
  primaryCta?: Cta;
  secondaryCta?: Cta;
  heroNote?: string;
  comparison?: {
    heading: string;
    intro: string;
    query: string;
    without: string;
    with: string;
    footnote: string;
  };
  outcomes?: Outcome[];
  audience?: Audience[];
  audienceTitle?: string;
  audienceIntro?: string;
  includedTitle?: string;
  includedIntro?: string;
  subServices: SubService[];
  approach?: Step[];
  approachTitle?: string;
  whyUs?: string[];
  whyTitle?: string;
  whyCards?: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  faqIntro?: string;
  closing?: string;
  /** For Service + Breadcrumb structured data. */
  serviceName?: string;
  servicePath?: string;
}

export default function ServicePageTemplate({
  accent,
  badge,
  headline,
  body,
  specialisms,
  primaryCta = { label: "Get a Custom Quote", href: "#contact" },
  secondaryCta = { label: "Book a Call →", href: "#contact" },
  heroNote,
  comparison,
  outcomes,
  audience,
  audienceTitle = "Who this is for",
  audienceIntro,
  includedTitle = "Here's what's actually in scope",
  includedIntro,
  subServices,
  approach = PROCESS_STEPS.map((s) => ({ title: s.title, desc: s.desc })),
  approachTitle = "How a project usually goes",
  whyUs = WHY_US.map((w) => w.title),
  whyTitle = "Why people choose us for this",
  whyCards,
  faqs,
  faqIntro,
  closing,
  serviceName,
  servicePath,
}: ServiceTemplateProps) {
  return (
    <>
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      )}
      {serviceName && servicePath && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                serviceJsonLd({ name: serviceName, description: body, url: `${SITE_URL}${servicePath}`, provider: "Unexus AI" }),
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                breadcrumbJsonLd([
                  { name: "Home", url: SITE_URL },
                  { name: "Services", url: `${SITE_URL}/services` },
                  { name: serviceName, url: `${SITE_URL}${servicePath}` },
                ]),
              ),
            }}
          />
        </>
      )}
      <Nav />
      <main>
        <PageHero eyebrow={badge} title={headline} subtitle={body} pills={specialisms} accent={accent}>
          <a href={primaryCta.href} className="btn btn-primary btn-lg">{primaryCta.label}</a>
          <a href={secondaryCta.href} className="btn btn-secondary btn-lg">{secondaryCta.label}</a>
        </PageHero>

        {/* Hero note */}
        {heroNote && (
          <section style={{ paddingTop: "1.5rem" }}>
            <div className="container max-w-3xl">
              <div className="rounded-xl px-5 py-4 text-center text-sm" style={{ background: `${accent}14`, border: `1px solid ${accent}40`, color: "var(--color-brand-100)" }}>
                {heroNote}
              </div>
            </div>
          </section>
        )}

        {/* Comparison (e.g. With/Without GEO) */}
        {comparison && (
          <section className="section">
            <div className="container">
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <span className="badge badge-dark mb-5 inline-flex">What is GEO</span>
                <h2 className="text-h2 mb-4">
                  <RevealText3D text={comparison.heading} splitBy="word" />
                </h2>
                <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>{comparison.intro}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#f87171" }}>Without GEO</span>
                  <p className="mt-3 mb-3 text-white" style={{ fontWeight: 600 }}>&ldquo;{comparison.query}&rdquo;</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{comparison.without}</p>
                </div>
                <div className="glow-card h-full p-7" style={{ border: `1px solid ${accent}55`, boxShadow: `0 0 0 1px ${accent}33` }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>With GEO</span>
                  <p className="mt-3 mb-3 text-white" style={{ fontWeight: 600 }}>&ldquo;{comparison.query}&rdquo;</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-200)" }}>{comparison.with}</p>
                </div>
              </div>
              <p className="text-center mt-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{comparison.footnote}</p>
            </div>
          </section>
        )}

        {/* Outcomes */}
        {outcomes && outcomes.length > 0 && (
          <section className="section-alt" style={{ paddingBlock: "3.5rem" }}>
            <div className="container">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {outcomes.map((o, i) => (
                  <ScrollReveal key={o.label} delay={i * 0.1}>
                    <div className="text-center sm:text-left px-2">
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "clamp(2rem,4vw,2.8rem)",
                          letterSpacing: "-0.04em",
                          lineHeight: 1,
                          color: accent,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {o.value}
                      </div>
                      <div className="text-sm" style={{ color: "var(--color-brand-300)" }}>{o.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Who this is for */}
        {audience && audience.length > 0 && (
          <section className="section relative overflow-hidden">
            <div className="absolute inset-0 bg-dots" style={{ opacity: 0.2 }} />
            <div className="container relative z-10">
              <div className="mb-12 max-w-2xl">
                <span className="badge badge-dark mb-5 inline-flex">Who this is for</span>
                <h2 className="text-h2 mb-4">
                  <RevealText3D text={audienceTitle} splitBy="word" />
                </h2>
                {audienceIntro && <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>{audienceIntro}</p>}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {audience.map((a, i) => (
                  <ScrollReveal key={a.title} delay={(i % 3) * 0.07}>
                    <div className="glow-card h-full p-6" style={{ border: "1px solid var(--color-border)" }}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                        <h3 className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>{a.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{a.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What's included */}
        <section className="section section-alt relative overflow-hidden">
          <div className="absolute inset-0 bg-grid" style={{ opacity: 0.18 }} />
          <div className="container relative z-10">
            <div className="mb-14 max-w-2xl">
              <span className="badge badge-accent mb-5 inline-flex">What&apos;s included</span>
              <h2 className="text-h2 mb-4">
                <RevealText3D text={includedTitle} splitBy="word" />
              </h2>
              {includedIntro && <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>{includedIntro}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {subServices.map((sub, i) => (
                <ScrollReveal key={sub.title} delay={i * 0.07}>
                  <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                    <div className="flex items-start gap-4">
                      <span
                        className="flex-shrink-0 mt-1"
                        style={{ width: 10, height: 10, borderRadius: "50%", background: accent, boxShadow: `0 0 12px ${accent}` }}
                      />
                      <div>
                        <h3 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>{sub.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{sub.desc}</p>
                        {sub.points && sub.points.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {sub.points.map((pt) => (
                              <li key={pt} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-brand-200)" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="badge badge-dark mb-5 inline-flex">How it works</span>
              <h2 className="text-h2">
                <RevealText3D text={approachTitle} splitBy="word" />
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {approach.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 0.1}>
                  <div className="h-full p-6 rounded-2xl" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        color: accent,
                        marginBottom: "0.9rem",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-bold mb-2 text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="section section-alt">
          {whyCards && whyCards.length > 0 ? (
            <div className="container">
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <span className="badge badge-accent mb-5 inline-flex">Why Unexus AI</span>
                <h2 className="text-h2">
                  <RevealText3D text={whyTitle} splitBy="word" />
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {whyCards.map((c, i) => (
                  <ScrollReveal key={c.title} delay={(i % 2) * 0.08}>
                    <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                      <div className="flex items-start gap-3 mb-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <h3 className="text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>{c.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{c.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ) : (
            <div className="container max-w-4xl">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 items-start">
                <div>
                  <span className="badge badge-accent mb-5 inline-flex">Why Unexus AI</span>
                  <h2 className="text-h2 mb-4">
                    <RevealText3D text={whyTitle} splitBy="word" />
                  </h2>
                  <p className="text-lead">We get up to speed quickly, we&apos;re straightforward about what&apos;s working and what isn&apos;t, and we care more about your results than our own report.</p>
                </div>
                <div className="space-y-4">
                  {whyUs.map((point, i) => (
                    <ScrollReveal key={point} delay={i * 0.08} direction="left">
                      <div className="flex items-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-white" style={{ fontWeight: 500 }}>{point}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <span className="badge badge-dark mb-5 inline-flex">FAQ</span>
              <h2 className="text-h2 mb-3">
                <RevealText3D text="Common questions" splitBy="word" />
              </h2>
              {faqIntro && <p className="text-lead" style={{ color: "var(--color-brand-300)" }}>{faqIntro}</p>}
            </div>
            <FAQ items={faqs} />
          </div>
        </section>

        {/* Closing — what changes */}
        {closing && (
          <section style={{ paddingBottom: "1rem" }}>
            <div className="container max-w-3xl">
              <div className="rounded-2xl p-6 md:p-7 text-center" style={{ background: `${accent}14`, border: `1px solid ${accent}40` }}>
                <span style={{ color: accent, fontWeight: 700 }}>What changes — </span>
                <span className="text-white">{closing}</span>
              </div>
            </div>
          </section>
        )}

        <ContactCTA
          heading="Ready to get started?"
          body="Tell us roughly what you need and we'll put together a proposal within 48 hours — no long back-and-forth before that."
          imageSeed="unexus-office"
        />
      </main>
      <Footer />
    </>
  );
}
