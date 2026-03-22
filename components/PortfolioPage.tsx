"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { profile, projects, skills } from "./portfolio-data";

type SectionId = "home" | "work" | "about" | "experience";

export function PortfolioPage() {
  const [ready, setReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const [workProgress, setWorkProgress] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMeltdown, setIsMeltdown] = useState(false);
  const [showReloadPrompt, setShowReloadPrompt] = useState(false);
  const workSectionRef = useRef<HTMLElement | null>(null);
  const loaderNameRef = useRef<HTMLDivElement | null>(null);
  const loaderSubRef = useRef<HTMLDivElement | null>(null);
  const loaderBgRef = useRef<HTMLDivElement | null>(null);
  const [loaderStyle, setLoaderStyle] = useState<CSSProperties>({});

  const navItems = useMemo(
    () => [
      { id: "work", label: "Work" },
      { id: "about", label: "About" },
      { id: "experience", label: "Journey" }
    ] as const,
    []
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    setTheme("dark");
  }, [ready]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!ready) return;

    const centerLoader = () => {
      const node = loaderNameRef.current;
      if (!node) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nw = node.offsetWidth;
      const nh = node.offsetHeight;
      setLoaderStyle({
        left: `${vw / 2 - nw / 2}px`,
        top: `${vh / 2 - nh / 2}px`
      });
      if (loaderSubRef.current) {
        loaderSubRef.current.style.top = `${vh / 2 + nh / 2 + 20}px`;
      }
    };

    centerLoader();
    window.addEventListener("resize", centerLoader);

    const t = window.setTimeout(() => {
      const source = loaderNameRef.current;
      const loaderBg = loaderBgRef.current;
      const loaderSub = loaderSubRef.current;
      if (!source || !loaderBg || !loaderSub) return;

      loaderSub.style.opacity = "0";
      const start = source.getBoundingClientRect();
      const endFontSize = 20;
      const currentFS = parseFloat(getComputedStyle(source.querySelector(".ln-fill") as HTMLElement).fontSize);
      const scale = endFontSize / currentFS;
      const targetX = 52;
      const targetY = 32 - (start.height * scale) / 2;
      const dx = targetX - start.left;
      const dy = targetY - start.top;

      source.style.transformOrigin = "top left";
      source.style.transition = "transform 1.25s cubic-bezier(0.76,0,0.24,1), opacity 0.3s ease";
      source.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

      const fill = source.querySelector(".ln-fill") as HTMLElement | null;
      const outline = source.querySelector(".ln-outline") as HTMLElement | null;
      if (fill) {
        fill.style.transition = "color 0.35s ease 0.75s";
        fill.style.color = "var(--ink)";
      }
      if (outline) {
        outline.style.transition = "-webkit-text-stroke-color 0.35s ease 0.75s";
        outline.style.webkitTextStrokeColor = "transparent";
      }

      window.setTimeout(() => loaderBg.classList.add("wipe"), 250);
      window.setTimeout(() => setLoaderDone(true), 1450);
      window.setTimeout(() => {
        source.style.opacity = "0";
      }, 1320);
    }, 2400);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", centerLoader);
    };
  }, [ready]);

  useEffect(() => {
    const ids: SectionId[] = ["home", "work", "about", "experience"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => sectionObserver.observe(el));

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-project-id");
          if (!id) return;
          setVisibleProjects((prev) => (prev.includes(id) ? prev : [...prev, id]));
        });
      },
      { threshold: 0.22 }
    );

    document.querySelectorAll<HTMLElement>("[data-project-id]").forEach((el) => projectObserver.observe(el));

    const onScroll = () => {
      const section = workSectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height + viewport;
      const traveled = Math.min(Math.max(viewport - rect.top, 0), total);
      setWorkProgress(Math.round((traveled / total) * 100));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      projectObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const mainVisible = loaderDone;

  const triggerMeltdown = () => {
    if (isMeltdown) return;
    setIsMeltdown(true);
    setShowReloadPrompt(false);
    window.setTimeout(() => setShowReloadPrompt(true), 8600);
  };

  return (
    <div className={`min-h-screen bg-cream text-ink font-sans site-shell ${isMeltdown ? "meltdown" : ""}`}>
      <div ref={loaderBgRef} className="loader-bg" />
      {isMeltdown && <div className="glitch-overlay" />}
      {showReloadPrompt && (
        <div className="meltdown-reload-wrap">
          <button type="button" className="meltdown-reload-btn" onClick={() => window.location.reload()}>
            Reload Site
          </button>
        </div>
      )}

      {!loaderDone && (
        <>
          <div ref={loaderNameRef} className="loader-name-wrap" style={loaderStyle}>
            <div className="ln-outline">ADITYA</div>
            <div className="ln-fill-wrap">
              <div className="ln-fill">ADITYA</div>
            </div>
          </div>
          <div ref={loaderSubRef} className="loader-sub">
            Portfolio — 2026
          </div>
        </>
      )}

      <header className={`nav ${mainVisible ? "show" : ""}`}>
        <a href="#home" className="nav-name">
          ADITYA
        </a>
        <nav className="nav-links">
          {navItems.map((item) => (
            <Link key={item.id} href={`#${item.id}`} className={active === item.id ? "active" : ""}>
              {item.label}
            </Link>
          ))}
          <a className="nav-cta" href={`mailto:${profile.email}`}>
            Contact
          </a>
          <button
            type="button"
            className="nav-theme-btn"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </nav>
      </header>

      <main className={`main ${mainVisible ? "show" : ""}`}>
        <section id="home" className="hero">
          <div className="hero-left">
            <h1 className="hero-title">
              Full
              <br />
              Stack
              <br />
              <em>Developer.</em>
            </h1>
            <div className="hero-rule" />
            <p className="hero-summary">{profile.summary}</p>
            <p className="hero-micro">SRM University NCR · Software Engineering Intern @ YMS Financial</p>
            <div className="skills-tape">
              <div className="tape-track">
                {[...skills.slice(0, 10), ...skills.slice(0, 10)].map((skill, idx) => (
                  <span key={`${skill}-${idx}`} className="tape-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-cta">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <span>Say Hello</span>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View GitHub →
              </a>
            </div>
            <div className="hero-start-links">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="col-ticker" />
            <div className="hero-year">26</div>
            <div className="badge-wrap">
              <div className="badge-ring" />
              <div className="badge-ring-mid" />
              <div className="badge-ring-inner" />
              <div className="badge-cross" />
              <svg className="badge-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                  <path id="txtCircle" d="M150,150 m-112,0 a112,112 0 1,1 224,0 a112,112 0 1,1,-224,0" />
                </defs>
                <text fontFamily="var(--font-dm-mono)" fontSize="12" fill="#7a6248" letterSpacing="4">
                  <textPath href="#txtCircle">AVAILABLE FOR WORK • FULL STACK DEV • BACKEND SYSTEMS • ADITYA RAJ • </textPath>
                </text>
              </svg>
              <div className="badge-center">
                <div className="badge-center-title">
                  Backend
                  <br />
                  <em>Focused</em>
                </div>
                <div className="badge-center-line" />
                <div className="badge-center-sub">Open to work</div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="work" ref={workSectionRef} className="work-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Selected Work</h2>
            <span className="sec-meta">{projects.length.toString().padStart(2, "0")} PROJECTS</span>
          </div>
          <div className="work-progress">
            <span style={{ height: `${workProgress}%` }} />
          </div>
          <div className="work-list">
            {projects.map((project) => (
              <a
                key={project.id}
                data-project-id={project.id}
                className={`work-item ${visibleProjects.includes(project.id) ? "visible" : ""}`}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-idx">{project.idx}</div>
                <div>
                  <h3 className="work-name">{project.name} ↗</h3>
                  <p className="work-desc">{project.description}</p>
                  <div className="work-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="work-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="work-stack">
                  {project.stack.map((item) => (
                    <span key={item}>
                      {item}
                      <br />
                    </span>
                  ))}
                </div>
                <div className="work-arrow">↗</div>
              </a>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section id="about" className="about-strip reveal-block">
          <div>
            <p className="about-label">About me</p>
            <h2 className="about-title">
              Building the <em>backend</em> future
            </h2>
            <p className="about-text">
              Skilled in API design, database modeling, debugging, and scalable backend workflows. I enjoy solving product
              problems with clean abstractions and shipping reliable software.
            </p>
          </div>
          <div>
            <div className="code-block">
              <div>
                <span className="c-comment">{`// aditya.config.ts`}</span>
              </div>
              <div>
                <span className="c-kw">const</span> <span className="c-var">dev</span> = {"{"}
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"name"`}</span>: <span className="c-str">{`"Aditya Raj"`}</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"role"`}</span>: <span className="c-str">{`"Full Stack Dev"`}</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"uni"`}</span>: <span className="c-str">{`"SRM, NCR Campus"`}</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"cgpa"`}</span>: <span className="c-num">8.45</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"intern"`}</span>: <span className="c-str">{`"YMS Financial"`}</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"status"`}</span>: <span className="c-str">{`"open_to_work"`}</span>
              </div>
              <div>{"}"}▌</div>
            </div>
            <div className="stats-row">
              <div className="stat">
                <div className="stat-n">8.45</div>
                <div className="stat-l">CGPA</div>
              </div>
              <div className="stat">
                <div className="stat-n">5</div>
                <div className="stat-l">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-n">1yr</div>
                <div className="stat-l">Internship</div>
              </div>
              <div className="stat">
                <div className="stat-n">2023</div>
                <div className="stat-l">B.Tech Start</div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Tech Stack</h2>
            <span className="sec-meta">{skills.length} SKILLS</span>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill} className="skill-cell">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="timeline-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Experience & Education</h2>
            <span className="sec-meta">CURRENT JOURNEY</span>
          </div>
          <div className="timeline-list">
            <article className="timeline-item">
              <div className="timeline-year">2025 — 2026</div>
              <div>
                <h3 className="timeline-title">Software Engineering Intern</h3>
                <p className="timeline-sub">YMS Financial Pvt. Ltd.</p>
                <p className="timeline-desc">
                  Developed backend workflows and APIs supporting election analytics, campaign management, constituency
                  tracking, and prediction workflows in a production-oriented setting.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">2023 — Present</div>
              <div>
                <h3 className="timeline-title">B.Tech in Computer Science Engineering</h3>
                <p className="timeline-sub">SRM University, NCR Campus, Ghaziabad</p>
                <p className="timeline-desc">
                  Focused on data structures, backend architecture, APIs, and full-stack development with strong
                  problem-solving fundamentals.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="signature-wrap">
          <div className="signature-display sig-style-static">
            <span className="signature-name">Aditya Raj</span>
          </div>
        </div>
        <button type="button" className="dont-touch-btn" onClick={triggerMeltdown} disabled={isMeltdown}>
          <span>Don&apos;t Touch</span>
        </button>
      </footer>
    </div>
  );
}
