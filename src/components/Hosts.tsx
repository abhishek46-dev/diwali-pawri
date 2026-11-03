import Image from "next/image";
import Emoji from "./Emoji";

export default function Hosts() {
  return (
    <section
      id="hosts"
      aria-labelledby="hosts-title"
      className="relative overflow-hidden px-[5%] pt-24 pb-28"
      style={{ background: "radial-gradient(ellipse at 30% 50%, rgb(255 190 40 / 0.1), transparent 60%), #000" }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-16 gap-y-14">
        <figure className="relative m-0 w-full max-w-[520px] -rotate-3">
          {/* washi tape */}
          <div aria-hidden className="absolute -top-4 left-1/2 z-10 h-8 w-32 -translate-x-1/2 rotate-2 bg-gold/70 shadow-sm" />
          <Image
            src="/img/hosts.webp"
            alt="Polaroid of four smiling kids sitting together, one hugging a teddy bear"
            width={1280}
            height={1041}
            sizes="(max-width: 600px) 90vw, 520px"
            className="h-auto w-full shadow-[0_30px_60px_rgb(0_0_0/0.55)]"
          />
          <figcaption className="absolute right-0 bottom-[3%] left-0 text-center font-serif text-[clamp(1.3rem,4vw,1.9rem)] text-ink/80 italic">
            the hosts, a few Diwalis ago
          </figcaption>
          <Emoji name="sparkles" size={56} className="absolute -top-6 -right-6 w-12 rotate-12" />
          <Emoji name="hibiscus" size={64} className="absolute -bottom-7 -left-7 w-14 -rotate-12" />
        </figure>

        <div className="max-w-md text-center lg:text-left">
          <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase sm:text-sm">Who&rsquo;s inviting</p>
          <h2 id="hosts-title" className="glitter mt-3 font-display text-[clamp(3rem,6vw,5rem)] leading-[0.95]">
            Same smiles, bigger appetites
          </h2>
          <p className="mt-5 text-xl text-cream/85">
            We&rsquo;ve been lighting diyas together since we were this tall. The teddy has retired, the turbans got
            better, and the guest list got longer.
          </p>
          <p className="mt-4 text-xl text-cream/85">This year, we want you in the picture.</p>
          <a href="#rsvp" className="btn btn-gold gold-foil mt-8">
            Count me in
          </a>
        </div>
      </div>
    </section>
  );
}
