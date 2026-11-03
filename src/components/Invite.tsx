import Image from "next/image";
import { party } from "@/config/party";
import Countdown from "./Countdown";
import Emoji from "./Emoji";

const DETAILS = [
  { term: "When", value: <>{party.dateLabel}<br />{party.timeLabel}</> },
  {
    term: "Where",
    value: (
      <a href={party.mapsUrl} target="_blank" rel="noreferrer" className="underline decoration-marigold decoration-2 underline-offset-[3px]">
        {party.venueAddress ? `${party.venue}, ${party.venueAddress}` : party.venue}
      </a>
    ),
  },
  { term: "Wear", value: party.dressCode },
  { term: "Bring", value: party.bring },
  { term: "Vibes", value: party.vibes },
  {
    term: "House rules",
    value: (
      <a href="#rules" className="underline decoration-marigold decoration-2 underline-offset-[3px]">
        Kuch kuch rules hote hai
      </a>
    ),
  },
];

export default function Invite() {
  return (
    <section
      id="invite"
      className="relative flex flex-wrap items-center justify-center gap-y-12 px-[5%] pt-36 pb-28"
      style={{
        background:
          "radial-gradient(ellipse at 20% 30%, rgb(227 19 47 / 0.22), transparent 55%), radial-gradient(ellipse at 80% 80%, rgb(255 159 28 / 0.18), transparent 55%), linear-gradient(160deg, #6e0012, #0a0102)",
      }}
    >
      <div className="w-[72%] max-w-[420px] -rotate-3 overflow-hidden rounded-[28px] shadow-[0_0_0_6px_#fff4e2,0_0_0_9px_#ffd23f,0_40px_80px_rgb(0_0_0/0.5)] md:w-[40%]">
        <Image
          src="/img/velvet-toast.webp"
          alt="Hands raising coupe glasses on red velvet"
          width={1000}
          height={1800}
          sizes="(max-width: 768px) 90vw, 420px"
          className="block aspect-[1000/1800] w-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-[560px] rotate-[1.5deg] drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)] lg:-ml-24">
        <article
          aria-labelledby="invite-title"
          className="ticket relative px-[clamp(26px,4vw,52px)] py-[clamp(40px,5vw,58px)] text-ink"
          style={{
            background:
              "radial-gradient(circle at 0 0, rgb(255 210 63 / 0.4), transparent 45%), radial-gradient(circle at 100% 100%, rgb(227 19 47 / 0.08), transparent 45%), #fff4e2",
          }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-x-3.5 inset-y-[22px] border-2 border-sindoor outline outline-1 outline-offset-[5px] outline-marigold" />
          <Emoji name="diya" size={64} className="absolute top-8 right-7 w-14 sm:w-16" />

          <p className="font-serif text-2xl text-rani-deep italic">Save the date</p>
          <h2 id="invite-title" className="mt-1.5 mb-7 max-w-[13ch] font-display text-[clamp(2.4rem,4.4vw,3.8rem)] leading-[0.95] text-sindoor">
            You, me &amp; way too many laddoos
          </h2>

          <dl className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-7 gap-y-5">
            {DETAILS.map((d) => (
              <div key={d.term}>
                <dt className="font-mono text-xs font-bold tracking-[0.15em] text-rani-deep uppercase">{d.term}</dt>
                <dd className="mt-1 font-serif text-[1.35rem] leading-tight">{d.value}</dd>
              </div>
            ))}
          </dl>

          <Countdown />
          <p className="mt-4 font-mono text-xs text-ink/70">RSVP by {party.rsvpBy} so the halwai knows how many laddoos to make.</p>
        </article>
      </div>
    </section>
  );
}
