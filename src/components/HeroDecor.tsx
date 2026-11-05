import type { CSSProperties } from "react";

// Decorative stage for the hero, drawn on a 1440x900 canvas and scaled to cover the screen.
// Random-looking positions come from a seeded generator so server and client render the same markup.

let seed = 20261108;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const f = (n: number, p = 1) => Number(n.toFixed(p));
const pt = (a: number, r: number) => {
  const t = ((a - 90) * Math.PI) / 180;
  return [f(r * Math.cos(t)), f(r * Math.sin(t))];
};
const spokes = (n: number, r0: number, r1: number, off = 0) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = (i * 360) / n + off;
    const p = pt(a, r0);
    const q = pt(a, r1);
    d += `M${p[0]} ${p[1]} L${q[0]} ${q[1]} `;
  }
  return d;
};

const GOLD = "#D4AF37";
const RUBY = "#E0115F";
const EMERALD = "#0E8C6A";
const SAPPHIRE = "#127C9E";
const SAFFRON = "#FF8F00";
const MAROON = "#5A0611";
const CREAM = "#FFF1C9";
const JEWELS = [RUBY, EMERALD, SAPPHIRE, SAFFRON];

const STARS = Array.from({ length: 70 }, () => ({
  x: f(rnd() * 1440), y: f(rnd() * 900), r: f(0.4 + rnd() * 0.9, 2), d: f(-rnd() * 6, 2), t: f(2.4 + rnd() * 4, 2),
}));

let SCALLOP = "M0 18";
const TORAN_GEMS: { x: number; c: string }[] = [];
for (let i = 0; i < 36; i++) {
  const x = i * 40;
  SCALLOP += ` Q${x + 20} 44 ${x + 40} 18`;
  TORAN_GEMS.push({ x: x + 20, c: JEWELS[i % 4] });
}
SCALLOP += " L1440 0 L0 0 Z";

const BELL = "M-8 13 C-8 1 8 1 8 13 L10 17 L-10 17 Z";
const DROP = "M0 0 C6 8 8 13 8 17 C8 22 4 25 0 25 C-4 25 -8 22 -8 17 C-8 13 -6 8 0 0 Z";
const STRANDS = Array.from({ length: 18 }, (_, k) => {
  const x = k * 80 + 20;
  const bell = k % 2 === 0;
  return {
    x, l: Math.round(26 + 70 * (Math.abs(x - 720) / 720) + (k % 2 ? 14 : 0)),
    d: bell ? BELL : DROP, fill: bell ? GOLD : JEWELS[k % 4], dl: f(-rnd() * 3, 2), t: f(2.6 + rnd() * 2, 2),
  };
});

const FIREWORKS = [[290, 120, 0.85], [1150, 120, 0.85], [560, 108, 0.6], [880, 108, 0.6]].map(([x, y, s], k) => {
  let rays = "", dots = "", dots2 = "";
  for (let j = 0; j < 20; j++) {
    const a = j * 18;
    const a1 = pt(a, 10), a2 = pt(a, 44 + (j % 2) * 12), d1 = pt(a, 62 + (j % 3) * 5);
    rays += `M${a1[0]} ${a1[1]} L${a2[0]} ${a2[1]} `;
    if (j % 2) dots += `M${d1[0]} ${d1[1]} l0.1 0 `;
    else dots2 += `M${d1[0]} ${d1[1]} l0.1 0 `;
  }
  return { x, y, s, rays, dots, dots2, c: k < 2 ? "#F1D9A0" : "#FFC107", d: f(-k * 0.9, 2) };
});

const GLINTS = [[200, 560], [1240, 560], [470, 300], [970, 300], [70, 300], [1370, 300], [610, 640], [830, 640], [340, 470], [1100, 470]].map(
  ([x, y]) => ({ x, y, k: f(0.5 + rnd() * 0.7, 2), d: f(-rnd() * 5, 2), t: f(3 + rnd() * 3, 2) }),
);

