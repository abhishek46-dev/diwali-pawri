import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { party } from "@/config/party";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: `${party.title} ✨`,
  description: `You're invited to ${party.host}'s Diwali party, ${party.dateLabel}. ${party.tagline}`,
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
