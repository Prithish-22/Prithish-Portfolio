import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { capabilities } from "@/data/content";
import { cn } from "@/utils/cn";
import { Reveal, SectionHeading } from "./ui";

const RegressionScene = lazy(() => import("@/scenes/RegressionScene"));

export default function Capabilities() {
  const [open, setOpen] = useState(0);
  const [runId, setRunId] = useState(0);
  const [active, setActive] = useState(false);
  const reduce = !!useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setActive(e.isIntersecting);
        if (e.isIntersecting) setRunId((r) => (r === 0 ? 1 : r));
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };

  return (
    <section id="skills" data-nav="skills" className="relative bg-paper-2 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          index="02"
          label="Areas of interest & capabilities"
          title={
            <>
              Where my curiosity <em className="text-vermilion">goes to work.</em>
            </>
          }
          intro="Four areas I keep returning to — each one a way of understanding intelligent systems and putting them to practical use."
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7" role="list">
            {capabilities.map((c, i) => {
              const isOpen = open === i;
              return (
                <li key={c.id} className="border-t border-ink/20 last:border-b">
                  <button
                    onClick={() => setOpen(i)}
                    onMouseEnter={() => window.matchMedia("(hover:hover)").matches && setOpen(i)}
                    aria-expanded={isOpen}
                    aria-controls={`cap-${c.id}`}
                    className="group flex w-full items-start gap-5 py-6 text-left md:gap-8 md:py-8"
                  >
                    <span className={cn("eyebrow mt-3 w-8 shrink-0 transition-colors", isOpen ? "text-vermilion" : "text-ink/40")}>
                      {c.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "display block text-[clamp(1.5rem,3.2vw,2.5rem)] font-light leading-[1.1] transition-all duration-500",
                          isOpen ? "translate-x-1 text-ink" : "text-ink/55 group-hover:text-ink"
                        )}
                      >
                        {c.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`cap-${c.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink/70">{c.summary}</p>
                            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                              {c.points.map((p) => (
                                <li key={p} className="flex items-start gap-3 text-sm leading-snug text-ink/85">
                                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-vermilion" />
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={cn(
                        "mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/30 transition-all duration-500",
                        isOpen ? "rotate-45 border-vermilion bg-vermilion text-paper" : "group-hover:border-ink"
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div
                ref={box}
                onPointerMove={onMove}
                className="relative aspect-[4/3] sm:aspect-square w-full border border-ink/20 bg-paper"
              >
                <Suspense fallback={null}>
                  <RegressionScene runId={runId} reduced={reduce} active={active} pointer={pointer} />
                </Suspense>
                <span className="eyebrow absolute left-4 top-4 text-[0.6rem] text-ink/50">Linear regression · 3D view</span>
                <button
                  onClick={() => setRunId((r) => r + 1)}
                  className="eyebrow absolute right-4 top-4 border border-ink/30 px-3 py-1.5 text-[0.6rem] transition-colors hover:bg-ink hover:text-paper"
                >
                  ↻ Re-fit
                </button>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
                An illustrative dataset. The orange line learns its best fit, with each residual drawn as a thin segment — the simplest picture of what a model “learning” actually means.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
