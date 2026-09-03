import { BLOG_POSTS } from "./blog";

/** Field + section schema that drives both the page rendering and the /admin/content editor. */

export type CmsField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "list" | "items" | "image";
  help?: string;
  /** Subfields for a repeater ("items") field. */
  itemFields?: CmsField[];
  /** Label for the "add" button on a repeater. */
  itemLabel?: string;
};

export type CmsSection = {
  key: string;
  label: string;
  group: string;
  fields: CmsField[];
  defaults: Record<string, unknown>;
};

// ── SEO & Social (global defaults) ───────────────────────────────────────────
// Drives the site-wide <title>/description fallbacks, Open Graph + Twitter card
// defaults (so shared links show a preview), and the Organization schema.org
// block. Per-page titles/descriptions still override these where set.
export const SEO_GLOBAL_DEFAULTS = {
  siteName: "Unexus AI",
  defaultTitle: "Unexus AI — Digital Marketing, Web & AI",
  defaultDescription:
    "Digital marketing, AI automation, and fast websites — run by one team that actually talks to itself.",
  ogImage: "",
  ogImageAlt: "Unexus AI — Digital Marketing, Web & AI",
  twitterHandle: "",
  organizationName: "Unexus AI",
  organizationDescription:
    "AI-first digital marketing agency — GEO, SEO, paid media, website development, AI automation, and AI training for businesses across the UAE, India, and the Middle East.",
  organizationLogo: "",
  organizationEmail: "richa@unexusai.com",
  organizationPhone: "+971501257204",
  organizationCity: "Dubai",
  organizationCountry: "AE",
  founderName: "Richa Gupta",
  areaServed: ["United Arab Emirates", "India", "Saudi Arabia", "United Kingdom", "United States"] as string[],
  socialLinks: [] as string[],
};

/**
 * Reusable per-page SEO override fields (title + description). Append with
 * `...seoMetaFields()` to any page's section; sectionMetadata() in lib/seo.ts
 * reads them and falls back to the page's built-in defaults when blank.
 */
export function seoMetaFields(): CmsField[] {
  return [
    { name: "metaTitle", label: "SEO title (optional)", type: "text", help: "Overrides the browser-tab and search-result title. Leave blank for the page default. “ — Unexus AI” is added automatically." },
    { name: "metaDescription", label: "Meta description (optional)", type: "textarea", help: "The snippet shown under the title in search results. Leave blank for the page default." },
  ];
}

// ── Homepage: Hero ───────────────────────────────────────────────────────────
export const HOME_HERO_DEFAULTS = {
  badge: "AI-Powered Digital Marketing • Precision. Performance. Growth.",
  headlineFixed: "You're spending on marketing",
  rotatingLines: [
    "You're not seeing it in revenue",
    "You're not getting enough leads",
    "You're not showing up on AI search",
  ],
  sub: "We fix that — with GEO, Google Ads, Meta Ads, Digital Marketing and website development built to work together, for businesses across UAE, KSA, India and beyond.",
  ctaPrimary: "Book Free Consultation",
  ctaSecondary: "Book Free Call →",
  trustLabel: "Our clients span industries and time zones.",
};

export const SECTIONS: CmsSection[] = [
  {
    key: "seo.global",
    label: "SEO & Social",
    group: "SEO",
    fields: [
      { name: "siteName", label: "Site name", type: "text", help: "Used in social cards and appended to page titles." },
      { name: "defaultTitle", label: "Default / homepage title", type: "text" },
      { name: "defaultDescription", label: "Default meta description", type: "textarea", help: "Fallback description for any page that doesn't set its own." },
      { name: "ogImage", label: "Default social share image", type: "image", help: "Shown when a link is shared (WhatsApp, LinkedIn, X). Best size 1200×630px." },
      { name: "ogImageAlt", label: "Social image — alt text", type: "text" },
      { name: "twitterHandle", label: "Twitter / X handle", type: "text", help: "Include the @, e.g. @unexusai. Leave blank if none." },
      { name: "organizationName", label: "Organization name (schema.org)", type: "text" },
      { name: "organizationDescription", label: "Organization description (schema.org)", type: "textarea" },
      { name: "organizationLogo", label: "Organization logo (schema.org)", type: "image", help: "Square logo used in structured data for rich results." },
      { name: "organizationEmail", label: "Contact email (schema.org)", type: "text" },
      { name: "organizationPhone", label: "Contact phone (schema.org)", type: "text", help: "International format, e.g. +971501257204." },
      { name: "organizationCity", label: "City (schema.org)", type: "text" },
      { name: "organizationCountry", label: "Country code (schema.org)", type: "text", help: "Two-letter ISO code, e.g. AE, IN." },
      { name: "founderName", label: "Founder name (schema.org)", type: "text" },
      { name: "areaServed", label: "Areas served (one per line)", type: "list", help: "Countries/regions you serve — feeds the schema.org areaServed for local AI answers." },
      { name: "socialLinks", label: "Social profile URLs (one per line)", type: "list", help: "LinkedIn, Instagram, X, etc. Feeds the Organization schema 'sameAs'." },
    ],
    defaults: SEO_GLOBAL_DEFAULTS,
  },
  {
    key: "home.hero",
    label: "Hero",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Top badge", type: "text" },
      { name: "headlineFixed", label: "Headline — fixed line", type: "text" },
      { name: "rotatingLines", label: "Headline — rotating lines", type: "list", help: "One line per row. These type in/out under the fixed headline." },
      { name: "sub", label: "Sub-headline", type: "textarea" },
      { name: "ctaPrimary", label: "Primary button label", type: "text" },
      { name: "ctaSecondary", label: "Secondary button label", type: "text" },
      { name: "trustLabel", label: "Client strip label", type: "text" },
    ],
    defaults: HOME_HERO_DEFAULTS,
  },
];

// ── Homepage: Industries header ──────────────────────────────────────────────
export const HOME_INDUSTRIES_DEFAULTS = {
  eyebrow: "Who we work with",
  title: "We've seen what's holding your industry back.",
  intro: "Every industry has its own version of the same problem — money going into marketing, not enough coming back out. Here's what we see most often, and what we do about it.",
};

// ── Homepage: Services grid header ───────────────────────────────────────────
export const HOME_SERVICES_DEFAULTS = {
  heading: "Seven services. One team. Built to work together.",
  intro: "Each service is powerful on its own. The real difference is when they connect — your SEO feeds your content, your website converts what your ads bring in, your AI tools make it all faster.",
};

// ── Homepage: Why Unexus AI ──────────────────────────────────────────────────
export const HOME_WHY_DEFAULTS = {
  badge: "Why Unexus AI",
  title: "Not promises. Just how we actually work.",
  intro: "The things that matter when you're choosing who to trust with your growth.",
  reasons: [
    { title: "One team across everything", desc: "Your SEO, your website, your AI tools, and your paid ads are all handled by the same team — so nothing falls through the gap between vendors." },
    { title: "Built for the UAE and beyond", desc: "We understand the Middle East market — consumer behaviour, platform preferences, local compliance, and what actually works here. You won't be explaining your market to us." },
    { title: "GEO-ready before your competitors are", desc: "We're one of the very few agencies in the UAE offering Generative Engine Optimisation — helping businesses show up in ChatGPT, Perplexity, and Gemini answers, not just Google." },
    { title: "No lock-in, no hiding", desc: "Month to month. A real update every week. A live dashboard you can check anytime. We'd rather earn your business every month than hold you to a contract." },
    { title: "We talk in revenue, not reports", desc: "Every service we run is measured on what it produces for your business — leads, bookings, sales — not impressions or follower counts." },
  ],
};

// ── Homepage: Process ────────────────────────────────────────────────────────
export const HOME_PROCESS_DEFAULTS = {
  badge: "How it works",
  title: "From first call to real results — here's what working with us actually looks like.",
  intro: "No black boxes. No waiting weeks to hear back. You'll know exactly what's happening and why at every stage.",
  steps: [
    { feeling: "YOU FEEL → HEARD", title: "We listen before we suggest anything.", desc: "A 30-minute call where we ask the questions most agencies skip — what's actually not working, what you've already tried, and what success looks like for your business specifically.", action: "Talk to us honestly. The more context you give, the sharper our plan." },
    { feeling: "YOU FEEL → CLEAR", title: "You get a plan built around your business — not a template.", desc: "Within a week, we come back with a focused plan — which services, in which order, with what expected outcomes. We show you exactly where your money goes and why.", action: "Review, ask questions, push back. We'd rather get it right than move fast." },
    { feeling: "YOU FEEL → IN CONTROL", title: "Things go live — with tracking on from day one.", desc: "Campaigns, automations, new pages — nothing launches without proper measurement in place. You'll have visibility into what's happening from the start.", action: "Watch it go live. Ask us anything. We're reachable when you need us." },
    { feeling: "YOU FEEL → MOMENTUM", title: "We tell you what's working — and fix what isn't, fast.", desc: "A real update every week. A proper review every month. If something isn't moving the needle, we say so and change it. No waiting, no excuses.", action: "Stay looped in. Growth compounds when both sides are engaged." },
    { feeling: "YOU FEEL → CONFIDENT", title: "You always know what comes next.", desc: "Every month ends with a clear picture — what happened, what it produced, and what we're doing next. No guessing. No chasing.", action: "Approve the next month, or don't. No lock-in — ever." },
  ],
};

// ── Homepage: Testimonials ───────────────────────────────────────────────────
export const HOME_TESTIMONIALS_DEFAULTS = {
  badge: "Social proof",
  title: "Don't take our word for it",
  intro: "A few words from the people we've worked with.",
  items: [
    { quote: "We'd been posting on social media for two years with almost no engagement. Within six weeks of working with Unexus AI, our content actually started conversations — and three of those conversations turned into paying clients.", name: "Navneet Jain", role: "Founder", company: "Amritsari Express" },
    { quote: "We were burning through budget on Meta with a 1.2x ROAS. Unexus restructured the entire account, rebuilt the creatives, and got us to 3.8x in 60 days. Same budget — completely different outcome.", name: "Performance marketing client", role: "Name withheld", company: "" },
    { quote: "Our old site looked fine but converted terribly. Unexus rebuilt it in six weeks — faster, cleaner, and actually designed around what our clients need to see before they book. Enquiries went up almost immediately.", name: "Yash Raj Gupta", role: "Manager", company: "Lilawati Vidya Mandir" },
    { quote: "What surprised me most was how everything connected. The SEO fed the content, the content supported the ads, the ads drove traffic to a website that actually converted. It stopped feeling like random activity and started feeling like a system.", name: "Anurag Sharma", role: "Founder", company: "Learning From Ant" },
  ],
};

// ── Homepage: Service cube ───────────────────────────────────────────────────
export const HOME_CUBE_DEFAULTS = {
  caption: "Hover to pause",
  faces: [
    { label: "Marketing", sub: "SEO · Paid · Email", metric: "+312%", accent: "#6366f1" },
    { label: "Websites", sub: "Next.js · CRO · Speed", metric: "98+", accent: "#06b6d4" },
    { label: "Automation", sub: "Agents · WhatsApp · RAG", metric: "−72%", accent: "#7c3aed" },
    { label: "AI Training", sub: "Workshops · Prompts", metric: "10×", accent: "#f59e0b" },
    { label: "Research", sub: "ICP · Competitors", metric: "4–6wk", accent: "#10b981" },
    { label: "GEO", sub: "ChatGPT · Perplexity", metric: "5×", accent: "#ec4899" },
  ],
};

SECTIONS.push(
  {
    key: "home.cube",
    label: "Service cube",
    group: "Homepage",
    fields: [
      { name: "caption", label: "Caption under cube", type: "text" },
      { name: "faces", label: "Faces (first 6 used)", type: "items", itemLabel: "face", help: "Order maps to cube sides: 1 front, 2 right, 3 back, 4 left, 5 top, 6 bottom.", itemFields: [
        { name: "label", label: "Label", type: "text" },
        { name: "sub", label: "Sub-label", type: "text" },
        { name: "metric", label: "Metric", type: "text" },
        { name: "accent", label: "Accent colour (hex)", type: "text" },
      ] },
    ],
    defaults: HOME_CUBE_DEFAULTS,
  },
  {
    key: "home.industries",
    label: "Industries — header",
    group: "Homepage",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
    ],
    defaults: HOME_INDUSTRIES_DEFAULTS,
  },
  {
    key: "home.services",
    label: "Services grid — header",
    group: "Homepage",
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
    ],
    defaults: HOME_SERVICES_DEFAULTS,
  },
  {
    key: "home.why",
    label: "Why Unexus AI",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "reasons", label: "Reasons", type: "items", itemLabel: "reason", itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
    ],
    defaults: HOME_WHY_DEFAULTS,
  },
  {
    key: "home.process",
    label: "Process",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "steps", label: "Steps", type: "items", itemLabel: "step", itemFields: [
        { name: "feeling", label: "Feeling line", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
        { name: "action", label: "Your part", type: "textarea" },
      ] },
    ],
    defaults: HOME_PROCESS_DEFAULTS,
  },
  {
    key: "home.testimonials",
    label: "Testimonials",
    group: "Homepage",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "items", label: "Testimonials", type: "items", itemLabel: "testimonial", itemFields: [
        { name: "quote", label: "Quote", type: "textarea" },
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "company", label: "Company", type: "text" },
      ] },
    ],
    defaults: HOME_TESTIMONIALS_DEFAULTS,
  },
);

