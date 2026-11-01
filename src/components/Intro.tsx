import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

/** Short branded intro: name rises, a line draws, the curtain lifts. */
export default function Intro({ done, onDone }: { done: boolean; onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(onDone, reduce ? 150 : 2100);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [done, onDone, reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-paper"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="overflow-hidden">
            <motion.p
              className="display text-[clamp(2.4rem,9vw,6rem)] font-light uppercase leading-none"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              Prithish <span className="italic text-vermilion">Raj T</span>
            </motion.p>
          </div>
          <div className="mt-8 h-px w-48 overflow-hidden bg-paper/15">
            <motion.div
              className="h-full bg-vermilion"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </div>
          <motion.p
            className="eyebrow mt-5 text-paper/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            AI · ML · Data Science
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
