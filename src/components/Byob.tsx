import Image from "next/image";
import Emoji from "./Emoji";

export default function Byob() {
  return (
    <section
      id="byob"
      aria-labelledby="byob-title"
      className="relative isolate overflow-hidden bg-black px-[5%] pt-24 pb-24 text-center md:pt-28 md:pb-24"
    >
      {/* a dark brick bar wall, lit from behind the sign */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 34px, rgb(0 0 0 / 0.9) 34px 37px), repeating-linear-gradient(90deg, transparent 0 76px, rgb(0 0 0 / 0.9) 76px 79px), linear-gradient(180deg, #2a0710, #160306)",
          WebkitMask: "radial-gradient(ellipse 70% 60% at 50% 35%, #000, transparent 80%)",
          mask: "radial-gradient(ellipse 70% 60% at 50% 35%, #000, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_35%_at_50%_28%,rgb(227_19_47/0.28),transparent_70%)]"
      />

      {/* neon sign: four bottles and glasses glowing on the wall */}
      <svg
        aria-hidden
        viewBox="0 0 440 200"
        className="mx-auto mb-10 w-full max-w-[560px] overflow-visible"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* wine bottle */}
        <g className="neon flicker text-rani" stroke="currentColor" transform="translate(20 10)">
          <path d="M22 0h16v52c0 16 22 26 22 52v80a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6v-80c0-26 22-36 22-52z" />
          <path d="M8 118h44v40H8z" />
        </g>
        {/* coupe with bubbles */}
        <g className="neon text-gold" stroke="currentColor" transform="translate(120 60)">
          <path d="M0 30c0 34 90 34 90 0z" />
          <path d="M45 56v66M20 126h50" />
          <circle cx="32" cy="16" r="3" />
          <circle cx="50" cy="6" r="2.5" />
          <circle cx="62" cy="-8" r="2" />
        </g>
        {/* whisky bottle */}
        <g className="neon text-marigold" stroke="currentColor" transform="translate(250 20)" style={{ animationDelay: "-2.5s" }}>
          <path d="M30 0h22v22h-2v10c0 8 32 10 32 26v116a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V58c0-16 32-18 32-26V22h-2z" />
          <path d="M12 92h58v46H12z" />
        </g>
        {/* martini */}
        <g className="neon flicker text-teal" stroke="currentColor" transform="translate(350 50)" style={{ animationDelay: "-4s" }}>
          <path d="M0 20h80L40 72z" />
          <path d="M40 72v60M18 136h44" />
          <path d="M52 8l-18 34" />
          <circle cx="32" cy="46" r="5" />
        </g>
      </svg>

      <p className="flex items-center justify-center gap-2 font-mono text-xs tracking-[0.3em] text-gold uppercase sm:text-sm">
        <Emoji name="cocktail" size={24} className="w-6" />
        The bar policy
        <Emoji name="cocktail" size={24} className="w-6 -scale-x-100" />
      </p>

      <h2 id="byob-title" className="mt-4 font-display leading-[0.9]">
        <span className="glitter block text-[clamp(5rem,18vw,9rem)] leading-[0.85]">BYOB</span>
        <span className="mt-3 block font-serif text-[clamp(1.8rem,4vw,3rem)] normal-case tracking-normal text-cream italic">
          Bring your own{" "}
          <span className="bg-[linear-gradient(transparent_58%,rgb(227_19_47/0.6)_58%,rgb(227_19_47/0.6)_90%,transparent_90%)] px-[0.1em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            daaru
          </span>
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-[40ch] text-xl text-cream/80">
        We&rsquo;ve got the ice, glasses, mixers and nimbu soda for whoever&rsquo;s driving. The bottle is on you.
      </p>

      <div aria-hidden className="pointer-events-none">
        <Image
          src="/textures/hand-card.png"
          alt=""
          width={338}
          height={656}
          sizes="200px"
          className="absolute -bottom-10 left-[3%] hidden w-32 -rotate-6 lg:block xl:w-40"
          style={{ WebkitMask: "linear-gradient(#000 60%, transparent 92%)", mask: "linear-gradient(#000 60%, transparent 92%)" }}
        />
      </div>
    </section>
  );
}