// ── Homepage: Clients scroller ───────────────────────────────────────────────
export const HOME_CLIENTS_DEFAULTS = {
  items: [
    { name: "GEOX India", logo: "/clients/geox.png", short: "", flag: "in" },
    { name: "DPS Sirsa", logo: "/clients/dps-sirsa.png", short: "", flag: "in" },
    { name: "FlowerAura", logo: "/clients/floweraura.png", short: "", flag: "in" },
    { name: "Awake Solar", logo: "/clients/awake-solar.png", short: "", flag: "us" },
    { name: "Wentworth House", logo: "/clients/wentworth-house.png", short: "", flag: "gb" },
    { name: "Richies Laundry", logo: "/clients/richies.png", short: "Richies", flag: "ae" },
    { name: "Cle", logo: "", short: "", flag: "sa" },
  ],
};

SECTIONS.push({
  key: "home.clients",
  label: "Clients scroller",
  group: "Homepage",
  fields: [
    { name: "items", label: "Clients", type: "items", itemLabel: "client", help: "Logo: upload or paste a URL (leave blank for a coloured monogram). Flag: ISO country code — in, ae, us, gb, sa, etc.", itemFields: [
      { name: "name", label: "Name", type: "text" },
      { name: "short", label: "Short name (optional)", type: "text" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "logoAlt", label: "Logo — alt text (optional)", type: "text", help: "Falls back to “<name> logo” if left blank." },
      { name: "flag", label: "Flag (ISO code)", type: "text" },
    ] },
  ],
  defaults: HOME_CLIENTS_DEFAULTS,
});

// ── About ────────────────────────────────────────────────────────────────────
export const ABOUT_HERO_DEFAULTS = {
  eyebrow: "About Unexus AI",
  title: "Ten years of digital marketing. Relaunched for the AI era.",
  subtitle: "Unexus AI didn't start from scratch. It was built on a decade of running real campaigns for real businesses — and relaunched when it became clear that AI and GEO were changing the rules fast enough that a new kind of agency was needed.",
  note: "Unexus AI is an SE Digicon company",
};
export const ABOUT_STATS_DEFAULTS = {
  items: [
    { value: "10+", label: "Years of digital marketing experience" },
    { value: "80+", label: "Businesses grown across India, UAE & beyond" },
    { value: "5", label: "Countries actively serving clients" },
    { value: "6", label: "Services under one roof" },
  ],
};
export const ABOUT_STORY_DEFAULTS = {
  badge: "Our story",
  title: "From SE Digicon to Unexus AI — here's what changed and why.",
  paragraphs: [
    "In 2015, Richa Gupta founded SE Digicon in India — a digital marketing agency built around one belief: that businesses deserve marketing that produces real results, not vanity metrics. Over the next decade, SE Digicon worked with 80+ businesses across retail, hospitality, education, and enterprise — in India, the UAE, the UK, and the US.",
    "Then two things happened at once. AI started changing how people search — and how businesses operate. And GEO emerged as an entirely new discipline that almost no agency had figured out yet. Running the same playbook with a different name felt like the wrong answer. So Unexus AI was born — registered in the UAE, built to serve businesses globally, and focused specifically on the intersection of digital marketing, AI, and GEO that SE Digicon had spent years moving toward.",
  ],
  highlight: "The clients are real. The experience is real. The difference is the focus.",
};
export const ABOUT_TIMELINE_DEFAULTS = {
  badge: "How we got here",
  title: "A decade in, one clear direction.",
  items: [
    { year: "2015", title: "SE Digicon founded in India", desc: "Started with a handful of clients and a clear focus on digital marketing that could be measured in revenue, not impressions. Based in India, serving clients across sectors." },
    { year: "2015–2024", title: "80+ businesses. Four countries. Six services.", desc: "Grew SE Digicon across retail, hospitality, healthcare, real estate, and enterprise — working with clients in India, UAE, UK, and US. Added website development, AI automation, and market research alongside core digital marketing." },
    { year: "2024", title: "GEO changes everything", desc: "As AI search engines started answering questions that used to belong to Google, a new discipline emerged — Generative Engine Optimisation. We started building GEO capability before most agencies had heard of it." },
    { year: "2025", title: "Unexus AI launched in the UAE", desc: "Registered in the UAE and relaunched with a sharper focus — AI training, GEO, and integrated digital marketing for businesses across the Middle East, India, and beyond. SE Digicon continues to operate alongside it." },
  ],
};
export const ABOUT_VALUES_DEFAULTS = {
  badge: "What we believe",
  title: "The principles that haven't changed in ten years.",
  items: [
    { title: "Revenue over reports", desc: "Impressions and clicks don't pay anyone's bills. Every service we run is measured on what it produces — leads, bookings, revenue. If it's not moving the needle, we say so." },
    { title: "Honest before comfortable", desc: "If something isn't working, you'll hear it from us before you have to ask. We'd rather have an awkward conversation early than a bigger one later." },
    { title: "Systems, not silos", desc: "Your SEO, website, and AI tools should feed each other — not operate in isolation. We build everything to connect, because that's where results compound." },
    { title: "See what's coming", desc: "GEO didn't exist as a discipline two years ago. We built for it early. We're always watching what's changing in search, AI, and digital — so our clients aren't caught off guard." },
  ],
};
export const ABOUT_FOUNDER_DEFAULTS = {
  badge: "The founder",
  title: "The person behind it.",
  initials: "RG",
  name: "Richa Gupta",
  role: "Founder — Unexus AI & SE Digicon · Based in Dubai, UAE 🇦🇪",
  bio: "I've spent more than a decade in digital marketing and growth — performance marketing, SEO, e-commerce, CRO and retention — helping startups and brands across the Middle East and Asia scale on data rather than guesswork. These days my focus is the shift to an AI-first internet, where people increasingly find brands through ChatGPT, Gemini, and Perplexity instead of a page of Google results. I started Unexus AI to help businesses stay discoverable and competitive in that world: through GEO, AI-powered marketing, and the kind of hands-on AI training that actually gets teams using these tools day to day.",
};
export const ABOUT_TEAM_DEFAULTS = {
  badge: "The team",
  title: "The people doing the work.",
  members: [
    { name: "Rishi Sinha", role: "", bio: "I'm a growth marketing strategist helping brands scale with AI. I build the automation and SEO systems behind the work — and I'm straight about what actually moves the needle." },
    { name: "Rashmi Alpana", role: "", bio: "I'm an SEO specialist — I connect search intent with smart content and clean site architecture so both Google and real users are happy. Crawling, indexing, ranking, converting organic traffic: that's my world." },
  ],
};
export const ABOUT_PARTNERS_DEFAULTS = {
  badge: "Credentials & partners",
  title: "Who we work with and what we're certified in.",
  list: ["Zoho Partner", "WebEngage Partner", "MoEngage Partner", "Vercel Partner"],
  note: "Operating globally from Dubai. Unexus AI is registered in the UAE and serves clients across the Middle East, India, the UK, and the US. SE Digicon, our parent company, has been operating in India since 2015.",
};

SECTIONS.push(
  {
    key: "about.hero", label: "Hero", group: "About",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "note", label: "SE Digicon badge", type: "text" },
      ...seoMetaFields(),
    ],
    defaults: ABOUT_HERO_DEFAULTS,
  },
  {
    key: "about.stats", label: "Stats", group: "About",
    fields: [
      { name: "items", label: "Stats", type: "items", itemLabel: "stat", itemFields: [
        { name: "value", label: "Value", type: "text" },
        { name: "label", label: "Label", type: "text" },
      ] },
    ],
    defaults: ABOUT_STATS_DEFAULTS,
  },
  {
    key: "about.story", label: "Story", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "paragraphs", label: "Paragraphs (one per line)", type: "list" },
      { name: "highlight", label: "Closing highlight line", type: "text" },
    ],
    defaults: ABOUT_STORY_DEFAULTS,
  },
  {
    key: "about.timeline", label: "Timeline", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "items", label: "Milestones", type: "items", itemLabel: "milestone", itemFields: [
        { name: "year", label: "Year", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
    ],
    defaults: ABOUT_TIMELINE_DEFAULTS,
  },
  {
    key: "about.values", label: "Values", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "items", label: "Values", type: "items", itemLabel: "value", itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
    ],
    defaults: ABOUT_VALUES_DEFAULTS,
  },
  {
    key: "about.founder", label: "Founder", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "initials", label: "Monogram initials", type: "text" },
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role line", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
    ],
    defaults: ABOUT_FOUNDER_DEFAULTS,
  },
  {
    key: "about.team", label: "Team", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "members", label: "Members", type: "items", itemLabel: "member", itemFields: [
        { name: "name", label: "Name", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "bio", label: "Bio", type: "textarea" },
      ] },
    ],
    defaults: ABOUT_TEAM_DEFAULTS,
  },
  {
    key: "about.partners", label: "Credentials & partners", group: "About",
    fields: [
      { name: "badge", label: "Badge", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "list", label: "Partners (one per line)", type: "list" },
      { name: "note", label: "Footer note", type: "textarea" },
    ],
    defaults: ABOUT_PARTNERS_DEFAULTS,
  },
);

// ── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT_HERO_DEFAULTS = {
  eyebrow: "Get in touch",
  title: "Talk to us before you decide anything.",
  subtitle: "Book a free 30-minute call or send a message — either way you'll hear back from a real person within one business day. No pitch, no pressure, no obligation.",
};
export const CONTACT_INFO_DEFAULTS = {
  items: [
    { label: "WhatsApp", value: "+971 50 125 7204", sub: "Fastest way to reach us. We respond same day.", href: "https://wa.me/971501257204" },
    { label: "Email", value: "richa@unexusai.com", sub: "Reply within one business day, always.", href: "mailto:richa@unexusai.com" },
    { label: "Based in", value: "Dubai, UAE 🇦🇪", sub: "Also serving India 🇮🇳 and the wider Middle East.", href: "" },
    { label: "Working hours", value: "Sun – Thu, 9am – 6pm", sub: "Gulf Standard Time (GST, UTC+4).", href: "" },
  ],
};
export const CONTACT_BOOK_DEFAULTS = {
  eyebrow: "Book a free call",
  title: "30 minutes. No pitch. Something useful either way.",
  body: "We'll take an honest look at where things stand and tell you the two or three things we'd focus on first — whether you work with us afterwards or not.",
  note: "You'll be speaking with Richa Gupta, our founder. Times shown in GST (UTC+4) — joining from India? We'll adjust.",
};
export const CONTACT_MESSAGE_DEFAULTS = {
  eyebrow: "Send a message",
  title: "Prefer to write? We'll come back with something specific.",
  body: "Tell us where things feel stuck and what you're trying to achieve. We'll reply with specific ideas — not a generic pitch.",
};

SECTIONS.push(
  {
    key: "contact.hero", label: "Hero", group: "Contact",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
    ],
    defaults: CONTACT_HERO_DEFAULTS,
  },
  {
    key: "contact.info", label: "Contact info cards", group: "Contact",
    fields: [
      { name: "items", label: "Cards", type: "items", itemLabel: "card", help: "Icons are fixed by position: 1 WhatsApp, 2 Email, 3 Location, 4 Clock.", itemFields: [
        { name: "label", label: "Label", type: "text" },
        { name: "value", label: "Value", type: "text" },
        { name: "sub", label: "Sub-text", type: "textarea" },
        { name: "href", label: "Link (optional)", type: "text" },
      ] },
    ],
    defaults: CONTACT_INFO_DEFAULTS,
  },
  {
    key: "contact.book", label: "Book a call card", group: "Contact",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "note", label: "Note under scheduler", type: "textarea" },
    ],
    defaults: CONTACT_BOOK_DEFAULTS,
  },
  {
    key: "contact.message", label: "Message card", group: "Contact",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
    ],
    defaults: CONTACT_MESSAGE_DEFAULTS,
  },
);

// ── Blog ─────────────────────────────────────────────────────────────────────
export const BLOG_PAGE_DEFAULTS = {
  heroEyebrow: "Blog",
  heroTitle: "Ideas, playbooks & field notes",
  heroSubtitle: "Practical notes on growth, AI, GEO, and marketing — written because they're useful, not to chase keywords.",
  newsletterTitle: "Get the weekly playbook",
  newsletterSub: "One useful thing a week on growth, AI, and marketing. We try to keep it short.",
};
export const BLOG_POSTS_DEFAULTS = { items: BLOG_POSTS };

