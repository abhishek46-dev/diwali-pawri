import Emoji from "./Emoji";

// The dress code, said loudly, right under the hero
export default function DressNote() {
  return (
    <section aria-label="Dress code" className="relative overflow-hidden bg-black px-[5%] pt-10 pb-20 text-center">
      <p className="flex items-center justify-center gap-2 font-mono text-xs tracking-[0.3em] text-gold uppercase sm:text-sm">
        <Emoji name="dress" size={24} className="w-6" />
        The dress code
        <Emoji name="gem" size={24} className="w-6" />
      </p>
      <p className="mx-auto mt-5 max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] text-silver">
        Outfits traditional,
        <br />
        {/* marker-pen highlight that follows the text onto every wrapped line */}
        <span className="bg-[linear-gradient(transparent_62%,rgb(227_19_47/0.6)_62%,rgb(227_19_47/0.6)_92%,transparent_92%)] px-[0.1em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
          <span className="glitter font-serif normal-case tracking-normal italic">intentions questionable</span>
        </span>
      </p>
      <Emoji name="lotus" size={64} className="bob absolute top-8 left-[6%] hidden w-14 md:block" />
      <Emoji name="sparkles" size={56} className="bob absolute right-[7%] bottom-10 hidden w-12 md:block" style={{ animationDelay: "-2s" }} />
    </section>
  );
}
