import { CredibilitySentence } from "./CredibilitySentence";

export function Hero() {
  return (
    <section className="relative grid grid-cols-2 min-h-screen pt-[90px] bg-cream max-md:grid-cols-1 max-md:min-h-0">
      <div className="flex flex-col justify-end px-14 pt-10 pb-20 min-h-[calc(100vh-90px)] max-md:px-6 max-md:py-10 max-md:min-h-0">
        <div className="reveal w-12 h-px bg-gold mb-7" />
        <h1 className="reveal reveal-delay-1 font-serif font-normal text-navy text-[clamp(40px,5.5vw,76px)] leading-[1.02] tracking-[-0.6px] mb-7 max-w-[540px]">
          Your potential is always the highest priority.
        </h1>
        <p className="reveal reveal-delay-2 font-sans text-charcoal-soft text-[18px] leading-[1.6] mb-12 max-w-[460px]">
          Leadership development, business transformation, and human potential
          — for leaders, organisations, and governments across Africa and
          beyond.
        </p>
        <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-5">
          <a
            href="#assessment"
            className="inline-block font-sans text-[12px] font-medium tracking-[1.5px] uppercase text-cream bg-navy border-[0.5px] border-navy px-8 py-4 rounded-full transition-all duration-500 ease-smooth hover:bg-gold hover:border-gold hover:text-navy hover:-translate-y-0.5"
          >
            Begin assessment
          </a>
          <a
            href="#about"
            className="group inline-flex items-center gap-3 font-sans text-[12px] font-medium tracking-[1.5px] uppercase text-navy py-3.5 transition-colors duration-500 ease-smooth hover:text-gold-dark"
          >
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-9 h-9 border-[0.5px] border-navy rounded-full overflow-hidden transition-all duration-500 ease-smooth group-hover:border-gold group-hover:text-gold"
            >
              <span className="inline-block transition-transform duration-500 ease-smooth group-hover:translate-y-1">
                ↓
              </span>
            </span>
            Read Danston&apos;s story
          </a>
        </div>
      </div>
      <div className="relative flex items-center justify-center min-h-[calc(100vh-90px)] bg-[linear-gradient(135deg,#1a2942_0%,#0F1B2D_100%)] border-[0.5px] border-dashed border-gold/30 text-cream/40 text-[12px] tracking-[1px] leading-[1.8] text-center max-md:min-h-[360px]">
        Hero photograph
        <br />
        of Danston
        <br />
        <br />
        (warm · powerful · real)
      </div>
      <div className="reveal reveal-delay-4 absolute z-10 w-[420px] bottom-10 left-[calc(50%-99px)] bg-gold text-navy p-9 rounded-sm shadow-[0_30px_80px_rgba(15,27,45,0.35)] max-md:w-[calc(100%-48px)] max-md:max-w-[380px] max-md:-bottom-[70px] max-md:!left-1/2 max-md:-translate-x-1/2 max-md:p-7">
        <div className="font-sans text-[10px] tracking-[2.5px] uppercase text-navy/70 mb-4">
          Three decades of practice
        </div>
        <div className="font-serif text-[64px] leading-[0.9] mb-3.5 max-md:text-[52px]">
          30+
        </div>
        <div className="font-sans text-[16px] leading-[1.5] text-navy/85">
          years building leaders and businesses across four continents.
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="bg-cream-warm px-14 pt-60 pb-44 max-md:px-6 max-md:pt-50 max-md:pb-25">
      <div className="max-w-[1280px] mx-auto grid grid-cols-[1fr_6fr_3fr] items-start max-md:grid-cols-1 max-md:gap-8">
        <div className="reveal font-serif italic text-gold-dark text-[14px] tracking-[0.5px] pt-5 before:block before:w-6 before:h-px before:bg-gold before:mb-4">
          001
        </div>
        <h2 className="reveal reveal-delay-1 col-start-2 font-serif font-normal text-navy text-[clamp(36px,5.5vw,72px)] leading-[1.05] tracking-[-0.5px] w-[601px] max-w-full max-md:col-start-1 max-md:col-end-[-1]">
          Most leaders are working incredibly hard — in the wrong direction.
        </h2>
        <div className="reveal reveal-delay-2 col-start-3 pt-4 pl-10 max-md:col-start-1 max-md:col-end-[-1] max-md:pl-0">
          <p className="font-sans text-charcoal-soft text-[17px] leading-[1.8]">
            Effort isn&apos;t the issue. Direction is. Before you can build
            something that lasts, you need clarity on who&apos;s doing the
            building. That&apos;s where Code 1 begins.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Credibility() {
  return <CredibilitySentence />;
}

export function System() {
  return (
    <section className="bg-cream px-14 py-40 max-md:px-6 max-md:py-25">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-40 max-md:grid-cols-1 max-md:gap-14">
        <div className="sticky top-30 self-start max-md:static">
          <div className="reveal text-gold-dark text-[11px] tracking-[3px] uppercase mb-8 before:inline-block before:align-middle before:w-8 before:h-px before:bg-gold before:mr-4">
            The system
          </div>
          <h2 className="reveal reveal-delay-1 font-serif font-normal text-navy text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.4px] w-[593px] max-w-full">
            First who you are.
            <br />
            Then what you build.
          </h2>
        </div>
        <div className="pt-3">
          <p className="reveal font-sans text-charcoal-soft text-[19px] leading-[1.75] mb-20">
            Code 1 is a complete leadership and organisational transformation
            system, combining the I Philosophy and the 5D Framework with
            AI-integrated forensic diagnostic technology — bespoke to you.
          </p>
          <div className="grid grid-cols-2 gap-12 mb-20 max-md:grid-cols-1 max-md:gap-14 max-md:mb-14">
            <div className="reveal group border-t border-navy pt-7 transition-colors duration-500 ease-smooth hover:border-gold">
              <div className="font-serif text-gold text-[56px] leading-none mb-6 transition-transform duration-700 ease-smooth group-hover:-translate-y-1">
                I
              </div>
              <h3 className="font-serif font-normal text-navy text-[24px] mb-4.5">
                The I Philosophy
              </h3>
              <div className="font-sans text-charcoal-soft text-[16px] leading-[1.9]">
                Presence
                <br />
                Communication
                <br />
                Leadership
              </div>
            </div>
            <div className="reveal reveal-delay-2 group border-t border-navy pt-7 transition-colors duration-500 ease-smooth hover:border-gold">
              <div className="font-serif text-gold text-[56px] leading-none mb-6 transition-transform duration-700 ease-smooth group-hover:-translate-y-1">
                5D
              </div>
              <h3 className="font-serif font-normal text-navy text-[24px] mb-4.5">
                The 5D Framework
              </h3>
              <div className="font-sans text-charcoal-soft text-[16px] leading-[1.9]">
                Discover
                <br />
                Diagnose
                <br />
                Discuss
                <br />
                Design
                <br />
                Deliver
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PullQuote() {
  return (
    <section className="relative overflow-hidden bg-navy text-gold text-center px-14 py-45 max-md:px-6 max-md:py-25">
      <div className="reveal">
        <span className="quote-mark block font-serif text-[120px] leading-[0.5] text-gold/25 mb-8 origin-center inline-block">
          &ldquo;
        </span>
        <blockquote className="font-serif italic font-normal text-gold text-[clamp(28px,4vw,48px)] leading-[1.3] tracking-[-0.2px] max-w-[900px] mx-auto mb-10">
          I don&apos;t fight the fires. I bring in wet logs. As the strengths
          grow, the weaknesses resolve themselves.
        </blockquote>
        <div className="inline-flex items-center text-cream/50 text-[11px] tracking-[3px] uppercase before:inline-block before:w-8 before:h-px before:bg-cream/40 before:mr-4">
          Danston Mugarura
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-cream-warm px-14 py-40 max-md:px-6 max-md:py-25">
      <div className="max-w-[1280px] mx-auto grid grid-cols-[1fr_1.5fr] gap-25 items-center max-md:grid-cols-1 max-md:gap-12">
        <div className="reveal aspect-[3/4] flex items-center justify-center text-center bg-[linear-gradient(135deg,#1a2942_0%,#0F1B2D_100%)] border-[0.5px] border-dashed border-gold/30 text-cream/40 text-[12px] leading-[1.8] p-10 max-md:max-w-[280px] max-md:mx-auto">
          Photograph of Danston
          <br />
          <br />
          (on stage
          <br />
          or in conversation)
        </div>
        <div className="max-w-[580px]">
          <div className="reveal text-gold-dark text-[11px] tracking-[3px] uppercase mb-8 before:inline-block before:align-middle before:w-8 before:h-px before:bg-gold before:mr-4">
            The man
          </div>
          <h2 className="reveal reveal-delay-1 font-serif font-normal text-navy text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.4px] mb-9">
            My name means the restorer.
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-charcoal-soft text-[18px] leading-[1.85] mb-6">
            I&apos;m a British-African business builder, leadership coach, sales
            strategist, and author with over 30 years of experience across four
            continents. I&apos;ve built multimillion-dollar businesses, served
            as Vice President in three major organisations, advised three
            governments, and written two books.
          </p>
          <p className="reveal reveal-delay-3 font-sans text-charcoal-soft text-[18px] leading-[1.85] mb-6">
            My surname — Mugarura — means the restorer in my mother tongue.
            Everything I do is the proof of it.
          </p>
          <div className="reveal reveal-delay-4 mt-10 pt-8 border-t border-navy/10 text-gold-dark text-[11px] tracking-[2px] uppercase">
            Danston Mugarura · Founder of Code 1
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-cream/60 px-14 py-16 border-t border-gold/15 max-md:px-6">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6 max-md:flex-col max-md:text-center">
        <div className="font-sans text-[15px]">
          Because your potential is always the highest priority.
        </div>
        <div className="flex gap-8 text-[12px] tracking-[1.5px] uppercase">
          <a
            href="mailto:hello@code1.com"
            className="relative text-cream/55 transition-colors duration-500 ease-smooth hover:text-gold after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-gold after:origin-left after:scale-x-0 after:transition-transform after:duration-700 after:ease-smooth hover:after:scale-x-100"
          >
            Email
          </a>
          <a
            href="#"
            className="relative text-cream/55 transition-colors duration-500 ease-smooth hover:text-gold after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-gold after:origin-left after:scale-x-0 after:transition-transform after:duration-700 after:ease-smooth hover:after:scale-x-100"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
