import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { aboutGoal, aboutParagraphs, aboutPrograms, aboutPullQuote, characteristics } from "@/data/content";
import { cn } from "@/utils/cn";
import { PhotoFrame, Reveal, SectionHeading, SplitWords } from "./ui";

const lead =
  "I am an aspiring AI/ML Engineer and Data Science enthusiast passionate about exploring emerging technologies, understanding intelligent systems, and solving real-world problems.";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ringRot = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <section id="about" data-nav="about" ref={ref} className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              <SplitWords text="Hello, I'm" /> <em className="text-vermilion"><SplitWords text="Prithish Raj T." delay={0.15} /></em>
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* photograph column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.div style={{ y: reduce ? 0 : y }} className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] shadow-[0_30px_60px_-30px_rgba(17,20,15,0.5)]">
                  <PhotoFrame className="h-full w-full" />
                </div>
                {/* rotating badge */}
                <motion.div
                  style={{ rotate: reduce ? 0 : ringRot }}
                  className="absolute -bottom-6 -right-2 h-28 w-28 sm:-bottom-10 sm:-right-4 sm:h-36 sm:w-36 md:-right-10 md:h-44 md:w-44"
                  aria-hidden
                >
                  <svg viewBox="0 0 200 200" className="h-full w-full">
                    <circle cx="100" cy="100" r="98" fill="#11140f" />
                    <defs>
                      <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                    </defs>
                    <text fill="#eee9dd" fontFamily="JetBrains Mono, monospace" fontSize="13" letterSpacing="4.3">
                      <textPath href="#circ">AI · MACHINE LEARNING · DATA SCIENCE ·</textPath>
                    </text>
                    <circle cx="100" cy="100" r="5" fill="#e4502b" />
                  </svg>
                </motion.div>
                <p className="eyebrow mt-5 text-ink/50">Fig. 01 — {`Vellore, Tamil Nadu`}</p>
              </motion.div>
            </div>
          </div>

          {/* story column */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="display text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-[1.25]">{lead}</p>
            </Reveal>

            <div className="mt-10 space-y-6 text-[1.02rem] leading-[1.75] text-ink/80 md:columns-1">
              {aboutParagraphs.slice(0, 1).map((p) => (
                <Reveal key={p}>
                  <p className="first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-5xl md:first-letter:text-6xl first-letter:font-light first-letter:leading-[0.8] first-letter:text-vermilion">
                    {p}
                  </p>
                </Reveal>
              ))}
              <Reveal>
                <p>{aboutParagraphs[1]}</p>
              </Reveal>
            </div>

            {/* programs */}
            <Reveal className="my-10">
              <ul className="divide-y divide-ink/15 border-y border-ink/15">
                {aboutPrograms.map((p) => (
                  <li key={p.text} className="flex items-start gap-5 py-5">
                    <span
                      className={cn(
                        "eyebrow mt-1 w-24 shrink-0 text-[0.62rem]",
                        p.status === "Ongoing" ? "text-vermilion" : "text-forest-2"
                      )}
                    >
                      ● {p.status}
                    </span>
                    <span className="text-[0.98rem] leading-snug">{p.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="space-y-6 text-[1.02rem] leading-[1.75] text-ink/80">
              <Reveal>
                <p>{aboutParagraphs[2]}</p>
              </Reveal>
              <Reveal>
                <p>{aboutParagraphs[3]}</p>
              </Reveal>
            </div>

            <Reveal className="my-14">
              <blockquote className="display border-l-2 border-vermilion pl-6 text-[clamp(1.5rem,3vw,2.4rem)] font-light italic leading-[1.2]">
                {aboutPullQuote}
              </blockquote>
            </Reveal>

            <Reveal>
              <p className="text-[1.02rem] leading-[1.75] text-ink/80">{aboutGoal}</p>
            </Reveal>

            {/* characteristics */}
            <Reveal className="mt-14">
              <p className="eyebrow mb-5 text-ink/50">What defines how I work</p>
              <ul className="grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2">
                {characteristics.map((c, i) => (
                  <li
                    key={c}
                    className="group relative flex items-center gap-4 bg-paper px-5 py-4 transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    <span className="eyebrow text-[0.62rem] text-vermilion">0{i + 1}</span>
                    <span className="text-sm leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
