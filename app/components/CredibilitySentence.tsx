"use client";

import { useEffect, useRef, useState } from "react";

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

const FADE_WINDOW = 0.1;
const MIN_OPACITY = 0.16;

export function CredibilitySentence() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setProgress(1);
      return;
    }

    let ticking = false;
    const measure = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the element's top is at the bottom of the viewport,
      // 1 when the element's bottom is at the top of the viewport.
      const total = vh + rect.height;
      const scrolled = vh - rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
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

  return (
    <section className="bg-navy text-cream px-14 py-45 overflow-hidden max-md:px-6 max-md:py-25">
      <div className="max-w-[1180px] mx-auto">
        <div className="reveal font-sans text-cream/55 text-[11px] tracking-[3px] uppercase mb-12 before:inline-block before:align-middle before:w-8 before:h-px before:bg-cream/30 before:mr-4">
          Track record
        </div>
        <p
          ref={ref}
          className="font-serif font-normal text-[clamp(32px,4.4vw,64px)] leading-[1.15] tracking-[-0.4px] max-w-[1100px]"
        >
          {SEGMENTS.map((seg, i) => {
            // Spread the reveal across roughly the middle of the section's
            // travel through the viewport (0.15 → 0.7 of progress).
            const total = SEGMENTS.length;
            const segPoint = 0.15 + (i / (total - 1)) * 0.55;
            const t = (progress - (segPoint - FADE_WINDOW)) / FADE_WINDOW;
            const opacity = Math.max(MIN_OPACITY, Math.min(1, t));
            return (
              <span
                key={i}
                className={seg.gold ? "text-gold" : "text-cream"}
                style={{ opacity, transition: "opacity 120ms linear" }}
              >
                {seg.text}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
