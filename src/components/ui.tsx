import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, SVGProps } from "react";
import { cn } from "@/utils/cn";
import { profile } from "@/data/content";

/* ───────── Reveal on scroll ───────── */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/* ───────── Word-by-word headline reveal ───────── */
export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ───────── Section heading ───────── */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-14 md:mb-20", className)}>
      <Reveal>
        <p className="eyebrow flex items-center gap-4 opacity-70">
          <span className="text-vermilion">{index}</span>
          <span className="h-px w-10 bg-current opacity-50" />
          <span>{label}</span>
        </p>
      </Reveal>
      <h2 className="display mt-6 max-w-4xl text-[clamp(2.2rem,5.6vw,4.6rem)] font-light leading-[1.02]">{title}</h2>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75 md:text-lg">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}

/* ───────── Magnetic-ish button ───────── */
export function Button({
  href,
  children,
  variant = "solid",
  external,
  onClick,
  type,
  className,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "ink";
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-transform duration-300 active:scale-[0.97] disabled:opacity-60";
  const styles = {
    solid: "bg-vermilion text-paper hover:bg-[#f0603a]",
    ink: "bg-ink text-paper hover:bg-ink-2",
    ghost: "border border-current/40 hover:border-current",
  }[variant];
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={cn(base, styles, className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cn(base, styles, className)}>
      {content}
    </button>
  );
}

/* ───────── Photograph frame (placeholder until photo is provided) ───────── */
export function PhotoFrame({ className, label = true }: { className?: string; label?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden bg-forest-2", className)}>
      {profile.photo ? (
        <img
          src={profile.photo}
          alt={profile.photoAlt}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-paper"
          role="img"
          aria-label="Reserved space for Prithish Raj's professional photograph"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(238,233,221,0.06) 25%, transparent 25%, transparent 50%, rgba(238,233,221,0.06) 50%, rgba(238,233,221,0.06) 75%, transparent 75%)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute inset-4 border border-dashed border-paper/30" />
          <div className="scan-line absolute left-4 right-4 top-0 h-px bg-vermilion/80" />
          <span className="display relative text-[clamp(4rem,12vw,7rem)] font-light italic leading-none text-paper/90">
            PR
          </span>
          {label && (
            <span className="eyebrow relative mt-4 px-6 text-center text-[0.62rem] text-paper/60">
              Professional photograph
              <br />
              reserved
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────── Icons ───────── */
type IconProps = SVGProps<SVGSVGElement>;
export const ArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const GithubIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
export const LinkedinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
export const MailIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);
