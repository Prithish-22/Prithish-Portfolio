import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { achievements, type Project } from "@/data/content";
import { cn } from "@/utils/cn";
import { KeypadPhone } from "./BfxVisuals";
import { ArrowUpRight, CloseIcon, GithubIcon, Reveal } from "./ui";

const screens = [
  ["Calling…", "BFX Vesper line", "Connected"],
  ["Listening…", "Describe your", "concern"],
  ["Analysing…", "Cloud AI", "assistant"],
  ["Explaining", "Risks and", "precautions"],
  ["Guardian", "alert sent via", "Telegram"],
];

function Architecture() {
  const Node = ({ t, s, accent }: { t: string; s: string; accent?: boolean }) => (
    <div className={cn("flex-1 border p-4", accent ? "border-vermilion bg-vermilion/10" : "border-ink/25")}>
      <p className="display text-lg font-light leading-tight">{t}</p>
      <p className="eyebrow mt-2 text-[0.56rem] text-ink/55">{s}</p>
    </div>
  );
  const Arrow = () => (
    <div className="flex items-center justify-center text-vermilion md:px-1" aria-hidden>
      <span className="rotate-90 md:rotate-0">→</span>
    </div>
  );
  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        <div className="flex flex-1 flex-col gap-2">
          <Node t="Android app" s="~11 MB · user interface" />
          <Node t="Virtual keypad phone" s="Voice-call prototype" />
        </div>
        <Arrow />
        <Node t="Python backend" s="Prompt engineering · AI logic" accent />
        <Arrow />
        <div className="flex flex-1 flex-col gap-2">
          <Node t="Cloud AI API" s="Configurable provider & key" />
          <Node t="Offline experiments" s="Gemma models" />
        </div>
        <Arrow />
        <div className="flex flex-1 flex-col gap-2">
          <Node t="Explainable output" s="Score 0–100 · reasons · precautions" accent />
          <Node t="Telegram" s="Guardian notification" />
        </div>
      </div>
      <p className="eyebrow mt-4 text-[0.58rem] text-ink/50">Simplified architecture overview</p>
    </div>
  );
}

