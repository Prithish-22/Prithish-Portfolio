import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/content";
import { cn } from "@/utils/cn";
import { CloseIcon, GithubIcon, LinkedinIcon } from "./ui";

export default function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-paper transition-all duration-500",
          scrolled ? "bg-ink/80 py-3 backdrop-blur-md" : "py-5"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a href="#home" className="group flex items-center gap-3" aria-label="Prithish Raj — home">
            <span className="display flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 text-base italic transition-colors group-hover:bg-vermilion group-hover:border-vermilion">
              PR
            </span>
            <span className="hidden text-sm tracking-wide sm:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "page" : undefined}
                  className={cn(
                    "relative block px-3.5 py-2 text-[13px] tracking-wide transition-opacity",
                    active === n.id ? "opacity-100" : "opacity-60 hover:opacity-100"
                  )}
                >
                  {n.label}
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-vermilion"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full border border-paper/30 px-4 py-2 text-[13px] transition-colors hover:border-vermilion hover:bg-vermilion sm:block"
            >
              Say hello
            </a>
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] xl:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="h-px w-6 bg-paper" />
              <span className="h-px w-6 bg-paper" />
            </button>
          </div>
        </nav>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-vermilion"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-between overflow-y-auto bg-ink px-5 py-6 text-paper sm:px-8"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex shrink-0 items-center justify-between">
              <span className="eyebrow text-paper/50">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 active:bg-paper/10"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <ul className="my-auto flex flex-col justify-center gap-0.5 py-6">
              {navItems.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "display flex items-baseline gap-3 py-1 text-[clamp(1.75rem,7.5vw,3rem)] font-light",
                      active === n.id ? "text-vermilion italic" : "text-paper"
                    )}
                  >
                    <span className="eyebrow w-6 text-xs text-paper/40 not-italic">0{i + 1}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex shrink-0 items-center gap-4 border-t border-paper/15 pt-5 sm:gap-5">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-1 text-paper/70 hover:text-paper">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-1 text-paper/70 hover:text-paper">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href={`mailto:${profile.email}`} className="ml-auto truncate text-xs sm:text-sm text-paper/70 hover:text-vermilion">
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
