export const site = {
  name: "LALITH SAGAR KAMBALA",
  role: "Software Engineer",
  tagline:
    "Founder mindset in 0→1 environments—owning problems end-to-end and turning ideas into reliable products.",
  phone: "(913) 488-0303",
  phoneTel: "+19134880303",
  email: "lalithsagarkambala@gmail.com",
  location: "KS, United States",
  relocate: "Open to relocate",
  /** File under `public/` — use a path like `/Resume/your-file.pdf`. Set null to hide. Opens in a new tab. */
  resumePdf: "/Resume/Resume_SE_Lalith.pdf" as string | null,
  /**
   * Hero background video. Prefer **MP4 (H.264)** for every browser + smaller files.
   * `.mov` often works in Safari; Chrome/Edge/Firefox may fail depending on codec.
   * Local file: place under `public/videos/` (e.g. `/videos/hero.MOV`). `null` = no video.
   */
  heroVideoSrc: "/videos/hero.mp4" as string | null,
  /** Shown in the header and as a caption on the hero background video when `heroVideoSrc` is set. */
  heroVideoLocation: "Aspen, Colorado" as string | null,
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lalith-sagar-kambala-48a597199/" },
    { label: "GitHub", href: "https://github.com/lalithsagar10" },
  ],
} as const;

export const summary = {
  /** Short line under the Summary heading (optional tone-setter). */
  kicker: "Wanderer at heart · builder by trade",
  paragraphs: [
    "I'm a curious wanderer at heart and a builder by trade—a software engineer who lives for road trips, bold ideas, and end-to-end systems that move the needle. Whether I'm shaping architecture across platforms or rolling up my sleeves on a gnarly bug, I bring real ownership, a creative streak, and a bias for action. I thrive where curiosity meets craft, and where the bar for reliability and user experience stays high.",
    "My journey so far has been a patchwork of hands-on wins—shipping features, closing the loop on issues, and helping shape dependable products where purpose and human-centered design go hand in hand. Outside the code, I'm drawn to social causes and community work, because technology at its best doesn't just connect systems—it brings people together and leaves room for impact beyond the roadmap.",
  ],
} as const;

/** One slide in the Travel carousel — use the same `public/videos/` folder as the hero (or any `public/` path). */
export type TravelMoment =
  | { kind: "image"; src: string; alt?: string; caption?: string }
  | { kind: "video"; src: string; caption?: string; poster?: string };

/**
 * Photos & videos from trips. Add files under `public/videos/` next to the hero clip.
 *
 * Examples:
 * `{ kind: "image", src: "/videos/aspen.jpg", alt: "Mountain view", caption: "Aspen, Colorado" }`
 * `{ kind: "video", src: "/videos/travel-clip.mp4", poster: "/videos/travel-clip-poster.jpg", caption: "Golden hour" }`
 */
export const travelMoments: TravelMoment[] = [
  { kind: "video", src: "/videos/vid1.mp4" },
  { kind: "video", src: "/videos/vid2.MP4" },
  { kind: "video", src: "/videos/vid3.MP4" },
  { kind: "video", src: "/videos/vid4.MP4" },
  { kind: "video", src: "/videos/vid5.MP4" },
  { kind: "video", src: "/videos/hero1.Mp4" },
];

/** Site favicon as logo (swap for a file under `/public/companies/` for sharper art). */
const favLogo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;

export const education = [
  {
    degree: "Master of Science: Computer Science",
    school: "University of Central Missouri",
    detail: "Lee's Summit, MO, United States",
    gpa: "3.55/4.00",
    website: "https://www.ucmo.edu/",
    logoSrc: favLogo("ucmo.edu"),
  },
  {
    degree: "Bachelor of Technology: Computer Science and Engineering",
    school: "Anil Neerukonda Institute of Technology & Sciences",
    detail: "Visakhapatnam, India",
    website: "https://anits.org/",
    logoHref:
      "https://www.linkedin.com/school/anil-neerukonda-institute-of-technology-%26-sciences/",
    logoSrc: "/companies/ANITS.jpeg",
    /** ~3.52/4.00 from linear mapping (8.79÷10)×4, rounded to two decimals. */
    gpaLabel: "CGPA",
    gpa: "8.79/10 · ~3.52/4.00",
  },
] as const;

