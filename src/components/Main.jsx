import image from "../assets/image.jpg";
import Skills from "./Skills";
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
  FileText,
} from "lucide-react";
import portfolio from "../data/portfolio.json";

export default function Main() {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const { experience, projects, education } = portfolio;

  // Sort experience in reverse chronological order
  const sortedExperience = [...experience].sort((a, b) => {
    return b.startDate.localeCompare(a.startDate);
  });

  // Sort projects in reverse chronological order
  const sortedProjects = [...projects].sort((a, b) => {
    return b.startDate.localeCompare(a.startDate);
  });

  // Sort education in reverse chronological order
  const sortedEducation = [...education].sort((a, b) => {
    const dateA = a.endDate || a.startDate;
    const dateB = b.endDate || b.startDate;
    return dateB.localeCompare(dateA);
  });

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const parts = dateString.split("-");
    const year = parts[0];
    const month = parts[1];

    if (!month) {
      return year;
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <main className="min-h-screen w-full flex px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        {/* Left Section - Metadata */}
        <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8 lg:p-12 md:border-r border-b md:border-b-0 border-border flex flex-col md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <div className="flex flex-col gap-6 md:gap-8 flex-1">
            {/* Profile Section */}
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    Joaquin Paolo Llenado
                  </h1>
                  <p className="text-sm sm:text-base md:text-base lg:text-lg text-foreground mt-1.5">
                    Full-Stack Software Engineer
                  </p>
                </div>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="aspect-square w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-accent transition-colors shrink-0"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>

              <img
                src={image}
                alt="Joaquin Llenado"
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 object-cover aspect-square object-position-bottom object-bottom rounded-xl shadow-sm"
              />

              <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Building cool things & trying to stay consistent
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/joaquinllenado/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-accent/80 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/joaquinllenado"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-accent/80 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/joaquinllenado"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X profile"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-accent/80 transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://docs.google.com/document/d/1Cb9-h0N8DN47la4zge-uWpYoZc6SfPDqWMR-7YOXpM8/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Resume"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted hover:bg-accent/80 transition-colors duration-200"
                >
                  <FileText className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Skills Section */}
            <div className="flex flex-col gap-3 md:gap-4 flex-1">
              <h2 className="text-base sm:text-lg md:text-lg lg:text-xl font-semibold text-foreground">
                Skills
              </h2>
              <div className="flex flex-col gap-3 md:gap-4">
                <Skills />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Timeline */}
        <div className="w-full md:w-3/5 sm:px-0 sm:py-6 md:py-8 lg:py-12">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Experience Section */}
            <section>
              <header className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-[0.25em] p-4 sm:px-6 md:px-8 lg:px-12 text-foreground">
                  Experience
                </p>
              </header>
              <div className="relative flex flex-col md:gap-0">
                {sortedExperience.map((exp, index) => (
                  <div
                    key={index}
                    className="group relative bg-card/20 dark:bg-card/5 p-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-200 hover:bg-muted/80 dark:hover:bg-muted/20"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                          {exp.title}
                        </h3>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground/70">
                          {formatDate(exp.startDate)} —{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground/80">
                        <span className="font-medium text-foreground">
                          {exp.company}
                        </span>
                        <span className="text-border">/</span>
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {exp.description.map((desc, i) => (
                          <p key={i} className="flex gap-2">
                            <span className="text-border shrink-0">•</span>
                            <span>{desc}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <header className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-[0.25em] p-4 sm:px-6 md:px-8 lg:px-12 text-foreground">
                  Projects
                </p>
              </header>
              <div className="relative flex flex-col md:gap-0">
                {sortedProjects.map((project, index) => (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-card/20 dark:bg-card/5 p-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-200 hover:bg-muted/80 dark:hover:bg-muted/20"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                            {project.name}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground/70">
                          {formatDate(project.startDate)} —{" "}
                          {formatDate(project.endDate)}
                        </span>
                      </div>
                      {project.description ? (
                        <div className="flex flex-col gap-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {project.description.map((desc, i) => (
                            <p key={i} className="flex gap-2">
                              <span className="text-border shrink-0">•</span>
                              <span>{desc}</span>
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section>
              <header className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-[0.25em] p-4 sm:px-6 md:px-8 lg:px-12 text-foreground">
                  Education
                </p>
              </header>
              <div className="relative flex flex-col md:gap-0">
                {sortedEducation.map((edu, index) => (
                  <div
                    key={index}
                    className="group relative bg-card/20 dark:bg-card/5 p-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-200 hover:bg-muted/80 dark:hover:bg-muted/20"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                          {edu.institution}
                        </h3>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground/70">
                          {edu.endDate &&
                          parseInt(edu.endDate.split("-")[0]) >
                            new Date().getFullYear()
                            ? edu.period
                            : edu.endDate
                            ? formatDate(edu.endDate)
                            : formatDate(edu.startDate)}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {edu.degree}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
