import type { ChatFlow } from "./chat-types";
import { SUBMIT, START } from "./chat-types";

/**
 * The chat script. This is the only file you edit to change what the bot says.
 *
 * Rule of thumb: the bot never tells a visitor to go contact us — it answers
 * the question, then takes their details and books the call. The only place
 * contact details appear is `error`, when the capture itself has failed.
 *
 * To add a flow:
 *   1. Add a node here with `bot` (what it says) and `options` (where it goes).
 *   2. Link it from an existing node's `options` so it's reachable.
 */
export const CHAT_FLOW: ChatFlow = {
  // ── Entry ──────────────────────────────────────────────────────────────
  start: {
    bot: [
      "Hi 👋 I can answer a few quick things — or set up a free 30-minute call with Richa.",
      "What brings you here?",
    ],
    options: [
      { label: "What do you do?", next: "services" },
      { label: "How much does it cost?", next: "pricing" },
      { label: "What's GEO?", next: "geo" },
      { label: "Book a free call", next: "ask_name", interest: "Book a call" },
      { label: "Have someone call me", next: "ask_name", interest: "Call back" },
    ],
  },

  // ── Services ───────────────────────────────────────────────────────────
  services: {
    bot: [
      "Seven services, all run by one team — so they connect instead of fighting each other.",
      "Which one are you curious about?",
    ],
    options: [
      { label: "Digital Marketing", next: "svc_digital" },
      { label: "Website Development", next: "svc_web" },
      { label: "AI Automation", next: "svc_auto" },
      { label: "AI Training", next: "svc_train" },
      { label: "Market Research", next: "svc_research" },
      { label: "SEO", next: "svc_seo" },
      { label: "GEO", next: "geo" },
      { label: "← Back", next: START },
    ],
  },

  svc_digital: {
    bot: [
      "SEO, GEO, paid media, email and tracking — run as one system and measured on revenue, not impressions.",
      "Want Richa to look at your setup and tell you where the budget's leaking?",
    ],
    options: [
      { label: "Yes — book a call", next: "ask_name", interest: "Digital Marketing" },
      { label: "← Other services", next: "services" },
    ],
  },

  svc_web: {
    bot: [
      "Fast, conversion-focused sites in Next.js — built to turn the traffic you already have into customers.",
      "Want a quick review of your current site?",
    ],
    options: [
      { label: "Yes — book a call", next: "ask_name", interest: "Website Development" },
      { label: "← Other services", next: "services" },
    ],
  },

  svc_auto: {
    bot: [
      "AI agents, WhatsApp automation, RAG pipelines and voice — built around your actual bottlenecks.",
      "We audit what's worth automating first, so you don't pay to automate the wrong thing.",
    ],
    options: [
      { label: "Book a call about this", next: "ask_name", interest: "AI Automation" },
      { label: "← Other services", next: "services" },
    ],
  },

  svc_train: {
    bot: [
      "Hands-on training built around your team's real workflows — not a one-day workshop everyone forgets.",
      "We measure it on adoption, not attendance.",
    ],
    options: [
      { label: "Book a call about this", next: "ask_name", interest: "AI Training" },
      { label: "← Other services", next: "services" },
    ],
  },

  svc_research: {
    bot: [
      "Audience research, competitor analysis, positioning and market-entry work for the UAE and India.",
      "Real customer interviews — not just numbers pulled from a report.",
    ],
    options: [
      { label: "Book a call about this", next: "ask_name", interest: "Market Research" },
      { label: "← Other services", next: "services" },
    ],
  },

  svc_seo: {
    bot: [
      "Technical fixes, the right content, and real authority building — so you rank for the searches that actually bring in revenue, not just traffic.",
      "We run SEO and GEO together, so you're visible on Google and in AI search at the same time.",
      "Want Richa to audit where your rankings are leaking?",
    ],
    options: [
      { label: "Yes — get a free SEO audit", next: "ask_name", interest: "SEO" },
      { label: "← Other services", next: "services" },
    ],
  },

  // ── Common questions ───────────────────────────────────────────────────
  geo: {
    bot: [
      "GEO — Generative Engine Optimisation — is about getting your business recommended by ChatGPT, Perplexity and Gemini, not just found on Google.",
      "It's roughly where SEO was in 2010. Most businesses here have no presence there at all, which is exactly why it's worth moving now.",
      "We can run a free visibility check and show you where you stand today.",
    ],
    options: [
      { label: "Check my GEO visibility", next: "ask_name", interest: "GEO" },
      { label: "← Back", next: START },
    ],
  },

  pricing: {
    bot: [
      "Every project is scoped to what you actually need, so there's no fixed price list.",
      "Two things worth knowing: we work month to month — no lock-ins — and you get a proposal within 48 hours of the first call.",
      "Quickest way to a real number is a 30-minute call.",
    ],
    options: [
      { label: "Book that call", next: "ask_name", interest: "Quote" },
      { label: "← Back", next: START },
    ],
  },

  // ── Capture + schedule ─────────────────────────────────────────────────
  ask_name: {
    bot: ["Happy to sort that. What's your name?"],
    input: { field: "name", kind: "text", placeholder: "Your name", next: "ask_phone" },
  },

  ask_phone: {
    bot: ["Thanks {name}. What's the best number to reach you on?"],
    input: { field: "phone", kind: "tel", placeholder: "+971 50 123 4567", next: "ask_email" },
  },

  ask_email: {
    bot: ["And your email?"],
    input: { field: "email", kind: "email", placeholder: "you@company.com", next: "ask_when" },
  },

  ask_when: {
    bot: ["When suits you for a quick call?"],
    options: [
      { label: "Morning (9am–12pm)", next: "ask_date", sets: { when: "Morning (9am–12pm) GST" } },
      { label: "Afternoon (12–4pm)", next: "ask_date", sets: { when: "Afternoon (12–4pm) GST" } },
      { label: "Evening (4–6pm)", next: "ask_date", sets: { when: "Evening (4–6pm) GST" } },
      { label: "Any time works", next: "ask_date", sets: { when: "Any time" } },
    ],
  },

  ask_date: {
    bot: ["And which day works best?"],
    input: { field: "date", kind: "date", placeholder: "Pick a date", next: SUBMIT },
  },

  done: {
    bot: [
      "Perfect — thanks {name}. 🙌",
      "Richa will call you on {date}, {when}.",
    ],
    options: [{ label: "Start over", next: START }],
  },

  error: {
    bot: [
      "Something went wrong sending that — sorry.",
      "Give it another go and it should come through.",
    ],
    options: [{ label: "Try again", next: "ask_name" }],
  },

  throttled: {
    bot: [
      "Looks like you've already sent a few requests — we've got them, don't worry. 🙌",
      "Richa will be in touch shortly. If it's urgent, WhatsApp is fastest.",
    ],
    options: [{ label: "Okay", next: START }],
  },
};

/**
 * Dev-time check that every `next` points at a node that exists. Catches a typo
 * at build/dev time instead of dead-ending a real visitor.
 */
export function validateFlow(flow: ChatFlow = CHAT_FLOW): string[] {
  const errors: string[] = [];
  const exists = (id: string) => id === SUBMIT || Object.hasOwn(flow, id);

  if (!flow[START]) errors.push(`Missing entry node "${START}"`);

  for (const [id, node] of Object.entries(flow)) {
    if (!node.bot?.length) errors.push(`Node "${id}" has no bot messages`);
    if (!node.options?.length && !node.input) {
      errors.push(`Node "${id}" is a dead end — give it options or an input`);
    }
    for (const opt of node.options ?? []) {
      if (!exists(opt.next)) errors.push(`Node "${id}" → option "${opt.label}" points at missing node "${opt.next}"`);
    }
    if (node.input && !exists(node.input.next)) {
      errors.push(`Node "${id}" → input points at missing node "${node.input.next}"`);
    }
  }
  return errors;
}