const GLITTER_COLORS = [GOLD, "#F1D9A0", "#B8902C", CREAM, "#E9C976", "#FF4D8D"];
const GLITTER = Array.from({ length: 44 }, () => ({
  x: f(rnd() * 1440), s: f(2 + rnd() * 3.5), c: GLITTER_COLORS[Math.floor(rnd() * GLITTER_COLORS.length)],
  sq: rnd() > 0.45, d: f(-rnd() * 18, 2), t: f(10 + rnd() * 10, 2),
}));

const TUNNEL_COLORS = [GOLD, RUBY, EMERALD, SAFFRON, SAPPHIRE];
const TUNNEL = Array.from({ length: 9 }, (_, k) => ({ d: f((-k * 11) / 9, 2), c: TUNNEL_COLORS[k % 5] }));
const FEATHERS = [-85, -72, -59, -46, -33, -20, -7, 6].map((a, i) => ({ a, k: f(0.86 + (i % 3) * 0.07, 2), d: f(-i * 0.35, 2) }));
const SPOKES_A = spokes(90, 40, 620);
const SPOKES_B = spokes(90, 40, 620, 2);
const SPOKES_R = spokes(60, 130, 160);

const ARCH = "M396 900 L396 344 C396 262 482 220 566 196 C644 174 702 158 720 116 C738 158 796 174 874 196 C958 220 1044 262 1044 344 L1044 900";
const STAR4 = "M0 -12 C1.5 -2.5 2.5 -1.5 12 0 C2.5 1.5 1.5 2.5 0 12 C-1.5 2.5 -2.5 1.5 -12 0 C-2.5 -1.5 -1.5 -2.5 0 -12 Z";

function Peacock({ x, flip, delay }: { x: number; flip?: boolean; delay: number }) {
  return (
    <g transform={`translate(${x} 205) scale(${flip ? -1.2 : 1.2} 1.2)`}>
      <g className="h-fade" style={{ animationDelay: "0.9s" }}>
        <g className="h-fan" style={{ animationDelay: `${delay}s` }}>
          {FEATHERS.map((fe, i) => (
            <g key={i} transform={`rotate(${fe.a}) scale(${fe.k})`}>
              <path d="M-18 0 Q-110 -18 -178 0 Q-110 18 -18 0 Z" fill={EMERALD} fillOpacity="0.28" stroke={GOLD} strokeWidth="0.6" />
              <path d="M0 0 L-196 0" stroke={GOLD} strokeWidth="1" />
              <g className="h-eye" style={{ animationDelay: `${fe.d + delay}s` }}>
                <ellipse cx="-198" cy="0" rx="22" ry="14" fill={EMERALD} stroke={GOLD} strokeWidth="1" />
                <ellipse cx="-200" cy="0" rx="13" ry="9" fill={SAPPHIRE} />
                <ellipse cx="-202" cy="0" rx="6" ry="5" fill="#0B1A4A" stroke="#FFC107" strokeWidth="1" />
              </g>
            </g>
          ))}
        </g>
        <g transform="translate(16 2) scale(-1 1)" stroke={GOLD}>
          <path d="M-10 6 C-30 0 -34 -26 -16 -40 C-6 -48 8 -44 12 -30 C16 -16 10 0 -10 6 Z" fill={SAPPHIRE} strokeWidth="1.2" />
          <path d="M-18 -36 C-24 -54 -20 -72 -10 -82 C-4 -88 4 -86 2 -80 C-6 -72 -8 -56 -4 -42 Z" fill={SAPPHIRE} strokeWidth="1.2" />
          <circle cx="-6" cy="-82" r="6" fill={SAPPHIRE} strokeWidth="1" />
          <path d="M-11 -84 L-20 -81 L-11 -78 Z" fill={GOLD} stroke="none" />
          <circle cx="-7" cy="-83" r="1.5" fill={CREAM} stroke="none" />
          <path d="M-4 -88 L-10 -100 M-4 -88 L-4 -102 M-4 -88 L2 -99" strokeWidth="1" />
          <circle cx="-10" cy="-101" r="2" fill={RUBY} stroke="none" />
          <circle cx="-4" cy="-103" r="2" fill={GOLD} stroke="none" />
          <circle cx="2" cy="-100" r="2" fill={RUBY} stroke="none" />
          <path d="M-6 -32 C8 -36 16 -22 10 -6 C0 -8 -8 -18 -6 -32 Z" fill={EMERALD} strokeWidth="1" />
          <path d="M-12 4 L-14 18 M-2 5 L-2 18" strokeWidth="2" />
        </g>
      </g>
    </g>
  );
}

