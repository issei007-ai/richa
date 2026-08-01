import Image from "next/image";
import { SERVICES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import RevealText3D from "@/components/ui/RevealText3D";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Digital Marketing": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "Website Development": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "AI Automation": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  "AI Training": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Market Research": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  "GEO — Generative Engine Optimization": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
      <path d="M19 15l.6 1.8L21.5 17.5l-1.9.7L19 20l-.6-1.8L16.5 17.5l1.9-.7z" />
    </svg>
  ),
  "SEO — Search Engine Optimisation": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

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
                  className="group relative block h-full overflow-hidden rounded-3xl border border-white/[0.08] transition-all duration-500 hover:border-indigo-400/40 hover:shadow-[0_10px_40px_-12px_rgba(99,102,241,0.45)]"
                  style={{
                    minHeight: BENTO_CONFIG[i].minHeight,
                    background: "var(--color-panel)",
                    ...(service.isNew ? { borderColor: "var(--color-accent-500)", boxShadow: "0 0 0 1px var(--color-accent-500)" } : {}),
                  }}
                >
                  {/* Background image (services with artwork) — next/image
                      resizes + re-encodes these on the fly instead of
                      shipping the full 1.3-1.8MB source PNGs to every visitor. */}
                  {SERVICE_IMG[service.title] && (
                    <Image
                      src={SERVICE_IMG[service.title]}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                      className="svc-img"
                    />
                  )}
                  {/* Overlay — dark behind the text (bottom), image visible up top */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(3,7,18,0.93) 0%, rgba(5,10,24,0.5) 55%, rgba(5,10,24,0.28) 100%)" }}
                  />

                  {/* Content */}
                  <div className="relative flex flex-col h-full p-7" style={{ zIndex: 2 }}>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-auto">
                      <div className="icon-wrap">{SERVICE_ICONS[service.title]}</div>
                      {service.isNew ? (
                        <span className="badge badge-accent" style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}>NEW</span>
                      ) : (
                        <span
                          className="text-xs tracking-widest opacity-40"
                          style={{ fontFamily: "var(--font-mono)", color: "#fff" }}
                        >
                          {service.num}
                        </span>
                      )}
                    </div>

                    {/* Decorative large number */}
                    {!service.isNew && (
                      <div
                        className="my-4 text-8xl font-black select-none pointer-events-none"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "rgba(255,255,255,0.07)",
                          lineHeight: 1,
                          letterSpacing: "-0.05em",
                        }}
                      >
                        {service.num}
                      </div>
                    )}

                    {/* Text */}
                    <div>
                      <h3 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {service.cardTitle ?? service.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-200)" }}>
                        {service.desc}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                        style={{ color: "var(--color-accent-300)" }}
                      >
                        Explore
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
