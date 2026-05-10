import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Newsreader } from "next/font/google";
import { Agentation } from "agentation";
import { InterfaceKit } from "interface-kit/react";
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

const newsreader = Newsreader({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-text-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code 1 — Because your potential is always the highest priority.",
  description:
    "Leadership development, business transformation, and human potential — for leaders, organisations, and governments across Africa and beyond.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} ${newsreader.variable}`}>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
        {process.env.NODE_ENV === "development" && <InterfaceKit />}
      </body>
    </html>
  );
}
