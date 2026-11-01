import { profile } from "@/data/content";
import { ArrowUpRight, Button, GithubIcon, LinkedinIcon, MailIcon, Reveal, SplitWords } from "./ui";

export default function Contact() {
  const contactLinks = [
    {
      icon: <MailIcon className="h-6 w-6" />,
      label: "Direct Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      desc: "Best for opportunities, inquiries & project discussions",
    },
    {
      icon: <LinkedinIcon className="h-6 w-6" />,
      label: "LinkedIn",
      value: "linkedin.com/in/prithish-raj",
      href: profile.linkedin,
      desc: "Connect for professional networking & updates",
    },
    {
      icon: <GithubIcon className="h-6 w-6" />,
      label: "GitHub",
      value: "github.com/Prithish-22",
      href: profile.github,
      desc: "Explore my open-source projects & code",
    },
  ];

  return (
    <section id="contact" data-nav="contact" className="relative overflow-hidden bg-forest py-24 text-paper md:py-36">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-vermilion/15 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-4 opacity-70">
            <span className="text-vermilion">10</span>
            <span className="h-px w-10 bg-current opacity-50" />
            <span>Contact & opportunities</span>
          </p>
        </Reveal>
        <h2 className="display mt-8 text-[clamp(2.8rem,9vw,8rem)] font-light uppercase leading-[0.9]">
          <SplitWords text="Let's Build" />
          <br />
          <em className="text-vermilion"><SplitWords text="Something Intelligent." delay={0.2} /></em>
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-[1.1rem] leading-relaxed text-paper/75">
                I&apos;m always interested in exploring new ideas, discussing emerging technologies, solving meaningful problems, and connecting with people working in AI and Data Science.
              </p>
              <div className="mt-8 border-l-2 border-vermilion bg-white/[0.03] p-5 backdrop-blur-xs">
                <span className="eyebrow block text-[0.62rem] text-vermilion">Status</span>
                <p className="mt-1 text-base text-paper">
                  Open to AI/ML internships, Data Science internships, and entry-level opportunities.
                </p>
              </div>
              <div className="mt-8">
                <Button href={`mailto:${profile.email}`}>Email me directly</Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {contactLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-3.5 sm:gap-5 border border-paper/15 bg-white/[0.02] p-4 sm:p-5 transition-all duration-200 hover:border-vermilion hover:bg-white/[0.05]"
                    >
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border border-paper/20 bg-forest-2 text-paper/70 transition-colors group-hover:border-vermilion group-hover:text-vermilion">
                        {l.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="eyebrow block text-[0.56rem] sm:text-[0.58rem] text-paper/50">{l.label}</span>
                        <span className="mt-0.5 block truncate text-sm sm:text-base font-medium text-paper group-hover:text-vermilion transition-colors">
                          {l.value}
                        </span>
                        <span className="block truncate text-xs text-paper/60 mt-0.5">{l.desc}</span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-paper/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-vermilion" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