// ── Case Studies ─────────────────────────────────────────────────────────────
export const CASESTUDIES_PAGE_DEFAULTS = {
  heroEyebrow: "Case Studies",
  heroTitle: "Real problems. Real work. Real results.",
  heroSubtitle: "Every case study here starts with a business that was stuck — and ends with one that isn't. Real problems, real work, and the numbers that came out the other side.",
  ctaHeading: "Want to be the next case study?",
  ctaBody: "Tell us where things feel stuck and we'll talk through specifically what we'd do about it — no pitch, no pressure.",
};
export const CASESTUDIES_CASES_DEFAULTS = {
  items: [
    { category: "E-commerce", flag: "🇮🇳", headline: "FlowerAura's Shopping campaigns were fighting each other — and returning just 1.2x.", quote: "Our Shopping campaigns were scattered and the product feed had never really been cleaned up. We were getting 1.2x back and couldn't see where the budget was actually going.", tags: ["Google Shopping", "Performance Max", "Feed Optimisation"], metrics: ["3.8× | Return on ad spend", "₹390 | Cost per acquisition (was ₹840)", "+₹2.4Cr | Revenue added in 90 days"] },
    { category: "E-commerce", flag: "🇮🇳", headline: "Bakingo's Meta and Google accounts never talked — so peak season cost 2.5x more.", quote: "Every festive rush our costs jumped and the creatives burned out within three days. Meta and Google ran completely separately, so neither learned anything from the other.", tags: ["Meta Ads", "Google Search", "Creative Testing"], metrics: ["4.1× | Return on ad spend (was 1.6×)", "₹240 | Blended CAC (was ₹620)", "+120% | Peak-season revenue"] },
    { category: "B2B & Industrial", flag: "🇮🇳", headline: "IndustryBuying had 10M+ products and almost nothing showing up in search.", quote: "We had this enormous catalogue but barely a thousand keywords ranking. For a business our size, organic was basically invisible.", tags: ["Programmatic SEO", "CRM Lifecycle", "Email"], metrics: ["24,000 | Keywords ranking (was 1,000)", "₹1.8Cr | Revenue from email", "-40% | Bounce rate"] },
    { category: "Fintech", flag: "🇮🇳", headline: "Home Credit was paying ₹1,840 a lead — and only 18% ever became a loan.", quote: "Leads were expensive and most of them never made it to disbursal. Our CRM and our ad platforms had no idea the other one existed.", tags: ["Google Search", "CRM Integration", "Smart Bidding"], metrics: ["₹980 | Cost per lead (was ₹1,840)", "31% | Lead-to-disbursal (was 18%)", "-41% | Acquisition cost"] },
    { category: "B2B & Industrial", flag: "🇮🇳", headline: "Awake Solar burned ₹3,200 a lead and lost 72% of them before a site visit.", quote: "A generic landing page, leads that cost a fortune, and proposals that took half a day to put together. Most prospects dropped off long before we ever got to their roof.", tags: ["Google Ads", "Landing Page CRO", "ROI Calculator"], metrics: ["₹4.8Cr | Pipeline in 6 months", "₹890 | Cost per lead (was ₹3,200)", "45 min | Proposal time (was 5 hrs)"] },
    { category: "Local Services", flag: "🇦🇪", headline: "Richies ran a premium laundry service with no real way to be found online.", quote: "Every order came from a walk-in or a WhatsApp message. Beyond a basic website, there was no way for new customers to actually find us.", tags: ["Google Local Ads", "Meta Ads", "Review Management"], metrics: ["+210% | Online enquiries", "4.8★ | Google rating (was 3.9★)", "-38% | Acquisition cost"] },
    { category: "Content & SEO", flag: "🇮🇳", headline: "Kundalibaba had 200K visits a month — and most of its pages weren't even indexed.", quote: "We had decent traffic, but the content was thin and a lot of our kundli pages weren't getting indexed at all. Premium bookings were a fraction of what they should have been.", tags: ["SEO", "Content Architecture", "GEO"], metrics: ["2.1M | Monthly sessions (was 200K)", "+340% | Premium bookings", "47 | Featured snippets owned"] },
    { category: "Fashion & Retail", flag: "🇮🇳", headline: "Shaadi Emporio's bridal enquiries sat unanswered for half a day.", quote: "Brides were messaging on WhatsApp and waiting twelve hours for a reply. Instagram looked nice but brought no one in, and we had no real acquisition to speak of.", tags: ["Meta Ads", "WhatsApp Automation", "Lead Ads"], metrics: ["+145% | Appointment bookings", "<15 min | WhatsApp response (was 12 hrs)", "4.2× | ROAS on Meta"] },
  ],
};

SECTIONS.push(
  {
    key: "blog.page", label: "Page (hero + newsletter)", group: "Blog",
    fields: [
      { name: "heroEyebrow", label: "Hero eyebrow", type: "text" },
      { name: "heroTitle", label: "Hero title", type: "text" },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
      { name: "newsletterTitle", label: "Newsletter title", type: "text" },
      { name: "newsletterSub", label: "Newsletter sub", type: "textarea" },
      ...seoMetaFields(),
    ],
    defaults: BLOG_PAGE_DEFAULTS,
  },
  {
    key: "blog.posts", label: "Articles", group: "Blog",
    fields: [
      { name: "items", label: "Articles", type: "items", itemLabel: "article", help: "Body accepts HTML (headings, lists, tables). Slug must be unique and URL-safe.", itemFields: [
        { name: "slug", label: "URL slug", type: "text" },
        { name: "image", label: "Cover image", type: "image" },
        { name: "imageAlt", label: "Cover image — alt text", type: "text", help: "Describe the image for search engines and screen readers. Falls back to the article title if left blank." },
        { name: "author", label: "Author", type: "text", help: "Shown as a byline and used in the article's structured data. Defaults to Richa Gupta if blank." },
        { name: "cat", label: "Category", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "date", label: "Date", type: "text" },
        { name: "read", label: "Read time", type: "text" },
        { name: "accent", label: "Accent colour (hex)", type: "text" },
        { name: "metaTitle", label: "SEO title", type: "text" },
        { name: "metaDescription", label: "SEO description", type: "textarea" },
        { name: "body", label: "Body (HTML)", type: "textarea" },
      ] },
    ],
    defaults: BLOG_POSTS_DEFAULTS,
  },
  {
    key: "casestudies.page", label: "Page (hero + CTA)", group: "Case Studies",
    fields: [
      { name: "heroEyebrow", label: "Hero eyebrow", type: "text" },
      { name: "heroTitle", label: "Hero title", type: "text" },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
      { name: "ctaHeading", label: "Closing CTA heading", type: "text" },
      { name: "ctaBody", label: "Closing CTA body", type: "textarea" },
      ...seoMetaFields(),
    ],
    defaults: CASESTUDIES_PAGE_DEFAULTS,
  },
  {
    key: "casestudies.cases", label: "Case cards", group: "Case Studies",
    fields: [
      { name: "items", label: "Cases", type: "items", itemLabel: "case", itemFields: [
        { name: "category", label: "Industry", type: "text", help: "Must match a filter: E-commerce, Fashion & Retail, B2B & Industrial, Fintech, Local Services, Content & SEO." },
        { name: "flag", label: "Flag emoji", type: "text" },
        { name: "headline", label: "Headline", type: "text" },
        { name: "quote", label: "Quote", type: "textarea" },
        { name: "tags", label: "Tags (one per line)", type: "list" },
        { name: "metrics", label: "Metrics (value | label, one per line)", type: "list" },
      ] },
    ],
    defaults: CASESTUDIES_CASES_DEFAULTS,
  },
);

// ── Services: overview page ──────────────────────────────────────────────────
export const SERVICES_OVERVIEW_DEFAULTS = {
  heroEyebrow: "Services",
  heroTitle: "Seven services. Every growth lever your business needs.",
  heroSubtitle: "Take one service or combine several — they're built to connect. The more they work together, the more your results compound. All delivered by one team in the UAE, serving businesses across the Middle East, India, and beyond.",
  heroPrimaryLabel: "Book a Strategy Call",
  heroPrimaryHref: "/book",
  heroSecondaryLabel: "Book a Free Consultation →",
  heroSecondaryHref: "#contact",
  gridHeading: "Seven services. Built to work together.",
  gridIntro: "SEO without a website built for conversion is wasted. Paid ads without proper tracking is guesswork. AI tools without trained people are just subscriptions. We build all seven services to connect — so your growth compounds instead of leaking through the gaps.",
  whyBadge: "Why Unexus AI",
  whyTitle: "What working with us is actually like",
  whyCards: [
    { title: "One team across everything", desc: "Your SEO, your website, your AI tools, and your paid ads are all handled by the same team — so nothing falls through the gap between vendors." },
    { title: "Built for the UAE and beyond", desc: "We understand the Middle East market — consumer behaviour, platform preferences, local compliance, and what actually works here. You won't be explaining your market to us." },
    { title: "GEO-ready before your competitors are", desc: "We're one of the very few agencies in the UAE offering Generative Engine Optimisation — helping businesses show up in ChatGPT, Perplexity, and Gemini answers, not just Google." },
    { title: "No lock-in, no hiding", desc: "Month to month. A real update every week. A live dashboard you can check anytime. We'd rather earn your business every month than hold you to a contract." },
    { title: "We talk in revenue, not reports", desc: "Every service we run is measured on what it produces for your business — leads, bookings, sales — not impressions or follower counts." },
  ],
};

// ── Services: detail-page shared field set ───────────────────────────────────
function serviceDetailFields(): CmsField[] {
  return [
    { name: "badge", label: "Hero badge", type: "text" },
    { name: "headline", label: "Headline", type: "text" },
    { name: "body", label: "Body", type: "textarea" },
    { name: "specialisms", label: "Hero pills (one per line)", type: "list" },
    { name: "accent", label: "Accent colour (hex)", type: "text" },
    { name: "primaryCtaLabel", label: "Primary button — label", type: "text" },
    { name: "primaryCtaHref", label: "Primary button — link", type: "text" },
    { name: "secondaryCtaLabel", label: "Secondary button — label", type: "text" },
    { name: "secondaryCtaHref", label: "Secondary button — link", type: "text" },
    { name: "heroNote", label: "Hero note (optional callout — leave blank to hide)", type: "textarea" },
    { name: "comparisonHeading", label: "Comparison — heading (leave blank to hide this block)", type: "text" },
    { name: "comparisonIntro", label: "Comparison — intro", type: "textarea" },
    { name: "comparisonQuery", label: "Comparison — example query", type: "text" },
    { name: "comparisonWithout", label: "Comparison — \"without\" text", type: "textarea" },
    { name: "comparisonWith", label: "Comparison — \"with\" text", type: "textarea" },
    { name: "comparisonFootnote", label: "Comparison — footnote", type: "textarea" },
    { name: "outcomes", label: "Outcome stats (optional — leave empty to hide)", type: "items", itemLabel: "stat", itemFields: [
      { name: "value", label: "Value", type: "text" },
      { name: "label", label: "Label", type: "text" },
    ] },
    { name: "audienceTitle", label: "Audience — title", type: "text" },
    { name: "audienceIntro", label: "Audience — intro", type: "textarea" },
    { name: "audience", label: "Audience cards", type: "items", itemLabel: "card", itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ] },
    { name: "includedTitle", label: "What's included — title", type: "text" },
    { name: "includedIntro", label: "What's included — intro", type: "textarea" },
    { name: "subServices", label: "What's included — cards", type: "items", itemLabel: "item", itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
      { name: "points", label: "Bullet points (one per line)", type: "list" },
    ] },
    { name: "approachTitle", label: "Approach — title", type: "text" },
    { name: "approachIntro", label: "Approach — intro (optional)", type: "textarea" },
    { name: "approach", label: "Approach steps", type: "items", itemLabel: "step", itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ] },
    { name: "benefitsTitle", label: "Benefits — title (optional — leave benefits empty to hide)", type: "text" },
    { name: "benefitsIntro", label: "Benefits — intro", type: "textarea" },
    { name: "benefits", label: "Benefits (one per line — leave empty to hide this block)", type: "list" },
    { name: "useCasesTitle", label: "Use cases — title (optional — leave use cases empty to hide)", type: "text" },
    { name: "useCasesIntro", label: "Use cases — intro", type: "textarea" },
    { name: "useCases", label: "Use cases (one per line — leave empty to hide this block)", type: "list" },
    { name: "whyTitle", label: "Why us — title", type: "text" },
    { name: "whyIntro", label: "Why us — intro (optional — used with the checklist layout)", type: "textarea" },
    { name: "whyCards", label: "Why us — cards (leave empty to use the checklist layout below)", type: "items", itemLabel: "card", itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ] },
    { name: "whyUs", label: "Why us — checklist bullets (one per line — used when no cards above)", type: "list" },
    { name: "faqIntro", label: "FAQ — intro", type: "textarea" },
    { name: "faqs", label: "FAQs", type: "items", itemLabel: "FAQ", itemFields: [
      { name: "q", label: "Question", type: "text" },
      { name: "a", label: "Answer", type: "textarea" },
    ] },
    { name: "closing", label: "Closing — \"What changes\" line", type: "textarea" },
    ...seoMetaFields(),
  ];
}

