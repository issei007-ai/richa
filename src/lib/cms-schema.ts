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
    { name: "approach", label: "Approach steps", type: "items", itemLabel: "step", itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ] },
    { name: "whyTitle", label: "Why us — title", type: "text" },
    { name: "whyCards", label: "Why us — cards (leave empty to use the default checklist layout)", type: "items", itemLabel: "card", itemFields: [
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ] },
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
  primaryCtaLabel: "Get a free audit", primaryCtaHref: "/audit",
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
  num: "02", accent: "#06b6d4",
  badge: "Service 02 — Website Development",
  headline: "Your website is live. But is it actually working?",
  body: "Most businesses in the UAE have a website that looks decent but converts poorly. Visitors land, scroll, and leave — without filling a form, making a booking, or picking up the phone. We build websites in Next.js that are designed around one thing: turning the traffic you already have into customers.",
  specialisms: ["UI/UX Design", "Next.js Development", "CRO", "SEO-Ready", "CMS Integration", "Performance"],
  primaryCtaLabel: "Get a free audit", primaryCtaHref: "/audit",
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
  num: "03", accent: "#7c3aed",
  badge: "Service 03 — AI Automation",
  headline: "Your team is spending hours on work that shouldn't need a human.",
  body: "Lead follow-ups, appointment scheduling, data entry, customer queries — businesses across the UAE are paying people to do things AI can handle faster, more accurately, and around the clock. We find exactly what's slowing your team down and build automation that takes it off their plate permanently.",
  specialisms: ["AI Agents", "WhatsApp Automation", "RAG Pipelines", "CRM Integration", "Voice AI", "Lead Qualification"],
  primaryCtaLabel: "Book a free discovery call", primaryCtaHref: "/book",
  secondaryCtaLabel: "See how it works →", secondaryCtaHref: "#contact",
  heroNote: "",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "For teams doing manually what should already be automated.",
  audienceIntro: "If your team is spending time on any of these, there's a faster way.",
  audience: [
    { title: "Real estate", desc: "Agents manually qualifying leads, chasing follow-ups, and sending the same WhatsApp messages 50 times a day." },
    { title: "Healthcare & wellness", desc: "Receptionists spending half their day on appointment reminders and rebooking calls." },
    { title: "Hospitality & F&B", desc: "Reservation enquiries sitting unanswered after hours, losing bookings to competitors who respond instantly." },
    { title: "Retail & e-commerce", desc: "Customer service teams buried in repetitive queries — order status, returns, product questions." },
    { title: "Startups & scale-ups", desc: "Trying to scale operations without scaling headcount — and hitting a wall doing it manually." },
  ],
  includedTitle: "AI built around your actual bottlenecks — not a generic demo.",
  includedIntro: "We start by finding what's worth automating. Then we build it, test it, and keep it running.",
  subServices: [
    { title: "AI Agents", desc: "Custom-built agents that handle the tasks your team shouldn't be doing — lead qualification, outreach, data processing, internal workflows. Built around how you actually work.", points: ["Lead qualification & scoring agents", "Automated outreach & follow-up sequences", "Internal workflow automation", "Multi-step agent orchestration"] },
    { title: "WhatsApp & Chat Automation", desc: "WhatsApp is the primary communication channel for businesses across the UAE and Middle East. We build automated flows that respond instantly, qualify leads, and book appointments — 24/7.", points: ["WhatsApp Business API integration", "Automated lead qualification flows", "Appointment booking & reminders", "Handoff to human agent when needed"] },
    { title: "RAG Pipelines", desc: "An AI that only knows what it was trained on isn't much use for your business. RAG pipelines connect AI to your own data — product catalogues, policies, past conversations — so answers are accurate, not guesses.", points: ["Custom knowledge base setup", "Document & data ingestion pipelines", "Accurate, source-grounded responses", "Regular knowledge base updates"] },
    { title: "Voice AI", desc: "A voice system that picks up, asks the right questions, and either books the appointment or routes to the right person — running around the clock without adding headcount.", points: ["Inbound call handling & qualification", "Appointment scheduling via voice", "Arabic & English language support", "CRM integration & call logging"] },
    { title: "CRM & Tool Integration", desc: "Automation only works if it connects to the tools your team already uses. We integrate with your existing CRM, calendar, and communication stack — nothing siloed.", points: ["HubSpot, Salesforce & Zoho integration", "Calendar & booking system sync", "Slack, email & notification routing", "Custom API integrations as needed"] },
    { title: "Testing, Monitoring & Maintenance", desc: "AI systems drift over time — they need monitoring, retraining, and the occasional fix. We don't build and disappear. Ongoing support is part of how we work.", points: ["Pre-launch testing & quality assurance", "Performance monitoring & alerts", "Regular model updates & retraining", "Monthly performance review"] },
  ],
  approachTitle: "We find what's worth automating before we build anything.",
  approach: [
    { title: "Workflow audit — find what's actually worth automating", desc: "We spend time understanding how your team works — where the hours go, what's repetitive, and what has the highest impact if automated. Not everything should be automated. We'll tell you honestly what will and won't work." },
    { title: "Design — we map the automation before building it", desc: "We design the full logic flow — what triggers the automation, what it does, what happens at each decision point, and when it hands off to a human. You review and approve before a line of code is written." },
    { title: "Build — developed and integrated with your existing tools", desc: "We build the automation and connect it to your CRM, WhatsApp, calendar, or whatever tools you already use. Integration is usually most of the work — we treat it as the priority, not an afterthought." },
    { title: "Test — properly, before anything touches real customers", desc: "We test every scenario — including the edge cases — before going live. Getting this wrong erodes trust fast, so we don't rush it. You'll see it working before your customers do." },
    { title: "Monitor — we keep it running and improve it over time", desc: "After launch we monitor performance, catch anything unexpected, and keep improving. AI systems need ongoing attention — we stay on retainer so you're never left managing it alone." },
  ],
  whyTitle: "What makes this different from any other AI agency in the UAE.",
  whyCards: [
    { title: "WhatsApp-first for the UAE market", desc: "WhatsApp is how UAE businesses communicate. We build automation around it natively — not as a bolt-on to a system designed for email-first markets." },
    { title: "We audit before we build", desc: "Most agencies want to start building immediately. We spend time finding what's actually worth automating first — so you don't pay to automate the wrong thing." },
    { title: "Connected to your whole system", desc: "Because we also handle your marketing and website, automation connects to everything — not just one isolated tool. Leads captured on your site flow straight into your CRM and trigger the right follow-up automatically." },
    { title: "Built to last, not just to demo well", desc: "We test properly, monitor ongoing, and stay involved after launch. AI systems that aren't maintained break. We make sure yours doesn't." },
  ],
  faqIntro: "Things people usually ask before getting started.",
  faqs: [
    { q: "We're not a tech company. Can you still build this for us?", a: "Yes — most of our automation clients are not tech businesses. Hospitality groups, real estate agencies, healthcare clinics, retail brands. We handle all the technical complexity and build something your team can actually use without needing a developer on call." },
    { q: "How long does it take to build an AI automation?", a: "A straightforward WhatsApp qualification flow or appointment bot takes 2 to 4 weeks. Something with multiple agents, a RAG pipeline, and deep CRM integration is closer to 8 to 12 weeks. We give you a specific timeline after the workflow audit." },
    { q: "Which CRMs do you integrate with?", a: "HubSpot, Salesforce, Zoho, and Pipedrive are the most common. We also integrate with custom databases and internal systems. If you're already using a tool, we'll work with it rather than ask you to switch." },
    { q: "Does the AI support Arabic?", a: "Yes — Arabic and English language support is something we build for regularly in the UAE and wider Middle East market. It's planned from the design phase, not added at the end." },
    { q: "What happens if the AI makes a mistake?", a: "Every system we build has a human handoff point for cases the AI can't handle confidently. We also test extensively before launch and monitor ongoing. If something goes wrong after launch, we fix it fast — it's part of what the retainer covers." },
    { q: "Do you offer ongoing support after the build?", a: "Yes — and we recommend it. AI systems need monitoring, retraining, and regular updates. We offer monthly retainers that cover ongoing maintenance, performance reviews, and improvements as your business grows." },
  ],
  closing: "Hours back every week, faster response times, fewer manual errors — and a team that focuses on work that actually needs them, not the repetitive stuff AI can handle.",
};

