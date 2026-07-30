import type { NavLink, Service, Stat, ProcessStep, Testimonial } from "./types";

// WhatsApp click-to-chat number (digits only, country code, no "+").
// Swap to a business number at launch — it's the only place it's defined.
export const WHATSAPP_NUMBER = "971501257204";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Digital Marketing",
    desc: "SEO, paid ads, and email — run as one joined-up system, not three separate jobs.",
    href: "/services/digital-marketing",
  },
  {
    num: "02",
    title: "Website Development",
    desc: "Fast, conversion-focused websites built to turn visitors into leads — not just look good.",
    href: "/services/website-development",
  },
  {
    num: "03",
    title: "AI Automation",
    desc: "We find the repetitive work eating your team's week and build AI that takes it off their plate — permanently.",
    href: "/services/ai-automation",
  },
  {
    num: "04",
    title: "AI Training",
    desc: "Practical, hands-on sessions so your team actually uses AI tools — not just knows they exist.",
    href: "/services/ai-training",
  },
  {
    num: "05",
    title: "Market Research",
    desc: "Know exactly who you're talking to, what they want, and how to reach them — before you spend a penny on marketing.",
    href: "/services/market-research",
  },
  {
    num: "06",
    title: "GEO — Generative Engine Optimization",
    cardTitle: "Generative Engine Optimisation",
    desc: "Get your business recommended by ChatGPT, Perplexity, and Gemini — not just found on Google.",
    href: "/services/geo",
  },
  {
    num: "07",
    title: "SEO — Search Engine Optimisation",
    cardTitle: "Search Engine Optimisation",
    desc: "Technical SEO, content, and authority building that grows rankings and revenue — not vanity traffic.",
    href: "/services/seo",
  },
];

export const STATS: Stat[] = [
  { value: "312%", label: "Average lift in qualified leads" },
  { value: "£24M+", label: "Revenue we've helped clients generate" },
  { value: "98%", label: "Clients who stick around year after year" },
  { value: "48h", label: "From first chat to a working plan" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    feeling: "YOU FEEL → HEARD",
    title: "We listen before we suggest anything.",
    desc: "A 30-minute call where we ask the questions most agencies skip — what's actually not working, what you've already tried, and what success looks like for your business specifically.",
    action: "Talk to us honestly. The more context you give, the sharper our plan.",
  },
  {
    step: "02",
    feeling: "YOU FEEL → CLEAR",
    title: "You get a plan built around your business — not a template.",
    desc: "Within a week, we come back with a focused plan — which services, in which order, with what expected outcomes. We show you exactly where your money goes and why.",
    action: "Review, ask questions, push back. We'd rather get it right than move fast.",
  },
  {
    step: "03",
    feeling: "YOU FEEL → IN CONTROL",
    title: "Things go live — with tracking on from day one.",
    desc: "Campaigns, automations, new pages — nothing launches without proper measurement in place. You'll have visibility into what's happening from the start.",
    action: "Watch it go live. Ask us anything. We're reachable when you need us.",
  },
  {
    step: "04",
    feeling: "YOU FEEL → MOMENTUM",
    title: "We tell you what's working — and fix what isn't, fast.",
    desc: "A real update every week. A proper review every month. If something isn't moving the needle, we say so and change it. No waiting, no excuses.",
    action: "Stay looped in. Growth compounds when both sides are engaged.",
  },
  {
    step: "05",
    feeling: "YOU FEEL → CONFIDENT",
    title: "You always know what comes next.",
    desc: "Every month ends with a clear picture — what happened, what it produced, and what we're doing next. No guessing. No chasing.",
    action: "Approve the next month, or don't. No lock-in — ever.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We'd been posting on social media for two years with almost no engagement. Within six weeks of working with Unexus AI, our content actually started conversations — and three of those conversations turned into paying clients.",
    name: "Navneet Jain",
    role: "Founder",
    company: "Amritsari Express",
  },
  {
    quote: "We were burning through budget on Meta with a 1.2x ROAS. Unexus restructured the entire account, rebuilt the creatives, and got us to 3.8x in 60 days. Same budget — completely different outcome.",
    name: "Performance marketing client",
    role: "Name withheld",
    company: "",
  },
  {
    quote: "Our old site looked fine but converted terribly. Unexus rebuilt it in six weeks — faster, cleaner, and actually designed around what our clients need to see before they book. Enquiries went up almost immediately.",
    name: "Yash Raj Gupta",
    role: "Manager",
    company: "Lilawati Vidya Mandir",
  },
  {
    quote: "What surprised me most was how everything connected. The SEO fed the content, the content supported the ads, the ads drove traffic to a website that actually converted. It stopped feeling like random activity and started feeling like a system.",
    name: "Anurag Sharma",
    role: "Founder",
    company: "Learning From Ant",
  },
];

export type Client = { name: string; logo?: string; logoAlt?: string; short?: string; flag?: string };

// `logo` points to a file in /public/clients. Clients without a usable logo
// fall back to a styled monogram (handled by the ClientLogo component).
// `flag` is an ISO 3166 country code (e.g. "in", "ae") shown as a flag badge.
export const CLIENTS: Client[] = [
  // India
  { name: "GEOX India", logo: "/clients/geox.png", flag: "in" },
  { name: "Amritsari Express", logo: "/clients/amritsari-express.png", flag: "in" },
  { name: "Café Chennai", logo: "/clients/cafe-chennai.png", flag: "in" },
  { name: "Rajwada", logo: "/clients/rajwada.png", flag: "in" },
  { name: "DPS Sirsa", logo: "/clients/dps-sirsa.png", flag: "in" },
  { name: "Lilawati Vidya Mandir", logo: "/clients/lilawati-vidya-mandir.png", flag: "in" },
  { name: "FlowerAura", logo: "/clients/floweraura.png", flag: "in" },
  { name: "Bakingo", logo: "/clients/bakingo.png", flag: "in" },
  { name: "Heritage Play Centre", flag: "in" },
  { name: "Learning From Ant", logo: "/clients/learning-from-ant.png", flag: "in" },
  { name: "Shaadi Emporio", logo: "/clients/shaadi-emporio.png", flag: "in" },

  // US
  { name: "Awake Solar", logo: "/clients/awake-solar.png", flag: "us" },

  // UK
  { name: "Wentworth House", logo: "/clients/wentworth-house.png", flag: "gb" },

  // UAE
  { name: "Richies Laundry", logo: "/clients/richies.png", short: "Richies", flag: "ae" },

  // Saudi
  { name: "Cle", flag: "sa" },
];

export const TRUST_LOGOS = CLIENTS.map((c) => c.name);

export const WHY_US = [
  { title: "One team across everything", desc: "Your SEO, your website, your AI tools, and your paid ads are all handled by the same team — so nothing falls through the gap between vendors." },
  { title: "Built for the UAE and beyond", desc: "We understand the Middle East market — consumer behaviour, platform preferences, local compliance, and what actually works here. You won't be explaining your market to us." },
  { title: "GEO-ready before your competitors are", desc: "We're one of the very few agencies in the UAE offering Generative Engine Optimisation — helping businesses show up in ChatGPT, Perplexity, and Gemini answers, not just Google." },
  { title: "No lock-in, no hiding", desc: "Month to month. A real update every week. A live dashboard you can check anytime. We'd rather earn your business every month than hold you to a contract." },
  { title: "We talk in revenue, not reports", desc: "Every service we run is measured on what it produces for your business — leads, bookings, sales — not impressions or follower counts." },
];
