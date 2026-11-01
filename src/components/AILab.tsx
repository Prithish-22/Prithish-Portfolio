import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { aiTools, explorationHabits } from "@/data/content";
import { cn } from "@/utils/cn";
import { Reveal, SectionHeading } from "./ui";

export default function AILab() {
  const [sel, setSel] = useState(0);
  const R = 150;
  const nodes = aiTools.map((t, i) => {
    const a = (-90 + (360 / aiTools.length) * i) * (Math.PI / 180);
    return { ...t, x: 200 + Math.cos(a) * R, y: 200 + Math.sin(a) * R, a };
  });

  return (
    <section id="ai-lab" data-nav="skills" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          index="04"
          label="AI & technology exploration"
          title={
            <>
              AI as a <em className="text-vermilion">development partner.</em>
            </>
          }
          intro="The AI ecosystem moves fast. I stay close to it — trying new models, comparing platforms and learning how to direct these tools well enough to research, prototype and build real applications."
        />

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* constellation */}
          <Reveal className="lg:col-span-6">
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Diagram: five AI tools surrounding a central problem-solving node">
                <circle cx="200" cy="200" r={R} fill="none" stroke="#11140f" strokeOpacity="0.12" strokeDasharray="2 6" />
                <circle cx="200" cy="200" r={R * 0.55} fill="none" stroke="#11140f" strokeOpacity="0.08" />
                {nodes.map((n, i) => (
                  <motion.line
                    key={n.name}
                    x1="200"
                    y1="200"
                    x2={n.x}
                    y2={n.y}
                    stroke={sel === i ? "#e4502b" : "#11140f"}
                    strokeOpacity={sel === i ? 1 : 0.2}
                    strokeWidth={sel === i ? 1.5 : 1}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                  />
                ))}
                {/* centre */}
                <circle cx="200" cy="200" r="46" fill="#11140f" />
                <text x="200" y="196" textAnchor="middle" fill="#eee9dd" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="20">
                  Problem
                </text>
                <text x="200" y="214" textAnchor="middle" fill="#9db59a" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.5">
                  → SOLUTION
                </text>
                {nodes.map((n, i) => (
                  <g
                    key={n.name}
                    onClick={() => setSel(i)}
                    onMouseEnter={() => setSel(i)}
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    role="button"
                    aria-label={n.name}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(i)}
                  >
                    <circle cx={n.x} cy={n.y} r={sel === i ? 36 : 30} fill={sel === i ? "#e4502b" : "#eee9dd"} stroke="#11140f" strokeOpacity={sel === i ? 0 : 0.35} style={{ transition: "all .35s" }} />
                    <text
                      x={n.x}
                      y={n.y + 3}
                      textAnchor="middle"
                      fontFamily="JetBrains Mono, monospace"
                      fontSize={n.name.length > 9 ? 7 : 8.5}
                      fill={sel === i ? "#eee9dd" : "#11140f"}
                    >
                      {n.name.replace("Google ", "").replace("OpenAI ", "")}
                    </text>
                    {(n.name.startsWith("Google") || n.name.startsWith("OpenAI")) && (
                      <text x={n.x} y={n.y - 8} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill={sel === i ? "#eee9dd" : "#11140f"} opacity="0.7">
                        {n.name.startsWith("Google") ? "GOOGLE" : "OPENAI"}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </Reveal>

          {/* detail */}
          <div className="lg:col-span-6">
            <ul className="border-t border-ink/20">
              {aiTools.map((t, i) => (
                <li key={t.name} className="border-b border-ink/20">
                  <button
                    onClick={() => setSel(i)}
                    aria-pressed={sel === i}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow text-[0.6rem] text-ink/40">0{i + 1}</span>
                      <span className={cn("display text-2xl font-light transition-colors md:text-3xl", sel === i ? "text-vermilion" : "text-ink/70")}>
                        {t.name}
                      </span>
                    </span>
                    <span className="eyebrow hidden text-[0.6rem] text-ink/50 sm:block">{t.role}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {sel === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden pl-10 text-[0.96rem] leading-relaxed text-ink/70"
                      >
                        <span className="block pb-5">
                          <span className="eyebrow mb-2 block text-[0.6rem] text-ink/50 sm:hidden">{t.role}</span>
                          {t.text}
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink/55">
              These are tools I use and explore as an end user and developer — I did not build the underlying models. My focus is practical application: research, experimentation and building.
            </p>
          </div>
        </div>

        {/* habits */}
        <Reveal className="mt-20 md:mt-28">
          <div className="grid gap-px overflow-hidden bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {explorationHabits.map((h, i) => (
              <div key={h} className="group bg-paper p-6 transition-colors duration-300 hover:bg-ink hover:text-paper md:p-8">
                <span className="display text-4xl font-light italic text-vermilion">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-5 text-[0.98rem] leading-snug">{h}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
