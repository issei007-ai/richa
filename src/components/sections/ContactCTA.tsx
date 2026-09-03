import LeadForm from "@/components/ui/LeadForm";
import PhoneField from "@/components/ui/PhoneField";
import RevealText3D from "@/components/ui/RevealText3D";
import { SERVICES } from "@/lib/constants";

const NEEDS = [...SERVICES.map((s) => s.title), "Not sure yet"];
const POINTS = ["A free 30-minute call to start", "A real reply within 24 hours", "No contracts, no pressure"];

interface Props {
  heading?: string;
  body?: string;
  imageSeed?: string;
  /** Pre-selects the "What do you need?" dropdown to this service. */
  defaultNeed?: string;
}

/**
 * Reusable closing contact section with an INLINE form. Carries id="contact"
 * so in-page CTA buttons (href="#contact") smooth-scroll to it instead of
 * navigating to a separate form page.
 */
export default function ContactCTA({
  heading = "Got a project in mind?",
  body = "Tell us a bit about where you are and where you'd like to get to. We'll come back with specific ideas, not a generic pitch.",
  defaultNeed,
}: Props) {
  // Match the current service to a dropdown option — exact, or by the code
  // prefix before " — " (so "GEO — …isation" still matches "GEO — …ization").
  const needKey = (s: string) => s.split(" — ")[0].trim();
  const selectedNeed = defaultNeed
    ? NEEDS.find((n) => n === defaultNeed || needKey(n) === needKey(defaultNeed))
    : undefined;
  return (
    <section
      id="contact"
      className="section relative overflow-hidden"
      style={{ background: "var(--color-surface)", scrollMarginTop: "5rem" }}
    >
      <div className="orb orb-primary absolute" style={{ width: 600, height: 600, bottom: "-220px", left: "-140px", opacity: 0.14 }} />
      <div className="absolute inset-0 bg-grid" style={{ opacity: 0.2 }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center" style={{ maxWidth: "68rem", margin: "0 auto" }}>
          {/* Left: copy + image */}
          <div>
            <span className="badge badge-accent mb-5 inline-flex">Get in touch</span>
            <h2 className="text-h2 mb-5">
              <RevealText3D text={heading} splitBy="word" />
            </h2>
            <p className="text-lead mb-7">{body}</p>
            <ul className="space-y-3 mb-8">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-white" style={{ fontWeight: 500 }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="glow-card p-8" style={{ border: "1px solid var(--color-border)" }}>
            <h3 className="text-h3 mb-5" style={{ fontFamily: "var(--font-display)" }}>Send us a message</h3>
            <LeadForm source="contact-cta" submitLabel="Send message" note="We respond within one business day. No spam, ever.">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="cta-name">Name</label>
                  <input className="form-input" id="cta-name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label className="form-label" htmlFor="cta-email">Email</label>
                  <input className="form-input" id="cta-email" name="email" type="email" placeholder="you@company.com" required />
                </div>
              </div>
              <PhoneField />
              <div>
                <label className="form-label" htmlFor="cta-company">Company</label>
                <input className="form-input" id="cta-company" name="company" type="text" placeholder="Your company" />
              </div>
              <div>
                <label className="form-label" htmlFor="cta-need">What do you need?</label>
                <select className="form-select" name="need" id="cta-need" defaultValue={selectedNeed}>
                  {NEEDS.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="cta-message">Tell us more</label>
                <textarea className="form-textarea" id="cta-message" name="message" placeholder="A bit about your business and what you're trying to achieve..." />
              </div>
            </LeadForm>
          </div>
        </div>
      </div>
    </section>
  );
}
