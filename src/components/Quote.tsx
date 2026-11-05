import Emoji from "./Emoji";

const DIYAS = [
  { left: "6%", delay: "0s", size: "w-12" },
  { left: "24%", delay: "-1.6s", size: "w-16" },
  { left: "44%", delay: "-3s", size: "w-11" },
  { left: "63%", delay: "-0.8s", size: "w-14" },
  { left: "83%", delay: "-2.2s", size: "w-12" },
];

export default function Quote() {
  return (
    <section aria-hidden className="relative overflow-hidden bg-black pt-16">
      {/* a strip of glittering water with diyas bobbing on it */}
      <div className="relative h-44 sm:h-52">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent, rgb(122 0 20 / 0.7) 35%, rgb(227 19 47 / 0.3) 60%, #000)",
          }}
        />
        <div
          className="gold-foil absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            WebkitMask: "linear-gradient(180deg, transparent, #000 35%, #000 70%, transparent)",
            mask: "linear-gradient(180deg, transparent, #000 35%, #000 70%, transparent)",
          }}
        />
        {DIYAS.map((d, i) => (
          <div key={i} className="absolute top-[38%]" style={{ left: d.left }}>
            <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgb(255_210_63/0.45),transparent_65%)]" />
            <Emoji name="diya" size={64} className={`bob relative ${d.size}`} style={{ animationDelay: d.delay }} />
          </div>
        ))}
      </div>
    </section>
  );
}
