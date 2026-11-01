import { cn } from "@/utils/cn";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

/** Illustrated keypad phone (concept visual — the virtual prototype, not a live service). */
export function KeypadPhone({ screen, className, step = -1 }: { screen: string[]; className?: string; step?: number }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/17] w-full rounded-[2rem] bg-gradient-to-b from-[#2b2f28] to-[#171a14] p-[7%] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]",
        className
      )}
    >
      <div className="relative flex h-[34%] flex-col justify-between overflow-hidden rounded-lg bg-[#b9c9a9] p-[7%] font-mono text-[#1c2a1a] shadow-inner">
        <div className="flex items-center justify-between text-[0.5rem] uppercase tracking-widest opacity-70">
          <span>▮▮▮</span>
          <span>Virtual</span>
        </div>
        <div className="space-y-0.5 text-[clamp(0.5rem,1.1vw,0.72rem)] leading-tight">
          {screen.map((l, i) => (
            <p key={l + i} className={i === 0 ? "font-medium" : "opacity-75"}>
              {l}
            </p>
          ))}
        </div>
        <span className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.05)_0_1px,transparent_1px_3px)]" />
      </div>
      {/* nav cluster */}
      <div className="mx-auto my-[6%] flex items-center justify-center gap-[8%]">
        <span className="h-[1.1rem] w-[18%] rounded-full bg-[#0f120d]" />
        <span className="h-[1.6rem] w-[1.6rem] rounded-full border border-paper/20 bg-[#0f120d]" />
        <span className="h-[1.1rem] w-[18%] rounded-full bg-[#0f120d]" />
      </div>
      <div className="grid grid-cols-3 gap-[5%]">
        {keys.map((k, i) => (
          <span
            key={k}
            className={cn(
              "flex aspect-[1.7/1] items-center justify-center rounded-md bg-[#0f120d] font-mono text-[0.62rem] text-paper/70 transition-colors duration-300",
              step >= 0 && (i + step * 2) % 12 === 4 && "bg-vermilion text-paper"
            )}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Conceptual app view — shows the *shape* of the output (score, explanation, precautions), no fabricated results. */
export function AppConcept({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/18] w-full overflow-hidden rounded-[2rem] border-[5px] border-[#2b2f28] bg-paper p-[8%] text-ink shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink/20" />
      <div className="flex items-center justify-between">
        <span className="display text-base italic">Vesper</span>
        <span className="eyebrow text-[0.5rem] text-ink/50">Analysis</span>
      </div>
      <div className="mt-3 rounded-md border border-ink/15 p-2.5">
        <p className="eyebrow text-[0.46rem] text-ink/50">Message under analysis</p>
        <div className="mt-1.5 space-y-1">
          <div className="h-1 w-full rounded bg-ink/20" />
          <div className="h-1 w-5/6 rounded bg-ink/20" />
          <div className="h-1 w-2/3 rounded bg-ink/20" />
        </div>
      </div>
      {/* gauge */}
      <div className="relative mt-4">
        <svg viewBox="0 0 200 110" className="w-full">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#9db59a" />
              <stop offset="0.5" stopColor="#c9a15a" />
              <stop offset="1" stopColor="#e4502b" />
            </linearGradient>
          </defs>
          <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="url(#g)" strokeWidth="12" strokeLinecap="round" />
          {Array.from({ length: 11 }).map((_, i) => {
            const a = Math.PI + (i / 10) * Math.PI;
            return (
              <line key={i} x1={100 + Math.cos(a) * 66} y1={100 + Math.sin(a) * 66} x2={100 + Math.cos(a) * 58} y2={100 + Math.sin(a) * 58} stroke="#11140f" strokeOpacity="0.4" />
            );
          })}
          <text x="14" y="108" fontSize="8" fontFamily="JetBrains Mono" fill="#11140f" opacity="0.6">0</text>
          <text x="172" y="108" fontSize="8" fontFamily="JetBrains Mono" fill="#11140f" opacity="0.6">100</text>
          <g className="needle">
            <line x1="100" y1="100" x2="100" y2="38" stroke="#11140f" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <circle cx="100" cy="100" r="6" fill="#11140f" />
        </svg>
        <p className="eyebrow -mt-1 text-center text-[0.5rem] text-ink/60">Risk score · 0 – 100</p>
      </div>
      <div className="mt-3">
        <p className="eyebrow text-[0.46rem] text-vermilion">Why it looks suspicious</p>
        <div className="mt-1.5 space-y-1">
          <div className="h-1 w-full rounded bg-ink/15" />
          <div className="h-1 w-11/12 rounded bg-ink/15" />
        </div>
      </div>
      <div className="mt-3">
        <p className="eyebrow text-[0.46rem] text-forest-2">Recommended precautions</p>
        <div className="mt-1.5 flex gap-1.5">
          <span className="h-3 w-1/3 rounded-full bg-forest/15" />
          <span className="h-3 w-1/4 rounded-full bg-forest/15" />
          <span className="h-3 w-1/5 rounded-full bg-forest/15" />
        </div>
      </div>
      <div className="absolute inset-x-[8%] bottom-[5%] flex items-center justify-between rounded-md bg-ink px-3 py-2 text-paper">
        <span className="eyebrow text-[0.46rem]">Notify guardian</span>
        <span className="text-[0.55rem] text-sage">Telegram</span>
      </div>
    </div>
  );
}