function Lantern({ x, body, core, delay }: { x: number; body: string; core: string; delay: number }) {
  return (
    <g transform={`translate(${x} 0) scale(0.667)`}>
      <g className="h-swing" style={{ animationDelay: `${delay}s` }}>
        <line x1="60" y1="0" x2="60" y2="96" stroke={GOLD} strokeWidth="1.5" />
        <rect x="44" y="92" width="32" height="10" rx="3" fill={GOLD} />
        <polygon points="60,104 66,124 84,114 74,132 94,138 74,144 84,162 66,152 60,172 54,152 36,162 46,144 26,138 46,132 36,114 54,124" fill={body} stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="60" cy="138" r="8" fill={core} stroke={CREAM} strokeWidth="1.5" />
        <path d="M50 168 L46 214 M60 172 L60 228 M70 168 L74 214" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 7" />
        <circle cx="46" cy="218" r="3.5" fill={SAFFRON} />
        <circle cx="60" cy="232" r="4" fill={RUBY} />
        <circle cx="74" cy="218" r="3.5" fill={SAFFRON} />
      </g>
    </g>
  );
}

function Elephant({ blanket, accent, delay }: { blanket: string; accent: string; delay: number }) {
  return (
    <g className="h-bob" style={{ animationDelay: `${delay}s` }} stroke={GOLD}>
      <path d="M42 112 C30 120 28 136 32 148" fill="none" strokeWidth="2" />
      <circle cx="32" cy="151" r="3.5" fill={RUBY} stroke="none" />
      {[[54, 126, 22, 58], [84, 130, 20, 54], [150, 130, 20, 54], [178, 126, 22, 58]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill={MAROON} strokeWidth="1.6" />
      ))}
      <path d="M56 172 L74 172 M86 172 L102 172 M152 172 L168 172 M180 172 L198 172" stroke={accent} strokeWidth="4" />
      <path d="M42 140 C34 98 60 68 112 66 C160 64 194 76 204 106 C208 124 204 138 198 146 L48 148 Z" fill={MAROON} strokeWidth="2" />
      <path d="M100 66 L100 50 C100 40 150 40 150 50 L150 66 Z" fill={MAROON} strokeWidth="1.6" />
      <path d="M104 42 C110 22 140 22 146 42 Z" fill={accent} strokeWidth="1.6" />
      <path d="M125 24 L125 12" strokeWidth="2" />
      <circle cx="125" cy="10" r="3.5" fill={RUBY} stroke="none" />
      <path d="M70 70 C100 62 150 62 178 72 L174 132 C150 140 98 140 74 132 Z" fill={blanket} strokeWidth="2" />
      <path d="M80 80 C104 74 146 74 168 82 L165 124 C144 130 102 130 82 124 Z" fill="none" stroke="#FFC107" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 7" />
      <circle cx="124" cy="102" r="14" fill={SAPPHIRE} strokeWidth="1.6" />
      <path transform="translate(124 102) scale(0.75)" d={STAR4} fill={CREAM} stroke="none" />
      <path d="M76 136 C100 144 150 144 172 136" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 10" />
      <circle cx="206" cy="96" r="34" fill={MAROON} strokeWidth="2" />
      <path d="M190 76 C172 84 170 116 184 128 C200 128 208 110 204 88 Z" fill={blanket} strokeWidth="1.6" />
      <path d="M202 64 C216 62 228 70 234 84" fill="none" strokeWidth="3" />
      <circle cx="218" cy="92" r="3" fill={GOLD} stroke="none" />
      <path d="M226 118 C236 128 248 128 256 120" fill="none" stroke={CREAM} strokeWidth="5" strokeLinecap="round" />
      <g className="h-trunk" style={{ animationDelay: `${delay}s` }}>
        <path d="M234 104 C262 106 268 76 258 56 C254 48 246 50 248 58" fill="none" strokeWidth="17" strokeLinecap="round" />
        <path d="M234 104 C262 106 268 76 258 56 C254 48 246 50 248 58" fill="none" stroke={MAROON} strokeWidth="13" strokeLinecap="round" />
        <path d="M240 104 C262 104 266 78 258 60" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 8" />
      </g>
    </g>
  );
}

