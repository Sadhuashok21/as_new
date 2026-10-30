import type {
  BlogPost,
  Category,
  Tag,
  Tutorial,
  Resource,
  CaseStudy,
  Product,
  Service,
  FAQ,
  SiteOverview,
} from "../types/cms";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

async function fetchJson<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/content${endpoint}`, {
      headers: { "Accept": "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`CMS API fetch failed for ${endpoint}, using static fallback:`, err);
    return fallback;
  }
}

// ── Static Fallback Seed Data (Guarantees crawlability even if API is cold) ───

export const FALLBACK_SITE_OVERVIEW: SiteOverview = {
  site: {
    site_name: "Ascentracore Solutions",
    tagline: "Software Development, Cloud Systems & Developer Platforms",
    hero_heading: "Engineering Scalable Web Systems, Developer Tools & Technical Education Platforms",
    hero_subheading: "Ascentracore Solutions delivers end-to-end software development, cloud infrastructure architecture, in-browser compiler environments, and high-value technology learning platforms.",
    contact_email: "contact@ascentracoresolutions.com",
    contact_phone: "+916305096514",
    address: "India",
    meta_title: "Ascentracore Solutions | Software Engineering & Tech Resources",
    meta_description: "Ascentracore Solutions builds production software systems, developer platforms like SkilTrix, scalable APIs, and provides in-depth technical tutorials for engineers.",
  },
  featured_products: [
    {
      id: 1,
      name: "SkilTrix",
      slug: "skiltrix",
      tagline: "The Modern Cloud Platform for Interactive Developer Practice & SAP ABAP Simulation",
      description: "SkilTrix is a comprehensive technical learning and assessment platform featuring an in-browser SAP ABAP compiler, CodeLab IDE, and company recruitment mock tests.",
      features: [
        "In-Browser SAP ABAP Simulator & AST Syntax Linter",
        "CodeLab Cloud IDE with real-time test execution",
        "Company recruitment mock assessments (Amazon, Deloitte, Accenture styles)",
      ],
      technologies: ["React 19", "TypeScript", "Django 5", "Monaco Editor", "Docker", "PostgreSQL"],
      status: "Production Live",
      website_url: "https://skiltrix.ascentracoresolutions.com/",
      app_url: "https://skiltrix.ascentracoresolutions.com/",
      featured: true,
      order: 1,
      screenshots: [],
    },
    {
      id: 2,
      name: "SFS Blueprints",
      slug: "sfs-blueprints",
      tagline: "The Premier Global Repository & Community for Spaceflight Simulator Creators",
      description: "SFS Blueprints connects thousands of space simulation enthusiasts worldwide with automated blueprint JSON validation and sharing.",
      features: [
        "JSON Blueprint structural parser and validation firewall",
        "Community rating, tag filtering, and download tracking",
      ],
      technologies: ["React", "TypeScript", "Django REST Framework", "MySQL", "AWS S3"],
      status: "Production Live",
      website_url: "https://www.ascentracoresolutions.com/sfs",
      app_url: "https://www.ascentracoresolutions.com/blueprints",
      featured: true,
      order: 2,
      screenshots: [],
    },
    {
      id: 3,
      name: "SonicOra",
      slug: "sonicora",
      tagline: "High-Fidelity Audio Streaming & Modern Web Listening Experience",
      description: "SonicOra is an audio platform engineered for seamless streaming, responsive visualizers, and lightweight browser performance.",
      features: ["Adaptive bitrate audio playback", "Web Audio API FFT spectrum visualizer"],
      technologies: ["Web Audio API", "React", "TypeScript", "Tailwind CSS"],
      status: "Production Live",
      website_url: "/products/sonicora",
      featured: true,
      order: 3,
      screenshots: [],
    },
    {
      id: 4,
      name: "Transport Hub",
      slug: "transport-hub",
      tagline: "Real-Time Fleet Telemetry, Dispatch & Logistics Coordination Platform",
      description: "Transport Hub provides fleet managers with real-time route monitoring, vehicle status tracking, and dispatch intelligence.",
      features: ["Real-time GPS coordinate telemetry ingestion", "Geofencing alert triggers"],
      technologies: ["Django Channels", "WebSockets", "Leaflet GIS", "PostgreSQL"],
      status: "Production Live",
      website_url: "/products/transport-hub",
      featured: true,
      order: 4,
      screenshots: [],
    },
  ],
  services: [
    {
      id: 1,
      name: "Custom Software Development",
      slug: "custom-software-development",
      short_description: "Architecting bespoke, production-grade applications engineered for scalability and reliability.",
      full_description: "Ascentracore Solutions designs and delivers tailored software systems from discovery to cloud deployment, specializing in robust backend architectures.",
      icon_name: "code",
      benefits: ["Tailored to operational workflows", "Zero vendor lock-in", "Automated test coverage"],
      deliverables: ["Full source code ownership", "Architectural documentation", "CI/CD pipelines"],
      technologies: ["Python", "Django", "TypeScript", "React", "PostgreSQL", "Docker"],
      order: 1,
    },
    {
      id: 2,
      name: "Web Application Engineering",
      slug: "web-application-engineering",
      short_description: "High-performance modern web platforms combining reactive user interfaces with sub-second API backends.",
      full_description: "We build fast, responsive, and accessible web applications using React 19, TypeScript, and modern CSS frameworks.",
      icon_name: "globe",
      benefits: ["Sub-second initial page loads", "Mobile-first experience", "Crawlable HTML and metadata"],
      deliverables: ["Production build artifacts", "Lighthouse 90+ audits", "Component libraries"],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "REST APIs"],
      order: 2,
    },
    {
      id: 3,
      name: "Backend & API Architecture",
      slug: "backend-api-architecture",
      short_description: "High-throughput REST and ASGI WebSocket APIs engineered for data integrity and microsecond response times.",
      full_description: "Our backend team designs database models, efficient query patterns, asynchronous worker pools, and secure authentication gateways.",
      icon_name: "server",
      benefits: ["No N+1 query bottlenecks", "Signed session security", "Asynchronous task execution"],
      deliverables: ["OpenAPI specs", "Migration schemas", "Load benchmarks"],
      technologies: ["Django REST Framework", "Daphne ASGI", "Redis", "MySQL", "PostgreSQL"],
      order: 3,
    },
    {
      id: 4,
      name: "Cloud Deployment & DevOps",
      slug: "cloud-deployment-devops",
      short_description: "Zero-downtime AWS infrastructure, Linux server hardening, automated SSL, and reverse proxy optimization.",
      full_description: "We configure automated deployment pipelines on AWS EC2, hardened Nginx reverse proxies, and automated Let's Encrypt certificates.",
      icon_name: "cloud",
      benefits: ["Zero-downtime deployments", "Automated SSL renewal", "Systemd supervision"],
      deliverables: ["Server scripts", "Systemd service files", "Nginx configs"],
      technologies: ["AWS EC2", "Ubuntu Linux", "Nginx", "Systemd", "Certbot", "Bash"],
      order: 4,
    },
    {
      id: 5,
      name: "Developer Tools & Platforms",
      slug: "developer-tools-platforms",
      short_description: "In-browser code compilers, interactive AST linters, and developer productivity tooling.",
      full_description: "We build web-based developer environments including Monaco Editor integrations, syntax highlighters, and compiler simulators.",
      icon_name: "terminal",
      benefits: ["Zero-install onboarding", "Real-time syntax feedback", "Sandboxed execution"],
      deliverables: ["Interactive IDE components", "Monaco custom grammars", "Execution connectors"],
      technologies: ["Monaco Editor", "Web Workers", "Docker Sandboxes", "TypeScript"],
      order: 5,
    },
    {
      id: 6,
      name: "Educational Technology (EdTech)",
      slug: "educational-technology",
      short_description: "Online coding platforms, automated assessment runners, and structured student progress tracking.",
      full_description: "Drawing from our development of SkilTrix, we engineer technical education platforms featuring automated test-case scoring and recruitment workflows.",
      icon_name: "cpu",
      benefits: ["Hands-on code execution", "Automated grading", "Integrity monitoring"],
      deliverables: ["Course management systems", "Test runners", "Candidate reports"],
      technologies: ["React", "Django", "Monaco", "Razorpay"],
      order: 6,
    },
  ],
  recent_posts: [
    {
      id: 1,
      title: "Architecting Zero-Downtime Deployments with Nginx, Daphne ASGI, and Systemd on AWS",
      slug: "zero-downtime-deployments-nginx-daphne-systemd",
      excerpt: "A step-by-step architectural breakdown of running zero-downtime ASGI applications using Nginx upstream keepalive, systemd process supervision, and automated reload triggers.",
      reading_time: 9,
      published_at: "2026-10-06T12:00:00Z",
      category: { id: 3, name: "DevOps & Cloud", slug: "devops-infrastructure", description: "" },
      author: { id: 1, name: "Ascentracore Engineering Team", slug: "ascentracore-editorial", bio: "", role: "Core Systems" },
    },
    {
      id: 2,
      title: "Optimizing Relational Queries: Eliminating N+1 Bottlenecks with select_related & prefetch_related",
      slug: "optimizing-database-queries-eliminating-n-plus-1-django",
      excerpt: "Learn how database query explosion degrades API performance and how to leverage SQL JOINs and batch lookups to achieve sub-50ms endpoint response times.",
      reading_time: 8,
      published_at: "2026-10-05T12:00:00Z",
      category: { id: 2, name: "Backend Architecture", slug: "backend-apis", description: "" },
      author: { id: 1, name: "Ascentracore Engineering Team", slug: "ascentracore-editorial", bio: "", role: "Core Systems" },
    },
    {
      id: 3,
      title: "Clean Architecture in React 19 & TypeScript: Decoupling State, APIs, and UI Components",
      slug: "clean-architecture-react-19-typescript-decoupling",
      excerpt: "A practical architectural blueprint for structuring modern React applications with typed domain adapters, service layers, and clean UI components.",
      reading_time: 7,
      published_at: "2026-10-04T12:00:00Z",
      category: { id: 4, name: "Frontend Development", slug: "frontend-development", description: "" },
      author: { id: 1, name: "Ascentracore Engineering Team", slug: "ascentracore-editorial", bio: "", role: "Core Systems" },
    },
  ],
  recent_tutorials: [
    {
      id: 1,
      title: "Python OOP Complete Guide: Classes, Dunder Methods & Inheritance",
      slug: "python-oop-complete-guide",
      category: "python",
      category_display: "Python",
      difficulty: "beginner",
      introduction: "Learn object-oriented programming in Python from fundamentals to advanced design patterns, including encapsulation, inheritance, property decorators, and dunder methods.",
      estimated_reading_time: 12,
      order: 1,
    },
    {
      id: 2,
      title: "ArrayList vs. LinkedList in Java: Internal Mechanics & Time Complexity",
      slug: "java-arraylist-vs-linkedlist",
      category: "java",
      category_display: "Java",
      difficulty: "intermediate",
      introduction: "Detailed comparison of ArrayList and LinkedList in the Java Collections Framework, analyzing memory locality, CPU caching, and algorithmic trade-offs.",
      estimated_reading_time: 10,
      order: 1,
    },
    {
      id: 3,
      title: "Two-Pointer and Sliding Window Patterns in Arrays & Strings",
      slug: "two-pointer-sliding-window-patterns",
      category: "dsa",
      category_display: "DSA",
      difficulty: "intermediate",
      introduction: "Master the two-pointer and sliding window algorithmic techniques to solve array, string, and subarray problems in optimal O(N) linear time.",
      estimated_reading_time: 10,
      order: 1,
    },
    {
      id: 4,
      title: "Building Production REST APIs with Django REST Framework (DRF)",
      slug: "django-rest-api-architecture",
      category: "django",
      category_display: "Django",
      difficulty: "intermediate",
      introduction: "How to structure clean, maintainable RESTful APIs in Django using ModelViewSets, serializers, permissions, and pagination.",
      estimated_reading_time: 10,
      order: 1,
    },
    {
      id: 5,
      title: "Essential Linux File Permissions, Octal Modes, and Chmod Deep Dive",
      slug: "linux-permissions-chmod-octal-modes",
      category: "linux",
      category_display: "Linux",
      difficulty: "beginner",
      introduction: "Understand Unix/Linux file permissions, user-group-others bits, octal modes (755, 644, 600), and permission troubleshooting.",
      estimated_reading_time: 8,
      order: 1,
    },
    {
      id: 6,
      title: "Binary Search: Invariant Design & Boundary Templates",
      slug: "binary-search-invariant-templates",
      category: "dsa",
      category_display: "DSA",
      difficulty: "intermediate",
      introduction: "A structured blueprint for writing bug-free binary search algorithms, avoiding off-by-one errors and integer overflow.",
      estimated_reading_time: 9,
      order: 2,
    },
  ],
  featured_case_studies: [
    {
      id: 1,
      project_name: "SkilTrix",
      title: "Architecting an In-Browser SAP ABAP Cloud Compiler & Developer Practice Suite",
      slug: "skiltrix-in-browser-abap-compiler",
      client_or_type: "Internal SaaS Platform",
      summary: "How Ascentracore Solutions built SkilTrix—an interactive developer learning environment that delivers real-time SAP ABAP simulation, CodeLab IDE, and multi-language technical assessments in the browser.",
      technology_used: ["React 19", "TypeScript", "Django 5", "Monaco Editor", "@abaplint/core", "Docker", "Razorpay"],
      featured: true,
      order: 1,
      created_at: "2026-10-06T12:00:00Z",
    },
    {
      id: 2,
      project_name: "SFS Blueprints",
      title: "Scaling a Community Platform & Validation Engine for Spaceflight Simulator Creators",
      slug: "sfs-blueprints-community-platform",
      client_or_type: "Community Web Application",
      summary: "Building a high-performance community portal that allows thousands of Spaceflight Simulator players to share, discover, and validate complex rocket blueprints.",
      technology_used: ["React", "TypeScript", "Django REST Framework", "MySQL", "AWS S3"],
      featured: true,
      order: 2,
      created_at: "2026-10-06T12:00:00Z",
    },
  ],
};

// ── API Functions ─────────────────────────────────────────────────────────────

export async function getSiteOverview(): Promise<SiteOverview> {
  const res = await fetchJson<{ status: boolean } & SiteOverview>("/overview/", {
    status: true,
    ...FALLBACK_SITE_OVERVIEW,
  });
  return res.site ? res : FALLBACK_SITE_OVERVIEW;
}

export async function getBlogPosts(params?: { category?: string; tag?: string; q?: string }): Promise<{
  posts: BlogPost[];
  categories: Category[];
  tags: Tag[];
}> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.tag) query.set("tag", params.tag);
  if (params?.q) query.set("q", params.q);

  const res = await fetchJson<{ posts: BlogPost[]; categories: Category[]; tags: Tag[] }>(
    `/posts/?${query.toString()}`,
    {
      posts: FALLBACK_SITE_OVERVIEW.recent_posts,
      categories: [
        { id: 1, name: "All Topics", slug: "all", description: "" },
        { id: 2, name: "Backend Architecture", slug: "backend-apis", description: "" },
        { id: 3, name: "DevOps & Cloud", slug: "devops-infrastructure", description: "" },
        { id: 4, name: "Frontend Development", slug: "frontend-development", description: "" },
      ],
      tags: [],
    }
  );
  return res;
}

export async function getBlogPostDetail(slug: string): Promise<BlogPost | null> {
  const res = await fetchJson<{ status: boolean; post?: BlogPost }>(`/posts/${encodeURIComponent(slug)}/`, {
    status: false,
  });
  if (res.post) return res.post;
  const match = FALLBACK_SITE_OVERVIEW.recent_posts.find((p) => p.slug === slug);
  return match || null;
}

export async function getTutorials(params?: { category?: string; difficulty?: string; q?: string }): Promise<{
  tutorials: Tutorial[];
  categories: Array<{ id: string; name: string; count: number }>;
}> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.difficulty) query.set("difficulty", params.difficulty);
  if (params?.q) query.set("q", params.q);

  const res = await fetchJson<{
    tutorials: Tutorial[];
    categories: Array<{ id: string; name: string; count: number }>;
  }>(`/tutorials/?${query.toString()}`, {
    tutorials: FALLBACK_SITE_OVERVIEW.recent_tutorials,
    categories: [
      { id: "python", name: "Python", count: 3 },
      { id: "java", name: "Java", count: 2 },
      { id: "dsa", name: "DSA", count: 2 },
      { id: "django", name: "Django", count: 1 },
      { id: "linux", name: "Linux", count: 2 },
      { id: "react", name: "React", count: 0 },
      { id: "javascript", name: "JavaScript", count: 0 },
      { id: "typescript", name: "TypeScript", count: 0 },
      { id: "aiml", name: "AI/ML", count: 0 },
      { id: "android", name: "Android", count: 0 },
      { id: "aws", name: "AWS", count: 0 },
      { id: "databases", name: "Databases", count: 0 },
    ],
  });
  return res;
}

export async function getTutorialDetail(category: string, slug: string): Promise<Tutorial | null> {
  const res = await fetchJson<{ status: boolean; tutorial?: Tutorial }>(
    `/tutorials/${encodeURIComponent(category)}/${encodeURIComponent(slug)}/`,
    { status: false }
  );
  if (res.tutorial) return res.tutorial;
  const match = FALLBACK_SITE_OVERVIEW.recent_tutorials.find(
    (t) => t.category === category && t.slug === slug
  );
  return match || null;
}

export async function getResources(params?: { type?: string; q?: string }): Promise<{
  resources: Resource[];
  types: Array<{ id: string; name: string; count: number }>;
}> {
  const query = new URLSearchParams();
  if (params?.type) query.set("type", params.type);
  if (params?.q) query.set("q", params.q);

  return fetchJson<{
    resources: Resource[];
    types: Array<{ id: string; name: string; count: number }>;
  }>(`/resources/?${query.toString()}`, {
    resources: [
      {
        id: 1,
        title: "Python 3.12+ Modern Syntax & Architecture Cheat Sheet",
        slug: "python-modern-syntax-cheat-sheet",
        resource_type: "cheatsheet",
        resource_type_display: "Cheat Sheet",
        description: "A comprehensive one-page reference sheet covering structural pattern matching, type hints, dataclasses, walrus operators, and async/await syntax.",
        badge_text: "Quick Reference",
        featured: true,
        order: 1,
        created_at: "2026-10-06T12:00:00Z",
      },
      {
        id: 2,
        title: "Full-Stack Software Engineering Roadmap (2026 Edition)",
        slug: "full-stack-engineering-roadmap-2026",
        resource_type: "roadmap",
        resource_type_display: "Learning Roadmap",
        description: "An end-to-end learning roadmap for aspiring software engineers: from programming fundamentals and data structures to distributed systems and cloud architecture.",
        badge_text: "Career Guide",
        featured: true,
        order: 2,
        created_at: "2026-10-06T12:00:00Z",
      },
      {
        id: 3,
        title: "System Design Interview Cheat Sheet: Scaling to 10M Users",
        slug: "system-design-interview-cheat-sheet",
        resource_type: "interview_prep",
        resource_type_display: "Interview Resource",
        description: "Essential architectural concepts, back-of-the-envelope calculations, caching strategies, and database sharding patterns for technical interviews.",
        badge_text: "Interview Prep",
        featured: true,
        order: 3,
        created_at: "2026-10-06T12:00:00Z",
      },
    ],
    types: [
      { id: "cheatsheet", name: "Cheat Sheet", count: 1 },
      { id: "guide", name: "Programming Guide", count: 0 },
      { id: "interview_prep", name: "Interview Resource", count: 1 },
      { id: "dsa_guide", name: "DSA Resource", count: 0 },
      { id: "dev_tools", name: "Developer Tool", count: 0 },
      { id: "roadmap", name: "Learning Roadmap", count: 1 },
      { id: "download", name: "Download", count: 0 },
      { id: "documentation", name: "Documentation", count: 0 },
    ],
  });
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const res = await fetchJson<{ case_studies: CaseStudy[] }>("/case-studies/", {
    case_studies: FALLBACK_SITE_OVERVIEW.featured_case_studies,
  });
  return res.case_studies || FALLBACK_SITE_OVERVIEW.featured_case_studies;
}

export async function getCaseStudyDetail(slug: string): Promise<CaseStudy | null> {
  const res = await fetchJson<{ status: boolean; case_study?: CaseStudy }>(
    `/case-studies/${encodeURIComponent(slug)}/`,
    { status: false }
  );
  if (res.case_study) return res.case_study;
  const match = FALLBACK_SITE_OVERVIEW.featured_case_studies.find((cs) => cs.slug === slug);
  return match || null;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetchJson<{ products: Product[] }>("/products/", {
    products: FALLBACK_SITE_OVERVIEW.featured_products,
  });
  return res.products || FALLBACK_SITE_OVERVIEW.featured_products;
}

export async function getProductDetail(slug: string): Promise<Product | null> {
  const res = await fetchJson<{ status: boolean; product?: Product }>(
    `/products/${encodeURIComponent(slug)}/`,
    { status: false }
  );
  if (res.product) return res.product;
  const match = FALLBACK_SITE_OVERVIEW.featured_products.find((p) => p.slug === slug);
  return match || null;
}

export async function getServices(): Promise<Service[]> {
  const res = await fetchJson<{ services: Service[] }>("/services/", {
    services: FALLBACK_SITE_OVERVIEW.services,
  });
  return res.services || FALLBACK_SITE_OVERVIEW.services;
}

export async function getServiceDetail(slug: string): Promise<Service | null> {
  const res = await fetchJson<{ status: boolean; service?: Service }>(
    `/services/${encodeURIComponent(slug)}/`,
    { status: false }
  );
  if (res.service) return res.service;
  const match = FALLBACK_SITE_OVERVIEW.services.find((s) => s.slug === slug);
  return match || null;
}

export async function getFaqs(): Promise<FAQ[]> {
  const res = await fetchJson<{ faqs: FAQ[] }>("/faqs/", {
    faqs: [
      {
        id: 1,
        question: "What software engineering services does Ascentracore Solutions provide?",
        answer: "Ascentracore Solutions provides end-to-end custom software engineering, modern web application development (React & TypeScript), scalable backend API architectures (Django & Python), cloud infrastructure deployment on AWS, and specialized developer platform engineering.",
        category: "services",
        order: 1,
      },
      {
        id: 2,
        question: "What is the relationship between Ascentracore Solutions and SkilTrix?",
        answer: "SkilTrix is a flagship developer education and coding platform developed and maintained by Ascentracore Solutions. It offers in-browser SAP ABAP compilation, interactive CodeLab IDE challenges, and company mock placement assessments.",
        category: "products",
        order: 2,
      },
    ],
  });
  return res.faqs || [];
}

export async function searchContent(query: string): Promise<{
  query: string;
  total_results: number;
  posts: BlogPost[];
  tutorials: Tutorial[];
  resources: Resource[];
  case_studies: CaseStudy[];
}> {
  return fetchJson(`/search/?q=${encodeURIComponent(query)}`, {
    query,
    total_results: 0,
    posts: [],
    tutorials: [],
    resources: [],
    case_studies: [],
  });
}

export const cmsApi = {
  getOverview: getSiteOverview,
  getPosts: getBlogPosts,
  getPost: getBlogPostDetail,
  getTutorials,
  getTutorial: getTutorialDetail,
  getResources,
  getCaseStudies,
  getCaseStudy: getCaseStudyDetail,
  getProducts,
  getProduct: getProductDetail,
  getServices,
  getService: getServiceDetail,
  getFaqs,
  search: searchContent,
};
