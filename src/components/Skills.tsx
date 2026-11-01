import { motion } from "framer-motion";
import { useState } from "react";
import { levels, skillGroups, type LevelId } from "@/data/content";
import { cn } from "@/utils/cn";
import { Reveal, SectionHeading } from "./ui";

const tone: Record<LevelId, string> = {
  studied: "#9db59a",
  practiced: "#eee9dd",
  "ai-assisted": "#e4502b",
  learning: "#c9a15a",
};

export function LevelGlyph({ level, className }: { level: LevelId; className?: string }) {
  const c = tone[level];
  return (
    <svg viewBox="0 0 16 16" className={cn("h-3.5 w-3.5 shrink-0", className)} aria-hidden>
      {level === "studied" && <circle cx="8" cy="8" r="5.5" fill="none" stroke={c} strokeWidth="1.5" />}
      {level === "practiced" && <circle cx="8" cy="8" r="6" fill={c} />}
      {level === "ai-assisted" && <rect x="3" y="3" width="10" height="10" fill={c} transform="rotate(45 8 8)" />}
      {level === "learning" && (
        <>
          <circle cx="8" cy="8" r="5.5" fill="none" stroke={c} strokeWidth="1.5" />
          <path d="M8 2.5a5.5 5.5 0 0 0 0 11Z" fill={c} />
        </>
      )}
    </svg>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState<LevelId | null>(null);
  const [hover, setHover] = useState<{ name: string; level: LevelId } | null>(null);
  const current = hover ?? (filter ? { name: "", level: filter } : null);
  const currentLevel = current ? levels.find((l) => l.id === current.level) : null;

  return (
    <section id="technical-skills" data-nav="skills" className="relative bg-forest py-24 text-paper md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          index="03"
          label="Technical skills & technologies"
          title={
            <>
              An honest map of <em className="text-vermilion">what I know.</em>
            </>
          }
          intro="No percentages, no inflated bars. Every technology is placed by how I actually relate to it — pick a category to see where things sit."
        />

        {/* legend / filter */}
        <Reveal>
          <div role="group" aria-label="Filter skills by familiarity" className="grid gap-px overflow-hidden border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((l) => {
              const on = filter === l.id;
              const count = skillGroups.reduce((n, g) => n + g.skills.filter((s) => s.level === l.id).length, 0);
              return (
                <button
                  key={l.id}
                  onClick={() => setFilter(on ? null : l.id)}
                  aria-pressed={on}
                  className={cn(
                    "group relative flex flex-col items-start gap-2.5 p-4 sm:p-5 text-left transition-colors duration-300",
                    on ? "bg-paper text-ink" : "bg-forest hover:bg-forest-2"
                  )}
                >
                  <span className="flex w-full items-center justify-between">
                    <LevelGlyph level={l.id} className="h-5 w-5" />
                    <span className={cn("eyebrow text-[0.6rem]", on ? "text-ink/60" : "text-paper/50")}>{count} items</span>
                  </span>
                  <span className="display text-base sm:text-lg font-light leading-tight">{l.label}</span>
                  <span className={cn("text-xs leading-snug", on ? "text-ink/70" : "text-paper/55")}>{l.note}</span>
                </button>
              );
            })}
          </div>
          <p className="eyebrow mt-4 min-h-4 text-[0.62rem] text-paper/50" aria-live="polite">
            {currentLevel ? (
              <>
                {current?.name && <span className="text-paper">{current.name} — </span>}
                {currentLevel.label}
              </>
            ) : (
              "Select a category above · tap or hover a skill"
            )}
          </p>
        </Reveal>

        {/* groups */}
        <div className="mt-12 border-t border-paper/15">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title}>
              <div className="grid gap-6 border-b border-paper/15 py-9 md:grid-cols-12 md:gap-10 md:py-11">
                <div className="md:col-span-4">
                  <p className="eyebrow text-[0.62rem] text-vermilion">0{gi + 1}</p>
                  <h3 className="display mt-3 text-[clamp(1.4rem,2.2vw,1.9rem)] font-light leading-tight">{g.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/55">{g.blurb}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2.5 md:col-span-8">
                  {g.skills.map((s) => {
                    const dim = filter && filter !== s.level;
                    const lit = filter === s.level;
                    return (
                      <li key={s.name}>
                        <motion.button
                          type="button"
                          onMouseEnter={() => setHover(s)}
                          onMouseLeave={() => setHover(null)}
                          onFocus={() => setHover(s)}
                          onBlur={() => setHover(null)}
                          onClick={() => setFilter(filter === s.level ? null : s.level)}
                          whileHover={{ y: -3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          aria-label={`${s.name}: ${levels.find((l) => l.id === s.level)?.label}`}
                          className={cn(
                            "flex items-center gap-2 border px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-[0.95rem] transition-all duration-300",
                            lit
                              ? "border-paper bg-paper text-ink"
                              : "border-paper/25 hover:border-paper/70",
                            dim && "opacity-20"
                          )}
                        >
                          <LevelGlyph level={s.level} />
                          {s.name}
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 grid gap-6 border border-paper/15 p-6 md:grid-cols-[auto_1fr] md:items-start md:p-8">
            <span className="eyebrow text-vermilion">A note on React & Next.js</span>
            <p className="max-w-3xl text-[0.98rem] leading-relaxed text-paper/75">
              I know Python, statistics, linear algebra, SQL and core data-science concepts. I can also build web applications with React and Next.js — through AI-assisted development workflows. I don&apos;t present them as independently mastered professional frameworks; I present them as what they are: tools I can direct AI to build with, and review.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
