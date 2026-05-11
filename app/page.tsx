import { Nav } from "./components/Nav";
import { RevealObserver } from "./components/Reveal";
import { SmoothScroll } from "./components/SmoothScroll";
import {
  About,
  Credibility,
  Footer,
  Hero,
  Problem,
  PullQuote,
  System,
} from "./components/Sections";
import { Pathways } from "./components/Pathways";
import { Assessment } from "./components/Assessment";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <RevealObserver />
      <main>
        <Hero />
        <Problem />
        <Credibility />
        <System />
        <PullQuote />
        <Pathways />
        <About />
        <Assessment />
      </main>
      <Footer />
    </>
  );
}
