import ExperienceItem from "../components/ExperienceItem";
import DarkModeToggle from "../components/DarkModeToggle";
import { useEffect } from "react";
import { playClack, primeClackAudio } from "../lib/sound";
import portfolio from "../data/portfolio.json";

const experience = [...portfolio.experience].sort(
  (a, b) => (a.homeOrder ?? 999) - (b.homeOrder ?? 999)
);

const projects = [...portfolio.projects].sort((a, b) =>
  b.startDate.localeCompare(a.startDate)
);

const education = [...portfolio.education].sort((a, b) => {
  const dateA = a.endDate || a.startDate;
  const dateB = b.endDate || b.startDate;
  return dateB.localeCompare(dateA);
});

export default function Home() {
  useEffect(() => {
    primeClackAudio();
  }, []);

  return (
    <div className="max-w-[560px] mx-auto px-6 py-20 pb-32 font-geist">      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[15px] font-medium text-[#111] dark:text-[#e8e8e8]">Joaquin Llenado</p>
          <DarkModeToggle />
        </div>
        <p className="text-[14px] text-[#888] dark:text-[#888] leading-[1.7]">
          Software engineer and AI researcher based in SF Bay Area.<br />
          <a href="mailto:joaquinllenado@gmail.com" onMouseEnter={playClack} className="text-[#888] dark:text-[#888] underline underline-offset-[3px] hover:text-[#111] dark:hover:text-[#e8e8e8]">
            joaquinllenado@gmail.com
          </a>
        </p>
      </div>

      {/* Nav */}
      <nav className="flex gap-5 mb-8">
        {[
          { label: "GitHub", href: "https://github.com/joaquinllenado" },
          { label: "LinkedIn", href: "https://linkedin.com/in/joaquinllenado" },
          { label: "Twitter", href: "https://x.com/joaquinllenado" },
          { label: "Resume", href: `${import.meta.env.BASE_URL}Joaquin_Llenado_resume.pdf` },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={playClack}
            className="text-[13px] text-[#999] dark:text-[#666] hover:text-[#111] dark:hover:text-[#e8e8e8] hover:no-underline">
            {label}
          </a>
        ))}
      </nav>

      {/* Experience */}
      <section className="mb-14">
        <p className="text-[11px] font-medium tracking-[1.5px] uppercase text-[#bbb] dark:text-[#555] mb-6">Experience</p>
        {experience.map((e) => (
          <ExperienceItem
            key={e.title + e.company}
            role={e.title}
            company={e.company}
            date={e.period}
            bullets={e.description}
          />
        ))}
      </section>

      {/* Projects */}
      <section className="mb-14">
        <p className="text-[11px] font-medium tracking-[1.5px] uppercase text-[#bbb] dark:text-[#555] mb-6">Projects</p>
        {projects.map((p) => (
          <div key={p.name} className="mb-5 last:mb-0">
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                onMouseEnter={playClack}
                className="text-[14px] font-medium text-[#111] dark:text-[#e8e8e8] hover:underline underline-offset-[3px]">
                {p.name}
              </a>
              <span className="text-[12px] text-[#888] dark:text-[#555] whitespace-nowrap shrink-0">{p.period}</span>
            </div>
            <p className="text-[13px] text-[#6b7280] dark:text-[#888] leading-[1.65]">{p.description.join(" ")}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-14">
        <p className="text-[11px] font-medium tracking-[1.5px] uppercase text-[#bbb] dark:text-[#555] mb-6">Education</p>
        {education.map((e) => (
          <div key={e.institution} className="mb-5 last:mb-0">
            <div className="flex items-baseline justify-between gap-3 mb-0.5">
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playClack}
                className="text-[14px] font-medium text-[#111] dark:text-[#e8e8e8] hover:underline underline-offset-[3px]"
              >
                {e.institution}
              </a>
              <span className="text-[12px] text-[#888] dark:text-[#555] whitespace-nowrap shrink-0">{e.period}</span>
            </div>
            <p className="text-[13px] text-[#6b7280] dark:text-[#888]">{e.degree}</p>
          </div>
        ))}
      </section>

      <footer className="text-[12px] text-[#ccc] dark:text-[#444] mt-20">Joaquin Llenado · 2026</footer>
    </div>
  );
}
