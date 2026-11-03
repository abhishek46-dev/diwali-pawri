import type { CSSProperties } from "react";
import { party } from "@/config/party";

const TICKER = [
  "Lights on",
  "Volume up",
  "Full desi drip",
  "Phataka energy only",
  "Main character Diwali",
  "RSVP or we'll take it personally",
  "Diyas & decks",
];

const SPARKLES = [
  { top: "12%", left: "31%", size: 22, delay: "0s" },
  { top: "8%", left: "71%", size: 34, delay: "-1.2s" },
  { top: "44%", left: "65%", size: 14, delay: "-2s" },
  { top: "30%", left: "88%", size: 18, delay: "-0.6s" },
  { top: "58%", left: "12%", size: 16, delay: "-2.6s" },
];

function Sparkle({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="twinkle absolute drop-shadow-[0_0_8px_rgb(255_210_63/0.8)]" style={style}>
      <path d="M12 0c.9 6.6 4.5 10.6 12 12-7.5 1.4-11.1 5.4-12 12-.9-6.6-4.5-10.6-12-12 7.5-1.4 11.1-5.4 12-12z" fill="#ffd23f" />
    </svg>
  );
}

function TickerRun({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex" aria-hidden={hidden}>
      {TICKER.map((t) => (
        <span key={t} className="flex items-center gap-4 pr-4 whitespace-nowrap">
          <span aria-hidden>&#10022;</span>
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-black">
      <div className="gold-foil relative z-10 overflow-hidden py-3 font-mono text-xs font-bold tracking-[0.2em] text-ink uppercase sm:text-sm">
        <div className="marquee flex w-max">
          <TickerRun />
          <TickerRun hidden />
        </div>
      </div>

      <div className="relative flex min-h-[calc(100svh-44px)] flex-col justify-end">
        <div aria-hidden className="hero-blur absolute inset-0 -z-20" />
        <div
          aria-hidden
          className="hero-photo absolute inset-x-0 top-0 -z-10 aspect-[920/1152] sm:inset-x-auto sm:bottom-0 sm:left-1/2 sm:h-full sm:-translate-x-1/2"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#000_0%,rgb(0_0_0/0.8)_14%,transparent_32%)]" />
        {SPARKLES.map((s, i) => (
          <Sparkle key={i} style={{ top: s.top, left: s.left, width: s.size, animationDelay: s.delay }} />
        ))}

        <p className="fade-up absolute inset-x-0 top-5 text-center font-mono text-xs tracking-[0.3em] text-silver uppercase [text-shadow:0_2px_12px_#000] sm:text-sm">
          You&rsquo;re invited &middot; {party.shortDate}
        </p>

        {/* title sits at the very bottom so the photo stays clear */}
        <div className="relative mx-auto w-full max-w-7xl px-5 pt-[118vw] pb-10 text-center sm:pt-40 sm:pb-8">
          <h1
            className="fade-up glitter font-display text-[clamp(3.8rem,11vw,5rem)] leading-[0.9] sm:text-[clamp(4rem,8vw,7.5rem)] sm:whitespace-nowrap"
            style={{ animationDelay: "0.1s" }}
          >
            {party.title}
          </h1>
          <p className="fade-up mt-3 font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] text-cream italic" style={{ animationDelay: "0.2s" }}>
            {party.tagline}
          </p>
          <p
            className="fade-up mt-3 font-mono text-xs tracking-[0.18em] text-silver/80 uppercase sm:text-sm"
            style={{ animationDelay: "0.25s" }}
          >
            {party.dateLabel} &middot; {party.timeLabel} &middot; {party.venue}
          </p>
        </div>
      </div>
    </section>
  );
}
