import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { Agentation } from "agentation";
import { SmoothScroll } from "./components/SmoothScroll";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-var",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code 1 — Because your potential is always the highest priority.",
  description:
    "The Restoration System for leaders and organisations. Restore the leader. Reveal the truth. Scale human intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
