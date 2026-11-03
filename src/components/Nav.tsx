"use client";

import { useEffect, useState } from "react";
import Emoji from "./Emoji";

const LINKS = [
  { href: "#invite", label: "Details" },
  { href: "#byob", label: "BYOB" },
  { href: "#rules", label: "Rules" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 480);
      // the current section is the last one whose top has passed 40% down the viewport
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const l of LINKS) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top <= line) current = l.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Sections"
      className={`fixed top-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-gold/50 bg-black/80 p-1.5 shadow-[0_8px_30px_rgb(0_0_0/0.4)] backdrop-blur-md transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-20 opacity-0"
      }`}
    >
      <a href="#top" className="grid h-9 w-9 place-items-center" aria-label="Back to top">
        <Emoji name="diya" size={28} className="w-7" />
      </a>
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          aria-current={active === l.href ? "location" : undefined}
          className={`rounded-full px-3 py-1.5 font-mono text-[0.7rem] font-bold tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 sm:px-4 ${
            active === l.href ? "bg-gold text-ink" : "text-cream hover:bg-cream/10"
          }`}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
