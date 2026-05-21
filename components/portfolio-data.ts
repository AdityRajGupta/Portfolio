export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectLink = {
  live: string;
  github?: string;
};

export type CaseStudy = {
  summary: string;
  architecture: string[];
  apiFlow: string[];
};

export type Project = {
  id: string;
  idx: string;
  name: string;
  href: string;
  links: ProjectLink;
  category: "FULL STACK" | "BACKEND" | "SECURITY" | "FRONTEND";
  image: string;
  description: string;
  role: string;
  problemSolutionImpact: string[];
  metrics: ProjectMetric[];
  tags: string[];
  stack: string[];
  caseStudy?: CaseStudy;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  context: string;
  highlights: string[];
  outcomes: ProjectMetric[];
};

export const profile = {
  name: "Aditya Raj",
  title: "Full Stack Developer",
  email: "arg24aditya@gmail.com",
  phone: "+91 8102744553",
  github: "https://github.com/AdityRajGupta",
  linkedin: "https://www.linkedin.com/in/adityaa24",
  instagram: "https://www.instagram.com/adityarajgupta.ig/",
  siteUrl: "https://www.adityarajgupta.online",
  resumeUrl: "/aditya-raj-resume.pdf",
  availability: "Available for backend/full-stack internships, freelance builds, and production web work.",
  preferredRoles: ["Backend Developer", "Full-Stack Developer", "Software Engineering Intern", "Freelance Web Apps"],
  currentlyWorkingOn:
    "Currently improving TiniNest, documenting an edge-cloud IoT research draft, and sharpening production API workflows.",
  summary:
    "Computer Science Engineering student focused on backend architecture and scalable systems. I build production-ready REST APIs, data workflows, and end-to-end applications."
};

export const featuredSkills = [
  { name: "REST API Design", context: "Auth, RBAC, validation, and clean route contracts" },
  { name: "PostgreSQL/Supabase", context: "Schema design, relational data, RLS policies" },
  { name: "Next.js + React", context: "Production UI, deployment, and responsive flows" },
  { name: "Node.js/Express", context: "Backend services, CSV ingestion, business workflows" },
  { name: "Authentication", context: "JWT, role scopes, protected dashboards" },
  { name: "Data Workflows", context: "Analytics, dashboards, bulk imports, reporting" },
  { name: "Edge/IoT Systems", context: "MQTT, Kafka, anomaly detection research" }
];

export const techPrinciples = [
  "Security-first APIs with clear auth boundaries",
  "Database schema design before feature sprawl",
  "Scalable backend workflows with measurable outcomes",
  "Fast, usable interfaces backed by reliable data flow"
];

export const tooling = ["Postman", "Git", "Linux", "Vercel", "Docker", "Supabase", "GitHub", "VS Code"];

