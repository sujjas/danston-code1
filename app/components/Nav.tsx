"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastYRef.current = window.scrollY;

    const SHOW_NEAR_TOP = 80; // always visible inside the hero
    const DEAD_ZONE = 6; // ignore sub-pixel scroll jitter

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;
      if (y < SHOW_NEAR_TOP) {
        setHidden(false);
      } else if (delta > DEAD_ZONE) {
        setHidden(true);
      } else if (delta < -DEAD_ZONE) {
        setHidden(false);
      }
      lastYRef.current = y;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 px-[var(--rail-x)] py-5 transition-transform duration-500 ease-smooth will-change-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="block transition-opacity duration-500 ease-smooth hover:opacity-70"
          aria-label="Code 1 — home"
        >
          <Image
            src="/logos/full-navy.svg"
            alt="Code 1"
            width={120}
            height={26}
            priority
            className="h-6 w-auto"
          />
        </a>
        <a
          href="#assessment"
          className="font-sans text-[11px] font-medium tracking-[1.5px] uppercase text-cream bg-navy border-[0.5px] border-navy px-6 py-3 rounded-full transition-all duration-500 ease-smooth hover:bg-gold hover:border-gold hover:text-navy"
        >
          Begin Assessment
        </a>
      </div>
    </nav>
  );
}
