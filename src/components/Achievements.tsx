import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { achievements } from "@/data/content";
import { ArrowUpRight, Reveal, SectionHeading } from "./ui";

/** 50 cells → 10 highlighted → 1 winner. Honest, approximate visual of the evaluation funnel. */
function FunnelGrid() {
  const winner = 23;
  const top10 = new Set([3, 8, 14, 19, 23, 27, 31, 36, 42, 47]);
  return (
    <div className="max-w-xs sm:max-w-md">
      <div className="grid grid-cols-10 gap-1.5 sm:gap-2" role="img" aria-label="Approximately 50 participating teams, 10 selected in the first evaluation, 1 first-place winner">
        {Array.from({ length: 50 }).map((_, i) => {
          const isW = i === winner;
          const isT = top10.has(i);
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.012, duration: 0.4 }}
              className={`aspect-square ${isW ? "bg-ink ring-2 ring-paper ring-offset-2 ring-offset-vermilion" : isT ? "bg-paper" : "border border-ink/40"}`}
            />
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem]">
        <span className="eyebrow flex items-center gap-2"><span className="h-2.5 w-2.5 border border-ink/50" /> ~50 teams</span>
        <span className="eyebrow flex items-center gap-2"><span className="h-2.5 w-2.5 bg-paper" /> Top 10</span>
        <span className="eyebrow flex items-center gap-2"><span className="h-2.5 w-2.5 bg-ink" /> First place</span>
      </div>
    </div>
  );
}

export default function Achievements() {
  const a = achievements[0];
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  return (
    <section id="achievements" data-nav="achievements" className="relative overflow-hidden bg-vermilion py-24 text-ink md:py-36">
      <span
        className="display outline-text pointer-events-none absolute -right-6 -top-10 select-none text-[clamp(14rem,34vw,34rem)] font-light italic leading-none text-ink/15"
        aria-hidden
      >
        1st
      </span>
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          index="06"
          label="Hackathon & achievements"
          title={
            <>
              Under pressure, <em className="text-paper">the idea held.</em>
            </>
          }
          intro="A single result, documented properly — with the certificate to back it up."
          className="[&_span.text-vermilion]:text-ink [&_p]:text-ink"
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-[0.66rem] text-ink/70">{a.event}</p>
              <p className="display mt-3 text-[clamp(3.4rem,10vw,8.5rem)] font-light uppercase leading-[0.85]">
                {a.title}
              </p>
              <p className="display mt-6 max-w-xl text-[clamp(1.3rem,2.4vw,1.9rem)] font-light italic leading-snug">
                for <span className="not-italic font-normal">{a.project}</span> — {a.track}.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <FunnelGrid />
            </Reveal>

            <Reveal className="mt-12">
              <dl className="grid gap-px bg-ink/25 sm:grid-cols-2">
                {[
                  ["Competition", a.event],
                  ["Track", a.track],
                  ["Team size", `${a.teamSize} — ${a.team}`],
                  ["My role", a.role],
                ].map(([k, v]) => (
                  <div key={k} className="bg-vermilion p-5">
                    <dt className="eyebrow text-[0.58rem] text-ink/65">{k}</dt>
                    <dd className="mt-2 text-[0.98rem] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <ol className="mb-10 space-y-0 border-l border-ink/40 pl-6">
                {[
                  ["Idea", "Scam detection that explains itself."],
                  ["Pivot", "Android call-audio limits → keypad-phone concept."],
                  ["Evaluation 1", "Selected among the Top 10 of ~50 teams."],
                  ["Final", "First Place."],
                ].map(([t, d], i) => (
                  <li key={t} className="relative pb-6 last:pb-0">
                    <span className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full ${i === 3 ? "bg-ink ring-4 ring-paper/60" : "bg-paper"}`} />
                    <p className="eyebrow text-[0.6rem] text-ink/65">{t}</p>
                    <p className="mt-1 text-[0.98rem]">{d}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{ perspective: 1200 }}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  mx.set((e.clientX - r.left) / r.width - 0.5);
                  my.set((e.clientY - r.top) / r.height - 0.5);
                }}
                onPointerLeave={() => {
                  mx.set(0);
                  my.set(0);
                }}
              >
                <motion.div
                  style={{ rotateX: reduce ? 0 : rX, rotateY: reduce ? 0 : rY }}
                  className="relative bg-paper p-3 shadow-[0_40px_60px_-30px_rgba(17,20,15,0.7)]"
                >
                  <div className="border border-ink/70 p-1.5">
                    <div className="border border-ink/30 px-6 py-9 text-center">
                      <p className="eyebrow text-[0.58rem] text-ink/50">Winning certificate</p>
                      <p className="display mt-5 text-4xl font-light italic text-vermilion">First Place</p>
                      <div className="mx-auto my-5 h-px w-16 bg-ink/40" />
                      <p className="display text-xl font-light">{a.event}</p>
                      <p className="eyebrow mt-3 text-[0.58rem] text-ink/55">{a.track}</p>
                      <p className="eyebrow mt-6 text-[0.58rem] text-ink/55">Project · {a.project}</p>
                      <a
                        href={a.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-vermilion"
                      >
                        View Certificate <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