export const experience = [
  {
    role: "Founding Software Engineer",
    company: "Todaiyo.ai",
    companyLogo: favLogo("todaiyo.ai"),
    companyLinkedIn: "https://www.linkedin.com/company/todaiyo/",
    location: "MA, United States",
    period: "Sep 2025 – Present",
    bullets: [
      "Owned and scaled backend systems end-to-end, from architecture and API design through deployment and monitoring, while collaborating closely on UI/UX flows for fast, intuitive experiences.",
      "Built asynchronous, event-driven workflows with queues and workers for concurrent AI-powered requests and real-time user interactions under production traffic.",
      "Designed resilient backend services with reliability and uptime as core goals; proactively debugged, triaged, and resolved production incidents.",
      "Led full-stack development of a production SaaS product using React, Node.js, and Supabase—integrating AI APIs, reducing OpenAI costs by 25%, implementing image-generation pipelines, and instrumenting analytics with Google Analytics and Google Tag Manager.",
    ],
  },
  {
    role: "AI Full Stack Engineer (Part-time)",
    company: "Consumer Genie",
    companyLogo: "/companies/Consumergenie.jpeg",
    companyLinkedIn: "https://www.linkedin.com/company/consumergenie/",
    location: "Delaware, United States",
    period: "Sep 2025 – Present",
    bullets: [
      "Architected an agentic AI-powered shopping platform that reduced cross-site product research time by 40%, using LangGraph for multi-agent reasoning (search, summarization, ranking, comparison).",
      "Designed distributed, event-driven orchestration with asynchronous tasks to coordinate autonomous AI agents for scalable, fault-tolerant multi-step queries.",
      "Implemented semantic search with vector embeddings and MongoDB-backed indexes; integrated DuckDuckGo, Serper, and Tavily for discovery, reviews, and recommendations.",
      "Building real-time, low-latency AI pipelines on AWS with Docker and CI/CD, LLM guardrails, and cost controls for concurrency under load.",
    ],
  },
  {
    role: "Full Stack Software Engineer",
    company: "IEJL",
    companyLogo: favLogo("iejl.org"),
    companyLinkedIn:
      "https://www.linkedin.com/company/international-economic-justice-league-inc/",
    location: "California, United States",
    period: "Jul 2025 – Oct 2025",
    bullets: [
      "Engineered full-stack apps and internal tools with Next.js, TypeScript, and Tailwind CSS—improving UI load times by ~30% and delivering scalable APIs with real-time updates and Supabase-backed PostgreSQL sync (~25% better sync efficiency).",
      "Optimized PostgreSQL schemas, indexes, and queries (Supabase) for performance and reliability under high throughput.",
      "Partnered with PMs, designers, and cross-functional teams in Agile sprints—accelerating delivery and reducing iteration cycles by ~35%.",
      "Deployed containerized services on AWS with Docker and CI/CD—faster, safer releases with ~40% faster deployments and ~30% better reliability.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Coincent Technologies",
    companyLogo: favLogo("coincent.ai"),
    companyLinkedIn: "https://www.linkedin.com/company/coincent-ai/",
    location: "India",
    period: "Sep 2022 – Nov 2022",
    bullets: [
      "Built a Job Portal Management System with optimized MySQL queries and modular front-end components—cutting job posting and record processing time by ~30%.",
      "Validated mobile-first flows and cross-browser compatibility; supported Java (Spring Boot) APIs and monitoring—stronger accessibility (~95% of users) and ~20% lower bounce rates.",
      "Maintained ~99% uptime through automated error monitoring and rapid resolution during high traffic.",
    ],
  },
] as const;

export const achievements = [
  "Oracle Cloud Infrastructure 2024 Generative AI Professional (1Z0-1127-24)",
  "Introduction to Large Language Models (LLM) — Google Cloud",
  "Accenture North America Data Science and Visualization Job Simulation — Forage",
  "Smart India Hackathon Winner — Blockchain and decentralization of tax collections",
] as const;

export const competencyGroups = [
  {
    title: "Programming languages",
    items: [
      "Python",
      "Java (Spring Boot)",
      "C#",
      "SQL",
      "HTML",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "REST APIs",
    ],
  },
  {
    title: "Skills",
    items: [
      "Data Structures & Algorithms",
      "UI/UX design",
      "Data modelling",
      "Data mining",
      "Data visualization",
      "AI",
      "LangChain",
      "Machine learning",
    ],
  },
  {
    title: "Tools & platforms",
    items: [
      "VS Code",
      "Jupyter",
      "Colab",
      "Linux",
      "Git",
      "Jira",
      "Selenium",
      "JUnit",
      "GenAI",
      "Vector databases",
      "Spring Boot",
      "Cursor",
      "Stripe",
      "Material UI",
    ],
  },
  {
    title: "Frameworks & libraries",
    items: [
      "React",
      "Flask",
      "TensorFlow",
      "scikit-learn",
      "Pandas",
      "Keras",
      "Matplotlib",
      "Seaborn",
      "Tableau",
      "MongoDB",
    ],
  },
  {
    title: "Coursework",
    items: [
      "Relational databases",
      "Cloud computing",
      "Operating systems",
      "SDLC & Agile (Scrum)",
      "Advanced software engineering",
    ],
  },
  {
    title: "Soft skills",
    items: ["Teamwork & collaboration", "Communication"],
  },
] as const;

export const projects = [
  {
    title: "AI Debugging Agent (Ollama & Pinecone)",
    period: "Mar 2026",
    bullets: [
      "End-to-end agent with FastAPI and Next.js (TypeScript): ingests GitHub/ZIP repos, chunks and embeds source, answers natural-language debugging queries with file/line references.",
      "Modular RAG pipeline with SentenceTransformers, CodeLlama via Ollama—retrieval orchestration, structured JSON outputs, SQLite query history, optional pylint/eslint for context.",
      "Production practices: pipeline logging, robust error handling with LLM/Pinecone fallbacks, namespace multi-repo queries, saved-repo dropdown, privacy-first local vector mode.",
    ],
    tags: ["FastAPI", "Next.js", "RAG", "Ollama", "Pinecone"],
  },
  {
    title: "Genie Shop (Consumer Genie)",
    period: "Sep 2025",
    bullets: [
      "LangGraph state machine with intent-based routing; separate pipelines for research vs. product queries; Streamlit streaming.",
      "Scraping pipeline with Gemini for intent and extraction; DuckDuckGo/Serper with URL scoring and filtering.",
      "Location-aware retrieval for USA/Canada; category-based site selection; fallback URLs and multi-model retries for 95%+ completion despite API failures.",
    ],
    tags: ["LangGraph", "Streamlit", "Gemini", "Python"],
  },
  {
    title: "Article Semantic Search (LLMs)",
    period: "Aug 2025",
    bullets: [
      "Financial news research platform using LangChain Unstructured URL Loader and OpenAI embeddings for indexing and retrieval.",
      "FAISS semantic search with embedding storage; Streamlit UI to process URLs and get contextual LLM answers.",
    ],
    tags: ["LangChain", "FAISS", "OpenAI", "Streamlit"],
  },
  {
    title: "Gemini API Clone",
    period: "May 2025 – Jun 2025",
    bullets: [
      "Responsive Gemini-style UI with HTML, CSS, JavaScript, JSX, and React—modular components and smooth interaction.",
      "RESTful APIs and async JavaScript for instant updates and scalable interfaces.",
    ],
    tags: ["React", "REST", "JavaScript"],
  },
  {
    title: "Brain Tumor Detection (Deep Learning)",
    period: "Jan 2023 – Apr 2023",
    bullets: [
      "CNN with Conv2D, BatchNorm, MaxPooling, Dropout, Dense (ReLU)—94% accuracy on MRI classification; ~15% less overfitting.",
      "Automated early-detection workflows—up to ~40% faster diagnosis paths and scalable real-time analysis.",
    ],
    tags: ["TensorFlow", "CNN", "Computer vision"],
  },
  {
    title: "Block Wizz — Property & tax (Blockchain)",
    period: "Aug 2022 – Dec 2022",
    bullets: [
      "Decentralized tax payment solution—500+ transactions with transparent, tamper-proof, auditable records.",
      "SHA-256 chained histories—fewer fraudulent/duplicate payments (~95%) with real-time verifiable tracking.",
    ],
    tags: ["Blockchain", "SHA-256", "Web3"],
  },
] as const;