function serviceSection(key: string, label: string, defaults: Record<string, unknown>): CmsSection {
  return { key, label, group: "Services", fields: serviceDetailFields(), defaults };
}

const EMPTY_COMPARISON = {
  comparisonHeading: "", comparisonIntro: "", comparisonQuery: "",
  comparisonWithout: "", comparisonWith: "", comparisonFootnote: "",
};

export const SVC_DIGITAL_MARKETING_DEFAULTS = {
  num: "01", accent: "#6366f1",
  badge: "Service 01 — Digital Marketing",
  headline: "Your marketing channels should feed each other. Most don't.",
  body: "Businesses across the UAE and India are running SEO, paid ads, and email through separate vendors with no shared strategy. Every channel reports its own numbers. Nobody's accountable for revenue. We fix that — by running all of it as one connected system, measured on what actually matters.",
  specialisms: ["SEO", "GEO", "Paid Media", "Email & Lifecycle", "Conversion Tracking"],
  primaryCtaLabel: "Get a free audit", primaryCtaHref: "#contact",
  secondaryCtaLabel: "Book a 30-min call →", secondaryCtaHref: "/book",
  heroNote: "",
  ...EMPTY_COMPARISON,
  outcomes: [
    { value: "312%", label: "Average lift in qualified leads" },
    { value: "4.2x", label: "Return on ad spend" },
    { value: "−38%", label: "Cost per acquisition" },
  ],
  audienceTitle: "Built for businesses that are spending — but not seeing it in revenue.",
  audienceIntro: "If any of these sound familiar, this is where we start.",
  audience: [
    { title: "Retail & e-commerce", desc: "Running Meta and Google ads with no clear picture of what's converting." },
    { title: "Hospitality & F&B", desc: "Getting walk-ins but invisible online — losing bookings to competitors." },
    { title: "Healthcare & wellness", desc: "Relying on word of mouth with no digital system to scale it." },
    { title: "Real estate", desc: "High ad spend, high lead volume — but low quality and low conversion." },
    { title: "Startups & scale-ups", desc: "Burning runway on marketing with no attribution and no clear ROI." },
  ],
  includedTitle: "Every channel that brings the right people to your door — run as one plan.",
  includedIntro: "No siloed reports. No separate vendors. One team across all of it.",
  subServices: [
    { title: "Search Engine Optimisation", desc: "We focus on searches that lead to revenue — not just traffic for its own sake. Technical fixes, content, and link building prioritised by commercial intent.", points: ["Technical SEO audit & fixes", "Keyword research — UAE & India markets", "On-page optimisation & content strategy", "Link building & authority growth"] },
    { title: "Generative Engine Optimisation", desc: "ChatGPT, Perplexity, and Gemini are answering your customers' questions before they click anything. GEO makes sure your business is part of that answer.", points: ["GEO visibility audit", "AI-citation-ready content creation", "Entity & brand signal building", "Monthly GEO performance tracking"] },
    { title: "Paid Media", desc: "Meta, Google, TikTok, and LinkedIn — strategy, creative, targeting, and reporting that ties back to revenue, not just clicks and impressions.", points: ["Campaign strategy & audience targeting", "Ad creative development & testing", "Budget allocation & bid management", "Weekly performance reporting"] },
    { title: "Email & Lifecycle Marketing", desc: "Most of a customer list goes cold unless something keeps it warm. We build the sequences that do that automatically — turning one-time buyers into repeat revenue.", points: ["Email strategy & segmentation", "Automation flows & drip sequences", "WhatsApp marketing integration", "Open rate & conversion optimisation"] },
    { title: "Conversion Tracking & Attribution", desc: "If you can't see which channel is driving revenue, you're flying blind. We set up tracking from day one so every decision is backed by data you can trust.", points: ["GA4 & Meta Pixel setup", "Full-funnel attribution modelling", "Live dashboard — no waiting for reports", "Monthly review & strategy sessions"] },
  ],
  approachTitle: "What working with us on digital marketing actually looks like.",
  approach: [
    { title: "Audit — we look at what you have before touching anything", desc: "We review your existing channels, ad accounts, analytics, and content. We find what's leaking, what's working, and where the fastest wins are. You get a clear picture before we spend a penny of your budget." },
    { title: "Strategy — a plan built around your business, not a template", desc: "We come back with a focused plan — which channels, in which order, with what expected outcomes for your specific industry and market. You approve it before anything goes live." },
    { title: "Launch — tracking on from day one, not bolted on after", desc: "Campaigns go live with proper measurement in place. You'll have a live dashboard so you're never waiting for a monthly report to know what's happening with your budget." },
    { title: "Optimise — weekly updates, monthly reviews, no surprises", desc: "We tell you what's working and fix what isn't — fast. A real update every week, a proper review every month. If something isn't moving the needle, we say so and change it." },
  ],
  whyTitle: "",
  whyCards: [],
  faqIntro: "Things people usually ask before getting started.",
  faqs: [
    { q: "How long before we see results from SEO?", a: "Realistically 3 to 6 months for meaningful organic movement — we won't tell you otherwise. But we identify quick wins in the first 30 days while the longer-term work builds. Paid media shows results much faster, often within the first 2 to 4 weeks." },
    { q: "Do you manage ad spend as well as strategy?", a: "Yes — strategy, creative, targeting, bidding, and reporting, all of it. You set the budget and approve the plan. We handle everything day to day and flag anything that needs your input." },
    { q: "We already have a marketing team in-house. Can you work alongside them?", a: "Often yes. We work alongside in-house teams regularly — leading on specific channels or supporting where there are gaps. We're flexible about what that looks like depending on your setup." },
    { q: "Do you work with businesses outside the UAE?", a: "Yes — we work with businesses across the UAE, India, and the wider Middle East. If you're entering the UAE or Indian market from outside, we can help with that too. Market-specific research is part of how we build every strategy." },
    { q: "What's your minimum contract length?", a: "Month to month, no lock-ins. We'd rather earn the work every month than rely on a contract to keep you around." },
    { q: "What is GEO and why does it matter?", a: "GEO — Generative Engine Optimisation — is about getting your business recommended by AI tools like ChatGPT, Perplexity, and Gemini. As more people use AI to research before they buy, showing up in those answers is becoming as important as showing up on Google. We're one of the few agencies in the UAE offering this as a dedicated service." },
  ],
  closing: "More qualified traffic, lower cost per lead, and a clear line between your marketing spend and your revenue — across SEO, GEO, paid media, and email.",
};

export const SVC_WEBSITE_DEVELOPMENT_DEFAULTS = {
  num: "05", accent: "#06b6d4",
  badge: "Service 05 — Website Development",
  headline: "Your website is live. But is it actually working?",
  body: "Most businesses in the UAE have a website that looks decent but converts poorly. Visitors land, scroll, and leave — without filling a form, making a booking, or picking up the phone. We build websites in Next.js that are designed around one thing: turning the traffic you already have into customers.",
  specialisms: ["UI/UX Design", "Next.js Development", "CRO", "SEO-Ready", "CMS Integration", "Performance"],
  primaryCtaLabel: "Get a free audit", primaryCtaHref: "#contact",
  secondaryCtaLabel: "Book a 30-min call →", secondaryCtaHref: "/book",
  heroNote: "",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "For businesses whose website looks fine — but isn't doing its job.",
  audienceIntro: "If any of these sound like you, your website is costing you more than it's making you.",
  audience: [
    { title: "Real estate", desc: "Listings everywhere but serious buyers not converting online." },
    { title: "Healthcare & wellness", desc: "No online booking system — patients calling or not bothering at all." },
    { title: "Hospitality & F&B", desc: "Beautiful venue, a website that hasn't been updated in two years." },
    { title: "Retail & e-commerce", desc: "Traffic coming in from ads but the site isn't built to convert it." },
    { title: "Startups & scale-ups", desc: "Outgrowing a template site that can't keep up with the business." },
  ],
  includedTitle: "A website built to convert — from first design to post-launch.",
  includedIntro: "Every build includes design, development, tracking, and support. Nothing handed off halfway.",
  subServices: [
    { title: "UI/UX Design", desc: "Designed around your audience and what they need to see before they take action — not just what looks good in a portfolio.", points: ["User journey mapping & wireframes", "Mobile-first responsive design", "Brand-aligned visual language", "Design review & approval before build"] },
    { title: "Next.js Development", desc: "Built with Next.js — fast, scalable, and SEO-ready from day one. No shortcuts that need a rebuild in two years.", points: ["Next.js App Router & TypeScript", "Core Web Vitals optimised", "Accessibility compliant build", "Deployed on Vercel — fast globally"] },
    { title: "Conversion Rate Optimisation", desc: "Often the fastest way to grow revenue is getting more from the traffic you already have. We build for conversion from the start — not as an afterthought.", points: ["CTA strategy & placement", "Landing page design & testing", "Form & booking flow optimisation", "Heatmap & behaviour tracking setup"] },
    { title: "CMS Integration", desc: "You shouldn't need a developer to update your own website. We integrate a CMS so your team can manage content independently from day one.", points: ["Sanity or Contentful integration", "Custom content schemas for your needs", "Team training on CMS usage", "Blog, listings & page management"] },
    { title: "Analytics & Tracking", desc: "Tracking set up from day one — not bolted on after launch. You'll know exactly where your visitors come from and what they do on your site.", points: ["GA4 & Meta Pixel setup", "Goal & event tracking configuration", "Live traffic & conversion dashboard", "Post-launch performance review"] },
    { title: "Post-Launch Support", desc: "We don't hand over a site and disappear. Ongoing support, iterative improvements, and a team that's reachable when something needs fixing.", points: ["30-day post-launch support included", "Bug fixes & performance monitoring", "Ongoing retainer options available", "Iterative improvement cycles"] },
  ],
  approachTitle: "From first conversation to live website — here's what the process looks like.",
  approach: [
    { title: "Discovery — we understand your business before touching a pixel", desc: "We look at your current site, your competitors, your audience, and what you need visitors to do. We ask the questions most developers skip — so the design is built around your goals, not our portfolio." },
    { title: "Design — wireframes and visuals, approved before we build", desc: "We present the full design before a single line of code is written. You review, give feedback, and sign off. No surprises at the end of an 8-week build." },
    { title: "Build — development in Next.js with tracking from day one", desc: "We build to the approved design — fast, clean, and with analytics configured from the start. You get regular progress updates, not radio silence for six weeks." },
    { title: "Launch — tested, reviewed, and live on your schedule", desc: "Full QA across devices and browsers before anything goes live. We handle the launch and stay close for the first 30 days to catch anything that needs attention." },
    { title: "Improve — we keep building on what the data tells us", desc: "After launch we review what visitors are doing, where they're dropping off, and what to improve next. A website is never finished — it gets better every month." },
  ],
  whyTitle: "What makes this different from any other web agency in the UAE.",
  whyCards: [
    { title: "Built to connect with your marketing", desc: "Because we also run SEO, GEO, and paid media, your website is built to support your marketing — not fight it. Structure, speed, and content all aligned from the start." },
    { title: "Conversion first, aesthetics second", desc: "We care about whether your site converts — not whether it wins a design award. Every layout decision is made with your visitor's next action in mind." },
    { title: "UAE and India market knowledge", desc: "We understand what UAE and Indian audiences expect — payment integrations, language considerations, local compliance, and what builds trust in these markets specifically." },
    { title: "No handover and disappear", desc: "Most agencies hand over a site and move on. We stay involved — monthly improvements, ongoing support, and a team that's reachable when something needs fixing." },
  ],
  faqIntro: "Things people usually ask before getting started.",
  faqs: [
    { q: "How long does a typical website build take?", a: "Between 6 and 10 weeks from kick-off to launch, depending on scope. A straightforward business site is closer to 6 weeks. Something with custom features, integrations, or e-commerce takes longer. You'll get a specific timeline in your proposal." },
    { q: "Can you redesign our existing site rather than build from scratch?", a: "Yes — and often that's the smarter option. We can take your existing site, fix what's slow or broken, and improve conversion without throwing everything out. We'll tell you honestly which approach makes more sense after seeing what you have." },
    { q: "Do you handle hosting and deployment?", a: "Yes. We deploy on Vercel — fast, globally distributed, and reliable. We set the whole thing up and can manage it ongoing if you'd prefer not to deal with it yourself." },
    { q: "We need Arabic language support. Can you build that?", a: "Yes — RTL layout support and Arabic content integration is something we build for regularly in the UAE market. It needs to be planned from the start of the design phase, not added at the end." },
    { q: "What payment gateways do you integrate for UAE businesses?", a: "We integrate with UAE-compatible gateways including Telr, PayTabs, and Stripe. We'll recommend the right one based on your business type, transaction volume, and which currencies you need to accept." },
    { q: "Do you offer ongoing maintenance after launch?", a: "Yes — all builds include 30 days of post-launch support. Beyond that, we offer monthly retainers for ongoing updates, improvements, and monitoring. Most clients stay on a retainer because the site keeps getting better." },
  ],
  closing: "A website that loads fast, ranks on search, and converts the traffic you're already getting — built specifically for your audience in the UAE and beyond.",
};

