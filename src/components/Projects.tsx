import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { projects, upcomingSlots } from "@/data/content";
import { AppConcept, KeypadPhone } from "./BfxVisuals";
import CaseStudy from "./CaseStudy";
import { Button, GithubIcon, Reveal, SectionHeading } from "./ui";

const parse = (h: string) => {
  const m = h.match(/^#\/projects\/([\w-]+)/);
  return m ? m[1] : null;
};

export default function Projects() {
  const [slug, setSlug] = useState<string | null>(() => (typeof window === "undefined" ? null : parse(window.location.hash)));
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setSlug(parse(window.location.hash));
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const open = (s: string) => {
    window.location.hash = `/projects/${s}`;
  };
  const close = () => {
    window.location.hash = "projects";
  };

  // tilt for preview
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const featured = projects[0];
  const active = projects.find((p) => p.slug === slug) ?? null;

  return (
    <section id="projects" data-nav="projects" className="relative bg-ink py-24 text-paper md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          index="05"
          label="Featured projects"
          title={
            <>
              Built to solve <em className="text-vermilion">a real problem.</em>
            </>
          }
          intro="One project, told properly — from the problem, through the technical wall we hit, to the idea that won first place."
        />

        <article className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* preview */}
          <Reveal className="lg:col-span-7">
            <div
              className="group relative cursor-pointer overflow-hidden bg-forest"
              style={{ perspective: 1400 }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width - 0.5);
                my.set((e.clientY - r.top) / r.height - 0.5);
              }}
              onPointerLeave={() => {
                mx.set(0);
                my.set(0);
              }}
              onClick={() => open(featured.slug)}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, #eee9dd 1px, transparent 0)",
                  backgroundSize: "26px 26px",
                }}
              />
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-vermilion/25 blur-3xl" />
              <motion.div
                className="relative flex min-h-[360px] sm:min-h-[460px] items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 py-10 sm:py-14 md:min-h-[560px] md:gap-10"
                style={{ rotateX: reduce ? 0 : rX, rotateY: reduce ? 0 : rY, transformStyle: "preserve-3d" }}
              >
                <div className="w-[38%] max-w-[230px]" style={{ transform: "translateZ(40px)" }}>
                  <AppConcept />
                </div>
                <div className="mt-16 w-[30%] max-w-[180px]" style={{ transform: "translateZ(90px)" }}>
                  <KeypadPhone screen={["Dial BFX Vesper", "Speak your concern", "AI assistant ▸"]} />
                </div>
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-5 pb-4 pt-10">
                <span className="eyebrow text-[0.58rem] text-paper/60">Concept view · Android app & virtual keypad phone</span>
                <span className="eyebrow flex items-center gap-2 text-[0.6rem] text-paper transition-transform group-hover:translate-x-1">
                  Open case study →
                </span>
              </div>
            </div>
          </Reveal>

          {/* details */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-[0.64rem] text-paper/60">
                <span className="text-vermilion">{featured.index}</span>
                {featured.category}
              </p>
              <h3 className="display mt-4 text-[clamp(3rem,7vw,5.6rem)] font-light uppercase leading-[0.9]">
                BFX <em className="text-vermilion">Vesper</em>
              </h3>
              <p className="mt-5 inline-flex items-center gap-2 bg-brass px-3 py-1.5 text-ink">
                <span aria-hidden>★</span>
                <span className="eyebrow text-[0.62rem] font-medium">{featured.badge}</span>
              </p>
              <p className="display mt-7 text-[1.5rem] font-light italic leading-snug">{featured.tagline}</p>
              <p className="mt-5 text-[0.96rem] leading-relaxed text-paper/65">{featured.overview[0]}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <li key={t} className="border border-paper/25 px-2.5 py-1 font-mono text-[0.68rem] text-paper/75">
                    {t}
                  </li>
                ))}
              </ul>

              <dl className="mt-8 grid grid-cols-2 gap-px bg-paper/15">
                {featured.stats.map((s) => (
                  <div key={s.label} className="bg-ink px-4 py-4">
                    <dt className="eyebrow text-[0.55rem] text-paper/45">{s.label}</dt>
                    <dd className="display mt-1.5 text-xl font-light">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button onClick={() => open(featured.slug)}>Read the case study</Button>
                <a
                  href={featured.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-paper/35 px-5 py-3.5 text-sm transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  <GithubIcon className="h-4 w-4" /> Repository
                </a>
              </div>
            </Reveal>
          </div>
        </article>

        {/* reserved slots */}
        <Reveal className="mt-24">
          <div className="flex items-end justify-between border-b border-paper/15 pb-4">
            <h4 className="display text-2xl font-light italic">More on the way</h4>
            <span className="eyebrow text-[0.6rem] text-paper/50">Shown only when real</span>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {upcomingSlots.map((s, i) => (
              <li
                key={s.label}
                className="relative flex min-h-[150px] flex-col justify-between border border-dashed border-paper/25 p-5 text-paper/50"
              >
                <span className="eyebrow text-[0.6rem]">0{i + 2}</span>
                <div>
                  <p className="display text-xl font-light text-paper/70">{s.label}</p>
                  <p className="eyebrow mt-1 text-[0.58rem]">{s.hint} · coming when it&apos;s ready</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <CaseStudy project={active} onClose={close} />
    </section>
  );
}