export const SVC_AI_TRAINING_DEFAULTS = {
  num: "04", accent: "#f59e0b",
  badge: "Service 04 — AI Training",
  headline: "Your team has access to AI. That's not the same as using it.",
  body: "Most businesses across the UAE and India have already paid for AI tools — ChatGPT, Copilot, Gemini, whatever was trending at the time. Six months later, nothing has changed. The tools sit half-used in a browser tab while the team works exactly as they did before. The gap isn't access. It's knowing what to actually do with it, every single day.",
  specialisms: ["Hands-on Workshops", "Prompt Engineering", "Workflow Redesign", "AI Adoption", "Role-specific Training", "In-person & Remote"],
  primaryCtaLabel: "Book a free discovery call", primaryCtaHref: "/book",
  secondaryCtaLabel: "See how it works →", secondaryCtaHref: "#contact",
  heroNote: "",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "For teams with AI tools they're not getting value from.",
  audienceIntro: "If your team is nodding along to AI demos but nothing's changing at work — this is built for you.",
  audience: [
    { title: "Retail & e-commerce", desc: "Marketing teams using AI for captions once a week — and nothing else." },
    { title: "Real estate", desc: "Agents who know AI exists but don't use it to write listings, respond to leads, or prep for calls." },
    { title: "Healthcare & wellness", desc: "Admin teams doing manually what AI could handle — patient comms, scheduling prep, documentation." },
    { title: "Hospitality & F&B", desc: "Operations and marketing teams with no structured approach to using AI in their day-to-day." },
    { title: "Startups & scale-ups", desc: "Founders doing everything themselves — not using AI to multiply their output." },
  ],
  includedTitle: "Practical training that changes daily habits — not a one-day workshop people forget.",
  includedIntro: "Everything is built around your team, your tools, and your actual workflows. No generic slides.",
  subServices: [
    { title: "AI Needs Assessment", desc: "Before any training happens, we spend time understanding how your team works — where AI can save the most time, which tools fit, and what skill gaps exist across different roles.", points: ["Team workflow & tool audit", "Role-by-role gap analysis", "AI tool stack recommendations", "Training roadmap & priority order"] },
    { title: "Hands-on Workshops", desc: "In-person or remote sessions built around real tasks your team does every day — not theoretical examples. People learn by doing, not by watching slides.", points: ["In-person workshops across UAE & India", "Remote sessions for distributed teams", "Department-specific sessions", "Arabic & English delivery available"] },
    { title: "Prompt Engineering", desc: "The difference between an AI that's useful and one that wastes time is almost always how you ask. We teach the real habits — not a cheat sheet of prompts to copy and paste.", points: ["Role-specific prompt libraries", "Live prompt-writing practice", "Common mistakes & how to fix them", "Team prompt playbook delivered post-session"] },
    { title: "Workflow Redesign", desc: "We look at how your team actually works and rebuild the steps that AI is genuinely good at — rather than bolting it onto a process that was never designed for it.", points: ["Process mapping & AI integration points", "New workflow documentation", "Tool setup & configuration support", "Before/after time-saving benchmarks"] },
    { title: "Adoption & Follow-through", desc: "A one-day workshop rarely changes anything a month later. We run programmes that build the habit over time — with check-ins, follow-up sessions, and adoption tracking so it actually sticks.", points: ["4 to 8 week structured programme", "Weekly check-ins & Q&A sessions", "Tool adoption tracking & reporting", "Monthly follow-up sessions available"] },
    { title: "Custom Resource Library", desc: "Every team gets a resource library they can keep — prompts, playbooks, guides, and templates built specifically for their role and tools. Something to come back to, not just a PDF that gets filed away.", points: ["Role-specific prompt playbooks", "Tool guides & quick-reference sheets", "Use-case templates for daily tasks", "Updated as AI tools evolve"] },
  ],
  approachTitle: "From first conversation to a team that actually uses AI — here's the journey.",
  approach: [
    { title: "Discovery — we understand your team before designing anything", desc: "We talk to you and a few team members to understand how work actually gets done, where time is lost, and what AI tools are already in play. No generic training programme gets designed until we know your specific situation." },
    { title: "Programme design — built around your roles, tools, and goals", desc: "We design a training programme specific to your team — which departments, which tools, which workflows, in which order. You review and approve before anything starts." },
    { title: "Workshops — hands-on, practical, built around real tasks", desc: "Sessions are run in-person or remotely, built around the actual work your team does. Not slides about AI in theory — live practice with the tools they'll use tomorrow morning." },
    { title: "Follow-through — check-ins to make sure habits actually form", desc: "We check in weekly during the programme — answering questions, addressing blockers, and tracking whether people are actually using what they learned. Most resistance to AI comes from uncertainty, not unwillingness." },
    { title: "Measure — we agree what success looks like and track it", desc: "Time saved, tool adoption rate, tasks automated — we agree on the metrics upfront and report on them. You'll know whether the training is working, not just whether people enjoyed it." },
  ],
  whyTitle: "What makes this different from a generic AI workshop.",
  whyCards: [
    { title: "We build AI tools too", desc: "We don't just train teams on AI — we build AI automation for businesses. That means we train people on tools we actually use and understand deeply, not just tools we've read about." },
    { title: "UAE and India delivery", desc: "In-person workshops across Dubai, Abu Dhabi, and major Indian cities. We understand the work culture, the tools businesses use locally, and what actually lands in these markets." },
    { title: "Role-specific, not one-size", desc: "A marketing manager and a finance director need completely different AI training. We build every programme around specific roles — so nobody sits through content that has nothing to do with their job." },
    { title: "Measured on adoption, not attendance", desc: "We don't count heads in a room and call it done. We track whether your team is actually using AI differently after training — and keep going until they are." },
  ],
  faqIntro: "Things people usually ask before getting started.",
  faqs: [
    { q: "Our team has very mixed levels of AI experience. Can you handle that?", a: "Yes — this is the most common situation. We assess individual skill levels upfront and run sessions that meet people where they are. Beginners and more experienced users don't have to sit through the same content." },
    { q: "Is training delivered in person or online?", a: "Both — in-person across Dubai, Abu Dhabi, and major Indian cities, or remote for distributed teams. Most programmes use a mix: in-person for the intensive early sessions, remote for follow-up check-ins." },
    { q: "Can you train specific departments rather than the whole company?", a: "Yes — and often that's the smarter starting point. We usually begin with one high-impact team, typically marketing or operations, and expand once it's working and the rest of the business can see the difference." },
    { q: "What AI tools do you train on?", a: "We train on the tools your team already has or is considering — ChatGPT, Claude, Gemini, Copilot, Perplexity, and specialist tools relevant to your industry. We recommend the right stack based on your workflow, not on what's trending." },
    { q: "How long does a typical training programme run?", a: "Most programmes run 4 to 8 weeks — intensive enough to build real habits, spread out enough that people can practice between sessions. We also offer monthly follow-up sessions for teams that want to keep building on it." },
    { q: "Do you offer training in Arabic?", a: "Yes — training delivery in Arabic is available for UAE and wider Middle East teams. We let you know at the planning stage so sessions and materials are prepared accordingly." },
  ],
  closing: "A team that uses AI confidently every single day — cutting hours, producing better output, and staying ahead of competitors who are still figuring it out.",
};

