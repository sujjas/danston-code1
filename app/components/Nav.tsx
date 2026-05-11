"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Nav() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        ["--nav-p" as string]: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: 120,
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={ref}
      className="nav-scrub fixed inset-x-0 top-0 z-100 px-14 py-5 max-md:px-6"
    >
      <span className="nav-bg" aria-hidden="true" />
      <div className="relative flex items-center justify-between">
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
