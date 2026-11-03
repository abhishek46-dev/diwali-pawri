"use client";

import { useEffect, useState } from "react";
import { party } from "@/config/party";

const UNITS = [
  { key: "d", label: "days", ms: 86_400_000, mod: Infinity },
  { key: "h", label: "hours", ms: 3_600_000, mod: 24 },
  { key: "m", label: "minutes", ms: 60_000, mod: 60 },
  { key: "s", label: "seconds", ms: 1_000, mod: 60 },
] as const;

export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(party.startsAt).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (left === 0) {
    return <p className="font-display text-2xl text-sindoor">It&rsquo;s happening right now. Get here.</p>;
  }

  return (
    <div className="inline-flex gap-2.5 rounded-[20px] bg-black p-3 sm:gap-3.5" role="timer" aria-label="Time until the party starts">
      {UNITS.map((u) => {
        const v = Math.floor((left ?? 0) / u.ms) % u.mod;
        return (
          <div key={u.key} className="flex min-w-[3.6rem] flex-col items-center sm:min-w-[4.4rem]">
            <span className="glitter font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none">
              {left === null ? "--" : String(v).padStart(2, "0")}
            </span>
            <span className="mt-1 font-mono text-[0.65rem] tracking-[0.15em] text-silver/80 uppercase">{u.label}</span>
          </div>
        );
      })}
    </div>
  );
}
