"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(".reveal", { opacity: 1, y: 0, clearProps: "transform" });
      gsap.set("[data-mark]", { ["--mx" as string]: 1 });
      return;
    }

    const splits: SplitText[] = [];
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      gsap.set("[data-mark]", { ["--mx" as string]: 0 });

      // --- Hero entrance timeline ---
      const heroRule = document.querySelector<HTMLElement>("[data-hero-rule]");
      const heroHeadline = document.querySelector<HTMLElement>(
        "[data-hero-headline]"
      );
      const heroSub = document.querySelector<HTMLElement>("[data-hero-sub]");
      const heroCtas = gsap.utils.toArray<HTMLElement>("[data-hero-cta]");
      const heroCard = document.querySelector<HTMLElement>("[data-hero-card]");

      let heroSplit: SplitText | null = null;
      if (heroHeadline) {
        heroSplit = SplitText.create(heroHeadline, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
        splits.push(heroSplit);
        gsap.set(heroSplit.lines, { yPercent: 110 });
      }
      if (heroSub) gsap.set(heroSub, { opacity: 0, y: 30 });
      if (heroCtas.length) gsap.set(heroCtas, { opacity: 0, y: 16 });
      // Card keeps its translateX(-50%) via xPercent so GSAP doesn't wipe it
      if (heroCard) gsap.set(heroCard, { opacity: 0, y: 36, xPercent: -50 });
      if (heroRule) gsap.set(heroRule, { scaleX: 0, transformOrigin: "left center" });

      const heroTl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: "power3.out" },
      });
      if (heroRule) heroTl.to(heroRule, { scaleX: 1, duration: 0.7 });
      if (heroSplit) {
        heroTl.to(
          heroSplit.lines,
          { yPercent: 0, duration: 0.95, stagger: 0.08 },
          "-=0.45"
        );
      }
      if (heroSub) heroTl.to(heroSub, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55");
      if (heroCtas.length)
        heroTl.to(
          heroCtas,
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.35"
        );
      if (heroCard)
        heroTl.to(heroCard, { opacity: 1, y: 0, duration: 0.85 }, "-=0.5");

      // --- SplitText on data-split headlines (non-hero) ---
      const splitTargets = gsap.utils.toArray<HTMLElement>("[data-split]");
      splitTargets.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
        splits.push(split);
        gsap.set(split.lines, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(split.lines, {
              yPercent: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
            }),
        });
      });

      // --- Batch reveal for plain .reveal elements ---
      gsap.set(".reveal", { opacity: 0, y: 28 });
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          });
          const marks = els.filter((e) =>
            (e as HTMLElement).hasAttribute("data-mark")
          );
          if (marks.length) {
            gsap.to(marks, {
              ["--mx" as string]: 1,
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.08,
            });
          }
        },
      });

      // --- Standalone data-mark draw (for marks not on .reveal elements) ---
      ScrollTrigger.batch("[data-mark]:not(.reveal)", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            ["--mx" as string]: 1,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.08,
          }),
      });

      // --- Parallax ---
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const intensity = Number(el.dataset.parallax) || 40;
        gsap.fromTo(
          el,
          { y: intensity },
          {
            y: -intensity,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // --- Pull-quote mark scrub scale ---
      gsap.utils.toArray<HTMLElement>(".quote-mark").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: 0.8,
            },
          }
        );
      });

      // --- Pull-quote: pin section + scrub per-word opacity ---
      const pq = document.querySelector<HTMLElement>("[data-pullquote]");
      const pqText = document.querySelector<HTMLElement>("[data-pullquote-text]");
      if (pq && pqText) {
        const pqSplit = SplitText.create(pqText, { type: "words" });
        splits.push(pqSplit);
        gsap.set(pqSplit.words, { opacity: 0.18 });
        gsap.to(pqSplit.words, {
          opacity: 1,
          stagger: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pq,
            start: "top top",
            end: "+=60%",
            pin: true,
            scrub: 0.6,
          },
        });
      }
    };

    // Wait for fonts so SplitText measures correct line breaks
    const ready =
      "fonts" in document
        ? (document as Document & { fonts: { ready: Promise<unknown> } }).fonts
            .ready
        : Promise.resolve();

    const ctxHolder: { ctx: gsap.Context | null } = { ctx: null };
    ready.then(() => {
      if (cancelled) return;
      ctxHolder.ctx = gsap.context(setup);
      // Recalculate trigger positions after fonts settle
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      ctxHolder.ctx?.revert();
    };
  }, []);

  return null;
}
