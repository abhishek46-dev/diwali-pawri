import Image from "next/image";
import Emoji from "./Emoji";

export default function Byob() {
  return (
    <section
      id="byob"
      aria-labelledby="byob-title"
      className="relative isolate overflow-hidden bg-black px-[5%] pt-[22rem] pb-24 text-center md:pt-[30rem] md:pb-20"
    >
      <Image src="/img/byob-bg.webp" alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_15%] md:object-[50%_25%]" />
      {/* black fade: top and bottom melt into the page, centre dims so the type reads */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#000_0%,transparent_22%,transparent_35%,rgb(0_0_0/0.85)_60%,#000_100%)] md:bg-[radial-gradient(ellipse_40%_35%_at_50%_80%,rgb(0_0_0/0.7),transparent),linear-gradient(180deg,#000_0%,rgb(0_0_0/0.2)_15%,rgb(0_0_0/0.2)_50%,rgb(0_0_0/0.8)_75%,#000_100%)]"
      />
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
