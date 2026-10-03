import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--ff-display", subsets: ["latin"], weight: ["700", "800"] });
const text = IBM_Plex_Sans({ variable: "--ff-text", subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ variable: "--ff-mono", subsets: ["latin"], weight: ["500", "600"] });
const pen = Caveat({ variable: "--ff-pen", subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "MarkMatch · marks the way you mark",
  description: "Learns a teacher's marking from six answers, then marks the class with a checked quote for every mark.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={`${display.variable} ${text.variable} ${mono.variable} ${pen.variable}`}>
      <body>{children}</body>
    </html>
  );
}
