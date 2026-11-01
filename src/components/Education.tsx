import { degree, programs, timeline } from "@/data/content";
import { cn } from "@/utils/cn";
import { ArrowUpRight, Reveal, SectionHeading } from "./ui";

export function StatusPill({ status }: { status: "completed" | "ongoing" }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 border px-2.5 py-1 text-[0.58rem]",
        status === "completed" ? "border-forest-2 text-forest-2" : "border-vermilion text-vermilion"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", status === "completed" ? "bg-forest-2" : "bg-vermilion")} />
      {status === "completed" ? "Completed" : "Ongoing"}
    </span>
  );
}

export default function Education() {
  return (
    <>
      <section id="education" data-nav="education" className="relative bg-paper py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHeading
            index="07"
            label="Education"
            title={
              <>
                Literature by degree. <em className="text-vermilion">Intelligence by pursuit.</em>
              </>
            }
          />

          <div className="grid gap-10 lg:grid-cols-12">
            {/* degree */}
            <Reveal className="lg:col-span-5">
              <div className="relative h-full bg-ink p-8 text-paper md:p-10">
                <p className="eyebrow text-[0.62rem] text-paper/50">University degree</p>
                <h3 className="display mt-6 text-[clamp(1.8rem,3.2vw,2.6rem)] font-light leading-[1.05]">{degree.title}</h3>
                <dl className="mt-8 space-y-4 text-sm">
                  <div>
                    <dt className="eyebrow text-[0.56rem] text-paper/45">Institution</dt>
                    <dd className="mt-1 text-base">{degree.institution}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[0.56rem] text-paper/45">University</dt>
                    <dd className="mt-1 text-base">{degree.university}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[0.56rem] text-paper/45">Location</dt>
                    <dd className="mt-1 text-base">{degree.location}</dd>
                  </div>
                </dl>
                <p className="eyebrow mt-9 inline-flex items-center gap-2 bg-vermilion px-3 py-2 text-[0.6rem]">● {degree.status}</p>
                <span className="display absolute right-6 top-4 text-7xl font-light italic text-paper/10" aria-hidden>
                  B.A.
                </span>
              </div>
            </Reveal>

            {/* programs */}
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5 text-[0.62rem] text-ink/50">Professional programs</p>
              <ul className="divide-y divide-ink/15 border-y border-ink/15">
                {programs.map((p) => (
                  <Reveal as="li" key={p.title}>
                    <div className="grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:gap-8">
                      <div>
                        <StatusPill status={p.status} />
                        <h3 className="display mt-4 text-[clamp(1.3rem,2.2vw,1.75rem)] font-light leading-snug">{p.title}</h3>
                        <p className="eyebrow mt-3 text-[0.62rem] text-ink/55">{p.institution}</p>
                        {"note" in p && p.note && <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">{p.note}</p>}
                      </div>
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="eyebrow inline-flex h-fit items-center gap-2 self-start border border-ink/30 px-4 py-2.5 text-[0.6rem] transition-colors hover:bg-ink hover:text-paper"
                        >
                          Certificate <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="eyebrow h-fit self-start px-4 py-2.5 text-[0.6rem] text-ink/40">In progress</span>
                      )}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Journey timeline ───── */}
      <section id="journey" data-nav="education" className="relative bg-paper pb-24 md:pb-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="border-t border-ink/20 pt-20 md:pt-28">
            <SectionHeading
              index="08"
              label="Experience & professional journey"
              title={
                <>
                  Learning, building, <em className="text-vermilion">winning.</em>
                </>
              }
              intro="My current position is that of an aspiring AI/ML professional and fresher. This is the path so far — academic, self-driven and project-based."
            />
            <ol className="relative">
              <span className="absolute bottom-0 left-[7px] top-2 w-px bg-ink/20 md:left-1/2" aria-hidden />
              {timeline.map((t, i) => {
                const right = i % 2 === 1;
                const key = t.kind === "Achievement";
                return (
                  <Reveal as="li" key={t.title} y={30}>
                    <div className="relative grid gap-3 pb-12 pl-10 md:grid-cols-2 md:gap-20 md:pl-0">
                      <span
                        className={cn(
                          "absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-ink bg-paper md:left-1/2 md:-translate-x-1/2",
                          key && "border-vermilion bg-vermilion ring-4 ring-vermilion/20"
                        )}
                      />
                      <div className={cn(right ? "md:col-start-2" : "md:col-start-1 md:text-right")}>
                        <p className="eyebrow text-[0.6rem] text-vermilion">
                          {t.kind} · <span className="text-ink/50">{t.status}</span>
                        </p>
                        <h3 className="display mt-2 text-[clamp(1.3rem,2.2vw,1.8rem)] font-light leading-snug">{t.title}</h3>
                        <p className={cn("mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink/65", !right && "md:ml-auto")}>{t.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
