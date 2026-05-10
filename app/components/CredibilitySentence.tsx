"use client";

import { useEffect, useRef } from "react";

const SEGMENTS: { text: string; gold?: boolean }[] = [
  { text: "Across " },
  { text: "30+", gold: true },
  { text: " years and " },
  { text: "four", gold: true },
  { text: " continents, advising " },
  { text: "three", gold: true },
  { text: " governments, building multimillion-dollar businesses — published in " },
  { text: "two", gold: true },
  { text: " books." },
];

// Flatten segments to per-character entries.
const CHARS = SEGMENTS.flatMap((seg) =>
  Array.from(seg.text).map((c) => ({ c, gold: !!seg.gold }))
);

const REVEAL_START = 0.15;
const REVEAL_END = 0.7;
const FADE = 0.05; // window over which each char fades in

export function CredibilitySentence() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.setProperty("--progress", "1");
      return;
    }

    let ticking = false;
    const measure = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      const scrolled = vh - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      el.style.setProperty("--progress", String(p));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const last = CHARS.length - 1;

  return (
    <section className="bg-navy text-cream px-14 py-45 overflow-hidden max-md:px-6 max-md:py-25">
      <div className="max-w-[1180px] mx-auto">
        <div className="reveal font-sans text-cream/55 text-[11px] tracking-[3px] uppercase mb-12 before:inline-block before:align-middle before:w-8 before:h-px before:bg-cream/30 before:mr-4">
          Track record
        </div>
        <p
          ref={ref}
          className="cred-sentence font-serif font-normal text-[clamp(32px,4.4vw,64px)] leading-[1.15] tracking-[-0.4px] max-w-[1100px]"
          style={{ ["--progress" as string]: 0 } as React.CSSProperties}
        >
          {CHARS.map(({ c, gold }, i) => {
            const point = REVEAL_START + (i / last) * (REVEAL_END - REVEAL_START);
            const start = point - FADE;
            return (
              <span
                key={i}
                className={`cred-char${gold ? " text-gold" : ""}`}
                style={
                  { ["--char-start" as string]: start.toFixed(4) } as React.CSSProperties
                }
              >
                {c}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
