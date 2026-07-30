import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText3D from "@/components/ui/RevealText3D";
import { getSection } from "@/lib/cms";
import {
  ABOUT_HERO_DEFAULTS,
  ABOUT_STATS_DEFAULTS,
  ABOUT_STORY_DEFAULTS,
  ABOUT_TIMELINE_DEFAULTS,
  ABOUT_VALUES_DEFAULTS,
  ABOUT_FOUNDER_DEFAULTS,
  ABOUT_TEAM_DEFAULTS,
  ABOUT_PARTNERS_DEFAULTS,
} from "@/lib/cms-schema";
import type { Metadata } from "next";
import { sectionMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return sectionMetadata({
    key: "about.hero",
    defaults: ABOUT_HERO_DEFAULTS,
    path: "/about",
    fallbackTitle: "About",
    fallbackDescription: "Ten years of digital marketing, relaunched for the AI era. The story of Unexus AI, an SE Digicon company, founded by Richa Gupta.",
  });
}

export default async function AboutPage() {
  const [hero, stats, story, timeline, values, founder, team, partners] = await Promise.all([
    getSection("about.hero", ABOUT_HERO_DEFAULTS),
    getSection("about.stats", ABOUT_STATS_DEFAULTS),
    getSection("about.story", ABOUT_STORY_DEFAULTS),
    getSection("about.timeline", ABOUT_TIMELINE_DEFAULTS),
    getSection("about.values", ABOUT_VALUES_DEFAULTS),
    getSection("about.founder", ABOUT_FOUNDER_DEFAULTS),
    getSection("about.team", ABOUT_TEAM_DEFAULTS),
    getSection("about.partners", ABOUT_PARTNERS_DEFAULTS),
  ]);

  return (
    <>
      <Nav />
      <main>
        <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />

        {/* SE Digicon note */}
        <section style={{ paddingTop: "0.5rem" }}>
          <div className="container text-center">
            <span className="badge badge-dark inline-flex">{hero.note}</span>
          </div>
        </section>

        {/* Stats */}
        <section className="section-alt" style={{ paddingBlock: "3rem", marginTop: "2.5rem" }}>
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.items.map((s, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="text-center">
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4vw,2.8rem)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, marginBottom: "0.5rem" }}>
                      {s.value}
                    </div>
                    <div className="text-sm" style={{ color: "var(--color-brand-400)" }}>{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section">
          <div className="container max-w-3xl">
            <span className="badge badge-accent mb-5 inline-flex">{story.badge}</span>
            <h2 className="text-h2 mb-6">
              <RevealText3D text={story.title} splitBy="word" />
            </h2>
            <div className="space-y-5 text-lead" style={{ color: "var(--color-brand-300)" }}>
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {story.highlight && <p className="text-white" style={{ fontWeight: 500 }}>{story.highlight}</p>}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section section-alt">
          <div className="container max-w-3xl">
            <div className="mb-12">
              <span className="badge badge-dark mb-5 inline-flex">{timeline.badge}</span>
              <h2 className="text-h2"><RevealText3D text={timeline.title} splitBy="word" /></h2>
            </div>
            <div>
              {timeline.items.map((t, i) => (
                <ScrollReveal key={i} delay={i * 0.08} direction="left">
                  <div className="flex gap-5 sm:gap-6" style={{ paddingBottom: i === timeline.items.length - 1 ? 0 : "2.25rem" }}>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span style={{ width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg,var(--color-accent-500),var(--color-glow))", marginTop: 5 }} />
                      {i < timeline.items.length - 1 && <span style={{ width: 2, flex: 1, background: "var(--color-border-bright)", marginTop: 6 }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-accent-300)", marginBottom: "0.35rem" }}>{t.year}</div>
                      <h3 className="font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{t.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{t.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-14">
              <span className="badge badge-accent mb-5 inline-flex">{values.badge}</span>
              <h2 className="text-h2"><RevealText3D text={values.title} splitBy="word" /></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {values.items.map((v, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="glow-card h-full p-7" style={{ border: "1px solid var(--color-border)" }}>
                    <h3 className="text-h3 mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="section section-alt">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <span className="badge badge-accent mb-5 inline-flex">{founder.badge}</span>
              <h2 className="text-h2"><RevealText3D text={founder.title} splitBy="word" /></h2>
            </div>
            <ScrollReveal>
              <div className="glow-card p-8 flex flex-col sm:flex-row gap-6 items-start" style={{ border: "1px solid var(--color-border)" }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center mx-auto sm:mx-0"
                  style={{ width: 84, height: 84, borderRadius: "50%", background: "linear-gradient(135deg,var(--color-accent-500),var(--color-glow))", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem" }}
                >
                  {founder.initials}
                </div>
                <div>
                  <div className="font-semibold text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>{founder.name}</div>
                  <div className="text-sm mb-4" style={{ color: "var(--color-accent-300)" }}>{founder.role}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-300)" }}>{founder.bio}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container max-w-3xl">
            <div className="text-center mb-8">
              <span className="badge badge-accent mb-5 inline-flex">{team.badge}</span>
              <h2 className="text-h2"><RevealText3D text={team.title} splitBy="word" /></h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {team.members.map((m, n) => (
                <ScrollReveal key={n} delay={n * 0.08}>
                  <div className="glow-card h-full p-6 text-center" style={{ border: "1px solid var(--color-border)" }}>
                    <div
                      className="mx-auto mb-4 flex items-center justify-center"
                      style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-bright)", color: "var(--color-brand-500)" }}
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="font-semibold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{m.name}</div>
                    <div className="text-xs mb-3" style={{ color: "var(--color-accent-300)" }}>{m.role}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-400)" }}>{m.bio}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials & partners */}
        <section className="section section-alt">
          <div className="container text-center">
            <span className="badge badge-accent mb-3 inline-flex">{partners.badge}</span>
            <h2 className="text-h2 mb-8"><RevealText3D text={partners.title} splitBy="word" /></h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {partners.list.map((b) => (
                <div key={b} className="px-6 py-3 rounded-xl" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
                  <span className="text-sm font-semibold text-white">{b}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--color-brand-400)" }}>
              {partners.note}
            </p>
          </div>
        </section>

        <ContactCTA
          heading="No account manager between you and the people doing the work."
          body="Direct access to the team. A real reply within 24 hours. No lock-in contracts — ever."
          imageSeed="unexus-workspace"
        />
      </main>
      <Footer />
    </>
  );
}