export const SVC_AI_AUTOMATION_DEFAULTS = {
  num: "06", accent: "#7c3aed",
  badge: "Service 06 — AI Automation",
  headline: "Most businesses aren't short on tasks — they're short on time, because too many of those tasks are still manual.",
  body: "As an AI automation company, UnexusAI builds systems that take repetitive, rule-based work off your team's plate, so people spend time on decisions that actually need a human.",
  specialisms: ["AI Workflow Automation", "Business Process Automation", "AI Chatbot Development", "AI Voice Agents", "WhatsApp Automation", "CRM and ERP Automation"],
  primaryCtaLabel: "Book a free discovery call", primaryCtaHref: "/book",
  secondaryCtaLabel: "See how it works →", secondaryCtaHref: "#contact",
  heroNote: "It's also worth being upfront about what AI automation isn't good at yet: tasks requiring genuine judgment calls, relationship nuance, or handling situations with no historical precedent still need a human in the loop. The value comes from removing the repetitive 80% of a workflow so your team's time goes into the 20% that actually needs a person.",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "",
  audienceIntro: "",
  audience: [],
  includedTitle: "Our AI Automation Services",
  includedIntro: "Whether you need a single AI chatbot development project or a full AI workflow automation rollout across departments, we scope the solution around measurable time and cost savings. Not every process should be automated end-to-end on day one. We typically recommend starting with the highest-volume, most repetitive task in a department — invoice processing, lead qualification, or FAQ-style support tickets, for example — because that's where automation produces the clearest, fastest-to-measure ROI before expanding into more complex, judgment-heavy workflows.",
  subServices: [
    { title: "AI Workflow Automation", desc: "Connecting tools and processes so work moves without manual handoffs." },
    { title: "Business Process Automation", desc: "Automating recurring operational tasks end-to-end." },
    { title: "AI Chatbot Development", desc: "Conversational agents for sales, support, and lead qualification." },
    { title: "AI Voice Agents", desc: "Automated call handling for bookings, support, and follow-ups." },
    { title: "CRM and ERP Automation", desc: "Keeping systems of record updated without manual data entry." },
    { title: "WhatsApp Automation", desc: "Automated customer conversations on the channel your customers already use." },
    { title: "Email and Marketing Automation", desc: "Triggered sequences based on customer behavior." },
    { title: "AI Document Processing", desc: "Extracting and structuring data from forms, invoices, and contracts." },
    { title: "AI Knowledge Base Solutions", desc: "Internal AI assistants trained on your company's own documentation." },
    { title: "Custom AI Agent Development", desc: "Purpose-built agents for specific business functions." },
    { title: "API and Third-Party Integrations", desc: "Connecting your existing software stack into one automated flow." },
  ],
  approachTitle: "How Our AI Automation Process Works",
  approachIntro: "Automation only pays off when it's built around your actual workflow, not a generic template. Our process is designed to find real automation opportunities before writing a single line of code. This structured approach is what separates real AI process automation from off-the-shelf tools that only handle part of the job. Testing matters more here than in most software projects — an automation that's 95% accurate on invoice data entry still means one error in every twenty documents, which is why we validate against real historical data before anything touches live operations.",
  approach: [
    { title: "Business process discovery", desc: "Mapping how work currently moves through your team." },
    { title: "Automation opportunity analysis", desc: "Identifying which tasks are worth automating first." },
    { title: "AI strategy and planning", desc: "Matching the right AI tools to the right processes." },
    { title: "Solution design", desc: "Architecture that fits your existing tech stack." },
    { title: "Development and integration", desc: "Building and connecting the automation." },
    { title: "Testing and optimization", desc: "Validating accuracy and reliability before go-live." },
    { title: "Deployment", desc: "Rolling out with minimal disruption to daily operations." },
    { title: "Training and ongoing support", desc: "Making sure your team actually uses what's built." },
  ],
  benefitsTitle: "Benefits of AI Automation",
  benefitsIntro: "AI-powered workflows deliver compounding value — the more processes you automate, the more time and consistency you gain across the business. For most businesses, the first automation project pays for itself in reclaimed staff hours alone — everything after that is compounding efficiency. The businesses that see the strongest results usually treat automation as an ongoing capability rather than a one-time project — reviewing what's working every quarter and expanding automation into the next-highest-friction process, instead of stopping after the first win.",
  benefits: [
    "Reduce repetitive manual tasks across departments",
    "Increase team productivity without adding headcount",
    "Improve response times for customers and prospects",
    "Minimize human errors in data entry and processing",
    "Lower operational costs over time",
    "Deliver 24/7 customer support through AI agents",
    "Scale business operations efficiently as volume grows",
    "Generate actionable insights from business data automatically",
  ],
  useCasesTitle: "AI Solutions for Every Business",
  useCasesIntro: "Automation opportunities exist in nearly every department. Common use cases we build for clients include the ones below. If you're not sure where automation would have the biggest impact in your business, that's exactly what an AI automation consultation is for — most businesses can name where their team's time is being wasted, but haven't mapped which of those bottlenecks are actually straightforward to automate versus which ones require more complex, custom development.",
  useCases: [
    "Customer Support Automation",
    "Sales and Lead Management",
    "HR and Recruitment Automation",
    "Finance and Accounting Workflows",
    "Healthcare Administration",
    "E-commerce Operations",
    "Manufacturing Processes",
    "Real Estate Lead Automation",
    "Professional Services",
    "Internal Team Productivity",
  ],
  whyTitle: "Why Choose UnexusAI for AI Automation?",
  whyIntro: "Businesses evaluating custom AI automation solutions usually want the same thing: automation that actually works reliably in production, not just in a demo. When you're comparing us as an AI automation company near me, ask what happens after launch — ongoing support is where most automation projects either compound in value or quietly break down. Systems and APIs change over time, and an automation that isn't monitored can silently fail weeks after a third-party update, which is why ongoing support isn't an optional add-on in how we scope projects.",
  whyCards: [],
  whyUs: [
    "Experienced AI specialists, not generalist developers",
    "Customized automation strategies built around your workflow",
    "Secure and scalable solutions",
    "Seamless integration with your existing systems",
    "End-to-end implementation, from strategy through deployment",
    "Ongoing optimization and support after launch",
    "Transparent communication throughout the project",
    "A consistently ROI-focused approach",
  ],
  faqIntro: "",
  faqs: [
    { q: "What is AI automation?", a: "AI automation uses artificial intelligence and connected software to handle repetitive tasks and workflows automatically, reducing manual work and improving consistency." },
    { q: "Which business processes can be automated?", a: "Common examples include customer support, lead qualification, data entry, invoice processing, appointment scheduling, and internal reporting — though most departments have automation potential." },
    { q: "Can AI integrate with my existing software?", a: "Yes. Most AI integration services projects connect directly with your existing CRM, ERP, or business tools through APIs rather than replacing them." },
    { q: "How long does implementation take?", a: "Simple automations can go live in a few weeks. Larger, multi-system business process automation projects typically take 6–10 weeks depending on scope." },
    { q: "Is AI automation suitable for small businesses?", a: "Yes. Automation often delivers a faster relative return for small teams, since it directly offsets the cost of hiring for repetitive tasks." },
    { q: "What ROI can I expect from AI automation?", a: "ROI depends on the process automated, but most clients see measurable time savings within the first month, with cost savings compounding as automation scales across more workflows." },
    { q: "Will automation replace my staff?", a: "Rarely as a primary goal. Most of our clients use automation to absorb growing workload without hiring at the same pace, or to free existing staff from repetitive tasks so they can focus on higher-value work like relationship management or complex problem-solving." },
    { q: "What happens if the automation makes a mistake?", a: "We build in fallback logic and human-review checkpoints for anything customer-facing or financially sensitive, so an automation encountering an edge case it wasn't built for routes to a person instead of guessing. Fully unsupervised automation is reserved for low-risk, high-confidence tasks only." },
  ],
  closing: "Book a free AI automation consultation to identify the repetitive processes costing your team the most time. We'll map your current workflows, highlight the highest-impact automation opportunities, and outline a custom AI solution designed to improve efficiency, reduce costs, and support long-term business growth.",
};

export const SVC_AI_TRAINING_DEFAULTS = {
  num: "07", accent: "#f59e0b",
  badge: "Service 07 — AI Training",
  headline: "Buying AI tools is easy. Getting a team to actually use them well is the hard part.",
  body: "As a dedicated AI training company, UnexusAI runs practical, hands-on AI training services that teach real teams how to use AI in their day-to-day work — not generic lectures about what AI is.",
  specialisms: ["Generative AI Training", "Prompt Engineering Workshops", "AI for Business Teams", "AI for Marketing and Sales", "Custom Corporate AI Training", "One-on-One AI Coaching"],
  primaryCtaLabel: "Book a free discovery call", primaryCtaHref: "/book",
  secondaryCtaLabel: "See how it works →", secondaryCtaHref: "#contact",
  heroNote: "We also see a recurring pattern worth naming directly: teams that were given AI tools without training tend to use them inconsistently — some employees get real value, others quietly avoid the tool altogether after one bad result. Structured training closes that gap across the whole team, rather than leaving adoption to whoever happens to be naturally curious.",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "",
  audienceIntro: "",
  audience: [],
  includedTitle: "Our AI Training Programs",
  includedIntro: "Every program is built as corporate AI training, not a generic course — content is adapted to your industry, your tools, and your team's actual skill level. Most teams we train aren't starting from zero — they've already tried ChatGPT or a similar tool casually, with mixed results. That's usually the biggest gap we close: the difference between knowing a tool exists and knowing how to structure a prompt, verify its output, and build it into a repeatable daily workflow.",
  subServices: [
    { title: "Generative AI Training", desc: "Foundational skills for using generative AI tools effectively." },
    { title: "ChatGPT and AI Productivity Training", desc: "Practical workflows for everyday business tasks." },
    { title: "Prompt Engineering Workshops", desc: "Writing prompts that consistently produce usable output." },
    { title: "AI for Business Teams", desc: "Cross-functional training tailored to how your teams actually work." },
    { title: "AI for Marketing and Sales", desc: "Using AI for content, outreach, and pipeline efficiency." },
    { title: "AI for Customer Support", desc: "AI-assisted response drafting and support workflows." },
    { title: "AI Automation Training", desc: "Understanding what can and can't be automated in daily operations." },
    { title: "AI Leadership Workshops", desc: "Helping executives make informed decisions about AI adoption." },
    { title: "Custom Corporate AI Training", desc: "Programs built around your specific tools and processes." },
    { title: "One-on-One AI Coaching", desc: "Focused coaching for individuals or small leadership teams." },
  ],
  approachTitle: "Our AI Training Process",
  approachIntro: "Effective AI upskilling depends on matching the training to where your team actually is, not where a standard curriculum assumes they are. This structured approach is what makes our AI workshops stick, instead of being forgotten within a week of the session ending. A single one-off session rarely changes behavior on its own — the follow-up support in the weeks after training is usually what determines whether new AI habits actually stick or quietly fade back into old workflows.",
  approach: [
    { title: "Training needs assessment", desc: "Understanding your team's goals and current AI usage." },
    { title: "Skill level evaluation", desc: "Identifying gaps between beginners and advanced users." },
    { title: "Customized curriculum", desc: "Building the training plan around real use cases." },
    { title: "Live workshops and practical exercises", desc: "Hands-on sessions, not passive lectures." },
    { title: "Hands-on AI tool demonstrations", desc: "Working directly inside the tools your team will use." },
    { title: "Real-world business use cases", desc: "Examples pulled from your actual industry and workflows." },
    { title: "Assessments and feedback", desc: "Checking that skills are actually being retained." },
    { title: "Post-training support", desc: "Follow-up help as your team applies what they learned." },
  ],
  benefitsTitle: "Benefits of AI Training for Businesses",
  benefitsIntro: "Hands-on AI learning produces a measurable shift in how teams work, not just a certificate at the end of a session. The businesses that benefit most from AI upskilling programs are usually the ones that already have the tools — they just haven't built the habits yet. We also spend time on responsible AI practices during training: what shouldn't be pasted into a public AI tool, how to spot and correct inaccurate output, and where human review still needs to stay in the loop — skills that matter as much as productivity gains.",
  benefits: [
    "Improve employee productivity across daily tasks",
    "Save time through AI-powered workflows",
    "Increase operational efficiency without new hires",
    "Enhance decision-making with better use of available data",
    "Boost creativity and innovation within existing teams",
    "Improve customer experience through faster, better-informed responses",
    "Encourage confident AI adoption instead of hesitant, inconsistent use",
    "Build future-ready teams prepared for how work is changing",
  ],
  useCasesTitle: "Who Can Benefit from AI Training?",
  useCasesIntro: "Our training programs are built for a wide range of roles and business sizes. Whether you need a single corporate AI workshop or an ongoing training program across departments, sessions are scoped to your team's actual role in the business. A sales team's most useful AI skills — drafting outreach, summarizing calls — look very different from an operations team's, which is why we build separate tracks rather than running every department through the same generic session.",
  useCases: [
    "Business Owners",
    "Marketing Teams",
    "Sales Teams",
    "HR Professionals",
    "Customer Support Teams",
    "Operations Teams",
    "Executives and Managers",
    "Startups",
    "SMEs",
    "Enterprise Organizations",
  ],
  whyTitle: "Why Choose UnexusAI for AI Training?",
  whyIntro: "Businesses comparing AI training near me options usually want the same thing: trainers who actually use these tools professionally, not instructors reading from a slide deck. If you're evaluating AI training for companies, ask to see the actual exercises used in past sessions — that's usually the clearest signal of how practical the training really is. A session built entirely around slides and theory rarely changes how a team works the following Monday; exercises using your own real documents, emails, or workflows are what make the skills transferable.",
  whyCards: [],
  whyUs: [
    "Industry-experienced AI trainers",
    "Customized training programs, not off-the-shelf courses",
    "Practical, hands-on learning throughout",
    "Coverage of the latest AI tools and technologies",
    "Role-specific learning paths for different teams",
    "Interactive workshops that keep engagement high",
    "Ongoing learning support after the session ends",
    "A consistent focus on real business outcomes, not just AI trivia",
  ],
  faqIntro: "",
  faqs: [
    { q: "What is included in AI training?", a: "Programs typically include live workshops, hands-on tool demonstrations, real-world exercises, and post-training support, tailored to your team's roles and skill levels." },
    { q: "Is the training suitable for beginners?", a: "Yes. We assess skill levels upfront and build sessions for beginners, intermediate users, or advanced teams — including mixed-level groups." },
    { q: "Can the training be customized for our business?", a: "Yes. Every custom AI training program is built around your industry, tools, and workflows rather than generic examples." },
    { q: "Do you offer online and onsite workshops?", a: "Yes, both formats are available depending on your team's location and preference." },
    { q: "Which AI tools will participants learn?", a: "This depends on your goals, but commonly includes ChatGPT and other generative AI tools, AI-assisted workflow platforms, and any AI features already inside your existing software stack." },
    { q: "How long does an AI training program take?", a: "Single workshops typically run half a day to a full day. Ongoing enterprise AI training programs can extend across several weeks depending on scope." },
    { q: "Do you offer AI certification training?", a: "We offer completion-based recognition for our structured programs. If your organization requires a specific third-party AI certification training, let us know during scoping and we'll advise on how our workshops complement that path." },
    { q: "How is progress measured after training ends?", a: "Through a short post-training assessment plus a follow-up check-in a few weeks later, where we look at whether participants are actually using the tools and workflows covered — not just whether they remember the content of the session." },
  ],
  closing: "Schedule a free consultation to discuss your team's AI training needs. We'll assess your current AI usage and design a practical, customized training program that helps your team use AI with confidence, improve productivity, and accelerate digital transformation.",
};

