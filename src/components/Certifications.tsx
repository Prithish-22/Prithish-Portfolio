import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { certifications } from "@/data/content";
import { cn } from "@/utils/cn";
import { StatusPill } from "./Education";
import { ArrowUpRight, Reveal, SectionHeading } from "./ui";

type Cert = (typeof certifications)[number];

const issuerTone: Record<string, string> = {
  Intellipaat: "bg-forest text-paper",
  "IBM / Coursera": "bg-ink text-paper",
  LinkedIn: "bg-sage text-ink",
};

function Preview({ c }: { c: Cert }) {
  const [failed, setFailed] = useState(false);
  const tone = issuerTone[c.issuer] ?? "bg-paper text-ink";
  const ongoing = c.status === "ongoing";

  if (c.preview && !failed) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        <img
          src={c.preview}
          alt={`Certificate preview: ${c.title}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden p-6 text-center", ongoing ? "border border-dashed border-ink/40 bg-transparent text-ink" : tone)}>
      <span className="absolute inset-3 border border-current opacity-25" />
      <span className="absolute inset-[18px] border border-current opacity-10" />
      <p className="eyebrow text-[0.56rem] opacity-70">{ongoing ? "In progress" : "Certificate of completion"}</p>
      <p className="display mt-3 text-[clamp(1.05rem,1.7vw,1.35rem)] font-light italic leading-tight">{c.title}</p>
      <span className="my-3 h-px w-10 bg-current opacity-40" />
      <p className="eyebrow text-[0.56rem] opacity-80">{c.issuer}</p>
    </div>
  );
}

function CertCard({ c, i }: { c: Cert; i: number }) {
  const reduce = useReducedMotion();
  const ongoing = c.status === "ongoing";
  const inner = (
    <motion.div
      whileHover={reduce ? undefined : { y: -8, rotateX: 3, rotateY: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ transformPerspective: 1000 }}
      className={cn("group flex h-full flex-col bg-paper p-3 shadow-[0_20px_40px_-28px_rgba(17,20,15,0.6)]", ongoing && "bg-transparent shadow-none")}
    >
      <Preview c={c} />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-[0.58rem] text-ink/45">{String(i + 1).padStart(2, "0")} · {c.kind}</span>
          <StatusPill status={c.status} />
        </div>
        <h3 className="display mt-4 text-xl font-light leading-snug">{c.title}</h3>
        <p className="eyebrow mt-2 text-[0.6rem] text-ink/55">{c.issuer}</p>
        <div className="mt-auto pt-6">
          {c.link ? (
            <span className="inline-flex items-center gap-2 border-b border-ink pb-0.5 text-sm transition-colors group-hover:border-vermilion group-hover:text-vermilion">
              View Certificate <ArrowUpRight className="h-4 w-4" />
            </span>
          ) : (
            <span className="eyebrow text-[0.6rem] text-ink/45">Certificate available on completion</span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return c.link ? (
    <a href={c.link} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${c.title} — ${c.issuer}`} className="block h-full">
      {inner}
    </a>
  ) : (
    <div className="h-full">{inner}</div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" data-nav="certifications" className="relative bg-paper-2 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeading
          index="09"
          label="Certifications"
          title={
            <>
              Credentials, <em className="text-vermilion">verifiable.</em>
            </>
          }
          intro="Every credential links to its certificate. Completed programs and ongoing ones are marked clearly."
        />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 0.08}>
              <CertCard c={c} i={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
