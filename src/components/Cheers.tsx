"use client";

import { useEffect, useRef } from "react";

// Two glitter-filled wine glasses that clink each time they scroll into view — background for the RSVP heading.
// Ported from the "Glittery cheers" canvas sketch; colours are its dark palette, fixed for our black page.

const TAU = Math.PI * 2;
const W = 800, H = 640, MID = 400, PIVY = 580;
const LCX = 200, RIM = 80, BOT = 335, LEVEL = 172, FOOTY = 528;

const C = {
  glass: "rgba(255, 232, 244, 0.6)",
  glassFill: "rgba(255, 255, 255, 0.05)",
  highlight: "rgba(255, 255, 255, 0.75)",
  wine1: "#a51f54",
  wine2: "#3a0620",
  surface: "#c83c72",
  gold: "#ffd36e",
  rose: "#ff8cc2",
  silver: "#f6f2ff",
  lilac: "#c6a8ff",
  shadow: "rgba(0, 0, 0, 0.45)",
  flash: "rgba(255, 236, 190, 0.9)",
};
type Sparkle = "gold" | "rose" | "silver" | "lilac";
const COLS: Sparkle[] = ["gold", "rose", "silver", "lilac", "gold", "silver", "rose"];
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

// bowl half-width at each y, sampled from the bowl's bezier
const HW = new Float32Array(BOT + 2);
{
  const p = [[290, 80], [300, 220], [250, 330], [200, 335]];
  for (let i = 0; i <= 2000; i++) {
    const t = i / 2000, u = 1 - t;
    const x = u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0];
    const y = u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1];
    const yi = Math.round(y);
    if (yi >= 0 && yi < HW.length) HW[yi] = Math.max(HW[yi], x - LCX);
  }
  for (let y = RIM + 1; y <= BOT; y++) if (!HW[y]) HW[y] = HW[y - 1];
}
const hw = (y: number) => HW[Math.round(Math.max(RIM, Math.min(BOT, y)))];

type Part = { th: number; r: number; y: number; s: number; c: Sparkle; ph: number; sp: number; rot: number; lift: number; depth: number };
type Fixed = { x: number; y: number; s: number; c: Sparkle; ph: number; sp: number; rot: number };
type Glass = { dir: number; parts: Part[]; fixed: Fixed[]; swirl: number; slosh: number; sloshV: number; rot: number };

function makeGlass(dir: number): Glass {
  const parts: Part[] = [], fixed: Fixed[] = [];
  for (let i = 0; i < 240; i++) {
    parts.push({
      th: rnd(0, TAU),
      r: Math.sqrt(Math.random()) * 0.92,
      y: LEVEL + 30 + Math.pow(Math.random(), 0.6) * (BOT - LEVEL - 36),
      s: rnd(0.9, 3),
      c: COLS[i % COLS.length],
      ph: rnd(0, TAU),
      sp: rnd(1, 3.5),
      rot: rnd(0, TAU),
      lift: Math.random(),
      depth: 0,
    });
  }
  const add = (x: number, y: number, s: number) =>
    fixed.push({ x, y, s, c: COLS[fixed.length % COLS.length], ph: rnd(0, TAU), sp: rnd(0.6, 2.4), rot: rnd(0, TAU) });
  for (let i = 0; i < 240; i++) {
    const a = rnd(0, TAU);
    const drip = Math.pow(Math.random(), 2.2) * 16;
    add(LCX + Math.cos(a) * (hw(RIM + drip) + rnd(-1.5, 1.5)), RIM + Math.sin(a) * 11 + drip, rnd(0.7, 2.2));
  }
  for (let i = 0; i < 50; i++) {
    const y = rnd(RIM + 20, BOT - 8), side = Math.random() < 0.5 ? -1 : 1;
    add(LCX + side * (hw(y) - rnd(0, 4)), y, rnd(0.5, 1.4));
  }
  for (let i = 0; i < 140; i++) {
    const a = rnd(0, TAU), rr = Math.sqrt(Math.random());
    add(LCX + Math.cos(a) * rr * 90, FOOTY + Math.sin(a) * rr * 12, rnd(0.6, 2));
  }
  for (let i = 0; i < 26; i++) add(LCX + rnd(-3.5, 3.5), rnd(340, 515), rnd(0.5, 1.2));
  return { dir, parts, fixed, swirl: 0, slosh: 0, sloshV: 0, rot: 0 };
}

// the toast choreography
const REST_D = 255, REST_A = 0.03, TOUCH_A = 0.22, LIFT = 28;
const TOUCH_D = 90 * Math.cos(TOUCH_A) + 448 * Math.sin(TOUCH_A);
const CLINK = 0.9, END = 3.1;
const easeIn = (k: number) => k * k * k;
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

