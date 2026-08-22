import ScrollReveal from "@/components/ui/ScrollReveal";
import Marquee from "@/components/ui/Marquee";

const FOOTER_COLS = [
  { title: "Services", links: [
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "SEO", href: "/services/seo" },
    { label: "Website Development", href: "/services/website-development" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "AI Training", href: "/services/ai-training" },
    { label: "Market Research", href: "/services/market-research" },
    { label: "GEO", href: "/services/geo" },
  ]},
  { title: "Company", links: [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
     { label: "LinkedIn", href: "https://www.linkedin.com/company/unexusai/" },
  { label: "Instagram", href: "https://www.instagram.com/unexusai" },
  { label: "Facebook", href: "https://www.facebook.com/unexusai" },
  ]},
  { title: "Work with us", links: [
    { label: "Get a Free Audit", href: "/audit" },
    { label: "Book a Call", href: "/book" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Resources", href: "/resources" },
  ]},
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const MARQUEE_ITEMS = ["Digital Marketing", "AI Automation", "Website Development", "AI Training", "Market Research", "Growth Strategy", "SEO & GEO", "Paid Media"];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
      {/* Scrolling text strip */}
      <div className="py-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <Marquee speed={30} gap="4rem">
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className="text-xs font-semibold uppercase tracking-widest flex-shrink-0 flex items-center gap-4"
              style={{ color: "var(--color-brand-600)" }}>
              {item}
              <span style={{ color:"var(--color-accent-500)", opacity:0.4 }}>◆</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <ScrollReveal direction="up">
            <a href="/" className="inline-flex items-center mb-4"
              style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"1.15rem", color:"#fff", letterSpacing:"0.2em", textTransform:"uppercase" }}>
              Unexus&nbsp;<span className="logo-ai">AI</span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color:"var(--color-brand-500)" }}>
              Digital marketing, web development, and AI — run by one team that actually talks to itself.
            </p>
           
          </ScrollReveal>

          {FOOTER_COLS.map((col, ci) => (
            <ScrollReveal key={col.title} delay={ci * 0.1 + 0.1} direction="up">
              <div className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color:"var(--color-brand-500)" }}>
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm transition-colors duration-200 hover:text-white"
                        style={{ color:"var(--color-brand-400)" }}
                      >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color:"var(--color-brand-600)" }}>
          <span>© {new Date().getFullYear()} Unexus AI. All rights reserved.</span>
          <div className="flex gap-6">
            {LEGAL.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
        </div>

        {/* Giant gradient wordmark */}
        <div style={{ overflow: "hidden", marginTop: "3rem" }}>
          <div className="footer-wordmark">unexusai.</div>
        </div>
      </div>
    </footer>
  );
}
