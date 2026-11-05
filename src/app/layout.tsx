import type { Metadata, Viewport } from "next";
import { Anton, Bodoni_Moda, Instrument_Serif, JetBrains_Mono, Jost, Rozha_One } from "next/font/google";
import "./globals.css";
import { party } from "@/config/party";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const bodoni = Bodoni_Moda({ weight: ["400", "500"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-bodoni" });
const jost = Jost({ weight: ["300", "400"], subsets: ["latin"], variable: "--font-jost" });
const rozha = Rozha_One({ weight: "400", subsets: ["devanagari", "latin"], variable: "--font-rozha" });

export const metadata: Metadata = {
  title: `${party.title} ✨`,
  description: `You're invited to ${party.host}'s Diwali party, ${party.dateLabel}. ${party.tagline}`,
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${instrument.variable} ${jetbrains.variable} ${bodoni.variable} ${jost.variable} ${rozha.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
