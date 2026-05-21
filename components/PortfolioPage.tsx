"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  certifications,
  experience,
  featuredSkills,
  hackathons,
  profile,
  projects,
  research,
  skills,
  techPrinciples,
  tooling
} from "./portfolio-data";

type SectionId = "home" | "work" | "about" | "experience" | "stack" | "contact";

export function PortfolioPage() {
  const [ready, setReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const [workProgress, setWorkProgress] = useState(0);
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>("ALL");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMeltdown, setIsMeltdown] = useState(false);
  const [showReloadPrompt, setShowReloadPrompt] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const workSectionRef = useRef<HTMLElement | null>(null);
  const loaderNameRef = useRef<HTMLDivElement | null>(null);
  const loaderSubRef = useRef<HTMLDivElement | null>(null);
  const loaderBgRef = useRef<HTMLDivElement | null>(null);
  const [loaderStyle, setLoaderStyle] = useState<CSSProperties>({
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  });

  const navItems = useMemo(
    () => [
      { id: "work", label: "Work" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "stack", label: "Stack" },
      { id: "contact", label: "Contact" }
    ] as const,
    []
  );

  const projectFilters = useMemo(
    () => ["ALL", ...Array.from(new Set(projects.map((project) => project.category)))],
    []
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => (activeProjectFilter === "ALL" ? true : project.category === activeProjectFilter)),
    [activeProjectFilter]
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
    if (!isMobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 640) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const centerLoader = () => {
      const node = loaderNameRef.current;
      if (!node) return;
      const vv = window.visualViewport;
      const vw = vv?.width ?? window.innerWidth;
      const vh = vv?.height ?? window.innerHeight;
      const scale = vv?.scale ?? 1;
      const ox = vv?.offsetLeft ?? 0;
      const oy = vv?.offsetTop ?? 0;
      const nw = node.offsetWidth;
      const nh = node.offsetHeight;
      const safeX = 10 / scale;
      const safeY = 14 / scale;
      const left = Math.max(ox + safeX, Math.min(ox + vw - nw - safeX, ox + vw / 2 - nw / 2));
      const top = Math.max(oy + safeY, Math.min(oy + vh - nh - safeY, oy + vh / 2 - nh / 2));
      setLoaderStyle({
        left: `${left}px`,
        top: `${top}px`
      });
      if (loaderSubRef.current) {
        const subTop = Math.min(oy + vh - 18, top + nh + 20);
        loaderSubRef.current.style.top = `${subTop}px`;
      }
    };

    centerLoader();
    window.addEventListener("resize", centerLoader);
    window.visualViewport?.addEventListener("resize", centerLoader);
    window.visualViewport?.addEventListener("scroll", centerLoader);

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
      source.style.transition = "transform 1.35s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease";
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
      window.visualViewport?.removeEventListener("resize", centerLoader);
      window.visualViewport?.removeEventListener("scroll", centerLoader);
    };
  }, [ready]);

  useEffect(() => {
    const ids: SectionId[] = ["home", "work", "about", "experience", "stack", "contact"];
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

      <header className={`nav ${mainVisible ? "show" : ""} ${isNavScrolled ? "scrolled" : ""}`}>
        <a href="#home" className="nav-name">
          ADITYA
        </a>
        <button
          type="button"
          className="nav-menu-btn"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
        <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a className="nav-cta" href={`mailto:${profile.email}`} onClick={() => setIsMobileMenuOpen(false)}>
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
      <button
        type="button"
        className={`mobile-nav-backdrop ${isMobileMenuOpen ? "show" : ""}`}
        aria-label="Close menu backdrop"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <main className={`main ${mainVisible ? "show" : ""}`}>
        <section id="home" className="hero">
          <div className="mobile-hero-logo" aria-hidden>
            <div className="badge-wrap">
              <div className="badge-ring" />
              <div className="badge-ring-mid" />
              <div className="badge-ring-inner" />
              <div className="badge-cross" />
              <svg className="badge-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="txtCircleMobile" d="M150,150 m-112,0 a112,112 0 1,1 224,0 a112,112 0 1,1,-224,0" />
                </defs>
                <text fontFamily="var(--font-dm-mono)" fontSize="22" fill="#58422d" letterSpacing="1.6" fontWeight="700">
                  <textPath href="#txtCircleMobile">AVAILABLE FOR WORK • FULL STACK DEV • BACKEND SYSTEMS • ADITYA RAJ • </textPath>
                </text>
              </svg>
            </div>
          </div>

          <div className="hero-left">
            <h1 className="hero-title">
              Full
              <br />
              Stack
              <br />
              <em>Developer</em>
            </h1>
            <div className="hero-rule" />
            <p className="hero-summary hero-summary-desktop">{profile.summary}</p>
            <p className="hero-summary hero-summary-mobile">
              <span className="summary-line">Computer Science Engineering student focused on</span>
              <span className="summary-line">backend architecture and scalable systems.</span>
              <span className="summary-line">I build production-ready REST APIs and apps.</span>
            </p>
            <p className="hero-micro">SRM University NCR · Website Developer Intern @ TiniNest</p>
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
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span>LinkedIn</span>
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View CV
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View GitHub →
              </a>
            </div>
            <div className="hero-start-links">
              <a href="https://www.instagram.com/adityarajgupta.ig/" target="_blank" rel="noopener noreferrer">
                Instagram
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
          <div className="projects-head">
            <h2 className="sec-title">PROJECTS</h2>
            <span className="sec-meta">{projects.length.toString().padStart(2, "0")} PROJECTS</span>
          </div>
          <div className="projects-line">
            <span />
          </div>
          <div className="projects-filters">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`project-filter-chip ${activeProjectFilter === filter ? "active" : ""}`}
                onClick={() => setActiveProjectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="projects-progress">
            <span style={{ width: `${workProgress}%` }} />
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                data-project-id={project.id}
                tabIndex={0}
                className={`project-card ${visibleProjects.includes(project.id) ? "visible" : ""}`}
              >
                <div className="project-thumb">
                  <Image src={project.image} alt={project.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
                <div className="project-card-body">
                  <div className="project-card-kicker">
                    <span>{project.idx}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3 className="project-card-title">{project.name}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-actions">
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="mini-btn primary">
                      Live Demo
                    </a>
                    {project.links.github ? (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="mini-btn">
                        GitHub
                      </a>
                    ) : (
                      <span className="mini-btn muted">Repo on request</span>
                    )}
                  </div>
                  <p className="project-role">{project.role}</p>

                  <div className="project-metrics" aria-label={`${project.name} live metrics`}>
                    {project.metrics.map((metric) => (
                      <div key={`${project.id}-${metric.label}`} className="project-metric">
                        <b>{metric.value}</b>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <ul className="psi-list">
                    {project.problemSolutionImpact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="tech-badges">
                    {project.stack.map((tech) => (
                      <span key={`${project.id}-${tech}`}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
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
              problems with clean abstractions and shipping reliable software across solo builds and internship work.
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
                &nbsp;&nbsp;<span className="c-str">{`"cgpa"`}</span>: <span className="c-num">8.42</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"intern"`}</span>: <span className="c-str">{`"TiniNest Pvt. Ltd."`}</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="c-str">{`"status"`}</span>: <span className="c-str">{`"open_to_work"`}</span>
              </div>
              <div>{"}"}▌</div>
            </div>
            <div className="stats-row">
              <div className="stat">
                <div className="stat-n">8.42</div>
                <div className="stat-l">CGPA</div>
              </div>
              <div className="stat">
                <div className="stat-n">4</div>
                <div className="stat-l">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-n">2</div>
                <div className="stat-l">Internships</div>
              </div>
              <div className="stat">
                <div className="stat-n">2023</div>
                <div className="stat-l">B.Tech Start</div>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="skills-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Architecture & Tech Stack</h2>
            <span className="sec-meta">{skills.length} SKILLS</span>
          </div>
          <div className="featured-skills">
            {featuredSkills.map((skill) => (
              <article key={skill.name}>
                <b>{skill.name}</b>
                <span>{skill.context}</span>
              </article>
            ))}
          </div>
          <div className="principles-grid">
            <div>
              <p className="about-label">Tech principles</p>
              {techPrinciples.map((principle) => (
                <p key={principle} className="principle-line">
                  {principle}
                </p>
              ))}
            </div>
            <div>
              <p className="about-label">Tooling</p>
              <div className="tooling-grid">
                {tooling.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="system-diagrams">
            {projects
              .filter((project) => project.caseStudy)
              .map((project) => (
                <article key={`${project.id}-stack`} className="system-card">
                  <h3>{project.name}</h3>
                  <div className="diagram compact">
                    {project.caseStudy?.architecture.map((node, idx) => (
                      <div key={`${project.id}-system-${node}`} className="diagram-node">
                        <span>{node}</span>
                        {idx < (project.caseStudy?.architecture.length ?? 0) - 1 && <i />}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill} className="skill-cell">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="experience-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Experience</h2>
            <span className="sec-meta">ROLE HIGHLIGHTS</span>
          </div>
          <div className="experience-grid">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="experience-card">
                <div className="experience-top">
                  <div>
                    <p className="timeline-year">{item.period}</p>
                    <h3 className="timeline-title">{item.role}</h3>
                    <p className="timeline-sub">{item.company}</p>
                  </div>
                  <span>{item.context}</span>
                </div>
                <ul className="psi-list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="project-metrics">
                  {item.outcomes.map((outcome) => (
                    <div key={`${item.company}-${outcome.label}`} className="project-metric">
                      <b>{outcome.value}</b>
                      <span>{outcome.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="timeline-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Experience & Education</h2>
            <span className="sec-meta">CURRENT JOURNEY</span>
          </div>
          <div className="timeline-list">
            <article className="timeline-item">
              <div className="timeline-year">Apr 2026 — Present</div>
              <div>
                <h3 className="timeline-title">Website Developer & Manager Intern</h3>
                <p className="timeline-sub">TiniNest Pvt. Ltd.</p>
                <p className="timeline-desc">
                  Developed and managed a production-ready e-commerce platform using React and Next.js. Implemented backend
                  workflows, database integration, and deployment processes, and elevated performance through modular
                  component architecture.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">Nov 2025 — Apr 2026</div>
              <div>
                <h3 className="timeline-title">Software Engineering Intern</h3>
                <p className="timeline-sub">YMS Financial Pvt. Ltd.</p>
                <p className="timeline-desc">
                  Produced backend workflows and RESTful APIs powering a live election analytics platform across 4+ modules.
                  Delivered campaign management features for constituency tracking, booth-level prediction, and reporting,
                  contributing to multiple releases and end-to-end integration with React and Node.js services.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">Jan 2026 — Present</div>
              <div>
                <h3 className="timeline-title">Research: Real-Time IoT Monitoring Framework</h3>
                <p className="timeline-sub">Edge-Cloud Intelligence (Draft, unpublished)</p>
                <p className="timeline-desc">
                  Designed a five-layer IoT architecture with MQTT, Apache Kafka, and edge-cloud ML; achieved sub-millisecond
                  edge latency (0.02–0.05 ms), under-20 ms end-to-end latency, and 95% anomaly detection accuracy.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">2023 — Present</div>
              <div>
                <h3 className="timeline-title">B.Tech in Computer Science Engineering</h3>
                <p className="timeline-sub">SRM University, NCR Campus, Ghaziabad</p>
                <p className="timeline-desc">
                  CGPA: 8.42. Focused on data structures, backend architecture, APIs, and full-stack development with strong
                  problem-solving fundamentals.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">2026</div>
              <div>
                <h3 className="timeline-title">Hack-2-Hustle Hackathon</h3>
                <p className="timeline-sub">Masters&apos; Union, Cyberpark, Gurugram</p>
                <p className="timeline-desc">
                  Shortlisted through multiple competitive rounds. Led development of an Algorithm Runtime Visualizer and
                  delivered the live demo with a 3-member team under tight, overnight timelines.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">Jan — Apr 2026</div>
              <div>
                <h3 className="timeline-title">Natural Language Processing</h3>
                <p className="timeline-sub">NPTEL / IIT Kharagpur (SWAYAM)</p>
                <p className="timeline-desc">
                  12-week course, 4 credits, Certificate No: NPTEL26CS45S1055101305.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">2025</div>
              <div>
                <h3 className="timeline-title">Member, Gamer&apos;s Creed — Esports Society</h3>
                <p className="timeline-sub">SRM University, NCR Campus</p>
                <p className="timeline-desc">
                  Active member of the university esports community, participating in society events, gaming tournaments,
                  and inter-college outreach activities.
                </p>
              </div>
            </article>
            <article className="timeline-item">
              <div className="timeline-year">2024</div>
              <div>
                <h3 className="timeline-title">Inter-College Badminton Tournament</h3>
                <p className="timeline-sub">KIET University — Representing SRM University, NCR Campus</p>
                <p className="timeline-desc">
                  Represented SRM University in an inter-college badminton tournament, demonstrating competitive
                  sportsmanship and team representation.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="research-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Research</h2>
            <span className="sec-meta">DRAFT OUTCOMES</span>
          </div>
          <div className="research-grid">
            {research.map((item) => (
              <article key={item.title} className="research-card">
                <p className="about-label">{item.status}</p>
                <h3>{item.title}</h3>
                <p className="timeline-sub">{item.authors}</p>
                <ul className="psi-list">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
                <div className="project-actions">
                  {item.links.map((link) => (
                    <a key={link.label} href={link.href} className="mini-btn">
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="credential-section reveal-block">
          <div className="sec-head">
            <h2 className="sec-title">Certifications & Hackathons</h2>
            <span className="sec-meta">VISIBLE SIGNALS</span>
          </div>
          <div className="credential-grid">
            {certifications.map((cert) => (
              <article key={cert.name} className="credential-card">
                <p className="about-label">{cert.period}</p>
                <h3>{cert.name}</h3>
                <p>{cert.issuer}</p>
                <span>{cert.detail}</span>
              </article>
            ))}
            {hackathons.map((hackathon) => (
              <article key={hackathon.name} className="credential-card">
                <p className="about-label">Hackathon</p>
                <h3>{hackathon.name}</h3>
                <p>{hackathon.host}</p>
                <span>{hackathon.detail}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section reveal-block">
          <div>
            <p className="about-label">Contact</p>
            <h2 className="sec-title">Let&apos;s build something reliable.</h2>
            <p className="contact-copy">
              I&apos;m open to backend/full-stack internships, freelance web apps, and product builds where APIs, data,
              and user workflows need careful engineering.
            </p>
          </div>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              View CV
            </a>
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
