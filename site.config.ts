export const siteConfig = {
  // ─── Personal Info ─────────────────────────────────────────────
  name: "Your Name",
  title: "AI Blog Generator",
  description: "Personal blog & portfolio powered by AI",
  profession: "Software Engineer",
  tagline: "I build things with code & AI",
  avatar: "/images/avatar.jpg", // Place your avatar in public/images/

  // ─── Social Links ──────────────────────────────────────────────
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://x.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "you@example.com",
  },

  // ─── Navigation ────────────────────────────────────────────────
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
  ],

  // ─── About Section (Home Page) ─────────────────────────────────
  about: `I'm a passionate developer who loves building intelligent applications.
I use AI to improve everyday workflows and create tools that matter.
When I'm not coding, you'll find me exploring new technologies and sharing what I learn.`,

  // ─── Tech Stack (shown on Home) ────────────────────────────────
  techStack: [
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "Node.js",
    "TailwindCSS",
    "Docker",
    "Vercel",
    "AI/ML",
  ],

  // ─── Projects ──────────────────────────────────────────────────
  projects: [
    {
      title: "AI Blog Generator",
      description:
        "Open-source platform that auto-generates polished blog posts from your markdown drafts using AI.",
      url: "https://github.com/yourusername/ai-blog",
      tags: ["Next.js", "AI", "Open Source"],
      featured: true,
    },
    {
      title: "Sample Project",
      description:
        "A sample project to show how project cards look. Replace with your own projects.",
      url: "https://github.com/yourusername/sample",
      tags: ["React", "TypeScript"],
      featured: true,
    },
  ],

  // ─── Resume ────────────────────────────────────────────────────
  resume: {
    summary:
      "Experienced software engineer with a passion for AI and building user-centric applications.",
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Tech Company",
        period: "2022 – Present",
        description:
          "Leading development of AI-powered applications. Built and deployed multiple production systems serving thousands of users.",
        highlights: [
          "Led migration to Next.js, improving performance by 40%",
          "Designed and implemented AI pipeline for content generation",
          "Mentored junior developers and conducted code reviews",
        ],
      },
      {
        role: "Software Engineer",
        company: "Startup Inc",
        period: "2019 – 2022",
        description:
          "Full-stack development with focus on React and Node.js.",
        highlights: [
          "Built real-time collaboration features",
          "Reduced API response times by 60%",
        ],
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "University of Engineering",
        period: "2015 – 2019",
      },
    ],
    skills: {
      Languages: ["TypeScript", "Python", "JavaScript", "Go"],
      Frontend: ["React", "Next.js", "TailwindCSS", "HTML/CSS"],
      Backend: ["Node.js", "Flask", "FastAPI", "PostgreSQL"],
      "AI/ML": ["LLMs", "Fine-tuning", "Prompt Engineering", "LangChain"],
      DevOps: ["Docker", "Vercel", "GitHub Actions", "GCP"],
    },
    certifications: [
      "AWS Cloud Practitioner",
      "Google Cloud Professional",
    ],
  },

  // ─── Footer ────────────────────────────────────────────────────
  footer: {
    text: "Built with AI Blog Generator",
    showSourceLink: true,
  },

  // ─── AI Provider Config (for blog generation) ──────────────────
  // These are used by the GitHub Action — set as GitHub Secrets
  // AI_PROVIDER: "gemini" or "claude"
  // GEMINI_API_KEY: your Gemini API key
  // CLAUDE_API_KEY: your Claude API key
};

export type SiteConfig = typeof siteConfig;
