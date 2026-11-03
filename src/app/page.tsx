import HouseRules from "@/components/HouseRules";
import DressNote from "@/components/DressNote";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Hosts from "@/components/Hosts";
import Invite from "@/components/Invite";
import Byob from "@/components/Byob";
import Nav from "@/components/Nav";
import Quote from "@/components/Quote";
import Rsvp from "@/components/Rsvp";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <DressNote />
      <Invite />
      <Quote />
      <Byob />
      <HouseRules />
      <Rsvp />
      <Hosts />
      <Footer />
    </main>
  );
}
