"use client";

import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { party } from "@/config/party";
import HeroDecor from "./HeroDecor";

const STAR4 = "M0 -12 C1.5 -2.5 2.5 -1.5 12 0 C2.5 1.5 1.5 2.5 0 12 C-1.5 2.5 -2.5 1.5 -12 0 C-2.5 -1.5 -1.5 -2.5 0 -12 Z";

const TICKER = [
  { t: "शुभ दीपावली", deva: true, c: "#FFE08A", star: "#D4AF37" },
  { t: "Diwali after dark", deva: false, c: "#D4AF37", star: "#0E8C6A" },
  { t: "रोशनी", deva: true, c: "#FFC107", star: "#E0115F" },
  { t: "Cheers", deva: false, c: "#F1D9A0", star: "#FF8F00" },
];

const DIWALI_FONT = "font-[family-name:var(--font-bodoni)] text-[clamp(5.2rem,13.6vw,12.25rem)] leading-[0.98] font-medium tracking-[-0.01em] italic";

function Flute({ x, tilt, side, bubbleDelay }: { x: number; tilt: number; side: "l" | "r"; bubbleDelay: number }) {
  return (
    <g transform={`translate(${x} 26) rotate(${tilt})`}>
      <g className={side === "l" ? "h-clink-l" : "h-clink-r"}>
        <path d="M-14 0 L14 0 C14 40 8 70 0 76 C-8 70 -14 40 -14 0 Z" fill="#5A0611" stroke="#D4AF37" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M-12.5 18 L12.5 18 C12.5 44 7 67 0 73 C-7 67 -12.5 44 -12.5 18 Z" fill="#D4AF37" fillOpacity="0.45" />
        <path d="M-12.5 18 L12.5 18" stroke="#FFF1C9" strokeWidth="1.2" strokeOpacity="0.8" />
        {[0, 0.9, 1.7].map((d, i) => (
          <circle key={i} className="h-bubble" cx={[-3, 3, 0][i]} cy={[60, 54, 64][i]} r="1.2" fill="#FFF1C9" style={{ animationDelay: `${d + bubbleDelay}s` }} />
        ))}
        <path d="M0 76 L0 128" stroke="#D4AF37" strokeWidth="1.8" />
        <ellipse cx="0" cy="130" rx="18" ry="3.5" fill="#5A0611" stroke="#D4AF37" strokeWidth="1.8" />
      </g>
    </g>
  );
}

function Ornament({ flip }: { flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 110 14" className={`hidden w-[clamp(3rem,7vw,6.9rem)] sm:block ${flip ? "-scale-x-100" : ""}`}>
      <path d="M0 7 L88 7" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="94" cy="7" r="2" fill="#0E8C6A" />
      <path d="M102 1 L108 7 L102 13 L96 7 Z" fill="#E0115F" stroke="#D4AF37" strokeWidth="1" />
    </svg>
  );
}

