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

const BENTO_CONFIG = [
  { colClass: "bento-wide",   minHeight: "220px" },
  { colClass: "bento-narrow", minHeight: "220px" },
  { colClass: "bento-narrow", minHeight: "210px" },
  { colClass: "bento-wide",   minHeight: "210px" },
  { colClass: "bento-third",  minHeight: "210px" },
  { colClass: "bento-third",  minHeight: "210px" },
  { colClass: "bento-third",  minHeight: "210px" },
];

interface Props {
  heading?: string;
  intro?: string;
}

export default function ServicesGrid({
  heading = "Seven services. One team. Built to work together.",
  intro = "Each service is powerful on its own. The real difference is when they connect — your SEO feeds your content, your website converts what your ads bring in, your AI tools make it all faster.",
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

        {/* Bento grid */}
        <div className="bento-grid">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 0.07} direction="up" className={BENTO_CONFIG[i].colClass}>
              <TiltCard intensity={6} scale={1.02} className="h-full">
                <a
                  href={service.href}
                  className="group relative flex h-full overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_46px_-14px_rgba(99,102,241,0.55)]"
                  style={{
                    minHeight: BENTO_CONFIG[i].minHeight,
                    background: "#ffffff",
                    border: service.isNew ? "2px solid var(--color-accent-500)" : "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {/* The mascot graphic already carries the icon + service label,
                      so it IS the card — shown whole (object-contain) on a white
                      tile that blends with the artwork's own white background. */}
                  {SERVICE_IMG[service.title] ? (
                    <Image
                      src={SERVICE_IMG[service.title]}
                      alt={service.cardTitle ?? service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                      className="svc-mascot"
                    />
                  ) : (
                    <span className="m-auto px-6 text-center text-h3" style={{ fontFamily: "var(--font-display)", color: "#0f172a" }}>
                      {service.cardTitle ?? service.title}
                    </span>
                  )}

                  {service.isNew && (
                    <span className="badge badge-accent absolute left-3 top-3" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", zIndex: 2 }}>NEW</span>
                  )}

                  {/* Explore affordance — revealed on hover */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 right-0 flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: "#4f46e5" }}
                  >
                    Explore
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
