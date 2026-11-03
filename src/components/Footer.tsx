import { party } from "@/config/party";
import Emoji from "./Emoji";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-4 pt-20 pb-14 text-center">
      <div className="flex items-end justify-center gap-4" aria-hidden>
        <Emoji name="lotus" size={56} className="w-12" />
        <Emoji name="diya" size={72} className="w-16" />
        <Emoji name="lotus" size={56} className="w-12" />
      </div>
      <p className="glitter mt-4 font-display text-[clamp(3.4rem,11vw,9rem)] leading-[0.9]">Shubh Deepavali</p>
      <p className="mt-4 font-serif text-xl text-cream/75 italic">Love, {party.host}. Made with ghee, glitter and zero chill.</p>
      <a href="#top" className="mt-6 inline-block font-mono text-xs tracking-[0.2em] text-gold uppercase underline underline-offset-4 hover:text-cream">
        Back to the top
      </a>
    </footer>
  );
}
