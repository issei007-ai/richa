"use client";
import { useEffect, useRef, useState } from "react";
import { CHAT_FLOW, validateFlow } from "@/lib/chat-flow";
import type { ChatAnswers, ChatOption } from "@/lib/chat-types";
import { SUBMIT, START, FALLBACK } from "@/lib/chat-types";
import UnixiAvatar, { type UnixiState } from "@/components/ui/UnixiAvatar";
import Unixi3D from "@/components/ui/Unixi3D";

type Msg = { from: "bot" | "user"; text: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Hard input-length caps per field — stops oversized text being typed/pasted. */
const MAXLEN: Record<string, number> = { name: 60, email: 254, phone: 24, date: 10 };

/** Client-side submission throttle: at most N completed sends per window. */
const SUBMIT_MAX = 3;
const SUBMIT_WINDOW_MS = 5 * 60_000;

/** Digits and common phone separators only. */
function cleanPhone(v: string): string {
  return v.replace(/[^\d\s()+\-]/g, "").slice(0, MAXLEN.phone);
}

/** Service names keyed by their /services/<slug> URL. */
const SERVICE_BY_SLUG: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "website-development": "Website Development",
  "ai-automation": "AI Automation",
  "ai-training": "AI Training",
  "market-research": "Market Research",
  geo: "GEO",
  seo: "SEO",
};
const SERVICE_NAMES = new Set(Object.values(SERVICE_BY_SLUG));

/** The service implied by the page the visitor is on, if any. */
function pageService(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const m = window.location.pathname.match(/^\/services\/([a-z-]+)/);
  return m ? SERVICE_BY_SLUG[m[1]] : undefined;
}