function TickerRun({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex" aria-hidden={hidden}>
      {[...TICKER, ...TICKER, ...TICKER].map((k, i) => (
        <span key={i} className="flex items-center gap-5 pr-5 whitespace-nowrap">
          <span
            className={k.deva ? "font-[family-name:var(--font-rozha)] text-lg" : "font-[family-name:var(--font-jost)] text-xs tracking-[0.3em] uppercase"}
            style={{ color: k.c }}
          >
            {k.t}
          </span>
          <svg viewBox="-13 -13 26 26" className="size-3">
            <path d={STAR4} fill={k.star} />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const next = useRef(m);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    next.current = { x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 };
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      setM(next.current);
    });
  };
  const shift = (k: number) => ({ transform: `translate(${(-m.x * k).toFixed(1)}px, ${(-m.y * k).toFixed(1)}px)` });

  return (
    <section
      id="top"
      onMouseMove={onMove}
      onMouseLeave={() => setM({ x: 0, y: 0 })}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#8E0C1C] font-[family-name:var(--font-jost)] text-[#EBD9AE]"
    >
      <HeroDecor far={shift(6)} mid={shift(14)} near={shift(26)} />

      <div
        className="h-par relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-[clamp(4.5rem,12vh,8rem)] pb-[clamp(7rem,20vh,12rem)] text-center"
        style={shift(-8)}
      >
        <svg role="img" aria-label="Two champagne flutes raised in a toast" viewBox="0 0 300 180" className="h-rise w-[clamp(10rem,18vw,16.25rem)]" style={{ animationDelay: "0.9s" }}>
          <Flute x={136} tilt={16} side="l" bubbleDelay={0} />
          <Flute x={164} tilt={-16} side="r" bubbleDelay={0.4} />
          <g className="h-burst">
            <path d="M150 4 L150 14 M136 10 L142 16 M164 10 L158 16 M130 22 L139 22 M170 22 L161 22" stroke="#FFF1C9" strokeWidth="1.6" strokeLinecap="round" />
            <path transform="translate(150 22) scale(0.45)" d={STAR4} fill="#FFF1C9" />
          </g>
        </svg>

        <p
          lang="hi"
          className="h-rise mt-0.5 font-[family-name:var(--font-rozha)] text-[clamp(1.6rem,2.5vw,2.25rem)] leading-tight text-[#FFE08A] [text-shadow:0_2px_0_#5A0611,0_0_18px_rgb(255_193_7/0.45)]"
          style={{ animationDelay: "1.05s" }}
        >
          शुभ दीपावली
        </p>

        <h1 className="flex flex-col items-center font-normal">
          <span className="h-rise relative block" style={{ animationDelay: "1.2s" }}>
            <span
              aria-hidden
              className={`absolute inset-0 block px-[0.15em] text-[#8C6A1F] ${DIWALI_FONT}`}
              style={{
                textShadow:
                  "1px 1px 0 #6B4A0C, 2px 2px 0 #6B4A0C, 3px 3px 0 #5A3E0A, 4px 4px 0 #5A3E0A, 5px 5px 0 #4A3307, 6px 6px 0 #4A3307, 7px 7px 0 #3B2805, 8px 8px 0 #3B2805, 9px 9px 0 #2C1E04, 12px 14px 30px rgb(224 17 95 / 0.6)",
              }}
            >
              Diwali
            </span>
            <span aria-hidden className={`h-echo absolute inset-0 block px-[0.15em] text-transparent [-webkit-text-stroke:1px_#D4AF37] ${DIWALI_FONT}`}>
              Diwali
            </span>
            <span aria-hidden className={`h-echo absolute inset-0 block px-[0.15em] text-transparent [-webkit-text-stroke:1px_#E0115F] ${DIWALI_FONT}`} style={{ animationDelay: "2s" }}>
              Diwali
            </span>
            <span className={`h-foil relative block px-[0.15em] ${DIWALI_FONT}`}>Diwali</span>
          </span>
          <span
            className="h-rise mt-3.5 flex items-center gap-[clamp(0.75rem,1.6vw,1.4rem)] text-[clamp(1rem,1.75vw,1.56rem)] leading-tight font-light tracking-[0.62em] text-[#E7CF8E] uppercase"
            style={{ animationDelay: "1.5s" }}
          >
            <Ornament />
            <span className="-mr-[0.62em]">After dark</span>
            <Ornament flip />
          </span>
        </h1>

        <p
          className="h-rise mt-5 font-[family-name:var(--font-bodoni)] text-[clamp(1.15rem,1.8vw,1.6rem)] leading-snug text-[#EBD9AE] italic"
          style={{ animationDelay: "1.8s" }}
        >
          {party.tagline}
        </p>

        <a
          href="#rsvp"
          className="h-rise mt-6 inline-flex min-h-14 items-center border border-[#D4AF37] bg-[#46040E]/90 px-11 text-[0.94rem] tracking-[0.32em] text-[#F1D9A0] uppercase shadow-[0_0_0_4px_rgb(70_4_14/0.9),0_0_0_5px_rgb(224_17_95/0.7)] transition-colors duration-300 hover:bg-[#D4AF37] hover:text-[#8E0C1C] focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#FFF1C9]"
          style={{ animationDelay: "2.1s" }}
        >
          Raise a glass
        </a>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-[34px] overflow-hidden border-t border-[#D4AF37] bg-[#5A0611]">
        <div className="marquee flex h-full w-max items-center">
          <TickerRun />
          <TickerRun hidden />
        </div>
      </div>
    </section>
  );
}
