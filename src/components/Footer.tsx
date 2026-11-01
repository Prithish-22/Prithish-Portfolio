import { navItems, profile } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "./ui";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-5 pt-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-3xl font-light italic">Prithish Raj T</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/55">
              Aspiring AI/ML Engineer & Data Science Enthusiast. Exploring intelligence, engineering possibilities.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-paper/60 hover:text-vermilion">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-paper/60 hover:text-vermilion">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href={`mailto:${profile.email}`} className="link-underline text-sm text-paper/70">
                {profile.email}
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="md:col-span-4">
            <p className="eyebrow mb-4 text-[0.58rem] text-paper/40">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-paper/65 transition-colors hover:text-paper">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4 text-[0.58rem] text-paper/40">Status</p>
            <p className="flex items-center gap-2 text-sm text-paper/70">
              <span className="h-2 w-2 rounded-full bg-sage" /> {profile.availability}
            </p>
            <p className="mt-3 text-sm text-paper/45">{profile.location}</p>
          </div>
        </div>

        <p
          className="display pointer-events-none mt-14 select-none whitespace-nowrap text-center text-[clamp(3.5rem,17vw,16rem)] font-light uppercase leading-[0.8] text-paper/[0.06]"
          aria-hidden
        >
          Prithish Raj T
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-paper/10 py-6 text-xs text-paper/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Prithish Raj T. All rights reserved.</span>
          <a href="#home" className="eyebrow text-[0.58rem] hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