export default function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const achievement = achievements[0];

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          ref={root}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
          className="fixed inset-0 z-[70] overflow-y-auto bg-paper text-ink outline-none"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* top bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/15 bg-paper/90 px-5 py-4 backdrop-blur md:px-10">
            <button onClick={onClose} className="eyebrow flex items-center gap-3 text-[0.66rem] hover:text-vermilion">
              <span aria-hidden>←</span> Back to portfolio
            </button>
            <span className="eyebrow hidden text-[0.62rem] text-ink/50 sm:block">Case study · {project.name}</span>
            <button onClick={onClose} aria-label="Close case study" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 hover:bg-ink hover:text-paper">
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {/* hero */}
          <header className="relative overflow-hidden bg-ink px-5 pb-16 pt-16 text-paper md:px-10 md:pb-24 md:pt-24">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-vermilion/20 blur-3xl" />
            <div className="relative mx-auto max-w-[1200px]">
              <p className="eyebrow text-[0.66rem] text-paper/60">{project.category}</p>
              <h2 className="display mt-6 text-[clamp(3.2rem,11vw,9rem)] font-light uppercase leading-[0.86]">
                BFX <em className="text-vermilion">Vesper</em>
              </h2>
              <p className="display mt-8 max-w-3xl text-[clamp(1.4rem,2.8vw,2.3rem)] font-light italic leading-snug">{project.tagline}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 bg-brass px-3 py-1.5 text-ink">
                  <span aria-hidden>★</span>
                  <span className="eyebrow text-[0.62rem] font-medium">{project.badge}</span>
                </span>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-paper/35 px-4 py-2 text-sm hover:bg-paper hover:text-ink"
                >
                  <GithubIcon className="h-4 w-4" /> View repository <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <dl className="mt-14 grid grid-cols-2 gap-px bg-paper/15 md:grid-cols-4">
                {project.stats.map((s) => (
                  <div key={s.label} className="bg-ink px-5 py-5">
                    <dt className="eyebrow text-[0.56rem] text-paper/45">{s.label}</dt>
                    <dd className="display mt-2 text-2xl font-light">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </header>

          <div>
            {/* overview */}
            <div className="mx-auto max-w-[1200px] px-5 md:px-10"><section className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
              <div className="md:col-span-4">
                <p className="eyebrow text-[0.64rem] text-vermilion">Overview</p>
                <p className="display mt-4 text-3xl font-light leading-tight">What it is</p>
                <p className="eyebrow mt-8 text-[0.6rem] text-ink/50">My role</p>
                <p className="mt-1 text-base">{project.role}</p>
              </div>
              <div className="space-y-5 text-[1.05rem] leading-[1.75] text-ink/80 md:col-span-8">
                {project.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section></div>

            {/* features */}
            <div className="mx-auto max-w-[1200px] px-5 md:px-10"><section className="border-t border-ink/15 py-16 md:py-20">
              <p className="eyebrow text-[0.64rem] text-vermilion">Key features</p>
              <ul className="mt-8 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
                {project.features.map((f, i) => (
                  <li key={f} className="flex items-start gap-4 bg-paper p-5">
                    <span className="eyebrow mt-0.5 text-[0.6rem] text-vermilion">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.95rem] leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </section></div>

            {/* architecture */}
            <div className="mx-auto max-w-[1200px] px-5 md:px-10"><section className="border-t border-ink/15 py-16 md:py-20">
              <p className="eyebrow text-[0.64rem] text-vermilion">Architecture</p>
              <h3 className="display mb-10 mt-4 text-3xl font-light">How the pieces connect</h3>
              <Architecture />
            </section></div>

            {/* story */}
            <div className="mx-auto max-w-[1200px] px-5 md:px-10"><section className="border-t border-ink/15 py-16 md:py-24">
              <p className="eyebrow text-[0.64rem] text-vermilion">The story</p>
              <h3 className="display mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-tight">
                From a scam alert to <em className="text-vermilion">a first-place idea.</em>
              </h3>
              <ol className="mt-14">
                {project.story.map((c) => (
                  <Reveal key={c.title} as="li" y={20}>
                    <div
                      className={cn(
                        "grid gap-4 border-t py-9 md:grid-cols-12 md:gap-10",
                        c.highlight ? "-mx-5 border-vermilion bg-vermilion px-5 text-paper md:-mx-8 md:px-8" : "border-ink/15"
                      )}
                    >
                      <p className={cn("eyebrow text-[0.62rem] md:col-span-3", c.highlight ? "text-paper/80" : "text-ink/50")}>{c.kicker}</p>
                      <div className="md:col-span-9">
                        <h4 className="display text-[clamp(1.5rem,2.8vw,2.2rem)] font-light leading-tight">{c.title}</h4>
                        <p className={cn("mt-4 max-w-2xl text-[1.02rem] leading-[1.75]", c.highlight ? "text-paper/90" : "text-ink/75")}>{c.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section></div>

            {/* interactive keypad workflow */}
            <section className="bg-forest px-5 py-16 text-paper md:px-10 md:py-24">
              <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="eyebrow text-[0.64rem] text-sage">Virtual prototype · keypad-phone workflow</p>
                  <h3 className="display mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-tight">
                    Safety for people <em className="text-vermilion">without smartphones.</em>
                  </h3>
                  <ol className="mt-8 border-t border-paper/15">
                    {project.workflow.map((w, i) => (
                      <li key={w.title} className="border-b border-paper/15">
                        <button
                          onClick={() => setStep(i)}
                          aria-current={step === i}
                          className="flex w-full items-start gap-5 py-4 text-left"
                        >
                          <span className={cn("eyebrow mt-1.5 w-6 text-[0.62rem]", step === i ? "text-vermilion" : "text-paper/40")}>0{i + 1}</span>
                          <span>
                            <span className={cn("display block text-2xl font-light transition-colors", step === i ? "text-paper" : "text-paper/45")}>{w.title}</span>
                            {step === i && <span className="mt-1 block max-w-md text-sm leading-relaxed text-paper/70">{w.text}</span>}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep((s) => (s + 4) % 5)}
                      className="eyebrow border border-paper/30 px-4 py-2 text-[0.62rem] hover:bg-paper hover:text-ink"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setStep((s) => (s + 1) % 5)}
                      className="eyebrow bg-vermilion px-4 py-2 text-[0.62rem] hover:bg-[#f0603a]"
                    >
                      Next step →
                    </button>
                  </div>
                </div>
                <div className="flex justify-center md:col-span-5">
                  <div className="w-52 md:w-60">
                    <KeypadPhone screen={screens[step]} step={step} />
                    <p className="eyebrow mt-4 text-center text-[0.56rem] text-paper/45">Illustration of the virtual prototype</p>
                  </div>
                </div>
              </div>
            </section>

            {/* contributions */}
            <div className="mx-auto max-w-[1200px] px-5 md:px-10"><section className="grid gap-10 py-16 md:grid-cols-12 md:py-24">
              <div className="md:col-span-4">
                <p className="eyebrow text-[0.64rem] text-vermilion">Team & contributions</p>
                <h3 className="display mt-4 text-3xl font-light leading-tight">What I built</h3>
                <p className="mt-6 text-sm text-ink/60">
                  Team of 2 — <span className="text-ink">{project.team.join(" & ")}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{project.teammate}</p>
              </div>
              <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2 md:col-span-8">
                {project.contributions.map((c) => (
                  <li key={c} className="flex items-start gap-3 border-t border-ink/15 py-3.5 text-[0.97rem]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vermilion" />
                    {c}
                  </li>
                ))}
              </ul>
            </section></div>

            {/* outcome */}
            <section className="bg-ink px-5 py-16 text-paper md:px-10 md:py-24">
              <div className="mx-auto max-w-[1200px]">
                <p className="eyebrow text-[0.64rem] text-brass">The outcome</p>
                <p className="display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] font-light uppercase leading-[0.95]">
                  First place. <em className="text-vermilion">VIT Vellore Hackathon.</em>
                </p>
                <p className="mt-6 max-w-2xl text-paper/70">
                  Track: {achievement.track}. Top 10 of approximately 50 teams in the first evaluation, then first place in the final.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={achievement.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brass px-5 py-3 text-sm font-medium text-ink hover:bg-[#d8b06a]"
                  >
                    View Certificate <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-paper/35 px-5 py-3 text-sm hover:bg-paper hover:text-ink"
                  >
                    <GithubIcon className="h-4 w-4" /> GitHub repository
                  </a>
                </div>
                <p className="mt-12 max-w-3xl border-t border-paper/15 pt-6 text-sm leading-relaxed text-paper/50">
                  <span className="eyebrow mr-2 text-[0.58rem] text-paper/70">Honest scope —</span>
                  {project.note}
                </p>
              </div>
            </section>
          </div>
          <div className="flex justify-center bg-paper py-10">
            <button onClick={onClose} className="eyebrow border border-ink/30 px-6 py-3 text-[0.66rem] hover:bg-ink hover:text-paper">
              ← Back to portfolio
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