export default function HeroDecor({ far, mid, near }: { far: CSSProperties; mid: CSSProperties; near: CSSProperties }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="h-kalka" width="110" height="110" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={GOLD} strokeWidth="1.4">
            <path d="M62 6 C66 18 58 28 52 34 C60 46 54 66 36 68 C18 70 12 52 18 40 C24 28 40 22 50 14 C55 10 58 6 62 6 Z" />
            <path d="M50 24 C46 34 52 40 47 50 C42 60 28 60 26 50 C24 40 36 32 50 24 Z" />
            <circle cx="88" cy="88" r="5" strokeWidth="1.2" />
          </g>
          <circle cx="37" cy="50" r="3" fill={RUBY} />
          <circle cx="88" cy="88" r="1.6" fill={GOLD} />
        </pattern>
        <radialGradient id="h-floor">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.22" />
          <stop offset="0.55" stopColor={SAFFRON} stopOpacity="0.08" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="h-shade">
          <stop offset="0" stopColor="#46040E" stopOpacity="0.94" />
          <stop offset="0.55" stopColor="#46040E" stopOpacity="0.7" />
          <stop offset="1" stopColor="#46040E" stopOpacity="0" />
        </radialGradient>
        <clipPath id="h-arch-clip">
          <path d={`${ARCH} Z`} />
        </clipPath>
      </defs>

      {/* far: drifting paisley wall, floor glow, stars */}
      <g className="h-par" style={far}>
        <g className="h-drift" opacity="0.08">
          <rect x="-220" y="-220" width="1880" height="1340" fill="url(#h-kalka)" />
        </g>
        <ellipse cx="720" cy="960" rx="650" ry="320" fill="url(#h-floor)" />
        {STARS.map((s, i) => (
          <circle key={i} className="h-twinkle" cx={s.x} cy={s.y} r={s.r} fill={CREAM} style={{ animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }} />
        ))}
      </g>

      {/* mid: the arch, its zooming tunnel, glints and fireworks */}
      <g className="h-par" style={mid}>
        <g className="h-fade" clipPath="url(#h-arch-clip)" style={{ animationDelay: "0.6s" }}>
          <g transform="translate(720 500)">
            <g className="h-spin"><path d={SPOKES_A} fill="none" stroke={GOLD} strokeOpacity="0.16" /></g>
            <g className="h-spin-r"><path d={SPOKES_B} fill="none" stroke={RUBY} strokeOpacity="0.16" /></g>
            {TUNNEL.map((t, i) => (
              <g key={i} className="h-zoom" style={{ animationDelay: `${t.d}s` }}>
                <path d="M-170 260 L-170 -60 C-170 -120 -110 -150 -60 -168 C-20 -182 -4 -196 0 -230 C4 -196 20 -182 60 -168 C110 -150 170 -120 170 -60 L170 260" fill="none" stroke={t.c} strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
                <path d="M-158 260 L-158 -56 C-158 -112 -102 -140 -56 -156 C-18 -170 -4 -182 0 -212 C4 -182 18 -170 56 -156 C102 -140 158 -112 158 -56 L158 260" fill="none" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </g>
        </g>
        <path className="h-draw" pathLength={1} d="M380 900 L380 340 C380 250 470 205 560 180 C640 158 700 140 720 92 C740 140 800 158 880 180 C970 205 1060 250 1060 340 L1060 900" fill="none" stroke={GOLD} strokeWidth="3" style={{ animationDelay: "0.2s" }} />
        <path className="h-fade" d="M372 900 L372 338 C372 244 466 198 557 172 C636 150 696 132 720 80 C744 132 804 150 883 172 C974 198 1068 244 1068 338 L1068 900" fill="none" stroke={SAFFRON} strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 9" style={{ animationDelay: "1.4s" }} />
        <path className="h-fade" d="M388 900 L388 342 C388 256 476 212 563 188 C642 166 701 149 720 104 C739 149 798 166 877 188 C964 212 1052 256 1052 342 L1052 900" fill="none" stroke={RUBY} strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 13" style={{ animationDelay: "1.6s" }} />
        <path className="h-draw" pathLength={1} d={ARCH} fill="none" stroke={EMERALD} strokeWidth="2" style={{ animationDelay: "0.5s" }} />
        <g className="h-fade" style={{ animationDelay: "1.2s" }} stroke={GOLD}>
          <path d="M720 30 L720 44" strokeWidth="2" />
          <circle cx="720" cy="26" r="5" fill={RUBY} strokeWidth="1.5" />
          <path d="M706 52 C700 44 712 40 720 46 C728 40 740 44 734 52" fill={EMERALD} strokeWidth="1.2" />
          <path d="M704 56 C694 68 700 84 720 86 C740 84 746 68 736 56 Z" fill={GOLD} stroke={CREAM} strokeWidth="1" />
          <path d="M704 68 L736 68" stroke={RUBY} strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 6" />
          <circle cx="380" cy="340" r="7" fill={RUBY} strokeWidth="1.5" />
          <circle cx="1060" cy="340" r="7" fill={RUBY} strokeWidth="1.5" />
        </g>
        {GLINTS.map((g, i) => (
          <g key={i} transform={`translate(${g.x} ${g.y}) scale(${g.k})`}>
            <path className="h-glint" d={STAR4} fill={CREAM} style={{ animationDelay: `${g.d}s`, animationDuration: `${g.t}s` }} />
          </g>
        ))}
        {FIREWORKS.map((w, i) => (
          <g key={i} transform={`translate(${w.x} ${w.y}) scale(${w.s})`}>
            <g className="h-firework" style={{ animationDelay: `${w.d}s` }}>
              <path d={w.rays} fill="none" stroke={w.c} strokeWidth="1.4" strokeLinecap="round" />
              <path d={w.dots} fill="none" stroke={RUBY} strokeWidth="4" strokeLinecap="round" />
              <path d={w.dots2} fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        ))}
        <ellipse cx="720" cy="500" rx="450" ry="200" fill="url(#h-shade)" />
      </g>

      {/* near: garlands, peacocks, lanterns, toran */}
      <g className="h-par" style={near}>
        {[
          { d: "M24 56 Q200 420 420 172", o: "24px 56px", dir: "alternate" },
          { d: "M1416 56 Q1240 420 1020 172", o: "1416px 56px", dir: "alternate-reverse" },
        ].map((g, i) => (
          <g key={i} className="h-fade" style={{ animationDelay: "1s" }}>
            <g className="h-garland" style={{ transformOrigin: g.o, animationDirection: g.dir }}>
              <path d={g.d} fill="none" stroke="#2E7D32" strokeWidth="2" />
              <path d={g.d} fill="none" stroke={SAFFRON} strokeWidth="14" strokeLinecap="round" strokeDasharray="0.1 14" />
              <path d={g.d} fill="none" stroke="#FFC107" strokeWidth="10" strokeLinecap="round" strokeDasharray="0.1 14" strokeDashoffset="7" />
            </g>
          </g>
        ))}
        <Peacock x={445} delay={0} />
        <Peacock x={995} flip delay={-2.2} />
        <Lantern x={112} body={RUBY} core={EMERALD} delay={0} />
        <Lantern x={1248} body={SAPPHIRE} core={RUBY} delay={-2.5} />
        {STRANDS.map((s, i) => (
          <g key={i} transform={`translate(${s.x} 31)`}>
            <g className="h-sway" style={{ animationDelay: `${s.dl}s`, animationDuration: `${s.t}s` }}>
              <line x1="0" y1="0" x2="0" y2={s.l} stroke={GOLD} strokeWidth="4.5" strokeLinecap="round" strokeDasharray="0.1 8" />
              <path transform={`translate(0 ${s.l})`} d={s.d} fill={s.fill} stroke={GOLD} strokeWidth="1.4" strokeLinejoin="round" />
            </g>
          </g>
        ))}
        <rect width="1440" height="18" fill={MAROON} />
        <path d="M0 6 L1440 6" stroke={GOLD} strokeWidth="1" />
        <path d="M0 12 L1440 12" stroke={RUBY} strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 7" />
        <path d={SCALLOP} fill={MAROON} stroke={GOLD} strokeWidth="1.5" />
        {TORAN_GEMS.map((g, i) => (
          <circle key={i} cx={g.x} cy="31" r="4" fill={g.c} stroke={GOLD} strokeWidth="1.2" />
        ))}
      </g>

      <rect x="24" y="24" width="1392" height="832" fill="none" stroke={GOLD} strokeOpacity="0.5" />

      {/* falling glitter */}
      {GLITTER.map((p, i) =>
        p.sq ? (
          <rect key={i} className="h-fall" x={p.x} y="0" width={p.s} height={p.s} rx="1" fill={p.c} style={{ animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }} />
        ) : (
          <circle key={i} className="h-fall" cx={p.x} cy="0" r={p.s / 2} fill={p.c} style={{ animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }} />
        ),
      )}

      {/* near, ground level: mandala wheel, diyas, elephants */}
      <g className="h-par" style={near}>
        <g transform="translate(720 866)">
          <g className="h-fade" opacity="0.8" style={{ animationDelay: "0.8s" }}>
            <g className="h-spin-r">
              <circle r="252" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.1 10" />
              {Array.from({ length: 20 }, (_, i) => (
                <path key={i} transform={`rotate(${i * 18})`} d="M0 -238 C18 -214 18 -186 0 -166 C-18 -186 -18 -214 0 -238 Z" fill="rgba(224,17,95,0.14)" stroke={GOLD} />
              ))}
              <circle r="160" fill={MAROON} stroke={GOLD} />
            </g>
            <g className="h-spin-s">
              <path d={SPOKES_R} fill="none" stroke={GOLD} strokeOpacity="0.35" />
              <circle r="146" fill="none" stroke={SAFFRON} strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 13" />
            </g>
            <g className="h-spin-r">
              <path d={SPOKES_R} fill="none" stroke={RUBY} strokeOpacity="0.3" />
              <circle r="128" fill="none" stroke={EMERALD} strokeWidth="1.5" />
            </g>
          </g>
        </g>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${488 + i * 104} 772) scale(0.8)`}>
            <g className="h-flame" style={{ animationDelay: `${-i * 0.37}s` }}>
              <path d="M30 6 C37 17 39 26 30 35 C21 26 23 17 30 6 Z" fill="#F6C65B" />
              <path d="M30 17 C33.5 23 34 28 30 33 C26 28 26.5 23 30 17 Z" fill="#FFF6DA" />
            </g>
            <path d="M7 38 C18 36 42 36 53 38 C50 50 41 56 30 56 C19 56 10 50 7 38 Z" fill={MAROON} stroke={GOLD} strokeWidth="1.4" />
            <ellipse cx="30" cy="38" rx="23" ry="3" fill="none" stroke={GOLD} strokeWidth="1.4" />
            <circle cx="20" cy="46" r="1.8" fill={JEWELS[i % 4]} />
            <circle cx="30" cy="49" r="1.8" fill={GOLD} />
            <circle cx="40" cy="46" r="1.8" fill={JEWELS[i % 4]} />
          </g>
        ))}
        <g transform="translate(40 640) scale(1.111)">
          <g className="h-fade" style={{ animationDelay: "1.1s" }}>
            <Elephant blanket={RUBY} accent={SAFFRON} delay={0} />
          </g>
        </g>
        <g transform="translate(1400 640) scale(-1.111 1.111)">
          <g className="h-fade" style={{ animationDelay: "1.1s" }}>
            <Elephant blanket={EMERALD} accent={RUBY} delay={-1.2} />
          </g>
        </g>
      </g>
    </svg>
  );
}
