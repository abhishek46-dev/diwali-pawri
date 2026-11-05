"use client";

import confetti from "canvas-confetti";
import { useEffect, useState, type FormEvent } from "react";
import { party } from "@/config/party";
import Cheers from "./Cheers";
import Emoji, { type EmojiName } from "./Emoji";

const STORAGE_KEY = "diwali-after-dark-rsvp";
const ANSWERS: { value: "yes" | "maybe" | "no"; label: string; emoji: EmojiName }[] = [
  { value: "yes", label: "I'm in", emoji: "popper" },
  { value: "maybe", label: "Maybe", emoji: "star" },
  { value: "no", label: "Can't make it", emoji: "cry" },
];
const BRINGING: { label: string; emoji: EmojiName }[] = [
  { label: "Mithai", emoji: "candy" },
  { label: "A bottle", emoji: "champagne" },
  { label: "A playlist", emoji: "notes" },
  { label: "Green crackers", emoji: "sparkler" },
  { label: "Just vibes", emoji: "heart" },
];
const COLORS = ["#ffd23f", "#e0a82e", "#d9dce2", "#ffffff", "#e3132f", "#b0001e"];

type Rsvp = { name: string; answer: (typeof ANSWERS)[number]["value"]; guests: number; bringing: string[]; note: string };

const DONE = {
  yes: { title: (n: string) => `You're on the list, ${n}`, note: "A laddoo has your name on it. See you on the 7th." },
  maybe: { title: (n: string) => `Noted, ${n}`, note: "There's still time to turn that maybe into a yes." },
  no: { title: (n: string) => `We'll miss you, ${n}`, note: "A laddoo will be kept aside in your honour. Probably." },
};

function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  confetti({ particleCount: 90, spread: 80, origin: { y: 0.7 }, colors: COLORS });
}

function message(r: Rsvp) {
  const ans = ANSWERS.find((a) => a.value === r.answer)?.label ?? r.answer;
  return [
    `🪔 RSVP for ${party.title}`,
    `Name: ${r.name}`,
    `Coming? ${ans}`,
    r.answer !== "no" ? `Party of ${r.guests}` : "",
    r.bringing.length ? `Bringing: ${r.bringing.join(", ")}` : "",
    r.note ? `Note: ${r.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Rsvp() {
  const [form, setForm] = useState<Rsvp>({ name: "", answer: "yes", guests: 1, bringing: ["Just vibes"], note: "" });
  const [sent, setSent] = useState<Rsvp | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // restoring a previous RSVP from this browser after hydration
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setSent(JSON.parse(saved));
    } catch {}
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSent(form);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
    if (form.answer === "yes") celebrate();
    if (party.hostWhatsApp) {
      window.open(`https://wa.me/${party.hostWhatsApp}?text=${encodeURIComponent(message(form))}`, "_blank");
    }
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(message(sent));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const toggle = (b: string) =>
    setForm((f) => ({ ...f, bringing: f.bringing.includes(b) ? f.bringing.filter((x) => x !== b) : [...f.bringing, b] }));

  const label = "mb-2 block font-mono text-xs font-bold tracking-[0.18em] text-gold uppercase";

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative isolate overflow-hidden px-4 pt-32 pb-28 sm:pt-40"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgb(122 0 20 / 0.6), transparent 60%), #000" }}
    >
      <div className="relative mx-auto max-w-xl text-center">
        <Cheers className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[min(100vw,860px)] -translate-x-1/2 -translate-y-[58%] opacity-80 sm:h-[540px]" />
        <h2 id="rsvp-title" className="glitter-silver font-display text-[clamp(3.2rem,7vw,5.6rem)] leading-[0.95]">
          So&hellip; you&rsquo;re coming?
        </h2>
        <p className="mt-4 text-cream/75">
          RSVP before {party.rsvpBy}.{party.hostWhatsApp ? ` Sending opens WhatsApp with your reply typed out for ${party.host}.` : ""}
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-xl rounded-[28px] border border-cream/15 bg-[rgb(60_6_14/0.75)] p-6 shadow-[0_30px_80px_rgb(0_0_0/0.45)] backdrop-blur sm:p-9">
        {sent ? (
          <div className="fade-up text-center">
            <Emoji name={ANSWERS.find((a) => a.value === sent.answer)?.emoji ?? "diya"} size={96} className="bob mx-auto w-20" />
            <p className="glitter mt-4 font-display text-4xl leading-tight">{DONE[sent.answer].title(sent.name)}</p>
            <p className="mt-3 text-xl text-cream/80">{DONE[sent.answer].note}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {party.hostWhatsApp ? (
                <a
                  href={`https://wa.me/${party.hostWhatsApp}?text=${encodeURIComponent(message(sent))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold gold-foil"
                >
                  Send on WhatsApp again
                </a>
              ) : (
                <button type="button" onClick={copy} className="btn btn-gold gold-foil">
                  {copied ? "Copied!" : `Copy RSVP for ${party.host}`}
                </button>
              )}
              <button type="button" onClick={() => setSent(null)} className="btn btn-ghost">
                Change my RSVP
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-7">
            <label className="block">
              <span className={label}>Your name</span>
              <input
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Pinky from Lajpat"
                className="field"
              />
            </label>

            <fieldset>
              <legend className={label}>Are you coming?</legend>
              <div className="grid grid-cols-3 gap-2">
                {ANSWERS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setForm({ ...form, answer: a.value })}
                    aria-pressed={form.answer === a.value}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-3 font-mono text-xs font-semibold tracking-wide uppercase transition-colors ${
                      form.answer === a.value ? "border-gold bg-gold/15 text-cream" : "border-cream/25 text-cream/80 hover:border-cream/60"
                    }`}
                  >
                    <Emoji name={a.emoji} size={36} className="w-9" />
                    {a.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {form.answer !== "no" && (
              <div role="group" aria-labelledby="guests-label">
                <span id="guests-label" className={label}>
                  How many of you
                </span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    aria-label="One less guest"
                    onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/50 text-2xl hover:border-gold"
                  >
                    &minus;
                  </button>
                  <div className="flex flex-1 items-center justify-center gap-1" aria-live="polite">
                    {Array.from({ length: form.guests }, (_, i) => (
                      <Emoji key={i} name="diya" size={32} className="w-8" />
                    ))}
                    <span className="ml-2 font-mono text-sm">
                      {form.guests} {form.guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="One more guest"
                    onClick={() => setForm({ ...form, guests: Math.min(6, form.guests + 1) })}
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/50 text-2xl hover:border-gold"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <fieldset>
              <legend className={label}>You&rsquo;re bringing</legend>
              <div className="flex flex-wrap gap-2">
                {BRINGING.map((b) => (
                  <button key={b.label} type="button" onClick={() => toggle(b.label)} aria-pressed={form.bringing.includes(b.label)} className="chip">
                    <Emoji name={b.emoji} size={22} className="w-5" />
                    {b.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className={label}>Anything else (optional)</span>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Song requests, allergies, gossip"
                className="field resize-none"
              />
            </label>

            <button type="submit" className="btn btn-gold gold-foil w-full">
              Send RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
