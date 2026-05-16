"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Pillar = {
  num: string;
  mark: string[];
  title: string;
  system: string;
  cadence: string;
  body: string;
};

type Theme = "cream" | "navy" | "cream-warm";

const THEMES: Theme[] = ["cream", "navy", "cream-warm"];

export function SystemHorizontal({ pillars }: { pillars: Pillar[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionScrollable = section.offsetHeight - window.innerHeight;
      if (sectionScrollable <= 0) return;
      const scrolled = Math.max(0, Math.min(sectionScrollable, -rect.top));
      const progress = scrolled / sectionScrollable;
      const trackScrollable = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-progress * trackScrollable}px, 0, 0)`;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const total = pillars.length;

  return (
    <div
      ref={sectionRef}
      className="relative h-[300vh] max-md:h-auto"
    >
      <div className="sticky top-0 h-screen overflow-hidden max-md:static max-md:h-auto max-md:overflow-visible">
        <div
          ref={trackRef}
          className="flex h-full w-[300vw] will-change-transform max-md:flex-col max-md:w-full max-md:h-auto"
        >
          {pillars.map((p, i) => (
            <Panel
              key={p.num}
              pillar={p}
              index={i}
              total={total}
              theme={THEMES[i] ?? "cream"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Panel({
  pillar,
  index,
  total,
  theme,
}: {
  pillar: Pillar;
  index: number;
  total: number;
  theme: Theme;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDark = theme === "navy";
  const bg =
    theme === "cream" ? "bg-cream" : theme === "navy" ? "bg-navy" : "bg-cream-warm";
  const textPrimary = isDark ? "text-cream" : "text-navy";
  const textSoft = isDark ? "text-cream/75" : "text-charcoal-soft";
  const textMuted = isDark ? "text-cream/55" : "text-charcoal-soft/80";
  const ruleColor = isDark ? "bg-cream/30" : "bg-navy/20";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-panel-anim]");
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 24 });
    const mark = el.querySelector<HTMLElement>("[data-panel-mark]");
    if (mark) gsap.set(mark, { opacity: 0, y: 32, scale: 0.94 });

    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (played) return;
        if (entry.intersectionRatio >= 0.4) {
          played = true;
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.09,
          });
          if (mark) {
            tl.to(
              mark,
              { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
              "-=0.7"
            );
          }
          io.disconnect();
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-system-panel
      data-system-panel-index={index}
      className={`w-screen h-screen flex-shrink-0 overflow-hidden max-md:w-full max-md:min-h-screen ${bg} ${textPrimary}`}
    >
      <div className="h-full px-[var(--rail-x)] pt-28 pb-12 flex flex-col max-md:pt-22 max-md:pb-10">
        <div className="flex items-center justify-between">
          <div
            data-panel-anim
            className={`font-sans text-[11px] tracking-[3px] uppercase ${textMuted}`}
          >
            <span
              aria-hidden="true"
              className={`inline-block align-middle w-8 h-px ${ruleColor} mr-4`}
            />
            The system
          </div>
          <div
            data-panel-anim
            className={`font-sans text-[11px] tracking-[2.5px] uppercase ${textMuted}`}
          >
            <span className={textPrimary}>{String(index + 1).padStart(2, "0")}</span>
            <span className="opacity-50"> / {String(total).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-[0.85fr_1.15fr] gap-20 items-center max-md:grid-cols-1 max-md:gap-8">
            <div
              data-panel-mark
              className={`font-serif text-gold leading-[0.85] tracking-[-2px] select-none flex flex-col items-start ${
                pillar.mark.length > 1
                  ? "text-[clamp(96px,12vw,180px)] gap-3 max-md:text-[clamp(72px,18vw,128px)]"
                  : "text-[clamp(140px,18vw,280px)] max-md:text-[clamp(96px,28vw,180px)]"
              }`}
            >
              {pillar.mark.map((line, i) => (
                <span key={i} className="contents">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="block h-[3px] w-12 bg-gold/50 my-2 max-md:w-9 max-md:h-[2px]"
                    />
                  )}
                  <span>{line}</span>
                </span>
              ))}
            </div>
            <div>
              <h3
                data-panel-anim
                className={`font-serif font-normal text-[clamp(36px,4.8vw,60px)] leading-[1.05] tracking-[-0.4px] mb-5 max-w-[560px] ${textPrimary}`}
              >
                {pillar.system}
              </h3>
              <div
                data-panel-anim
                className={`font-sans text-[12px] tracking-[2.5px] uppercase mb-5 ${textMuted}`}
              >
                {pillar.title}
              </div>
              <div
                data-panel-anim
                className={`font-serif italic text-[clamp(20px,2vw,24px)] leading-[1.5] mb-7 ${textSoft}`}
              >
                {pillar.cadence}
              </div>
              <p
                data-panel-anim
                className={`font-sans text-[17px] leading-[1.85] max-w-[540px] ${textSoft}`}
              >
                {pillar.body}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div data-panel-anim aria-hidden="true" className={`h-px w-16 ${ruleColor}`} />
          <div
            data-panel-anim
            className={`font-sans text-[10px] tracking-[2.5px] uppercase ${textMuted}`}
          >
            {index < total - 1 ? "Continue →" : "The system completes"}
          </div>
        </div>
      </div>
    </div>
  );
}
