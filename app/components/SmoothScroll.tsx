"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP-integrated Lenis smooth scroll.
// Follows the GSAP-recommended integration pattern: Lenis drives the
// scroll position, ScrollTrigger.update is called on every Lenis scroll
// event, and Lenis.raf is added to the GSAP ticker so all animation
// timing flows through one clock.
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices keep native scroll — Lenis on touch tends to feel
      // worse than the system scroller and can fight with iOS rubber-band.
      syncTouch: false,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return null;
}
