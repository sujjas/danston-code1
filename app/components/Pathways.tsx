"use client";

import type { Audience } from "@/lib/assessment";

const PATHWAYS: { num: string; text: string; audience: Audience }[] = [
  { num: "01", text: "I am an Individual", audience: "Individual" },
  { num: "02", text: "I lead a Sales Team", audience: "Sales Professional" },
  { num: "03", text: "I run an Organisation", audience: "Organisation" },
  { num: "04", text: "I represent a Government", audience: "Government" },
];

export function Pathways() {
  const onClick = (audience: Audience) => () => {
    try {
      sessionStorage.setItem("code1.audience", audience);
    } catch {
      /* sessionStorage may be unavailable */
    }
    window.dispatchEvent(
      new CustomEvent<Audience>("code1:audience", { detail: audience })
    );
    document
      .getElementById("assessment")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-cream px-14 py-40 max-md:px-6 max-md:py-25">
      <div className="max-w-[1280px] mx-auto grid grid-cols-[1fr_1.3fr] gap-30 items-start max-md:grid-cols-1 max-md:gap-12">
        <div className="sticky top-30 max-md:static">
          <div className="reveal font-sans text-charcoal-soft text-[11px] tracking-[3px] uppercase mb-8 before:inline-block before:align-middle before:w-8 before:h-px before:bg-charcoal-soft/30 before:mr-4">
            For whom
          </div>
          <h2 className="reveal reveal-delay-1 font-serif font-normal text-navy text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.3px] mb-6">
            Who do you need to become?
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-charcoal-soft text-[17px] leading-[1.7] max-w-[360px]">
            There is no standard package here. There is only what is right for
            you.
          </p>
        </div>
        <ul className="list-none">
          {PATHWAYS.map((p, i) => (
            <li
              key={p.audience}
              className={`reveal reveal-delay-${i} ${i === PATHWAYS.length - 1 ? "border-b border-navy/10" : ""}`}
            >
              <button
                type="button"
                onClick={onClick(p.audience)}
                className="group w-full grid grid-cols-[60px_1fr_auto] gap-8 items-center py-9 border-t border-navy/10 cursor-pointer transition-transform duration-500 ease-smooth will-change-transform hover:translate-x-4 text-left bg-transparent max-md:grid-cols-[40px_1fr_24px] max-md:gap-4 max-md:py-6"
              >
                <span className="font-serif italic text-charcoal-soft text-[16px]">
                  {p.num}
                </span>
                <span className="font-serif font-normal text-navy text-[clamp(22px,2.4vw,32px)] leading-[1.3]">
                  {p.text}
                </span>
                <span
                  aria-hidden="true"
                  className="text-gold text-[22px] opacity-0 -translate-x-3 transition-[opacity,transform] duration-500 ease-smooth group-hover:opacity-100 group-hover:translate-x-0"
                >
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
