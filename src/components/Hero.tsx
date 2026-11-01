import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/content";
import { Button, GithubIcon, LinkedinIcon, PhotoFrame } from "./ui";

const HeroScene = lazy(() => import("@/scenes/HeroScene"));

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ ready }: { ready: boolean }) {
  const reduce = !!useReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });
  const wrap = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-9, 9]);
  const rotX = useTransform(sy, [-1, 1], [7, -7]);
  const chipX = useTransform(sx, [-1, 1], [-18, 18]);
  const chipY = useTransform(sy, [-1, 1], [-12, 12]);
  const chipX2 = useTransform(sx, [-1, 1], [22, -22]);
  const chipY2 = useTransform(sy, [-1, 1], [14, -14]);

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      pointer.current.x = x;
      pointer.current.y = y;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, mx, my]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = ready ? "show" : "hide";
  const item = (d: number) => ({
    hide: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: d, ease } },
  });

  return (
    <section
      id="home"
      data-nav="home"
      ref={wrap}
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-ink text-paper"
    >
      {/* atmosphere */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 48%, rgba(28,58,47,0.95) 0%, rgba(17,20,15,0) 70%), radial-gradient(40% 40% at 8% 100%, rgba(228,80,43,0.14) 0%, rgba(17,20,15,0) 70%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #eee9dd 1px, transparent 1px), linear-gradient(to bottom, #eee9dd 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(70% 70% at 60% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 70% at 60% 50%, black, transparent)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 px-5 pb-10 pt-28 md:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6 lg:pt-24">
        {/* copy */}
        <div className="relative z-10">
          <motion.div variants={item(0.05)} initial="hide" animate={show} className="inline-flex items-center gap-3 rounded-full border border-paper/20 py-1.5 pl-3 pr-4">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inset-0 rounded-full bg-sage" />
              <span className="relative h-2 w-2 rounded-full bg-sage" />
            </span>
            <span className="eyebrow text-[0.64rem] text-paper/80">{profile.availability}</span>
          </motion.div>

          <h1 className="display mt-8 font-light uppercase leading-[0.88] text-[clamp(2.9rem,12.5vw,4.8rem)] lg:text-[clamp(4rem,7.4vw,8.2rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={ready ? { y: 0 } : { y: "105%" }}
                transition={{ duration: 1.1, ease, delay: 0.1 }}
              >
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block italic text-vermilion"
                initial={{ y: "105%" }}
                animate={ready ? { y: 0 } : { y: "105%" }}
                transition={{ duration: 1.1, ease, delay: 0.22 }}
              >
                {profile.lastName}
              </motion.span>
            </span>
          </h1>

          <motion.p variants={item(0.45)} initial="hide" animate={show} className="eyebrow mt-7 text-paper/70">
            {profile.title}
          </motion.p>

          <motion.p
            variants={item(0.55)}
            initial="hide"
            animate={show}
            className="display mt-6 max-w-xl text-[clamp(1.4rem,2.6vw,2.1rem)] font-light italic leading-snug text-paper"
          >
            “{profile.headline.join(" ")}”
          </motion.p>

          <motion.p variants={item(0.65)} initial="hide" animate={show} className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-paper/65">
            {profile.heroDescription}
          </motion.p>

          <motion.div variants={item(0.8)} initial="hide" animate={show} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects">Explore My Work</Button>
            <Button href="#contact" variant="ghost">
              Let&apos;s Connect
            </Button>
            <span className="mx-2 hidden h-6 w-px bg-paper/20 sm:block" />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="rounded-full p-2.5 text-paper/60 transition-colors hover:text-paper"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full p-2.5 text-paper/60 transition-colors hover:text-paper"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        {/* 3D centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.3, ease, delay: 0.3 }}
          className="relative mx-auto aspect-square w-full max-w-[min(92vw,600px)]"
          style={{ perspective: 1200 }}
        >
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <HeroScene pointer={pointer} active={inView && ready} reduced={reduce} />
            </Suspense>
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2"
            style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-[4/5] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
              <PhotoFrame className="absolute inset-0 h-full w-full" />
              {/* corner brackets */}
              {["-left-2 -top-2 border-l border-t", "-right-2 -top-2 border-r border-t", "-bottom-2 -left-2 border-b border-l", "-bottom-2 -right-2 border-b border-r"].map((c) => (
                <span key={c} className={`absolute h-5 w-5 border-vermilion ${c}`} />
              ))}
            </div>
            <motion.span
              style={{ x: reduce ? 0 : chipX, y: reduce ? 0 : chipY, translateZ: 70 }}
              className="eyebrow absolute -left-[6%] sm:-left-[18%] md:-left-[22%] top-[14%] whitespace-nowrap border border-paper/25 bg-ink/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[0.52rem] sm:text-[0.58rem] backdrop-blur"
            >
              Machine Learning
            </motion.span>
            <motion.span
              style={{ x: reduce ? 0 : chipX2, y: reduce ? 0 : chipY2, translateZ: 90 }}
              className="eyebrow absolute -right-[6%] sm:-right-[18%] md:-right-[24%] top-[52%] whitespace-nowrap border border-paper/25 bg-ink/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[0.52rem] sm:text-[0.58rem] backdrop-blur"
            >
              Data Science
            </motion.span>
            <motion.span
              style={{ x: reduce ? 0 : chipX, y: reduce ? 0 : chipY2, translateZ: 50 }}
              className="eyebrow absolute -bottom-[4%] -left-[4%] sm:-left-[16%] whitespace-nowrap bg-vermilion px-2.5 py-1 sm:px-3 sm:py-1.5 text-[0.52rem] sm:text-[0.58rem] text-paper"
            >
              AI Applications
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 pb-6 text-paper/50 md:px-10"
      >
        <span className="eyebrow text-[0.62rem]">{profile.location}</span>
        <a href="#about" className="eyebrow group flex items-center gap-3 text-[0.62rem] hover:text-paper">
          Scroll
          <span className="relative h-8 w-px overflow-hidden bg-paper/20">
            <span className="scan-line absolute inset-x-0 top-0 h-3 bg-vermilion" />
          </span>
        </a>
        <span className="eyebrow hidden text-[0.62rem] sm:block">Final-year · Fresher</span>
      </motion.div>
    </section>
  );
}