export const projects: Project[] = [
  {
    id: "campus-assistant",
    idx: "01",
    name: "Campus Management System",
    href: "https://personal-ai-assistant-rust-omega.vercel.app/login",
    links: {
      live: "https://personal-ai-assistant-rust-omega.vercel.app/login"
    },
    category: "FULL STACK",
    image: "/project-assistant.png",
    description:
      "AI-powered campus assistant with role-scoped workflows for students, faculty, and admins.",
    role: "Solo project - product planning, schema design, frontend, backend workflows, Supabase RLS, deployment.",
    problemSolutionImpact: [
      "Problem: campus work was split across notes, timetable, assignments, chat, GPA, calendar, and admin updates.",
      "Solution: built a unified role-based portal with 9 connected modules and granular Supabase access policies.",
      "Impact: reduced context switching for campus users and hardened access paths across student, faculty, and admin data."
    ],
    metrics: [
      { label: "Modules", value: "9" },
      { label: "Roles", value: "3" },
      { label: "Access model", value: "RLS" },
      { label: "Deployment", value: "Vercel" }
    ],
    tags: ["Supabase", "PostgreSQL", "RLS Policies", "Full Stack", "Role-Based Access", "Solo Project"],
    stack: ["Next.js", "React.js", "Supabase", "PostgreSQL", "Node.js"],
    caseStudy: {
      summary:
        "A campus operating layer that keeps user-specific academic data separated while letting common modules share one product surface.",
      architecture: ["Next.js UI", "Auth/Roles", "Supabase RLS", "PostgreSQL", "Campus Modules"],
      apiFlow: ["User login", "Role check", "Scoped query", "Module action", "Realtime update"]
    }
  },
  {
    id: "election",
    idx: "02",
    name: "Election Prediction Platform",
    href: "https://election-prediction-app.vercel.app/",
    links: {
      live: "https://election-prediction-app.vercel.app/"
    },
    category: "BACKEND",
    image: "/project-election.png",
    description:
      "Election analytics and campaign management platform delivering booth-level prediction workflows.",
    role: "Solo build during YMS Financial internship - backend APIs, role access, CSV ingestion, dashboard data flow.",
    problemSolutionImpact: [
      "Problem: campaign teams needed structured constituency, booth, and reporting data without manual spreadsheet work.",
      "Solution: built JWT-protected REST APIs, RBAC, CSV bulk ingestion, and analytics dashboards across 4+ modules.",
      "Impact: cut manual data-entry effort by about 70% and supported booth-level workflows across 100+ constituencies."
    ],
    metrics: [
      { label: "Constituencies", value: "100+" },
      { label: "Manual work saved", value: "~70%" },
      { label: "Modules", value: "4+" },
      { label: "Roles", value: "5+" }
    ],
    tags: ["Node.js", "Express.js", "JWT Auth", "RBAC", "REST APIs", "Analytics", "Internship"],
    stack: ["Node.js", "Express.js", "PostgreSQL", "JWT", "CSV Processing"],
    caseStudy: {
      summary:
        "A campaign data platform centered on reliable ingestion, protected APIs, and booth-level analytical views.",
      architecture: ["React UI", "Express API", "JWT + RBAC", "CSV Importer", "PostgreSQL", "Analytics"],
      apiFlow: ["CSV upload", "Validate rows", "Persist booths", "Aggregate predictions", "Render dashboard"]
    }
  },
  {
    id: "tininest",
    idx: "03",
    name: "TiniNest",
    href: "https://tini-nest.vercel.app/",
    links: {
      live: "https://tini-nest.vercel.app/"
    },
    category: "FRONTEND",
    image: "/project-tininest.png",
    description:
      "Production-ready children's toy e-commerce platform for the Indian market.",
    role: "Internship project at TiniNest - contributed to website build, frontend architecture, Supabase schema, deployment, and product flows.",
    problemSolutionImpact: [
      "Problem: the brand needed a fast storefront with product, order, wishlist, coupon, review, and newsletter flows.",
      "Solution: shipped a modular Next.js 14 storefront backed by 7 Supabase relational tables and RLS policies.",
      "Impact: achieved sub-2s load targets on Vercel and created a scalable foundation for e-commerce operations."
    ],
    metrics: [
      { label: "Load target", value: "<2s" },
      { label: "Tables", value: "7" },
      { label: "Market", value: "India" },
      { label: "Deployment", value: "Vercel" }
    ],
    tags: ["Next.js", "React.js", "Supabase", "Vercel", "E-Commerce", "RLS", "Internship"],
    stack: ["Next.js", "React.js", "Supabase", "PostgreSQL", "Vercel"]
  },
  {
    id: "securevault",
    idx: "04",
    name: "SecureVault Encryption Tool",
    href: "https://securevault-encryption-tool.vercel.app/",
    links: {
      live: "https://securevault-encryption-tool.vercel.app/",
      github: "https://github.com/AdityRajGupta/Securevault-Encryption-Tool"
    },
    category: "SECURITY",
    image: "/project-securevault.png",
    description:
      "Browser-first encryption utility for handling sensitive text through a focused security workflow.",
    role: "Solo project - UX flow, client-side security workflow, deployment, public repository maintenance.",
    problemSolutionImpact: [
      "Problem: users needed a simple way to encrypt sensitive data without a heavy backend or account system.",
      "Solution: built a lightweight web tool around browser crypto workflows and a minimal interaction model.",
      "Impact: kept the sensitive-data path client-first and made the project publicly inspectable through GitHub."
    ],
    metrics: [
      { label: "Repo", value: "Public" },
      { label: "Runtime", value: "Client-first" },
      { label: "Modules", value: "3" },
      { label: "Deployment", value: "Vercel" }
    ],
    tags: ["Security", "Encryption", "Web App", "Cryptography", "Solo Project"],
    stack: ["TypeScript", "JavaScript", "Crypto APIs", "Vercel"]
  },
  {
    id: "eternal-ar",
    idx: "05",
    name: "Eternal AR Print",
    href: "https://eternal-ar-print.vercel.app/",
    links: {
      live: "https://eternal-ar-print.vercel.app/"
    },
    category: "FRONTEND",
    image: "/project-eternalar.png",
    description:
      "Interactive AR print experience with a clean web-first product flow.",
    role: "Solo project - frontend build, interaction flow, responsive UI, and Vercel deployment.",
    problemSolutionImpact: [
      "Problem: static print experiences needed a more interactive digital layer.",
      "Solution: built a focused web experience for presenting AR-enabled print content.",
      "Impact: created a shareable live demo that makes the AR concept easy to open, view, and test."
    ],
    metrics: [
      { label: "Experience", value: "AR" },
      { label: "Platform", value: "Web" },
      { label: "Deployment", value: "Vercel" },
      { label: "Role", value: "Solo" }
    ],
    tags: ["AR", "Frontend", "Interactive UI", "Vercel", "Solo Project"],
    stack: ["React.js", "Next.js", "TypeScript", "Vercel"]
  }
];

