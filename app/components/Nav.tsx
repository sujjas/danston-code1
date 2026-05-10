"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 flex items-center justify-between transition-all duration-500 ease-smooth ${
        scrolled
          ? "px-14 py-4 bg-cream/95 backdrop-blur-md border-b border-navy/10 max-md:px-6"
          : "px-14 py-6 bg-transparent max-md:px-6"
      }`}
    >
      <a
        href="#"
        className="group font-serif text-[18px] font-normal tracking-[4px] text-navy transition-[letter-spacing] duration-700 ease-smooth hover:tracking-[6px]"
      >
        CODE 1
      </a>
      <a
        href="#assessment"
        className="font-sans text-[11px] font-medium tracking-[1.5px] uppercase text-cream bg-navy border-[0.5px] border-navy px-6 py-3 rounded-full transition-all duration-500 ease-smooth hover:bg-gold hover:border-gold hover:text-navy"
      >
        Begin Assessment
      </a>
    </nav>
  );
}
