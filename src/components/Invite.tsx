import Image from "next/image";
import { party } from "@/config/party";
import Countdown from "./Countdown";
import Emoji from "./Emoji";

const DETAILS = [
  {
    term: "When",
    value: (
      <>
        {party.dateLabel}
        <br />
        {party.timeLabel}
      </>
    ),
  },
  { term: "Where", value: "Location will be sent on WhatsApp" },
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
      {/* the details sit straight on the velvet photo, glasses peeking out above and below */}
      <div className="relative w-full max-w-[640px] -rotate-1 overflow-hidden rounded-[28px] px-6 pt-44 pb-64 shadow-[0_0_0_5px_#fff4e2,0_0_0_8px_#ffd23f,0_40px_80px_rgb(0_0_0/0.5)] sm:px-12 sm:pt-56 sm:pb-72">
        <Image
          src="/img/velvet-card.webp"
          alt="Hands raising coupe glasses on red velvet"
          fill
          sizes="(max-width: 700px) 100vw, 640px"
          className="object-cover object-[70%_50%]"
        />
        {/* soft shade behind the text so it reads over the velvet */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 75% 45% at 50% 48%, rgb(18 2 4 / 0.55), transparent 75%)" }}
        />

        <div className="relative z-10 [text-shadow:0_2px_12px_rgb(0_0_0/0.45)]">
          <Emoji name="diya" size={64} className="absolute -top-2 right-0 hidden w-16 sm:block" />

          <p className="font-serif text-2xl text-gold italic">Save the date</p>
          <h2
            id="invite-title"
            className="mt-1.5 mb-7 max-w-[13ch] font-display text-[clamp(2.4rem,4.4vw,3.6rem)] leading-[0.95] text-cream"
          >
            You, me &amp; way too many laddoos
          </h2>

          <dl className="mb-7 grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2">
            {DETAILS.map((d) => (
              <div key={d.term}>
                <dt className="font-mono text-xs font-bold tracking-[0.15em] text-gold uppercase">{d.term}</dt>
                <dd className="mt-1 font-serif text-[1.35rem] leading-tight text-cream">{d.value}</dd>
              </div>
            ))}
          </dl>

          <Countdown />
          <p className="mt-4 font-mono text-xs text-cream/80">
            RSVP before {party.rsvpBy} so the halwai knows how many laddoos to make.
          </p>
        </div>
      </div>
    </section>
  );
}