export const SVC_MARKET_RESEARCH_DEFAULTS = {
  num: "08", accent: "#10b981",
  badge: "Service 08 — Market Research",
  headline: "Business decisions made without data are just guesses with confidence.",
  body: "As a dedicated market research company, UnexusAI provides market research services that replace assumptions with evidence — so pricing, positioning, and expansion decisions are backed by what your market is actually doing, not what you hope it's doing.",
  specialisms: ["Market Opportunity Analysis", "Competitor Analysis", "Customer and Audience Research", "Market Sizing", "Pricing Research", "Product and Service Validation"],
  primaryCtaLabel: "Book a free discovery call", primaryCtaHref: "/book",
  secondaryCtaLabel: "See what's included →", secondaryCtaHref: "#contact",
  heroNote: "We also push back when a client asks for research broader than what their actual decision requires. A 40-page report covering every possible angle isn't more useful than a focused 15-page report answering the specific question at hand — it's usually just slower and more expensive to produce, without adding proportional value.",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "",
  audienceIntro: "",
  audience: [],
  includedTitle: "Our Market Research Services",
  includedIntro: "Whether you need a focused competitive market analysis or a full market feasibility study before a launch, our research is built to answer a specific business question — not just produce a generic report. Scope matters here more than most clients expect at the outset. A pricing decision might only need focused competitor and customer research; a market entry decision usually needs the fuller feasibility study, including market sizing and demand validation. We size the engagement to the decision it's supporting, rather than defaulting every project to the largest possible scope.",
  subServices: [
    { title: "Market Opportunity Analysis", desc: "Identifying where genuine demand exists." },
    { title: "Competitor Analysis", desc: "Understanding how competitors position, price, and market themselves." },
    { title: "Customer and Audience Research", desc: "Uncovering what your target customers actually want." },
    { title: "Industry Research", desc: "Sector-level trends, regulation, and structural shifts." },
    { title: "Market Sizing", desc: "Quantifying the addressable opportunity for a product or service." },
    { title: "Trend Analysis", desc: "Spotting shifts in demand before they become obvious." },
    { title: "SWOT Analysis", desc: "A structured view of strengths, weaknesses, opportunities, and threats." },
    { title: "Product and Service Validation", desc: "Testing demand before you commit budget to launch." },
    { title: "Pricing Research", desc: "Understanding what the market will actually bear." },
    { title: "Business Intelligence Reports", desc: "Consolidated findings your leadership team can act on." },
  ],
  approachTitle: "Our Market Research Process",
  approachIntro: "Good research depends on structure. Our market research process is designed to move from open questions to specific, actionable recommendations. This process is what keeps our industry research services grounded in decisions you can actually act on. Where possible, we combine primary research — direct interviews or surveys with your actual target customers — with secondary industry data, because published market reports can miss the specific nuances of your niche or region.",
  approach: [
    { title: "Business goals discovery", desc: "Understanding the decision this research needs to support." },
    { title: "Research planning", desc: "Choosing the right methodology for your questions and budget." },
    { title: "Primary and secondary research", desc: "Combining new data collection with existing industry data." },
    { title: "Data collection", desc: "Surveys, interviews, and market data gathering as needed." },
    { title: "Competitor benchmarking", desc: "Direct comparison against named competitors." },
    { title: "Market analysis", desc: "Turning raw data into patterns and conclusions." },
    { title: "Insight generation", desc: "Translating findings into what they actually mean for your business." },
    { title: "Strategic recommendations", desc: "Concrete next steps, not just observations." },
    { title: "Final reporting and consultation", desc: "A walkthrough of findings with your team, not just a PDF." },
  ],
  benefitsTitle: "Why Market Research Matters",
  benefitsIntro: "Every major business decision — pricing, launch, expansion, positioning — carries less risk when it's informed by real market intelligence instead of internal opinion. Businesses that skip consumer research before a launch often pay for that gap later, through wasted ad spend or a product that misses what the market actually wants. The cost of research is almost always smaller than the cost of the decision it's informing — a few weeks of research is inexpensive compared to a product launch, a market entry, or a repositioning effort that doesn't land. Market research helps you:",
  benefits: [
    "Understand customer needs before you build or launch",
    "Identify market opportunities competitors haven't captured",
    "Reduce business risk on major decisions",
    "Analyze competitors with real data instead of assumptions",
    "Validate products and services before committing budget",
    "Improve marketing strategies using real audience insight",
    "Support expansion decisions with market sizing data",
    "Increase ROI through informed, evidence-based planning",
  ],
  useCasesTitle: "Industries We Serve",
  useCasesIntro: "Our research team has worked across a wide range of sectors. Each sector has different data sources and buyer behavior, which is why our industry analysis always starts by understanding how your specific category actually works. B2B and B2C research also diverge significantly in method — B2B research typically leans on decision-maker interviews and account-level data, while B2C research relies more heavily on survey sampling and behavioral data at scale.",
  useCases: [
    "Technology and SaaS",
    "Healthcare",
    "E-commerce",
    "Manufacturing",
    "Real Estate",
    "Education",
    "Retail",
    "Financial Services",
    "Startups",
    "Professional Services",
  ],
  whyTitle: "Why Choose UnexusAI for Market Research?",
  whyIntro: "Businesses comparing market research company near me options are usually looking for the same thing: analysts who deliver conclusions, not just raw data. If you're evaluating a market research consultation, ask what decision the research is meant to support — the best research projects start with a clear business question. A vague brief tends to produce a vague, unfocused report; the more precisely you can define what you're trying to decide, the more directly useful the research findings will be.",
  whyCards: [],
  whyUs: [
    "Experienced research analysts across multiple industries",
    "Customized research methodology for each project",
    "Data-driven insights, not generic templates",
    "Actionable business recommendations, not just findings",
    "Comprehensive competitor analysis as standard",
    "Transparent reporting throughout the project",
    "Industry-specific expertise built from prior engagements",
    "Real support for strategic decision-making, not just a report handoff",
  ],
  faqIntro: "",
  faqs: [
    { q: "What does market research include?", a: "Depending on scope, it can include competitor analysis, customer research, market sizing, trend analysis, pricing research, and strategic recommendations based on the findings." },
    { q: "How long does a market research project take?", a: "Focused projects typically take 2–4 weeks. Larger business market research engagements involving primary data collection can take longer." },
    { q: "Do you provide competitor analysis?", a: "Yes, competitor analysis services are included in most engagements, benchmarking your positioning, pricing, and marketing against named competitors." },
    { q: "Can you research a specific industry or niche?", a: "Yes. Our team adapts methodology and data sources to your specific industry, including niche or emerging markets." },
    { q: "How will market research help my business grow?", a: "It reduces the risk of costly decisions — like a mistimed launch or mispriced product — by grounding strategy in real customer and market data before you commit budget." },
    { q: "Do you provide customized research reports?", a: "Yes. Every report is built around your specific business question, with a business intelligence consultation to walk through findings and recommendations." },
    { q: "Is market research worth it for a small business or startup?", a: "Often more so than for larger companies, since smaller businesses typically have less margin for a launch or positioning decision that misses. A focused, lower-cost research scope can still validate the core assumptions before you commit meaningful budget." },
    { q: "Do you conduct research outside the UAE?", a: "Yes. We regularly research international and multi-region markets for clients expanding beyond their home market, adapting methodology to data availability and cultural context in each region." },
  ],
  closing: "Schedule a free consultation to discuss your research objectives. Our team will help you define the right research scope and deliver actionable market intelligence, competitor insights, and customer research that reduce risk and support confident business decisions.",
};

