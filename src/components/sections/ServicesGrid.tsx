import Image from "next/image";
import { SERVICES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import RevealText3D from "@/components/ui/RevealText3D";

const SERVICE_IMG: Record<string, string> = {
  "Digital Marketing": "/services/digital-marketing.png",
  "Website Development": "/services/website-development.png",
  "AI Automation": "/services/ai-automation.png",
  "AI Training": "/services/ai-training.png",
  "Market Research": "/services/market-research.png",
  "GEO — Generative Engine Optimization": "/services/geo.png",
  "SEO — Search Engine Optimisation": "/services/seo.png",
};

interface Props {
  heading?: string;
  intro?: string;
  /** Per-card name + description overrides (from the CMS), in grid order. */
  cards?: { title: string; desc: string }[];
}

export default function ServicesGrid({
  heading = "Seven services. One team. Built to work together.",
  intro = "Each service is powerful on its own. The real difference is when they connect — your SEO feeds your content, your website converts what your ads bring in, your AI tools make it all faster.",
  cards,
}: Props = {}) {
  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-surface)" }}>
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.4 }} />
      <div className="orb orb-primary absolute" style={{ width: 500, height: 500, top: "-100px", right: "-100px", opacity: 0.08 }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="badge badge-accent mb-5 inline-flex">What we do</span>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-h2" style={{ maxWidth: "30rem" }}>
              <RevealText3D text={heading} splitBy="word" stagger={0.05} />
            </h2>
            <ScrollReveal delay={0.2} direction="left">
              <p className="text-lead" style={{ maxWidth: "28rem" }}>
                {intro}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Cards — logo on top, name + info below */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const name = cards?.[i]?.title || service.cardTitle || service.title;
            const desc = cards?.[i]?.desc || service.desc;
            return (
              <ScrollReveal key={service.num} delay={(i % 3) * 0.08} direction="up">
                <TiltCard intensity={5} scale={1.015} className="h-full">
                  <a
                    href={service.href}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_52px_-16px_rgba(99,102,241,0.6)]"
                    style={{
                      background: "radial-gradient(120% 90% at 50% 30%, #1b1a3a 0%, #0f1629 62%, #0c1120 100%)",
                      border: service.isNew ? "1.5px solid var(--color-accent-500)" : "1.5px solid rgba(129,140,248,0.28)",
                    }}
                  >
                    {/* Logo zone */}
                    <div className="relative" style={{ height: 236 }}>
                      {SERVICE_IMG[service.title] ? (
                        <Image
                          src={SERVICE_IMG[service.title]}
                          alt={name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="svc-mascot"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-h3" style={{ fontFamily: "var(--font-display)" }}>
                          {name}
                        </span>
                      )}
                      {service.isNew && (
                        <span className="badge badge-accent absolute left-4 top-4" style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}>NEW</span>
                      )}
                    </div>

                    {/* Text zone */}
                    <div className="flex flex-1 flex-col px-6 pb-6">
                      <h3 className="text-h3 mb-1.5" style={{ fontFamily: "var(--font-display)" }}>{name}</h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-brand-300)" }}>{desc}</p>
                      <span
                        className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                        style={{ color: "var(--color-accent-300)" }}
                      >
                        Explore
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