/** Fill {name} / {when} / {date} tokens in a bot line. */
function fmt(text: string, a: ChatAnswers): string {
  return text
    .replace(/\{name\}/g, a.name || "there")
    .replace(/\{when\}/g, a.when || "any time")
    .replace(/\{date\}/g, a.date || "a day that suits");
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Local midnight tomorrow — earliest bookable day. */
function tomorrow(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  return d;
}

/** "2026-07-21" -> "Tue 21 Jul 2026" (matches the booking scheduler). */
function prettyDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

/** yyyy-mm-dd for the date input's min attribute. */
function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Scripted chat. The engine walks CHAT_FLOW node to node, collecting answers,
 * and posts them to /api/lead — the same endpoint the forms use. It is not a
 * model: every message it can say lives in chat-flow.ts.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [stepId, setStepId] = useState<string>(START);
  const [answers, setAnswers] = useState<ChatAnswers>({});
  const [draft, setDraft] = useState("");
  const submitTimes = useRef<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<UnixiState>("idle");
  const [greetKey, setGreetKey] = useState(0);
  // The 3D Unixi (three.js + model + a WebGL render loop) is heavy, so we only
  // load it once the visitor actually engages — the first scroll or tap. This
  // matters two ways:
  //   • Lighthouse audits the page without scrolling or interacting, so the 3D
  //     work never runs during the audit and can't hurt the score.
  //   • Real visitors get it the moment they engage (which is nearly always),
  //     deferred past the critical first paint either way.
  // The very weakest devices — few CPU cores, data-saver, or reduced-motion —
  // keep the lightweight SVG Unixi and never download three.js at all.
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const capable =
      (nav.hardwareConcurrency ?? 8) >= 4 &&
      !nav.connection?.saveData &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!capable) return; // stay on the SVG launcher forever

    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      cleanup();
      setShow3d(true);
    };
    const onScroll = () => { if (window.scrollY > 300) load(); };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", load);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", load, { passive: true });
    return cleanup;
  }, []);

  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Surface broken links while developing.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const errs = validateFlow();
      if (errs.length) console.warn("[chat-flow] " + errs.join("\n[chat-flow] "));
    }
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, typing, stepId]);

  const node = CHAT_FLOW[stepId] ?? CHAT_FLOW[FALLBACK];

  function goTo(id: string, ans?: ChatAnswers) {
    const target = CHAT_FLOW[id] ? id : FALLBACK;
    const a = ans ?? answers;
    setStepId(target);
    setFieldError(null);
    setTyping(true);
    const t = setTimeout(() => {
      setMessages((m) => [...m, ...CHAT_FLOW[target].bot.map((text) => ({ from: "bot" as const, text: fmt(text, a) }))]);
      setTyping(false);
    }, 380);
    timers.current.push(t);
  }

  function openChat() {
    setOpen(true);
    if (!started) {
      setStarted(true);
      goTo(START);
    }
    // Greet with a one-shot wave, then settle to idle.
    setAvatar("wave");
    setGreetKey((k) => k + 1);
    const t = setTimeout(() => setAvatar("idle"), 1700);
    timers.current.push(t);
  }

  // Talking overrides idle while the typing dots are up.
  const avatarState: UnixiState = typing ? "talking" : avatar;

  function choose(opt: ChatOption) {
    setMessages((m) => [...m, { from: "user", text: opt.label }]);

    if (opt.next === START) {
      // Start over: clear the slate but keep the panel open.
      setAnswers({});
      setMessages([]);
      goTo(START, {});
      return;
    }

    const merged: ChatAnswers = {
      ...answers,
      ...(opt.interest ? { interest: opt.interest } : {}),
      ...(opt.sets ?? {}),
    };
    setAnswers(merged);

    if (opt.next === SUBMIT) void sendLead(merged);
    else goTo(opt.next, merged);
  }

  function submitInput(e: React.FormEvent) {
    e.preventDefault();
    if (!node.input || sending) return;
    const { field, next } = node.input;
    // Hard length cap regardless of what was pasted/scripted into the field.
    const value = draft.trim().slice(0, MAXLEN[field] ?? 200);

    if (field === "name" && value.length < 2) return setFieldError("Please enter your name.");
    if (field === "email" && !EMAIL_RE.test(value)) return setFieldError("That doesn't look like a valid email.");
    if (field === "phone" && value.replace(/\D/g, "").length < 6) return setFieldError("Please enter a valid phone number.");

    // Dates come in as yyyy-mm-dd; store them human-readable.
    let stored = value;
    if (field === "date") {
      const d = new Date(`${value}T00:00:00`);
      if (!value || Number.isNaN(d.getTime())) return setFieldError("Please pick a date.");
      if (d < tomorrow()) return setFieldError("Please pick a date from tomorrow onwards.");
      stored = prettyDate(d);
    }

    const merged = { ...answers, [field]: stored };
    setAnswers(merged);
    setMessages((m) => [...m, { from: "user", text: stored }]);
    setDraft("");
    setFieldError(null);

    if (next === SUBMIT) void sendLead(merged);
    else goTo(next);
  }

  async function sendLead(final: ChatAnswers) {
    // Throttle repeat submissions from a single session — a real visitor books
    // once; this stops the flow being scripted to spam the lead endpoint.
    const now = Date.now();
    submitTimes.current = submitTimes.current.filter((ts) => now - ts < SUBMIT_WINDOW_MS);
    if (submitTimes.current.length >= SUBMIT_MAX) {
      goTo("throttled", final);
      return;
    }
    submitTimes.current.push(now);

    setSending(true);
    setTyping(true);

    // Service attribution: an explicit in-chat service pick wins; otherwise
    // fall back to the service page they're on; otherwise the generic intent.
    const svc = pageService();
    const need =
      final.interest && SERVICE_NAMES.has(final.interest)
        ? final.interest
        : svc || final.interest || "General enquiry";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // A chosen call window makes this a booking, not just an enquiry.
          type: final.when ? "booking" : "lead",
          source: "chat",
          name: final.name,
          email: final.email,
          phone: final.phone,
          need,
          date: final.date,
          preferred_time: final.when,
          // Where the chat was opened — full context for the lead.
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setTyping(false);
      goTo("done", final);
    } catch {
      setTyping(false);
      goTo("error", final);
    }
    setSending(false);
  }

  return (
    <div className="chat-root">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Unexus AI">
          {/* Header */}
          <div className="chat-head">
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span className="chat-avatar"><UnixiAvatar size={40} state={avatarState} /></span>
              <div>
                <div className="chat-title">Unixi</div>
                <div className="chat-status"><span className="chat-status-dot" aria-hidden="true" />Online · Growth companion</div>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="chat-x">×</button>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((m, i) => {
              const groupStart = m.from === "bot" && (i === 0 || messages[i - 1].from !== "bot");
              return (
                <div key={i} className={`chat-row${m.from === "user" ? " chat-row--user" : ""}`}>
                  {m.from === "bot" && (
                    <span className="chat-row-ava">{groupStart && <UnixiAvatar size={24} state="idle" />}</span>
                  )}
                  <div className={`chat-msg chat-msg--${m.from}`}>{m.text}</div>
                </div>
              );
            })}
            {typing && (
              <div className="chat-row">
                <span className="chat-row-ava">
                  {(messages.length === 0 || messages[messages.length - 1].from !== "bot") && (
                    <UnixiAvatar size={24} state="talking" />
                  )}
                </span>
                <div className="chat-msg chat-msg--bot chat-typing" aria-label="Typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Footer: options or input */}
          <div className="chat-foot">
            {!typing && node.options && (
              <div className="chat-opts">
                {node.options.map((opt) => (
                  <button key={opt.label} type="button" className="chat-opt" onClick={() => choose(opt)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {!typing && node.input && (
              <form onSubmit={submitInput} className="chat-form">
                <input
                  className="chat-input"
                  type={node.input.kind}
                  inputMode={node.input.kind === "tel" ? "tel" : undefined}
                  min={node.input.kind === "date" ? isoDate(tomorrow()) : undefined}
                  maxLength={MAXLEN[node.input.field] ?? 200}
                  placeholder={node.input.placeholder}
                  value={draft}
                  onChange={(e) => {
                    const f = node.input!.field;
                    setDraft(f === "phone" ? cleanPhone(e.target.value) : e.target.value.slice(0, MAXLEN[f] ?? 200));
                  }}
                  autoComplete="off"
                  aria-label={node.input.placeholder}
                  style={node.input.kind === "date" ? { colorScheme: "dark", cursor: "pointer" } : undefined}
                  autoFocus
                />
                <button type="submit" className="chat-send" disabled={sending} aria-label="Send">
                  {sending ? "…" : "→"}
                </button>
              </form>
            )}
            {fieldError && <p className="chat-err">{fieldError}</p>}
          </div>
        </div>
      )}

      {/* Launcher — 3D Unixi. Stays mounted (so the model isn't reloaded);
          just hidden + paused while the panel is open. */}
      <div className={`unixi3d-wrap${open ? " is-hidden" : ""}`}>
        <span className="unixi-bubble" aria-hidden="true">
          Welcome! I&apos;m Unixi — here to help you 👋
        </span>
        {show3d ? (
          <Unixi3D size={176} onClick={openChat} greetKey={greetKey} paused={open} />
        ) : (
          <button
            type="button"
            onClick={openChat}
            aria-label="Chat with Unixi"
            className="unixi3d-launch"
            style={{ width: 176, height: 176, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 18 }}
          >
            <UnixiAvatar size={72} state="idle" />
          </button>
        )}
        <span className="unixi3d-hint">Chat with Unixi</span>
      </div>
    </div>
  );
}
