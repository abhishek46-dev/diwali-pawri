import Image from "next/image";
import Emoji, { type EmojiName } from "./Emoji";

const RULES: { emoji: EmojiName; text: string }[] = [
  { emoji: "fireworks", text: "Entry is filmy, exit is not guaranteed" },
  { emoji: "notes", text: "No sad songs, only shaadi vibes" },
  { emoji: "heart", text: "Respect the space, the gang and the neighbours" },
  { emoji: "sparkles", text: "Clean up after yourself" },
  { emoji: "star", text: "RSVP on time" },
  { emoji: "cocktail", text: "Do not puke" },
  { emoji: "clink", text: "Let us know if you're getting a plus one" },
];

export default function HouseRules() {
  return (
    <section id="rules" aria-labelledby="rules-title" className="relative isolate overflow-hidden px-[5%] pt-36 pb-28 sm:pt-28">
      <Image src="/img/mandala-bright.webp" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(90deg, rgb(42 5 9 / 0.15), rgb(42 5 9 / 0.55) 55%, rgb(42 5 9 / 0.85))" }}
      />

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-12">
        <div className="relative">
          <h2
            id="rules-title"
            className="font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.92] text-cream [text-shadow:5px_5px_0_var(--color-sindoor),10px_10px_0_#000]"
          >
            Kuch Kuch
            <br />
            House Rules
            <br />
            Hote Hai!!
          </h2>
          <Image
            src="/textures/lips.png"
            alt=""
            width={566}
            height={629}
            sizes="160px"
            className="absolute -top-24 right-0 w-20 rotate-12 [filter:drop-shadow(3px_0_0_#fff4e2)_drop-shadow(-3px_0_0_#fff4e2)_drop-shadow(0_3px_0_#fff4e2)_drop-shadow(0_-3px_0_#fff4e2)_drop-shadow(8px_10px_0_rgb(227_19_47/0.55))] sm:-top-28 sm:-right-16 sm:w-32"
          />
        </div>

        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {RULES.map((r, i) => (
            <li
              key={r.text}
              className="flex items-center gap-3 rounded-full bg-cream py-2 pr-6 pl-2 font-serif text-xl text-ink shadow-[0_8px_0_rgb(42_5_9/0.6)] sm:text-lg"
              style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink">
                <Emoji name={r.emoji} size={30} className="w-7" />
              </span>
              {r.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
