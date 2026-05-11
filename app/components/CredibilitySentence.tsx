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

// Tokenize each segment into word-with-padding chunks so we reveal one
// word at a time. The regex matches optional leading whitespace + word +
// optional trailing whitespace, so spacing is preserved on the resulting
// inline spans.
const WORDS = SEGMENTS.flatMap((seg) => {
  const matches = seg.text.match(/\s*\S+\s*/g);
  if (!matches) return [{ w: seg.text, gold: false }];
  return matches.map((w) => ({ w, gold: !!seg.gold }));
});

// Tuned values (locked in after dial-kit tuning).
const REVEAL_START = 0.2;
const REVEAL_END = 0.83;
const FADE_WINDOW = 0.01;
const MIN_OPACITY = 0.12;
const TRANSITION_MS = 10;

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
      // Progress = 0 when the element's top is at the bottom of the viewport,
      // 1 when its top reaches the top of the viewport. So the reveal
      // begins as the text enters from below and is done by the time the
      // text is sitting at the top of the screen.
      const p = Math.max(0, Math.min(1, (vh - rect.top) / vh));
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

  const last = WORDS.length - 1;
  const span = REVEAL_END - REVEAL_START;

  return (
    <section className="bg-navy text-cream px-14 py-45 overflow-hidden max-md:px-6 max-md:py-25">
      <div className="max-w-[1180px] mx-auto">
        <div
          data-mark
          className="reveal font-sans text-cream/55 text-[11px] tracking-[3px] uppercase mb-12 before:inline-block before:align-middle before:w-8 before:h-px before:bg-cream/30 before:mr-4"
        >
          Track record
        </div>
        <p
          ref={ref}
          className="cred-sentence font-serif font-normal text-[clamp(32px,4.4vw,64px)] leading-[1.15] tracking-[-0.4px] max-w-[1100px]"
          style={
            {
              ["--progress" as string]: 0,
              ["--fade-window" as string]: FADE_WINDOW,
              ["--min-opacity" as string]: MIN_OPACITY,
              ["--transition-ms" as string]: `${TRANSITION_MS}ms`,
            } as React.CSSProperties
          }
        >
          {WORDS.map(({ w, gold }, i) => {
            const point = REVEAL_START + (last === 0 ? 0 : (i / last) * span);
            const start = point - FADE_WINDOW;
            return (
              <span
                key={i}
                className={`cred-char${gold ? " text-gold" : ""}`}
                style={
                  { ["--char-start" as string]: start.toFixed(4) } as React.CSSProperties
                }
              >
                {w}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