export const SVC_MARKET_RESEARCH_DEFAULTS = {
  num: "05", accent: "#10b981",
  badge: "Service 05 — Market Research",
  headline: "Most marketing fails before it starts — because nobody asked the right questions first.",
  body: "Businesses across the UAE and India spend on campaigns, content, and ads built on assumptions about who their customer is and what they want. When it doesn't work, they change the creative. The real problem is almost always the research that never happened. We do that research — so everything that comes after it is built on something solid.",
  specialisms: ["Audience Research", "Competitor Analysis", "ICP Definition", "Positioning & Messaging", "Market Entry", "UAE & India Markets"],
  primaryCtaLabel: "Book a free discovery call", primaryCtaHref: "/book",
  secondaryCtaLabel: "See what's included →", secondaryCtaHref: "#contact",
  heroNote: "",
  ...EMPTY_COMPARISON,
  outcomes: [],
  audienceTitle: "For businesses spending on marketing that isn't landing — and not sure why.",
  audienceIntro: "If any of these sound familiar, the problem is almost certainly upstream of your marketing.",
  audience: [
    { title: "Retail & e-commerce", desc: "Running campaigns to a broad audience with low conversion and no clear picture of who's actually buying." },
    { title: "Real estate", desc: "Messaging that attracts lots of tyre-kickers but not the serious buyers worth spending budget on." },
    { title: "Healthcare & wellness", desc: "Entering a crowded market with no clear positioning — and no data to back up why patients should choose you." },
    { title: "Hospitality & F&B", desc: "Unclear on who the core customer actually is — and marketing to everyone, which means winning no one." },
    { title: "Startups & scale-ups", desc: "Launching into the UAE or India market without local data — and hoping the product speaks for itself." },
  ],
  includedTitle: "Research that's built to be used — not filed away after the presentation.",
  includedIntro: "Every engagement ends with clear, actionable outputs your team can take directly into marketing, sales, and product decisions.",
  subServices: [
    { title: "Audience Research & ICP Definition", desc: "Marketing to everyone means winning no one. We build detailed customer profiles from real interviews and behaviour data — not guesses about who might buy.", points: ["Customer interviews — real conversations, not surveys", "Behavioural & demographic analysis", "Ideal Customer Profile (ICP) document", "Audience segmentation & priority ranking"] },
    { title: "Competitor Analysis", desc: "We map your competitive landscape in detail — who's winning, why, where the gaps are, and where you can position to win without going head-to-head on budget.", points: ["Direct & indirect competitor mapping", "Messaging & positioning analysis", "Digital presence & SEO benchmarking", "Gap & opportunity identification"] },
    { title: "Positioning & Messaging", desc: "The right message is the one that makes the right person stop scrolling. We work out what that is for your business — and how to say it across every channel.", points: ["Core positioning statement", "Key messages per audience segment", "Channel-specific messaging guidance", "Messaging playbook your team can use"] },
    { title: "UAE & India Market Entry Research", desc: "Entering the UAE or Indian market from outside — or expanding within it — without local data is expensive. We do the groundwork so your entry is based on what's real, not what you assumed.", points: ["Local market size & demand analysis", "Consumer behaviour & preference research", "Regulatory & compliance landscape overview", "Market entry strategy recommendations"] },
    { title: "Go-to-Market Strategy", desc: "A launch plan built on what we actually found out — not assumptions carried over from a previous market or a template someone ran for a different business.", points: ["Channel prioritisation & budget guidance", "Launch timeline & milestone planning", "KPIs & success metrics definition", "Handoff into marketing execution"] },
    { title: "Research Report & Presentation", desc: "Everything we find gets delivered in a clear, actionable report — written so your team can actually use it, not a 60-page deck that sits in someone's Downloads folder.", points: ["Executive summary with key findings", "Full research report & data appendix", "Presentation walkthrough with your team", "30-day follow-up Q&A session"] },
  ],
  approachTitle: "From first conversation to actionable research — here's the process.",
  approach: [
    { title: "Scoping — we define exactly what needs answering", desc: "We start by understanding what decisions this research needs to support — a market entry, a relaunch, a new product, a messaging overhaul. The research is designed around the questions that actually matter to your business right now." },
    { title: "Research design — methodology built around your market", desc: "We design the research approach — which combination of customer interviews, competitor analysis, data sources, and market analysis will answer your questions most accurately. You approve the plan before we start." },
    { title: "Fieldwork — we talk to real people in your market", desc: "We recruit and interview your target customers ourselves — in the UAE, India, or wherever your market is. Real conversations surface things that data alone never does. We also analyse competitor positioning, digital presence, and market data in parallel." },
    { title: "Analysis — we turn what we found into what it means", desc: "Raw data doesn't make decisions — interpretation does. We analyse everything we've gathered and turn it into clear findings, patterns, and recommendations your team can act on." },
    { title: "Delivery — a report built to be used, not filed away", desc: "We present the findings to your team, walk through the recommendations, and answer questions. You get a full report, an executive summary, and a 30-day follow-up session to work through anything that comes up once you start applying it." },
  ],
  whyTitle: "What makes this different from a generic research report.",
  whyCards: [
    { title: "UAE and India on-the-ground knowledge", desc: "We operate in these markets every day. We understand local consumer behaviour, cultural nuance, platform preferences, and what actually drives purchase decisions in the UAE and India — not from a textbook, from experience." },
    { title: "Research that connects to execution", desc: "Because we also run marketing and build websites, our research is designed to feed directly into action. Positioning findings go straight into messaging. ICP insights go straight into targeting. Nothing gets lost in translation between research and doing." },
    { title: "Real interviews, not just data pulls", desc: "We talk to actual customers and prospects in your market — not just pull numbers from reports. The insights that change how a business communicates almost always come from conversations, not dashboards." },
    { title: "Deliverables built to be used", desc: "We write reports that your team can pick up and use immediately — not 80-slide decks that need a consultant to interpret. Clear findings, clear recommendations, clear next steps." },
  ],
  faqIntro: "Things people usually ask before getting started.",
  faqs: [
    { q: "We're launching in the UAE from outside the region. Can you help?", a: "Yes — market entry research for businesses coming into the UAE or India is one of the most common engagements we run. We look at local demand, consumer behaviour, competitor landscape, and regulatory considerations so your entry is based on real data, not assumptions." },
    { q: "We don't have any customers yet. Can you still do audience research?", a: "Yes. If you don't have customers yet, we talk to the people you're hoping will become customers — recruiting from your target demographic in your target market. Testing positioning before launch is significantly cheaper than fixing it after." },
    { q: "How long does a research engagement take?", a: "Most engagements take 4 to 6 weeks from scoping call to final report delivery. Larger or more complex projects — multiple markets, multiple audience segments — can take up to 8 weeks. We give you a specific timeline after scoping." },
    { q: "What do we actually get at the end?", a: "An ICP document, a competitor landscape overview, a positioning framework, a messaging playbook, and a full research report with findings and recommendations. Everything is written so your team can use it directly — no interpretation required." },
    { q: "Can you run research in Arabic for the UAE market?", a: "Yes — customer interviews and surveys can be conducted in Arabic for UAE and wider Middle East audiences. This is often important for getting accurate responses, particularly from local Emirati and Arab expat segments." },
    { q: "Does the research connect to your other services?", a: "Yes — and this is one of the reasons clients find it valuable. If we run research and then run your marketing, the findings go directly into your SEO strategy, ad targeting, and content. Nothing gets lost between research and execution because it's the same team doing both." },
  ],
  closing: "Clarity on exactly who to target, what to say, and where to show up — so every marketing decision that follows is built on something real, not a guess.",
};