function pose(ct: number | null) {
  if (ct === null) return { d: REST_D, a: REST_A, lift: 0 };
  if (ct < CLINK) {
    const k = easeIn(ct / CLINK);
    return { d: lerp(REST_D, TOUCH_D, k), a: lerp(REST_A, TOUCH_A, k), lift: LIFT * easeInOut(ct / CLINK) };
  }
  if (ct < CLINK + 0.4) {
    const k = (ct - CLINK) / 0.4, b = Math.sin(Math.PI * k) * (1 - k * 0.4);
    return { d: TOUCH_D + 9 * b, a: TOUCH_A - 0.015 * b, lift: LIFT };
  }
  if (ct < 2.0) return { d: TOUCH_D + 0.5, a: TOUCH_A, lift: LIFT + Math.sin((ct - 1.3) * 4) * 1.5 };
  const k = easeInOut(Math.min(1, (ct - 2.0) / (END - 2.0)));
  return { d: lerp(TOUCH_D + 0.5, REST_D, k), a: lerp(TOUCH_A, REST_A, k), lift: lerp(LIFT, 0, k) };
}

function start(cv: HTMLCanvasElement) {
  const ctx = cv.getContext("2d")!;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const glasses = [makeGlass(1), makeGlass(-1)];

  type Dust = { x: number; y: number; vy: number; vx: number; s: number; c: Sparkle; ph: number; sp: number };
  type Burst = { x: number; y: number; vx: number; vy: number; life: number; max: number; s: number; c: Sparkle; rot: number; vr: number; star: boolean };
  let dust: Dust[] = [];
  const burst: Burst[] = [];
  let flash = -1, flashX = 0, flashY = 0;

  let dpr = 1, scale = 1, ox = 0, oy = 0, vw = 0, vh = 0;
  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    vw = cv.clientWidth;
    vh = cv.clientHeight;
    cv.width = Math.round(vw * dpr);
    cv.height = Math.round(vh * dpr);
    scale = Math.min(vw / W, vh / H) * 0.96;
    ox = (vw - W * scale) / 2;
    oy = (vh - H * scale) / 2;
    dust = [];
    const n = Math.round((vw * vh) / 26000);
    for (let i = 0; i < n; i++)
      dust.push({ x: rnd(0, vw), y: rnd(0, vh), vy: rnd(0.12, 0.45), vx: rnd(-0.1, 0.1), s: rnd(0.6, 1.8), c: COLS[i % COLS.length], ph: rnd(0, TAU), sp: rnd(0.8, 2.5) });
  }
  const ro = new ResizeObserver(resize);
  ro.observe(cv);
  resize();

  function flake(x: number, y: number, s: number, rot: number, col: string, a: number) {
    ctx.globalAlpha = a;
    ctx.fillStyle = col;
    const c = Math.cos(rot) * s * 0.5, sn = Math.sin(rot) * s * 0.5;
    ctx.beginPath();
    ctx.moveTo(x + c, y + sn);
    ctx.lineTo(x - sn, y + c);
    ctx.lineTo(x - c, y - sn);
    ctx.lineTo(x + sn, y - c);
    ctx.closePath();
    ctx.fill();
  }
  function star(x: number, y: number, r: number, col: string, a: number) {
    ctx.globalAlpha = a;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
  }
  function bowlPath(close: boolean) {
    ctx.beginPath();
    ctx.moveTo(110, 80);
    ctx.bezierCurveTo(100, 220, 150, 330, 200, 335);
    ctx.bezierCurveTo(250, 330, 300, 220, 290, 80);
    if (close) ctx.closePath();
  }

  // ct is the clink timeline; null while the glasses rest apart
  let ct: number | null = null, delay = 0;

  function onClink(x: number, y: number) {
    flash = 0;
    flashX = x;
    flashY = y;
    const n = reduce ? 30 : 80;
    for (let i = 0; i < n; i++) {
      const up = Math.random() < 0.6;
      const ang = up ? -Math.PI / 2 + rnd(-1.3, 1.3) : rnd(0, TAU);
      const sp = rnd(1.2, 5.5);
      burst.push({
        x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
        life: 0, max: rnd(50, 110), s: rnd(1.2, 3.4),
        c: COLS[i % COLS.length], rot: rnd(0, TAU), vr: rnd(-0.2, 0.2),
        star: Math.random() < 0.3,
      });
    }
    glasses[0].sloshV -= 0.07;
    glasses[0].swirl = 0.05;
    glasses[1].sloshV += 0.07;
    glasses[1].swirl = 0.05;
  }

  const baseSpin = reduce ? 0 : 0.005;
  const twinkleRate = reduce ? 0.15 : 1;

  function drawGlass(g: Glass, t: number) {
    const omega = g.dir * (baseSpin + g.swirl);
    g.swirl *= 0.985;
    g.sloshV += -0.06 * g.slosh;
    g.sloshV *= 0.93;
    g.slosh += g.sloshV;

    ctx.globalAlpha = 1;
    bowlPath(true);
    ctx.fillStyle = C.glassFill;
    ctx.fill();

    // wine stays level with the world, plus a little slosh
    const ang = -g.rot + g.slosh;
    const ry = 7 + Math.min(g.swirl * 150, 10);
    const surfY = LEVEL;

    ctx.save();
    bowlPath(true);
    ctx.clip();

    ctx.save();
    ctx.translate(LCX, surfY);
    ctx.rotate(ang);
    const lg = ctx.createLinearGradient(0, 0, 0, BOT - surfY + 40);
    lg.addColorStop(0, C.wine1);
    lg.addColorStop(1, C.wine2);
    ctx.globalAlpha = 0.94;
    ctx.fillStyle = lg;
    ctx.fillRect(-300, 0, 600, 400);
    ctx.restore();

    const top = surfY + ry + 4 + 95 * Math.abs(Math.tan(ang));
    for (const p of g.parts) {
      p.th += omega * (0.7 + 0.6 * (1 - p.r));
      p.rot += omega * 3 + 0.002;
      p.y += 0.035 - g.swirl * (0.4 + p.lift * 2.2) + (Math.random() - 0.5) * g.swirl * 3;
      if (p.y < top) p.y = top + Math.random() * 3;
      if (p.y > BOT - 5) p.y = BOT - 5;
      p.depth = Math.sin(p.th);
    }
    g.parts.sort((a, b) => a.depth - b.depth);
    for (const p of g.parts) {
      const w = Math.max(0, hw(p.y) - 6);
      const x = LCX + Math.cos(p.th) * p.r * w;
      const front = (p.depth + 1) / 2;
      const tw = Math.pow(0.5 + 0.5 * Math.sin(t * p.sp + p.ph + p.th), 2);
      const size = p.s * (0.7 + 0.45 * front);
      flake(x, p.y, size, p.rot, C[p.c], (0.35 + 0.65 * front) * (0.4 + 0.6 * tw));
      if (tw > 0.85 && front > 0.5) {
        const k = (tw - 0.85) / 0.15;
        ctx.globalCompositeOperation = "lighter";
        star(x, p.y, size * (1.5 + 3.5 * k), C.silver, 0.7 * k * front);
        ctx.globalCompositeOperation = "source-over";
      }
    }

    // surface
    ctx.save();
    ctx.translate(LCX, surfY);
    ctx.rotate(ang);
    const rx = hw(surfY) / Math.cos(ang) + 4;
    const sgr = ctx.createLinearGradient(0, -ry, 0, ry);
    sgr.addColorStop(0, C.wine1);
    sgr.addColorStop(1, C.surface);
    ctx.globalAlpha = 0.96;
    ctx.fillStyle = sgr;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
    ctx.fill();
    for (let i = 0; i < 40; i++) {
      const a = i * 2.399 + t * 0.2 * g.dir;
      const rr = Math.sqrt((i * 0.6180339) % 1) * 0.9;
      const tw = Math.pow(0.5 + 0.5 * Math.sin(t * (1.5 + (i % 5) * 0.4) + i), 3);
      flake(Math.cos(a) * rr * rx, Math.sin(a) * rr * ry, 1.2 + (i % 3) * 0.5, a, C[COLS[i % COLS.length]], 0.25 + 0.7 * tw);
    }
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = C.highlight;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx - 1, ry, 0, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.restore();
    ctx.restore();

    // glass
    ctx.lineCap = "round";
    ctx.strokeStyle = C.glass;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(LCX, RIM, 90, 11, 0, Math.PI, TAU);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2.2;
    bowlPath(false);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(LCX, RIM, 90, 11, 0, 0, Math.PI);
    ctx.stroke();

    ctx.strokeStyle = C.highlight;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(124, 104);
    ctx.bezierCurveTo(117, 196, 142, 282, 172, 314);
    ctx.stroke();
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(278, 112);
    ctx.bezierCurveTo(282, 150, 279, 185, 272, 210);
    ctx.stroke();

    // stem
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(193, 333);
    ctx.quadraticCurveTo(196, 420, 195.5, 502);
    ctx.quadraticCurveTo(191, 519, 176, 526);
    ctx.lineTo(224, 526);
    ctx.quadraticCurveTo(209, 519, 204.5, 502);
    ctx.quadraticCurveTo(204, 420, 207, 333);
    ctx.closePath();
    ctx.fillStyle = C.glassFill;
    ctx.fill();
    ctx.strokeStyle = C.glass;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.strokeStyle = C.highlight;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(197.5, 345);
    ctx.lineTo(197.5, 500);
    ctx.stroke();

    // foot
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.glassFill;
    ctx.beginPath();
    ctx.ellipse(LCX, FOOTY, 92, 13, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = C.glass;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(LCX, FOOTY, 92, 13, 0, 0.15, Math.PI - 0.15);
    ctx.stroke();

    // glitter stuck to the glass
    for (const f of g.fixed) {
      const tw = Math.pow(0.5 + 0.5 * Math.sin(t * f.sp + f.ph), 3);
      flake(f.x, f.y, f.s, f.rot, C[f.c], 0.5 + 0.5 * tw);
      if (tw > 0.9) {
        const k = (tw - 0.9) / 0.1;
        ctx.globalCompositeOperation = "lighter";
        star(f.x, f.y, f.s * (2 + 4.5 * k), C.silver, 0.9 * k);
        ctx.globalCompositeOperation = "source-over";
      }
    }
  }

  let raf = 0, visible = false;
  let last = performance.now();
  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = (now / 1000) * twinkleRate;

    if (delay > 0 && (delay -= dt) <= 0) ct = 0;
    const prev = ct;
    if (ct !== null) {
      ct += dt;
      if (ct >= END) ct = null;
    }
    const P = pose(ct);
    glasses[0].rot = P.a;
    glasses[1].rot = -P.a;
    const lx = MID - P.d, rx = MID + P.d, py = PIVY - P.lift;

    if (prev !== null && prev < CLINK && ct !== null && ct >= CLINK) {
      onClink(lx + 90 * Math.cos(P.a) + 448 * Math.sin(P.a), py + 90 * Math.sin(P.a) - 448 * Math.cos(P.a));
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);

    if (!reduce) {
      for (const d of dust) {
        d.y += d.vy;
        d.x += d.vx + Math.sin(t + d.ph) * 0.08;
        if (d.y > vh + 5) {
          d.y = -5;
          d.x = rnd(0, vw);
        }
        const tw = 0.5 + 0.5 * Math.sin(t * d.sp + d.ph);
        flake(d.x, d.y, d.s, t + d.ph, C[d.c], 0.15 + 0.45 * tw * tw);
      }
    }

    const base = () => ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);
    base();

    // shadows on the table
    for (const x of [lx, rx]) {
      ctx.save();
      ctx.translate(x, PIVY + 12);
      ctx.scale(1, 0.14);
      const rad = 130 + P.lift;
      const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, rad);
      sg.addColorStop(0, C.shadow);
      sg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 1 - P.lift / 80;
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(0, 0, rad, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    for (const [g, x] of [[glasses[0], lx], [glasses[1], rx]] as const) {
      base();
      ctx.translate(x, py);
      ctx.rotate(g.rot);
      ctx.translate(-LCX, -FOOTY);
      drawGlass(g, t);
    }

    // clink flash + spray of glitter
    base();
    if (flash >= 0) {
      flash += dt / 0.45;
      if (flash >= 1) flash = -1;
      else {
        const r = 12 + 80 * flash;
        const fg = ctx.createRadialGradient(flashX, flashY, 0, flashX, flashY, r);
        fg.addColorStop(0, C.flash);
        fg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.9 * (1 - flash);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(flashX, flashY, r, 0, TAU);
        ctx.fill();
        star(flashX, flashY, 34 * (1 - flash) + 6, C.silver, 0.95 * (1 - flash));
        ctx.globalCompositeOperation = "source-over";
      }
    }
    for (let i = burst.length - 1; i >= 0; i--) {
      const b = burst[i];
      b.vy += 0.05;
      b.vx *= 0.985;
      b.vy *= 0.985;
      b.x += b.vx;
      b.y += b.vy;
      b.rot += b.vr;
      b.life++;
      if (b.life > b.max) {
        burst.splice(i, 1);
        continue;
      }
      const a = 1 - b.life / b.max;
      const tw = 0.6 + 0.4 * Math.sin(b.life * 0.4 + b.rot);
      if (b.star) {
        ctx.globalCompositeOperation = "lighter";
        star(b.x, b.y, b.s * 2.2, C[b.c], a * tw);
        ctx.globalCompositeOperation = "source-over";
      } else {
        flake(b.x, b.y, b.s, b.rot, C[b.c], a * tw);
      }
    }

    ctx.globalAlpha = 1;
    if (visible) raf = requestAnimationFrame(frame);
  }

  // animate only while on screen, and clink every time it scrolls into view
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && !visible) {
        visible = true;
        last = performance.now();
        if (ct === null) delay = 0.35;
        raf = requestAnimationFrame(frame);
      } else if (!e.isIntersecting) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    },
    { threshold: 0.45 },
  );
  io.observe(cv);

  return () => {
    visible = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
  };
}

export default function Cheers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => (ref.current ? start(ref.current) : undefined), []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none block ${className}`} />;
}
