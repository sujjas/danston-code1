"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function AfricaImage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Geometry = {
      vw: number;
      vh: number;
      parentWidth: number;
      endHeight: number;
      widthDelta: number;
      heightDelta: number;
    };

    const measure = (): Geometry => {
      const parent = el.parentElement;
      const parentWidth = parent
        ? parent.getBoundingClientRect().width
        : window.innerWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // End state matches the viewport's aspect ratio, scaled to the parent rail.
      const endHeight = parentWidth * (vh / vw);
      return {
        vw,
        vh,
        parentWidth,
        endHeight,
        widthDelta: vw - parentWidth,
        heightDelta: vh - endHeight,
      };
    };

    const apply = (progress: number, g: Geometry) => {
      const width = g.vw - g.widthDelta * progress;
      const height = g.vh - g.heightDelta * progress;
      const mx = -(g.widthDelta / 2) * (1 - progress);
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.marginLeft = `${mx}px`;
      el.style.marginRight = `${mx}px`;
    };

    if (reduce) {
      const g = measure();
      apply(1, g);
      return;
    }

    // Initial state: full viewport.
    apply(0, measure());

    let ticking = false;
    const update = () => {
      ticking = false;
      const g = measure();
      const rect = el.getBoundingClientRect();
      // Start scrubbing when the image's top crosses 50% of the viewport.
      // Finish when the top reaches 10%.
      const startY = g.vh * 0.5;
      const endY = g.vh * 0.1;
      const raw = (startY - rect.top) / (startY - endY);
      const progress = Math.max(0, Math.min(1, raw));
      apply(progress, g);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-africa-image
      className="relative mb-16 overflow-hidden bg-navy max-md:mb-12"
      aria-hidden="true"
    >
      <Image
        src="/images/africa-landscape.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