export const SVC_GEO_DEFAULTS = {
  num: "06", accent: "#6366f1",
  badge: "Service 06 — Generative Engine Optimisation",
  headline: "Google isn't the only search engine anymore. Is your business showing up in the new ones?",
  body: "ChatGPT, Perplexity, Gemini, and Claude are now answering millions of search queries every day — recommending restaurants, agencies, clinics, and products directly in the conversation. Most businesses in the UAE have no visibility there at all. GEO is how you change that — before your competitors do.",
  specialisms: ["AI Search Visibility", "ChatGPT Optimisation", "Perplexity Visibility", "Entity Building", "Structured Data", "Citation Building"],
  primaryCtaLabel: "Check your GEO visibility", primaryCtaHref: "/audit",
  secondaryCtaLabel: "Book a 30-min call →", secondaryCtaHref: "/book",
  heroNote: "Unexus AI is one of the first agencies in the UAE offering GEO as a dedicated service. Most of your competitors have never heard of it.",
  comparisonHeading: "The way people search is changing. Most businesses aren't ready for it.",
  comparisonIntro: "Here's the difference between a business with GEO and one without it — using a real scenario.",
  comparisonQuery: "What's the best digital marketing agency in Dubai?",
  comparisonWithout: "ChatGPT recommends three agencies by name. Your business isn't mentioned. The customer clicks one of those three. You never knew the conversation happened.",
  comparisonWith: "ChatGPT recommends Unexus AI — describing your services, your specialisms, and why you're the right fit. The customer clicks through to your website already warm.",
  comparisonFootnote: "GEO — Generative Engine Optimisation — is the practice of making your business visible and recommendable inside AI search tools. It's where SEO was in 2010. The businesses that move now will own the space. The ones that wait will spend years catching up.",
  outcomes: [],
  audienceTitle: "For any business whose customers use AI to research before they buy.",
  audienceIntro: "Which in the UAE in 2025 is most of them — especially in these industries.",
  audience: [
    { title: "Hospitality & F&B", desc: "Tourists and residents asking ChatGPT “best restaurants in Dubai” — and your venue not being mentioned." },
    { title: "Healthcare & wellness", desc: "Patients asking AI tools to recommend clinics, specialists, or wellness centres in the UAE." },
    { title: "Real estate", desc: "Buyers and investors asking AI which agencies or areas to consider — before they ever open Google." },
    { title: "Retail & e-commerce", desc: "Shoppers using Perplexity or ChatGPT to research products and brands before purchasing." },
    { title: "Startups & scale-ups", desc: "B2B buyers using AI to find and vet service providers — a channel most startups have completely ignored." },
  ],
  includedTitle: "Everything needed to make your business visible and recommendable in AI search.",
  includedIntro: "GEO is not one thing — it's a combination of content, structure, authority, and consistency across the web.",
  subServices: [
    { title: "GEO Visibility Audit", desc: "We start by finding out exactly where you stand today — how you show up across ChatGPT, Perplexity, Gemini, and Claude when someone searches for your category in the UAE or your target market.", points: ["AI search visibility score across platforms", "Competitor GEO benchmarking", "Gap analysis — what's missing and why", "Priority action plan from audit findings"] },
    { title: "Entity & Brand Signal Building", desc: "AI models build their understanding of a business from signals across the web — mentions, citations, structured data, and consistent information. We build and strengthen those signals so AI tools understand who you are and what you do.", points: ["Brand entity optimisation", "Consistent NAP & business info across platforms", "Wikipedia, Wikidata & knowledge graph signals", "Cross-platform brand mention building"] },
    { title: "AI-Citation-Ready Content", desc: "AI tools cite sources they trust — clear, factual, well-structured content that directly answers questions. We create and optimise content specifically designed to be quoted and recommended by AI engines.", points: ["FAQ and Q&A content optimised for AI", "Authoritative long-form service content", "Thought leadership articles & guides", "Content structured for direct AI citation"] },
    { title: "Structured Data & Schema", desc: "Structured data tells AI tools exactly what your business is, what it offers, where it operates, and who it serves. Without it, AI has to guess — and often gets it wrong or ignores you entirely.", points: ["LocalBusiness & Service schema implementation", "FAQ, HowTo & Article schema", "Product & Review schema where applicable", "Schema audit & validation"] },
    { title: "Citation & Mention Building", desc: "AI models learn about businesses from what others say about them across the web — directories, media, reviews, and third-party mentions. We build the citation profile that makes AI trust and recommend your business.", points: ["UAE & India directory submission & management", "PR & media mention strategy", "Review platform optimisation", "Third-party citation building & monitoring"] },
    { title: "GEO Performance Tracking", desc: "GEO visibility is measurable — we track how and where your business appears in AI search responses over time, what's improving, and what to work on next.", points: ["Monthly AI visibility tracking report", "Competitor GEO monitoring", "Citation & mention tracking", "Monthly strategy review & next steps"] },
  ],
  approachTitle: "From invisible to recommended — here's the process.",
  approach: [
    { title: "Audit — find out exactly where you stand in AI search today", desc: "We test how your business appears across ChatGPT, Perplexity, Gemini, and Claude for the queries your customers are most likely to ask. Most businesses are shocked by what they find — or don't find." },
    { title: "Strategy — a GEO plan built around your market and category", desc: "We build a strategy around your specific industry, location, and target queries — prioritising the actions that will move your visibility fastest. You approve it before anything starts." },
    { title: "Foundation — entity signals, structured data, and content", desc: "We build the technical and content foundations — schema implementation, entity optimisation, brand signal consistency, and AI-citation-ready content across your site and the wider web." },
    { title: "Authority — citations, mentions, and third-party trust signals", desc: "We build your citation profile across UAE and India directories, review platforms, and media — the external signals that tell AI tools your business is credible and worth recommending." },
    { title: "Track & improve — monthly reporting on AI visibility", desc: "We track your GEO visibility monthly — how often you're being recommended, for which queries, and against which competitors. GEO compounds over time — the earlier you start, the bigger the lead you build." },
  ],
  whyTitle: "Why we're the right team to do this in the UAE.",
  whyCards: [
    { title: "First movers in the UAE", desc: "We've been building GEO capability since the beginning — when most agencies in the Middle East still haven't heard of it. That head start means we know what works and what doesn't, already." },
    { title: "GEO and SEO together", desc: "GEO doesn't replace SEO — it extends it. Because we run both, your search strategy covers traditional and AI search simultaneously. Nothing is duplicated. Everything compounds." },
    { title: "Content built for AI citation", desc: "We write content specifically structured to be quoted by AI engines — not just optimised for human readers. This is a fundamentally different skill from traditional content marketing, and one we've built deliberately." },
    { title: "The window is open right now", desc: "GEO is still early. The businesses that build authority in AI search now will be very hard to displace in 12 months. We help you move while the opportunity is still there." },
  ],
  faqIntro: "Things people usually ask about GEO before getting started.",
  faqs: [
    { q: "Is GEO the same as SEO?", a: "No — but they're related. SEO optimises your visibility on traditional search engines like Google. GEO optimises your visibility inside AI tools like ChatGPT, Perplexity, and Gemini. They share some foundations — good content, structured data, authority signals — but GEO has its own specific techniques that SEO alone won't cover. We recommend running both together." },
    { q: "How do you measure GEO results?", a: "We track how often your business appears in AI search responses for your target queries, how prominently it's mentioned, and how that changes over time. We also track citation growth, brand mention volume, and competitor visibility — all reported monthly." },
    { q: "How long before we see GEO results?", a: "GEO builds over time — similar to SEO. The foundational work typically takes 4 to 8 weeks to implement. Meaningful visibility improvements usually appear within 3 to 6 months, depending on your starting point and how competitive your category is. Starting earlier gives you a compounding advantage." },
    { q: "Does GEO work for local businesses in Dubai and the UAE?", a: "Yes — and local GEO is one of the highest-opportunity areas right now. When someone asks ChatGPT “best physiotherapist in Dubai” or “top real estate agency in Abu Dhabi”, those are exactly the queries we optimise for. Local intent queries in AI search are growing fast and most local UAE businesses have zero GEO presence." },
    { q: "Do I need GEO if I already have good SEO?", a: "Yes — your Google rankings don't automatically translate into AI search visibility. AI tools pull from a different set of signals — citations, entity data, structured content, and cross-platform authority. A business with excellent SEO can still be completely invisible in AI search. We often audit clients who rank well on Google but don't appear in ChatGPT at all." },
    { q: "Can you run GEO alongside our existing SEO agency?", a: "Yes — GEO and SEO can run in parallel. We'd need to coordinate on content and structured data to avoid conflicts, but working alongside an existing SEO agency is something we do regularly. If you'd prefer to consolidate, we can run both — which is where the real compounding happens." },
  ],
  closing: "Your business shows up when AI answers your customers' questions — recommended by name, before they ever visit a website. In a market where most competitors haven't started, that's a significant and compounding advantage.",
};

