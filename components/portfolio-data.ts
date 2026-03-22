export type Project = {
  id: string;
  idx: string;
  name: string;
  href: string;
  description: string;
  tags: string[];
  stack: string[];
};

export const profile = {
  name: "Aditya Raj",
  title: "Full Stack Developer",
  email: "arg24aditya@gmail.com",
  phone: "+91 8102744553",
  github: "https://github.com/AdityRajGupta",
  linkedin: "https://www.linkedin.com/in/adityaa24",
  summary:
    "Computer Science Engineering student focused on backend architecture and scalable systems. I build production-ready REST APIs, data workflows, and end-to-end applications."
};

export const projects: Project[] = [
  {
    id: "assistant",
    idx: "01",
    name: "Personal AI Assistant",
    href: "https://personal-ai-assistant-rust-omega.vercel.app/login",
    description:
      "AI-powered campus assistant with role-based flows for students, faculty, and admins. Includes timetable, assignments, chat, notifications, and study tracking on Supabase + PostgreSQL.",
    tags: ["Supabase", "PostgreSQL", "RLS Policies", "Full Stack"],
    stack: ["Supabase", "PostgreSQL", "Node.js"]
  },
  {
    id: "election",
    idx: "02",
    name: "Election Prediction Platform",
    href: "https://election-prediction-app.vercel.app/",
    description:
      "Full-stack election analytics and campaign management product with booth-level prediction workflows, JWT authentication, role-based REST APIs, and CSV bulk constituency ingestion.",
    tags: ["Node.js", "Express", "JWT Auth", "Analytics"],
    stack: ["Node.js", "Express", "REST API"]
  },
  {
    id: "tininest",
    idx: "03",
    name: "TiniNest",
    href: "https://tini-nest.vercel.app/",
    description:
      "Responsive e-commerce platform with modular React components and deployment optimization via Vercel, backed by Supabase services for scaling.",
    tags: ["React.js", "Supabase", "Vercel", "E-Commerce"],
    stack: ["React.js", "Supabase", "Vercel"]
  },
  {
    id: "securevault",
    idx: "04",
    name: "SecureVault Encryption Tool",
    href: "https://securevault-encryption-tool.vercel.app/",
    description:
      "Security utility for encrypting and handling sensitive data with a streamlined browser-first workflow and practical usage flow.",
    tags: ["Security", "Encryption", "Web App"],
    stack: ["JavaScript", "Crypto APIs", "Vercel"]
  },
  {
    id: "eternalar",
    idx: "05",
    name: "Eternal AR Print",
    href: "https://eternal-ar-print.vercel.app/",
    description:
      "Interactive AR-led print showcase combining visual experience and web performance for immersive storytelling.",
    tags: ["AR Experience", "Frontend", "Vercel"],
    stack: ["WebXR", "React.js", "Vercel"]
  }
];

export const skills = [
  "JavaScript",
  "Node.js",
  "Express.js",
  "React.js",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "REST APIs",
  "Python",
  "Java",
  "C++",
  "Git",
  "Linux",
  "Vercel",
  "SQL",
  "API Design"
];