export const experience: Experience[] = [
  {
    role: "Website Developer & Manager Intern",
    company: "TiniNest Pvt. Ltd.",
    period: "Apr 2026 - Present",
    context: "Internship role focused on building and managing the company's e-commerce website.",
    highlights: [
      "Developed a responsive Next.js storefront with modular product, order, review, wishlist, coupon, profile, and newsletter flows.",
      "Designed Supabase-backed relational data models with row-level security for customer and commerce data.",
      "Managed deployment and iteration on Vercel while improving load performance and user experience."
    ],
    outcomes: [
      { label: "Load target", value: "<2s" },
      { label: "Data tables", value: "7" },
      { label: "Role", value: "Intern" }
    ]
  },
  {
    role: "Software Engineering Intern",
    company: "YMS Financial Pvt. Ltd.",
    period: "Nov 2025 - Apr 2026",
    context: "Solo-built core backend workflows for a live election analytics platform.",
    highlights: [
      "Produced REST APIs for constituency tracking, booth-level prediction, reporting, and campaign management.",
      "Implemented JWT authentication, RBAC, and CSV-based bulk ingestion for high-volume election data.",
      "Integrated backend services with React dashboards across multiple product releases."
    ],
    outcomes: [
      { label: "Manual work saved", value: "~70%" },
      { label: "Constituencies", value: "100+" },
      { label: "Modules", value: "4+" },
      { label: "User roles", value: "5+" }
    ]
  }
];

export const research = [
  {
    title: "A Scalable Real-Time IoT Data Collection and Monitoring Framework with Edge-Cloud Intelligence",
    status: "Draft, unpublished",
    authors: "Aviral Tyagi, Aditya Raj",
    outcomes: [
      "Designed a five-layer IoT architecture integrating sensors, MQTT, Kafka, edge processing, cloud analytics, and app interfaces.",
      "Measured 0.02-0.05 ms edge processing latency and 10-17 ms end-to-end pipeline latency.",
      "Reached 95% anomaly detection recall with Isolation Forest and kept false positives below 0.3%.",
      "Reduced bandwidth utilization by up to 90% through intelligent edge filtering and aggregation."
    ],
    links: [
      { label: "Draft available on request", href: `mailto:${profile.email}?subject=IoT%20research%20draft%20request` }
    ]
  }
];

export const certifications = [
  {
    name: "Natural Language Processing",
    issuer: "NPTEL / IIT Kharagpur (SWAYAM)",
    period: "Jan-Apr 2026",
    detail: "12-week course | 4 credits | Certificate No: NPTEL26CS45S1055101305"
  }
];

export const hackathons = [
  {
    name: "Hack-2-Hustle Hackathon",
    host: "Masters' Union, Cyberpark, Gurugram",
    detail:
      "Shortlisted through multiple rounds; led development of an Algorithm Runtime Visualizer with a 3-member team and delivered the overnight live demo."
  }
];

export const skills = [
  "TypeScript",
  "Python",
  "C++",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "REST APIs",
  "JWT Authentication",
  "Role-Based Access Control (RBAC)",
  "API Design",
  "Data Structures",
  "Backend Architecture",
  "Git",
  "Linux",
  "Vercel",
  "Postman",
  "HTML5",
  "CSS3",
  "SDLC",
  "Apache Kafka",
  "MQTT",
  "Edge Computing",
  "Anomaly Detection"
];