export const SVC_GEO_DEFAULTS = {
  num: "04", accent: "#6366f1",
  badge: "Service 04 — Generative Engine Optimisation",
  headline: "Search is splitting in two.",
  body: "People still type queries into Google — but increasingly, they're also asking ChatGPT, Google AI Overviews, Gemini, Perplexity, and Claude directly, and getting an answer without ever clicking a link. Generative Engine Optimization is how your brand earns a place inside those AI-generated answers, not just in the traditional blue links beneath them.",
  specialisms: ["GEO Strategy and Consulting", "AI Visibility Audit", "AI Content Optimization", "Structured Data Implementation", "AI Citation Optimization", "Topical Authority Development"],
  primaryCtaLabel: "Check your GEO visibility", primaryCtaHref: "#contact",
  secondaryCtaLabel: "Book a 30-min call →", secondaryCtaHref: "/book",
  heroNote: "It's worth being direct about where GEO still has real limits: no agency can guarantee a specific citation inside a specific AI answer, because the underlying models are controlled by third parties and change frequently. What GEO can reliably do is stack the structural and content signals that make citation more likely — clear entity definition, well-structured answers, and demonstrable topical authority — the same fundamentals that also strengthen traditional SEO.",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "",
  audienceIntro: "",
  audience: [],
  includedTitle: "Our Generative Engine Optimization (GEO) Services",
  includedIntro: "As a specialist GEO agency, our GEO services include the ones below. If you've already invested in traditional SEO, GEO services extend that investment into the AI-powered search platforms your traditional rankings don't reach.",
  subServices: [
    { title: "GEO Strategy and Consulting", desc: "A roadmap for improving AI search visibility." },
    { title: "AI Visibility Audit", desc: "Assessing where and how your brand currently appears (or doesn't) in AI answers." },
    { title: "AI Content Optimization", desc: "Restructuring content so LLMs can parse and cite it accurately." },
    { title: "Entity and Knowledge Graph Optimization", desc: "Strengthening how AI systems understand who you are." },
    { title: "Structured Data (Schema) Implementation", desc: "Machine-readable signals that support AI comprehension." },
    { title: "AI Citation Optimization", desc: "Increasing the likelihood your brand is referenced as a source." },
    { title: "Technical SEO for AI Search", desc: "The crawlability and content-access foundations AI systems depend on." },
    { title: "Topical Authority Development", desc: "Building depth on your core topics, not just isolated pages." },
    { title: "AI Search Performance Monitoring", desc: "Tracking how often and how accurately you're being cited." },
    { title: "Ongoing GEO Optimization", desc: "This is a moving target, not a one-time project." },
  ],
  approachTitle: "How Our GEO Process Works",
  approachIntro: "Generative Engine Optimization requires a different diagnostic process than traditional SEO, because the \"results page\" is now a synthesized answer rather than a ranked list. This is deliberately close to how we approach AI SEO services more broadly — GEO builds on solid SEO fundamentals rather than replacing them. Sites with thin technical SEO or weak site architecture typically need those fundamentals addressed first — AI crawlers face the same access and clarity barriers traditional search crawlers do, just with an additional layer of comprehension on top.",
  approach: [
    { title: "Business and AI visibility assessment", desc: "Testing how AI platforms currently describe your brand and category." },
    { title: "AI search opportunity analysis", desc: "Identifying the questions where you should be cited but aren't." },
    { title: "Content audit and optimization", desc: "Restructuring existing content for clarity and citability." },
    { title: "Entity and structured data implementation", desc: "Technical signals that reinforce who you are and what you offer." },
    { title: "Technical improvements", desc: "Ensuring AI crawlers can actually access and parse your content." },
    { title: "Authority and citation building", desc: "Earning the third-party mentions AI systems rely on for trust." },
    { title: "Performance tracking", desc: "Monitoring AI citations and mentions over time." },
    { title: "Continuous optimization", desc: "Adjusting as AI platforms and their ranking signals evolve." },
  ],
  benefitsTitle: "Benefits of Generative Engine Optimization",
  benefitsIntro: "Being cited inside an AI-generated answer carries a different kind of authority than a traditional search listing — it arrives already filtered through the AI as a trusted source. Businesses that treat AI search optimization as optional today are likely to be playing catch-up within the next few years, as more search volume shifts toward AI-generated answers. Even a small share of AI-referred visitors tends to convert well, since they've arrived after an AI system has already summarized and effectively pre-qualified your offer before the click. AI visibility optimization helps you:",
  benefits: [
    "Improve visibility in AI-generated answers across major platforms",
    "Increase brand mentions and citations in AI search results",
    "Strengthen topical authority around your core services",
    "Build trust with AI search engines through consistent, structured signals",
    "Enhance traditional SEO performance as a side effect of stronger content",
    "Improve content discoverability across both traditional and AI search",
    "Future-proof your digital presence as search behavior continues to shift",
    "Generate qualified traffic from AI-powered search referrals",
  ],
  useCasesTitle: "AI Platforms We Optimize For",
  useCasesIntro: "Our GEO strategies are built around visibility across the platforms your customers are actually using. Each platform sources and weighs information differently, which is why effective LLM optimization requires platform-specific tactics, not a single generic approach applied everywhere. Perplexity, for instance, leans heavily on live web citations, while ChatGPT and Gemini draw more on a mix of training data and connected search — meaning a strategy tuned only for one platform can quietly underperform on the others.",
  useCases: [
    "ChatGPT",
    "Google AI Overviews",
    "Google AI Mode",
    "Gemini",
    "Perplexity AI",
    "Claude",
    "Microsoft Copilot",
    "Grok",
  ],
  whyTitle: "Why Choose UnexusAI for GEO Services?",
  whyIntro: "Businesses evaluating a GEO agency near me are essentially asking one question: does this team actually understand how AI search differs from traditional SEO, or are they relabeling old SEO tactics? If you're comparing GEO audit services, ask to see how a provider actually measures AI citation frequency — it's a newer discipline, and methodology varies significantly between agencies.",
  whyCards: [],
  whyUs: [
    "AI-first SEO expertise, built specifically around how LLMs source information",
    "Customized GEO strategies rather than generic checklists",
    "Combined technical and content optimization",
    "Hands-on structured data implementation",
    "Transparent reporting on AI citations and mentions",
    "Continuous monitoring as AI platforms evolve",
    "A clear focus on measurable AI visibility, not vague promises",
    "A long-term digital growth strategy, not a one-off audit",
  ],
  faqIntro: "",
  faqs: [
    { q: "What is Generative Engine Optimization (GEO)?", a: "GEO is the practice of optimizing content, structured data, and entity signals so your brand is more likely to be cited or referenced in answers generated by AI platforms like ChatGPT, Gemini, and Google AI Overviews." },
    { q: "How is GEO different from traditional SEO?", a: "Traditional SEO targets ranking positions on a search results page. Answer Engine Optimization (AEO) and GEO target being cited or summarized inside an AI-generated answer, which relies more heavily on entity clarity, structured data, and topical authority." },
    { q: "Which AI platforms does GEO target?", a: "Our work covers ChatGPT, Google AI Overviews, Google AI Mode, Gemini, Perplexity, Claude, Microsoft Copilot, and Grok." },
    { q: "How long does it take to see results?", a: "Early signals like improved crawlability and structured data indexing can appear within weeks. Consistent AI citations typically build over 2–4 months as authority signals strengthen." },
    { q: "Do I need GEO if I already invest in SEO?", a: "Yes. Strong traditional SEO is a good foundation, but it doesn't guarantee AI citation — GEO adds the entity, structure, and content signals AI systems specifically rely on." },
    { q: "How do you measure AI visibility?", a: "Through structured testing of AI platforms against target queries, tracking citation frequency, accuracy of brand representation, and referral traffic from AI search sources." },
    { q: "Can GEO guarantee a specific AI platform will cite my brand?", a: "No, and any provider promising a guarantee here isn't being straight with you — AI platforms control their own citation logic and update it frequently. What we can commit to is strengthening every signal within our control: content clarity, entity data, structured data, and authority." },
    { q: "Does GEO replace the need for a Google Business Profile or traditional listings?", a: "No. Entity signals from listings, directories, and profiles feed into how confidently AI systems can identify and describe your business, so they remain part of a complete GEO strategy rather than something GEO makes redundant." },
  ],
  closing: "Book a free GEO consultation to see how your brand currently appears — or doesn't — across AI-powered search platforms. We'll run an AI visibility audit and outline a strategy combining content, technical optimization, structured data, and entity authority to make your brand more discoverable in AI-generated answers.",
};

export const SVC_SEO_DEFAULTS = {
  num: "02", accent: "#06b6d4",
  badge: "Service 02 — Search Engine Optimisation",
  headline: "Rankings that don't produce leads aren't a strategy — they're a vanity metric.",
  body: "As a performance-driven SEO company, UnexusAI builds SEO services around one outcome: qualified organic traffic that turns into business, not just movement on a rank tracker.",
  specialisms: ["SEO Audit", "Keyword Research and Strategy", "Technical SEO", "Local SEO", "Content Optimization", "Link Building"],
  primaryCtaLabel: "Get a free SEO audit", primaryCtaHref: "/audit",
  secondaryCtaLabel: "Book a 30-min call →", secondaryCtaHref: "/book",
  heroNote: "The starting audit is also where we set realistic expectations, rather than a generic pitch. A site with strong existing domain authority but weak content structure will see faster results from content and internal linking work; a newer domain in a competitive niche needs to budget more time for authority building before rankings move meaningfully — and we'll tell you which situation you're in before any work begins.",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "",
  audienceIntro: "",
  audience: [],
  includedTitle: "Our SEO Services",
  includedIntro: "Whether you need a full enterprise SEO program or a focused SEO audit to identify what's currently holding your site back, our approach adapts to your site's size and current maturity. Not every site needs the same starting point. A newer site with thin content usually gets the fastest wins from a focused content and keyword strategy, while an established site with years of pages typically has more to gain from a technical audit — fixing crawl issues, cleaning up duplicate content, and consolidating pages competing against each other for the same keywords.",
  subServices: [
    { title: "SEO Audit", desc: "A full technical, on-page, and content assessment of your current site." },
    { title: "Keyword Research and Strategy", desc: "Targeting terms your actual customers search, not just high-volume vanity keywords." },
    { title: "On-Page SEO", desc: "Content, metadata, and internal structure optimized for both users and search engines." },
    { title: "Technical SEO", desc: "Site speed, crawlability, indexation, and structured data." },
    { title: "Local SEO", desc: "Google Business Profile and local pack optimization for location-based businesses." },
    { title: "Ecommerce SEO", desc: "Category, product, and collection page optimization for online stores." },
    { title: "Content Optimization", desc: "Improving existing content to better match search intent." },
    { title: "Link Building", desc: "Earning authoritative backlinks through white-hat outreach." },
    { title: "SEO Performance Monitoring", desc: "Tracking rankings, traffic, and conversions continuously." },
    { title: "Monthly Reporting", desc: "Clear, honest reporting tied to business impact, not just keyword positions." },
  ],
  approachTitle: "Our SEO Process",
  approachIntro: "Sustainable rankings come from a disciplined process, not shortcuts that work until the next algorithm update. This is the same structured process behind our SEO audit services and SEO consulting engagements — no step gets skipped because it's inconvenient. Skipping technical optimization to chase content volume is one of the more common mistakes we see in-house teams make — publishing more pages onto a technically broken foundation rarely moves rankings, and sometimes actively hurts them.",
  approach: [
    { title: "Website audit", desc: "Identifying technical issues, content gaps, and missed opportunities." },
    { title: "Competitor analysis", desc: "Understanding who currently outranks you and why." },
    { title: "Keyword research", desc: "Mapping search terms to actual buyer intent." },
    { title: "Technical optimization", desc: "Fixing the foundational issues that limit rankings." },
    { title: "On-page improvements", desc: "Content, headings, and metadata aligned to target keywords." },
    { title: "Content strategy", desc: "Building the content needed to compete for priority terms." },
    { title: "Authority building", desc: "Earning links and mentions that support long-term rankings." },
    { title: "Performance tracking", desc: "Monitoring rankings, traffic, and conversions monthly." },
    { title: "Continuous optimization", desc: "SEO doesn't stop after the first few months of gains." },
  ],
  benefitsTitle: "Benefits of Professional SEO Services",
  benefitsIntro: "Unlike paid ads, organic visibility built through SEO keeps generating traffic long after the initial work is done — which is what makes organic traffic growth one of the highest-ROI channels available over time. Most businesses that abandon SEO too early do so because they expected paid-ad speed from an organic channel — organic SEO services are a compounding asset, not a quick campaign. It's fair to set expectations honestly here: SEO is rarely the right channel if you need leads within the next two weeks — that's what paid media is for. SEO is the right channel if you want a lower cost per lead twelve months from now than you have today. Professional SEO delivers:",
  benefits: [
    "Higher Google rankings for terms your customers actually search",
    "Increased organic traffic without paying per click",
    "Better lead generation from search intent that's already qualified",
    "Improved user experience as a byproduct of technical optimization",
    "Stronger online visibility across your target market",
    "Higher conversion rates from more relevant traffic",
    "Long-term ROI that compounds rather than resets each month",
    "Sustainable business growth independent of ad budgets",
  ],
  useCasesTitle: "Industries We Serve",
  useCasesIntro: "Our SEO team has delivered results across a broad range of sectors. Each industry has different search behavior and competitive intensity, which is why our SEO strategy is built around your specific market rather than a generic playbook. A local service business and a national SaaS platform are effectively playing two different games — one is competing on proximity and local intent signals, the other on domain authority and topical depth at scale.",
  useCases: [
    "Healthcare",
    "E-commerce",
    "SaaS",
    "Manufacturing",
    "Real Estate",
    "Education",
    "Professional Services",
    "Local Businesses",
    "Startups",
    "Enterprise Organizations",
  ],
  whyTitle: "Why Choose UnexusAI for SEO?",
  whyIntro: "Businesses comparing the best SEO agency options are usually trying to filter out agencies that overpromise rankings and underdeliver on traffic that actually converts. If you're evaluating an SEO company near me, ask what they consider a successful outcome — \"more traffic\" and \"more qualified leads\" are very different answers.",
  whyCards: [],
  whyUs: [
    "Experienced SEO specialists across technical, on-page, and content SEO",
    "Customized SEO strategies based on your market and competitors",
    "White-hat optimization techniques, with no shortcuts that risk penalties",
    "Combined technical and content expertise under one team",
    "Transparent monthly reporting tied to real business metrics",
    "AI-powered SEO insights layered into research and strategy",
    "Continuous optimization, not a set-and-forget engagement",
    "A consistently ROI-focused approach to every recommendation",
  ],
  faqIntro: "",
  faqs: [
    { q: "How long does SEO take to show results?", a: "Most sites begin seeing meaningful movement within 3–4 months, with stronger, more sustainable gains typically building over 6–12 months depending on competition and starting point." },
    { q: "What's included in your SEO services?", a: "A full SEO audit, keyword research, technical SEO, on-page optimization, content strategy, link building, and monthly performance reporting are included as standard." },
    { q: "Do you provide local SEO?", a: "Yes. Local SEO services, including Google Business Profile optimization, are available for location-based and multi-location businesses." },
    { q: "Can SEO help generate more leads?", a: "Yes. By targeting keywords tied to real buyer intent, SEO brings in visitors who are already looking for what you offer, which typically converts better than broad awareness traffic." },
    { q: "Do you offer monthly SEO reports?", a: "Yes. Monthly reporting covers rankings, traffic, and conversions, explained in plain language rather than raw data exports." },
    { q: "How do you measure SEO success?", a: "Primarily through organic traffic growth, keyword ranking improvements, and — most importantly — leads and conversions generated from organic search, not rankings in isolation." },
    { q: "Will an algorithm update undo my rankings?", a: "Sites built on white-hat, fundamentals-first SEO are far more resilient to algorithm updates than sites relying on shortcuts like link schemes or keyword stuffing. We can't promise zero fluctuation — no honest agency can — but the strategies we use are specifically chosen to hold up over successive Google updates rather than chase a temporary ranking spike." },
  ],
  closing: "Book a free SEO consultation to uncover growth opportunities on your website. We'll run an SEO audit, benchmark you against competitors, and outline a customized, data-driven strategy to improve search visibility, attract qualified traffic, and generate sustainable long-term business growth.",
};