export const SVC_SEO_DEFAULTS = {
  num: "07", accent: "#06b6d4",
  badge: "Service 07 — Search Engine Optimisation",
  headline: "Most SEO agencies sell you traffic. We build the rankings that actually bring in revenue.",
  body: "Plenty of businesses across the UAE and India are paying for SEO and getting monthly reports full of numbers that don't matter — impressions, keyword counts, traffic that never converts. Real SEO is quieter and harder: fixing what's technically broken, earning rankings for the searches your buyers actually make, and building authority that competitors can't buy overnight. That's the work we do.",
  specialisms: ["Technical SEO", "Local SEO", "Keyword Research", "On-Page & Content", "Link Building", "Core Web Vitals"],
  primaryCtaLabel: "Get a free SEO audit", primaryCtaHref: "/audit",
  secondaryCtaLabel: "Book a 30-min call →", secondaryCtaHref: "/book",
  heroNote: "We run SEO and GEO together — so you're visible on Google and in the AI tools your customers are starting to search with.",
  ...EMPTY_COMPARISON,
  outcomes: [
    { value: "3.4x", label: "Average growth in organic traffic" },
    { value: "Top 3", label: "Rankings for priority commercial keywords" },
    { value: "−52%", label: "Reliance on paid ads for leads" },
  ],
  audienceTitle: "Built for businesses that should be ranking — but aren't.",
  audienceIntro: "If any of these sound familiar, this is usually where the real problem is hiding.",
  audience: [
    { title: "Retail & e-commerce", desc: "Thousands of products, but only a handful of pages ranking — most of the catalogue is invisible in search." },
    { title: "Hospitality & F&B", desc: "Busy in person, but competitors show up first when someone searches your category in your city." },
    { title: "Healthcare & wellness", desc: "Patients search before they book — and right now they're finding the clinic down the road instead of you." },
    { title: "Real estate", desc: "High-intent buyers searching for areas, projects, and agents — and your listings buried on page three." },
    { title: "B2B & professional services", desc: "Long buying cycles that start with a Google search you're not part of, so the shortlist forms without you." },
  ],
  includedTitle: "Everything that moves rankings — done properly, not just checked off a list.",
  includedIntro: "SEO isn't one task. It's technical health, the right content, and earned authority — working together over time.",
  subServices: [
    { title: "Technical SEO", desc: "Search engines can't rank what they can't crawl, understand, or load quickly. We fix the foundations first — the issues quietly capping everything else you do.", points: ["Full technical audit & crawl analysis", "Site architecture & internal linking", "Indexing, canonicals & duplicate content", "Core Web Vitals & page speed fixes"] },
    { title: "Keyword & Search Intent Research", desc: "We target the searches that lead to revenue — not the highest-volume terms that look good in a report but never convert. Every keyword is mapped to intent and to a page.", points: ["Commercial-intent keyword mapping", "UAE & India market research", "Competitor gap analysis", "Search intent & funnel alignment"] },
    { title: "On-Page & Content", desc: "Rankings follow content that genuinely answers the search better than the pages above you. We create and optimise pages built to rank and to convert the visitor once they land.", points: ["On-page optimisation & metadata", "Content strategy & briefs", "New page & landing page creation", "Existing content refresh & consolidation"] },
    { title: "Local SEO", desc: "For businesses that serve a city or region, local search is where the highest-intent customers are. We make sure you own the map pack and local results in your area.", points: ["Google Business Profile optimisation", "Local citations & NAP consistency", "Review generation & management", "Location & service-area pages"] },
    { title: "Link Building & Authority", desc: "Google still weighs who vouches for you. We earn relevant, credible links the right way — no spam, no schemes that get you penalised six months later.", points: ["Digital PR & editorial links", "Directory & citation building", "Competitor backlink analysis", "Ongoing authority monitoring"] },
    { title: "Reporting & Strategy", desc: "You'll always know what's ranking, what's driving traffic and leads, and what we're doing next — reported against revenue, not vanity metrics.", points: ["Live ranking & traffic dashboard", "Monthly performance review", "Conversion & lead tracking", "Rolling strategy & next-step priorities"] },
  ],
  approachTitle: "From audit to ranking — here's how we get there.",
  approach: [
    { title: "Audit — find out what's actually holding you back", desc: "We run a full technical, content, and authority audit to find the specific issues capping your rankings. Most sites have a handful of high-impact problems nobody's addressed — we find them before spending a rupee or dirham on new work." },
    { title: "Strategy — a plan built around commercial searches, not volume", desc: "We prioritise the keywords and pages that will move revenue fastest for your business and market, and lay out a clear roadmap. You approve it before anything starts — no black-box work." },
    { title: "Foundation — fix the technical issues first", desc: "We resolve the crawl, speed, indexing, and structure problems that quietly cap everything else. This is the unglamorous work most agencies skip, and it's usually where the fastest wins are." },
    { title: "Content & authority — earn the rankings", desc: "We create and optimise the pages that deserve to rank, and build the credible links and local signals that tell Google you're a trustworthy answer. This is where compounding growth starts." },
    { title: "Track & improve — report on what matters", desc: "We track rankings, traffic, and leads monthly, double down on what's working, and adjust what isn't. SEO compounds — the gains you build now get harder for competitors to overtake every month." },
  ],
  whyTitle: "Why businesses trust us with their SEO.",
  whyCards: [
    { title: "Revenue, not vanity metrics", desc: "We report on rankings, leads, and revenue — not impressions and keyword counts that look impressive and mean nothing. If it doesn't move the business, we don't celebrate it." },
    { title: "Technical depth most agencies skip", desc: "A lot of SEO stalls because the technical foundation is broken and nobody looks. We start there — the audits, fixes, and Core Web Vitals work that quietly unlock everything else." },
    { title: "SEO and GEO together", desc: "Search is splitting between Google and AI tools like ChatGPT and Perplexity. We run both, so your visibility compounds across traditional and AI search instead of you paying two vendors for half a strategy." },
    { title: "White-hat, built to last", desc: "No bought links, no schemes, no shortcuts that trigger a penalty later. We build authority the way that survives algorithm updates — because we've seen what the shortcuts cost." },
  ],
  faqIntro: "The questions we get asked most before starting an SEO engagement.",
  faqs: [
    { q: "How long does SEO take to show results?", a: "It depends on your starting point and how competitive your market is, but a realistic timeline is 3 to 6 months for meaningful movement, with technical fixes often showing faster. Anyone promising page-one rankings in a few weeks is either misleading you or using tactics that will get you penalised. SEO compounds — the work builds on itself over time." },
    { q: "What's the difference between SEO and GEO?", a: "SEO gets you found on traditional search engines like Google. GEO (Generative Engine Optimisation) gets your business surfaced and recommended inside AI tools like ChatGPT, Perplexity, and Gemini. They share foundations — good content, structure, authority — but each has its own techniques. We recommend running them together, since search is splitting across both." },
    { q: "Do you guarantee first-page rankings?", a: "No — and be cautious of anyone who does. Nobody controls Google's algorithm, so guaranteeing a specific position is a red flag. What we do guarantee is the right work: technical fixes, the right content, and legitimate authority building — the things that reliably improve rankings over time. We report transparently on exactly what's moving." },
    { q: "Can you do SEO for local businesses in the UAE or India?", a: "Yes — local SEO is one of our core strengths. When someone searches “dentist near me” or “best interior designer in Dubai”, local results and the Google map pack are where the highest-intent customers are. We optimise your Google Business Profile, local citations, reviews, and location pages to own those results in your area." },
    { q: "We already rank okay — do we still need SEO?", a: "Ranking today doesn't mean ranking tomorrow — competitors invest, algorithms change, and technical issues creep in over time. And “okay” rankings often leave a lot of revenue on the table, especially on high-intent commercial searches. We usually start with an audit to show you specifically where the untapped opportunity is before you commit to anything." },
    { q: "Will you work alongside our existing marketing team or agency?", a: "Yes — we do it regularly. We can run SEO as a standalone service that plugs into your existing setup, or coordinate with your team and other vendors on content and technical work. If you'd rather consolidate SEO, paid, and content under one connected strategy, we do that too — that's where the real compounding happens." },
  ],
  closing: "You show up first when your customers search for what you sell — with a site that's fast, technically sound, and built to convert the visit into a lead. That's not a spike in traffic; it's a durable advantage that gets harder to beat every month it runs.",
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
);

export function getSectionSchema(key: string): CmsSection | undefined {
  return SECTIONS.find((s) => s.key === key);
}
