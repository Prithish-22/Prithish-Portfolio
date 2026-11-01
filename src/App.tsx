import { useCallback, useState } from "react";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import AILab from "@/components/AILab";
import Capabilities from "@/components/Capabilities";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function App() {
  const [ready, setReady] = useState(false);
  const active = useActiveSection("home");
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-vermilion focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Intro done={ready} onDone={onDone} />
      <Nav active={active} />
      <main>
        <Hero ready={ready} />
        <About />
        <Capabilities />
        <Skills />
        <AILab />
        <Projects />
        <Achievements />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