export const SVC_SEM_DEFAULTS = {
  num: "03", accent: "#f97316",
  badge: "Service 03 — Search Engine Marketing",
  headline: "Show up the moment someone's ready to buy — at the top of the results, on demand.",
  body: "Search Engine Marketing puts your business in front of high-intent searchers through paid search, shopping, and remarketing — traffic you can switch on today and measure to the dirham. We run Google Ads campaigns built around one thing: profitable, trackable leads, not clicks that look busy in a dashboard.",
  specialisms: ["Google Ads", "Paid Search (PPC)", "Shopping Ads", "Display & Remarketing", "Landing Page CRO", "Conversion Tracking"],
  primaryCtaLabel: "Get a free audit", primaryCtaHref: "#contact",
  secondaryCtaLabel: "Book a 30-min call →", secondaryCtaHref: "/book",
  heroNote: "SEM is the fastest channel to switch on, but it's rented attention — the leads stop the day the budget does. We're upfront about when paid search is the right tool (you need leads now, or want to test demand quickly) versus when SEO or GEO is the better long-term investment. Most businesses need a blend, and we'll tell you the split that fits your goals.",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "",
  audienceIntro: "",
  audience: [],
  includedTitle: "Our Search Engine Marketing Services",
  includedIntro: "Whether you need a single Google Ads account rebuilt or a full paid-search program across search, shopping, and remarketing, we scope campaigns around your cost-per-lead target and the budget you're comfortable spending — not a percentage of spend that rewards us for spending more of your money.",
  subServices: [
    { title: "Google Ads Management", desc: "Full setup and ongoing management of search, shopping, and display campaigns." },
    { title: "Keyword & Search-Term Strategy", desc: "Targeting the commercial-intent searches that convert, and cutting the wasted spend that doesn't." },
    { title: "Ad Copywriting & Testing", desc: "Writing and continuously testing ads that earn the click from the right searcher." },
    { title: "Landing Page & Conversion Optimization", desc: "Making sure the traffic you pay for actually converts once it lands." },
    { title: "Shopping & E-commerce Ads", desc: "Product feed setup and Shopping campaigns for online stores." },
    { title: "Remarketing & Display", desc: "Bringing back visitors who didn't convert the first time." },
    { title: "Conversion Tracking & Attribution", desc: "Proper tracking so every dirham of spend is tied to a lead or sale." },
    { title: "Budget & Bid Management", desc: "Allocating spend to what's working and pulling it from what isn't." },
    { title: "Competitor & Auction Analysis", desc: "Understanding who you're bidding against and where the gaps are." },
    { title: "Performance Reporting", desc: "Clear reporting on cost per lead, ROAS, and what we're changing next." },
  ],
  approachTitle: "Our Search Engine Marketing Process",
  approachIntro: "Paid search rewards discipline — tight targeting, honest tracking, and constant iteration beat a big budget spent carelessly. Our process is built to get you to a profitable cost per lead as quickly as the data allows, then scale what works.",
  approach: [
    { title: "Account & goal audit", desc: "Reviewing your current spend, tracking, and what a lead is actually worth to you." },
    { title: "Keyword & competitor research", desc: "Mapping the searches worth bidding on and the ones to avoid." },
    { title: "Campaign structure & setup", desc: "Building tightly themed campaigns and ad groups for control and quality score." },
    { title: "Tracking implementation", desc: "Setting up conversion tracking and attribution before spending a dirham." },
    { title: "Launch & early optimization", desc: "Going live on a controlled budget and cutting waste fast." },
    { title: "Testing & scaling", desc: "Testing ads, landing pages, and bids, then scaling what's profitable." },
    { title: "Reporting & review", desc: "Monthly reporting on cost per lead and ROAS, with clear next steps." },
    { title: "Ongoing management", desc: "Continuous optimization as auctions, competitors, and seasonality shift." },
  ],
  benefitsTitle: "Benefits of Search Engine Marketing",
  benefitsIntro: "Unlike organic channels that build over months, paid search delivers qualified traffic the day it goes live — and every dirham is measurable. Used well, it's the fastest way to turn budget into booked leads. SEM delivers:",
  benefits: [
    "Immediate visibility at the top of search results",
    "Traffic you can switch on, scale, or pause on demand",
    "Leads from searchers with clear buying intent",
    "Full, dirham-level measurement of spend and return",
    "Fast testing of offers, messaging, and demand",
    "Precise targeting by keyword, location, and device",
    "Remarketing to visitors who didn't convert",
    "A predictable cost per lead you can plan around",
  ],
  useCasesTitle: "Industries We Run Paid Search For",
  useCasesIntro: "Paid search works across almost any business with commercial-intent demand — the strategy just changes by how customers search and what a lead is worth. Common sectors we manage campaigns for:",
  useCases: [
    "Real Estate",
    "Healthcare & Clinics",
    "E-commerce",
    "Home Services",
    "Professional Services",
    "Education",
    "Hospitality & F&B",
    "B2B & SaaS",
    "Local Businesses",
    "Startups",
  ],
  whyTitle: "Why Choose UnexusAI for SEM?",
  whyIntro: "Businesses comparing a Google Ads agency near me usually want the same thing: someone accountable for cost per lead, not just clicks and impressions. Ask any provider how they define a successful month — if the answer is about spend or traffic rather than leads and return, keep looking.",
  whyCards: [],
  whyUs: [
    "Google Ads specialists focused on cost per lead, not vanity clicks",
    "Proper conversion tracking on every account before spend starts",
    "Transparent reporting tied to leads and ROAS",
    "No long lock-in contracts or spend-based markups that reward waste",
    "Landing page and CRO expertise under the same roof",
    "Paid search that connects to your SEO, GEO, and website strategy",
    "Continuous testing and optimization, not set-and-forget",
    "A consistently ROI-focused approach to every dirham",
  ],
  faqIntro: "",
  faqs: [
    { q: "How is SEM different from SEO?", a: "SEO earns unpaid rankings over time; SEM buys visibility at the top of the results instantly through paid ads. SEO compounds and lowers cost per lead long-term; SEM delivers leads immediately and can be scaled or paused on demand. Most businesses benefit from running both." },
    { q: "How much should I budget for Google Ads?", a: "It depends on your industry, competition, and cost per lead, but we help you start with a controlled test budget, prove a profitable cost per lead, and scale from there — rather than committing large spend before the data justifies it." },
    { q: "How quickly will I see results?", a: "Paid search can start driving clicks and leads within days of launch. The first few weeks are spent optimizing toward a profitable cost per lead, with performance typically stabilizing over the first one to two months." },
    { q: "Do you manage the ad spend or do we pay Google directly?", a: "You pay Google directly for the ad spend and retain full ownership of the account. We manage the strategy, setup, and optimization — so the account, data, and history always stay yours." },
    { q: "What's a good cost per lead or ROAS?", a: "It varies widely by industry and margin, which is why we start by working out what a lead or sale is actually worth to you, then optimize toward a target that's profitable for your business rather than a generic benchmark." },
    { q: "Can you run ads for a local business?", a: "Yes. Local campaigns with tight geographic targeting, call extensions, and location-specific landing pages are one of the highest-ROI uses of paid search for service businesses." },
    { q: "Do you also handle the landing pages?", a: "Yes. Because we build websites too, we can create or optimize the landing pages your ads point to — which is often where the biggest gains in conversion rate come from." },
    { q: "Will you lock me into a long contract?", a: "No. We work on transparent, rolling terms and don't take a percentage of ad spend, so our incentive is a better cost per lead — not persuading you to spend more." },
  ],
  closing: "Book a free SEM consultation and we'll audit your account (or set one up), map the highest-intent searches worth bidding on, and outline a paid-search plan built around a profitable, trackable cost per lead.",
};

export const SERVICES_CARDS_DEFAULTS = {
  items: [
    { title: "Digital Marketing", desc: "SEO, paid ads, and email — run as one joined-up system, not three separate jobs." },
    { title: "Search Engine Optimisation", desc: "Technical SEO, content, and authority building that grows rankings and revenue — not vanity traffic." },
    { title: "Search Engine Marketing", desc: "Google Ads and paid search that put you at the top of results — and turn clicks into tracked, profitable leads." },
    { title: "Generative Engine Optimisation", desc: "Get your business recommended by ChatGPT, Perplexity, and Gemini — not just found on Google." },
    { title: "Website Development", desc: "Fast, conversion-focused websites built to turn visitors into leads — not just look good." },
    { title: "AI Automation", desc: "We find the repetitive work eating your team's week and build AI that takes it off their plate — permanently." },
    { title: "AI Training", desc: "Practical, hands-on sessions so your team actually uses AI tools — not just knows they exist." },
    { title: "Market Research", desc: "Know exactly who you're talking to, what they want, and how to reach them — before you spend a penny on marketing." },
  ],
};

SECTIONS.push(
  {
    key: "services.overview", label: "Overview page", group: "Services",
    fields: [
      { name: "heroEyebrow", label: "Hero eyebrow", type: "text" },
      { name: "heroTitle", label: "Hero title", type: "text" },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
      { name: "heroPrimaryLabel", label: "Hero — primary button label", type: "text" },
      { name: "heroPrimaryHref", label: "Hero — primary button link", type: "text" },
      { name: "heroSecondaryLabel", label: "Hero — secondary button label", type: "text" },
      { name: "heroSecondaryHref", label: "Hero — secondary button link", type: "text" },
      { name: "gridHeading", label: "Services grid — heading", type: "text" },
      { name: "gridIntro", label: "Services grid — intro", type: "textarea" },
      { name: "whyBadge", label: "Why section — badge", type: "text" },
      { name: "whyTitle", label: "Why section — title", type: "text" },
      { name: "whyCards", label: "Why section — cards", type: "items", itemLabel: "card", itemFields: [
        { name: "title", label: "Title", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
      ...seoMetaFields(),
    ],
    defaults: SERVICES_OVERVIEW_DEFAULTS,
  },
  serviceSection("services.digital-marketing", "Digital Marketing", SVC_DIGITAL_MARKETING_DEFAULTS),
  serviceSection("services.website-development", "Website Development", SVC_WEBSITE_DEVELOPMENT_DEFAULTS),
  serviceSection("services.ai-automation", "AI Automation", SVC_AI_AUTOMATION_DEFAULTS),
  serviceSection("services.ai-training", "AI Training", SVC_AI_TRAINING_DEFAULTS),
  serviceSection("services.market-research", "Market Research", SVC_MARKET_RESEARCH_DEFAULTS),
  serviceSection("services.geo", "GEO", SVC_GEO_DEFAULTS),
  serviceSection("services.seo", "SEO", SVC_SEO_DEFAULTS),
  serviceSection("services.sem", "SEM", SVC_SEM_DEFAULTS),
  {
    key: "services.cards", label: "Service cards (name + info)", group: "Services",
    fields: [
      { name: "items", label: "Cards — in grid order", type: "items", itemLabel: "card", help: "Name + one-line description on each service card (homepage + /services). Keep order: Digital Marketing, Website Development, AI Automation, AI Training, Market Research, GEO, SEO.", itemFields: [
        { name: "title", label: "Service name", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
      ] },
    ],
    defaults: SERVICES_CARDS_DEFAULTS,
  },
);

export function getSectionSchema(key: string): CmsSection | undefined {
  return SECTIONS.find((s) => s.key === key);
}
