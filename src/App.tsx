import { useState, useEffect, useRef } from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────

const Icon = ({ path, size = 20, className = "" }: { path: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const ICONS = {
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  smartphone: "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18h.01",
  globe: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  cloud: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  server: "M2 3h20v6H2zM2 15h20v6H2zM6 9v6M12 9v6M18 9v6",
  database: "M12 2c5.523 0 10 2.238 10 5v10c0 2.762-4.477 5-10 5S2 19.762 2 17V7c0-2.762 4.477-5 10-5zM22 7c0 2.762-4.477 5-10 5S2 9.762 2 7M22 12c0 2.762-4.477 5-10 5S2 14.762 2 12",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  terminal: "M4 17l6-6-6-6M12 19h8",
  cpu: "M12 2H2v10h10V2zM22 12h-10v10h10V12zM22 2h-4v4h4V2zM6 16H2v4h4v-4z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  store: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  layout: "M3 3h18v18H3zM3 9h18M9 21V9",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  shopBag: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M12 11a4 4 0 0 1-4-4M16 11a4 4 0 0 1-4-4",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3",
  chevronDown: "M6 9l6 6 6-6",
  chevronUp: "M18 15l-6-6-6 6",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check: "M20 6L9 17l-5-5",
  apple: "M14 2a4 4 0 0 1 4 4v1h-4V2zM6.5 14.5c-.83 1.55-1.5 2.5-2.5 2.5s-1.42-.87-1.5-2c-.08-1.1.5-2.5 1.5-2.5s2 .83 2 2zM20 10c1.1 0 2 .9 2 2v5a5 5 0 0 1-10 0v-5c0-1.1.9-2 2-2h1V8a5 5 0 0 1 5-2zm-5 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
  mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
};

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  description: string;
  features: string;
  tech: string;
  deployment: string[];
  submitted: boolean;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Services", "Pricing", "How It Works", "Contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg backdrop-blur-md " + (dark ? "bg-slate-900/95" : "bg-white/95") : dark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              {/* <Icon path={ICONS.code} size={16} className="text-white" /> */}
              <img src="https://cdn.ascentracoresolutions.com/favicon.ico" alt="Ascentracore Solutions" className="text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              <span className="text-blue-600">Ascentracore</span>
              <span className={dark ? "text-white" : "text-slate-900"}>&nbsp; Solutions</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${dark ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)} className={`p-2 rounded-lg transition-colors ${dark ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}>
              <Icon path={dark ? ICONS.sun : ICONS.moon} size={18} />
            </button>
            <a href="#contact-form" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
              Get Started
            </a>
            <button onClick={() => setOpen(!open)} className={`md:hidden p-2 rounded-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>
              <Icon path={open ? ICONS.x : ICONS.menu} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden border-t ${dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${dark ? "text-slate-300 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}`}>
                {l}
              </a>
            ))}
            <a href="#contact-form" onClick={() => setOpen(false)} className="block mt-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg text-center">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}



function Hero({ dark, scrollToForm }: { dark: boolean; scrollToForm: (s: string) => void }) {
  return (
    <section id="home" className={`relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden ${dark ? "bg-slate-900" : "bg-white"}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-blue-400/8 blur-3xl" />
        <div className={`absolute inset-0 ${dark ? "bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08),transparent_60%)]" : "bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05),transparent_60%)]"}`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 bg-blue-600/10 text-blue-600 border border-blue-600/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Professional Software Development
            </div>
            <h1 className={`font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-none mb-6 tracking-tight ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              BUILD.<br />
              <span className="text-blue-600">DEPLOY.</span><br />
              LAUNCH.
            </h1>
            <p className={`text-lg leading-relaxed mb-8 max-w-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>
              Professional app and web development services at affordable prices. Build your app, website, backend, APIs, or deploy your existing project with expert development support.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => scrollToForm("")} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:translate-y-[-1px]">
                Start Your Project
                <Icon path={ICONS.arrowRight} size={16} />
              </button>
              <a href="#pricing" className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border transition-all ${dark ? "border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-white/5" : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}>
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Affordable pricing", "Fast development", "Deployment support", "Direct contact"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <Icon path={ICONS.check} size={14} className="text-green-500 flex-shrink-0" />
                  <span className={dark ? "text-slate-400" : "text-slate-600"}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — tech illustration */}
          <div className="relative">
            <div className={`relative rounded-2xl p-8 ${dark ? "bg-slate-800/60 border border-slate-700/50" : "bg-slate-50 border border-slate-200"}`}>
              {/* Center laptop */}
              <div className={`rounded-xl p-6 mb-4 text-center ${dark ? "bg-slate-900" : "bg-white"} shadow-xl border ${dark ? "border-slate-700" : "border-slate-200"}`}>
                <div className={`text-xs font-mono mb-3 text-left rounded-lg p-3 ${dark ? "bg-black text-green-400" : "bg-slate-900 text-green-400"}`}>
                  <div className="flex gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="text-green-400">$ npm run build</div>
                  <div className="text-slate-500">✓ Building for production...</div>
                  <div className="text-blue-400">✓ Deployed to AWS EC2</div>
                  <div className="text-green-400">✓ SSL configured ● Live</div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mt-2" />
                <div className="w-16 h-2 rounded-full bg-slate-300 mx-auto mt-1" />
              </div>
              {/* Floating badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: ICONS.smartphone, label: "Android / iOS", color: "text-blue-500" },
                  { icon: ICONS.cloud, label: "AWS Cloud", color: "text-orange-500" },
                  { icon: ICONS.globe, label: "Web Apps", color: "text-green-500" },
                  { icon: ICONS.database, label: "Databases", color: "text-purple-500" },
                  { icon: ICONS.server, label: "Backend API", color: "text-cyan-500" },
                  { icon: ICONS.shield, label: "Auth & SSL", color: "text-rose-500" },
                ].map(({ icon, label, color }) => (
                  <div key={label} className={`flex flex-col items-center gap-2 p-3 rounded-xl text-center ${dark ? "bg-slate-900/70 border border-slate-700/50" : "bg-white border border-slate-200"} shadow-sm`}>
                    <Icon path={icon} size={20} className={color} />
                    <span className={`text-xs font-medium leading-tight ${dark ? "text-slate-300" : "text-slate-700"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-blue-600/20 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-blue-600/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Quick Services ───────────────────────────────────────────────────────────
function QuickServices({ dark, scrollToForm }: { dark: boolean; scrollToForm: (s: string) => void }) {
  const items = [
    { icon: ICONS.smartphone, label: "Android App Development", desc: "Develop Android applications according to your requirements.", price: "from ₹1,000", action: "Request App", service: "Android App" },
    { icon: ICONS.globe, label: "Web Development", desc: "Responsive websites and web applications.", price: "from ₹500", action: "Build Website", service: "Website" },
    { icon: ICONS.upload, label: "App Uploading", desc: "Upload and publish your app to the Play Store.", price: "₹500", action: "Upload My App", service: "App Upload" },
    { icon: ICONS.cloud, label: "AWS Deployment", desc: "Deploy your website, backend, or API to AWS infrastructure.", price: "Custom pricing", action: "Deploy to AWS", service: "AWS Deployment" },
    { icon: ICONS.server, label: "Shared Hosting", desc: "Deploy your website to normal shared hosting.", price: "from ₹500", action: "Deploy Website", service: "Shared Hosting Deployment" },
    { icon: ICONS.terminal, label: "Backend & API", desc: "Develop backend APIs, authentication, databases, and integrations.", price: "Custom pricing", action: "Request Backend", service: "Backend/API" },
  ];

  return (
    <section className={`py-16 ${dark ? "bg-slate-800/40" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon, label, desc, price, action, service }) => (
            <div key={label} className={`group relative flex flex-col rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5 ${dark ? "bg-slate-800 border-slate-700 hover:border-blue-500/50" : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-blue-600/10"}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-blue-600/10">
                  <Icon path={icon} size={20} className="text-blue-600" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"}`}>{price}</span>
              </div>
              <h3 className={`font-semibold text-base mb-2 ${dark ? "text-white" : "text-slate-900"}`}>{label}</h3>
              <p className={`text-sm leading-relaxed flex-1 mb-5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{desc}</p>
              <button onClick={() => scrollToForm(service)} className="w-full py-2.5 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                {action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({ dark, scrollToForm }: { dark: boolean; scrollToForm: (s: string) => void }) {
  const services = [
    { icon: ICONS.smartphone, name: "Android App Development", desc: "Native Android apps built with Java or Kotlin.", price: "from ₹1,000", service: "Android App" },
    { icon: ICONS.apple, name: "iOS App Development", desc: "iOS apps built for iPhone and iPad.", price: "from ₹2,000", service: "iOS App" },
    { icon: ICONS.globe, name: "Web Development", desc: "Responsive websites with modern HTML/CSS/JS.", price: "from ₹500", service: "Website" },
    { icon: ICONS.layout, name: "Web Application", desc: "Full-stack web apps with React and Node.js.", price: "from ₹2,000", service: "Web Application" },
    { icon: ICONS.server, name: "Backend Development", desc: "Scalable server-side logic with Python, Node.js, or Django.", price: "Custom", service: "Backend/API" },
    { icon: ICONS.link, name: "REST API Development", desc: "RESTful APIs with authentication and documentation.", price: "Custom", service: "Backend/API" },
    { icon: ICONS.database, name: "Database Integration", desc: "MySQL and PostgreSQL database design and integration.", price: "Custom", service: "Backend/API" },
    { icon: ICONS.lock, name: "Authentication Systems", desc: "JWT, OAuth, session-based auth implementation.", price: "Custom", service: "Backend/API" },
    { icon: ICONS.upload, name: "App Publishing", desc: "Upload your app to Google Play Store.", price: "₹500", service: "App Upload" },
    { icon: ICONS.cloud, name: "AWS Deployment", desc: "EC2, Nginx, SSL, domain, backend deployment.", price: "Custom", service: "AWS Deployment" },
    { icon: ICONS.server, name: "Shared Hosting Deployment", desc: "Deploy to cPanel or shared hosting environment.", price: "from ₹500", service: "Shared Hosting Deployment" },
    { icon: ICONS.shield, name: "Domain & SSL Setup", desc: "DNS configuration and SSL certificate installation.", price: "from ₹300", service: "Maintenance" },
    { icon: ICONS.wrench, name: "Bug Fixing", desc: "Debug and fix errors in existing code.", price: "Custom", service: "Bug Fixing" },
    { icon: ICONS.refresh, name: "Website Maintenance", desc: "Updates, content changes, and ongoing support.", price: "Custom", service: "Maintenance" },
    { icon: ICONS.link, name: "API Integration", desc: "Integrate third-party APIs and payment gateways.", price: "Custom", service: "Backend/API" },
    { icon: ICONS.layout, name: "UI Implementation", desc: "Convert designs to pixel-perfect code.", price: "Custom", service: "Website" },
    { icon: ICONS.grid, name: "Admin Dashboard", desc: "Custom admin panels and management interfaces.", price: "from ₹2,000", service: "Web Application" },
    { icon: ICONS.shopBag, name: "E-commerce Development", desc: "Online store with cart, payment, and order management.", price: "from ₹3,000", service: "Web Application" },
  ];

  return (
    <section id="services" className={`py-20 lg:py-28 ${dark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-600/10 text-blue-600 border border-blue-600/20">
            All Services
          </div>
          <h2 className={`font-display text-5xl lg:text-6xl font-bold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Everything You Need to<br />
            <span className="text-blue-600">Launch Your Project</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`}>
            From initial development to deployment and maintenance — full-stack support for every stage of your project.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ icon, name, desc, price, service }) => (
            <div key={name} className={`group flex flex-col rounded-xl p-5 border transition-all hover:shadow-lg hover:-translate-y-0.5 ${dark ? "bg-slate-800 border-slate-700 hover:border-blue-500/40" : "bg-slate-50 border-slate-200 hover:border-blue-200 hover:bg-white"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-600/10">
                  <Icon path={icon} size={18} className="text-blue-600" />
                </div>
                <h3 className={`font-semibold text-sm ${dark ? "text-white" : "text-slate-900"}`}>{name}</h3>
              </div>
              <p className={`text-sm leading-relaxed flex-1 mb-4 ${dark ? "text-slate-400" : "text-slate-500"}`}>{desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold text-sm">{price}</span>
                <button onClick={() => scrollToForm(service)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold border transition-colors ${dark ? "border-slate-600 text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white" : "border-slate-200 text-slate-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white"}`}>
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing({ dark, scrollToForm }: { dark: boolean; scrollToForm: (s: string) => void }) {
  const appTiers = [
    { type: "Simple App", price: "₹1,000" },
    { type: "Basic App", price: "₹2,000" },
    { type: "Medium App", price: "₹3,000 – ₹5,000" },
    { type: "Advanced App", price: "₹5,000 – ₹8,000" },
    { type: "Complex App", price: "₹8,000 – ₹10,000+" },
  ];

  const cards = [
    {
      label: "Basic Website",
      price: "₹500+",
      sub: "Web Development",
      features: ["Responsive HTML/CSS/JS", "Mobile-friendly layout", "Basic pages (Home, About, Contact)", "Deployment support", "Source code delivery"],
      cta: "Choose Website",
      service: "Website",
      highlight: false,
    },
    {
      label: "App Publishing",
      price: "₹500",
      sub: "App Upload",
      features: ["App preparation & review", "Store upload assistance", "Basic store configuration", "Screenshot & metadata setup", "Release support"],
      cta: "Upload My App",
      service: "App Upload",
      highlight: false,
    },
    {
      label: "Shared Hosting",
      price: "from ₹500",
      sub: "Hosting Deployment",
      features: ["File upload to cPanel", "Domain connection", "SSL certificate setup", "Basic hosting configuration"],
      cta: "Deploy Website",
      service: "Shared Hosting Deployment",
      highlight: false,
    },
    {
      label: "AWS Deployment",
      price: "Custom",
      sub: "Cloud Infrastructure",
      features: ["EC2 instance setup", "Backend deployment", "Database setup & config", "Nginx reverse proxy", "SSL + domain connection"],
      cta: "Deploy to AWS",
      service: "AWS Deployment",
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className={`py-20 lg:py-28 ${dark ? "bg-slate-800/40" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-600/10 text-blue-600 border border-blue-600/20">
            Pricing
          </div>
          <h2 className={`font-display text-5xl lg:text-6xl font-bold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Simple & <span className="text-blue-600">Affordable</span> Pricing
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`}>
            Choose the service you need. Get started without complicated pricing tiers.
          </p>
        </div>

        {/* Service pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {cards.map(({ label, price, sub, features, cta, service, highlight }) => (
            <div key={label} className={`relative flex flex-col rounded-2xl p-6 border transition-all hover:shadow-xl ${highlight ? "bg-blue-600 border-blue-500" : dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              {highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-blue-600 text-xs font-bold rounded-full shadow">MOST REQUESTED</div>}
              <div className={`text-xs font-semibold mb-3 ${highlight ? "text-blue-200" : "text-blue-600"}`}>{sub}</div>
              <h3 className={`font-semibold text-base mb-1 ${highlight ? "text-white" : dark ? "text-white" : "text-slate-900"}`}>{label}</h3>
              <div className={`text-3xl font-bold mb-5 ${highlight ? "text-white" : "text-blue-600"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{price}</div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${highlight ? "text-blue-100" : dark ? "text-slate-400" : "text-slate-600"}`}>
                    <Icon path={ICONS.check} size={14} className={`mt-0.5 flex-shrink-0 ${highlight ? "text-white" : "text-green-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollToForm(service)} className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors ${highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
                {cta}
              </button>
            </div>
          ))}
        </div>

        {/* App Development pricing */}
        <div className={`rounded-2xl border p-8 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-600/10 text-blue-600 border border-blue-600/20">
                App Development
              </div>
              <h3 className={`font-display text-4xl font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                ₹1,000 - ₹10,000+
              </h3>
              <p className={`text-sm mb-5 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Final pricing depends on your project requirements and complexity. Factors include:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["Number of screens", "Features required", "Backend & database", "Authentication", "API integrations", "Design complexity", "Development time", "Deployment needs"].map((f) => (
                  <div key={f} className={`flex items-center gap-2 text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <button onClick={() => scrollToForm("Android App")} className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors">
                Request App Development
                <Icon path={ICONS.arrowRight} size={14} />
              </button>
            </div>
            <div>
              <h4 className={`font-semibold text-sm mb-4 ${dark ? "text-slate-300" : "text-slate-700"}`}>App Development Estimates</h4>
              <div className={`rounded-xl overflow-hidden border ${dark ? "border-slate-700" : "border-slate-200"}`}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`${dark ? "bg-slate-700/60" : "bg-slate-50"}`}>
                      <th className={`text-left px-5 py-3 font-semibold ${dark ? "text-slate-300" : "text-slate-700"}`}>App Type</th>
                      <th className={`text-right px-5 py-3 font-semibold ${dark ? "text-slate-300" : "text-slate-700"}`}>Starting Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appTiers.map(({ type, price }, i) => (
                      <tr key={type} className={`border-t ${dark ? "border-slate-700" : "border-slate-100"} ${i % 2 === 0 ? "" : dark ? "bg-slate-800/40" : "bg-slate-50/50"}`}>
                        <td className={`px-5 py-3.5 ${dark ? "text-slate-300" : "text-slate-700"}`}>{type}</td>
                        <td className="px-5 py-3.5 text-right font-semibold text-blue-600">{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`text-xs mt-3 ${dark ? "text-slate-500" : "text-slate-400"}`}>
                * Final pricing depends on project requirements and features. Contact us for a precise quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks({ dark }: { dark: boolean }) {
  const steps = [
    { num: "01", title: "Tell Us Your Requirement", desc: "Submit the development request form with your project idea and specifications." },
    { num: "02", title: "Discuss the Project", desc: "We discuss features, technology stack, timeline, and pricing to align on your goals." },
    { num: "03", title: "Development", desc: "Development begins according to the agreed scope, with regular progress updates." },
    { num: "04", title: "Deploy & Launch", desc: "Your website or app is tested, deployed, and ready to go live." },
  ];

  return (
    <section id="how-it-works" className={`py-20 lg:py-28 ${dark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-600/10 text-blue-600 border border-blue-600/20">
            Process
          </div>
          <h2 className={`font-display text-5xl lg:text-6xl font-bold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`}>
            A simple, transparent process from idea to deployment.
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connector line */}
          <div className={`hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 ${dark ? "bg-slate-700" : "bg-slate-200"}`} />
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-blue-600 flex flex-col items-center justify-center mb-5 shadow-lg shadow-blue-600/30">
                <span className={`text-xs font-semibold text-blue-200 mb-0.5`}>{num}</span>
                <Icon path={num === "01" ? ICONS.fileText : num === "02" ? ICONS.phone : num === "03" ? ICONS.code : ICONS.zap} size={24} className="text-white" />
              </div>
              <h3 className={`font-semibold text-base mb-2 ${dark ? "text-white" : "text-slate-900"}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs({ dark }: { dark: boolean }) {
  const reasons = [
    { icon: ICONS.star, title: "Affordable", desc: "Development services designed for students, startups, and small businesses with budget-friendly pricing." },
    { icon: ICONS.checkCircle, title: "Flexible", desc: "Choose only the services you need — no bundled packages or unnecessary add-ons." },
    { icon: ICONS.zap, title: "Development Support", desc: "Get professional assistance throughout the entire development lifecycle." },
    { icon: ICONS.cloud, title: "Deployment Ready", desc: "Full deployment support including AWS cloud and shared hosting environments." },
    { icon: ICONS.upload, title: "App Publishing", desc: "Expert assistance publishing your existing apps to Google Play Store." },
    { icon: ICONS.phone, title: "Direct Communication", desc: "Reach us directly via phone or WhatsApp — no tickets, no delays." },
  ];

  return (
    <section className={`py-20 lg:py-28 ${dark ? "bg-slate-800/40" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-600/10 text-blue-600 border border-blue-600/20">
            Why Ascentracore
          </div>
          <h2 className={`font-display text-5xl lg:text-6xl font-bold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Why Choose <span className="text-blue-600">Us</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon, title, desc }) => (
            <div key={title} className={`rounded-xl p-6 border transition-all hover:shadow-md hover:-translate-y-0.5 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div className="p-2.5 rounded-lg bg-blue-600/10 w-fit mb-4">
                <Icon path={icon} size={20} className="text-blue-600" />
              </div>
              <h3 className={`font-semibold text-base mb-2 ${dark ? "text-white" : "text-slate-900"}`}>{title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Technologies ─────────────────────────────────────────────────────────────
function Technologies({ dark }: { dark: boolean }) {
  const techs = [
    { name: "Java", color: "bg-orange-500" },
    { name: "Android", color: "bg-green-600" },
    { name: "Kotlin", color: "bg-purple-600" },
    { name: "Python", color: "bg-blue-500" },
    { name: "Django", color: "bg-green-700" },
    { name: "React", color: "bg-cyan-500" },
    { name: "TypeScript", color: "bg-blue-600" },
    { name: "JavaScript", color: "bg-yellow-500" },
    { name: "HTML5", color: "bg-orange-600" },
    { name: "CSS3", color: "bg-blue-500" },
    { name: "MySQL", color: "bg-blue-700" },
    { name: "PostgreSQL", color: "bg-sky-700" },
    { name: "AWS", color: "bg-orange-500" },
    { name: "Linux", color: "bg-slate-600" },
    { name: "Nginx", color: "bg-green-600" },
    { name: "Git", color: "bg-red-600" },
  ];

  return (
    <section className={`py-20 ${dark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`font-display text-4xl lg:text-5xl font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Technologies We Work With
          </h2>
          <p className={`${dark ? "text-slate-400" : "text-slate-500"}`}>Modern tech stack for robust, scalable solutions.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map(({ name, color }) => (
            <div key={name} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${dark ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
              <span className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "How much does an app cost?", a: "App development starts from ₹1,000 and can go up to ₹10,000+, depending on features, screens, backend requirements, and complexity. Contact us for a precise estimate." },
    { q: "How much does a website cost?", a: "Basic website development starts from ₹500. Final pricing depends on the number of pages, features required, and design complexity." },
    { q: "Can you upload my existing app?", a: "Yes. App uploading and publishing assistance starts from ₹500. This includes app preparation, store configuration, screenshots, metadata, and release support." },
    { q: "Can you deploy my application to AWS?", a: "Yes. AWS deployment is available including EC2 setup, Nginx configuration, SSL, domain connection, and backend deployment. Pricing is custom based on requirements." },
    { q: "Can you deploy my website to shared hosting?", a: "Yes. Shared hosting deployment starts from ₹500 and includes file upload, domain connection, and SSL setup." },
    { q: "Can you develop the backend too?", a: "Yes. Backend development, REST APIs, database design, authentication systems, and third-party integrations are all available services." },
    { q: "Can I submit my project requirements online?", a: "Yes. Use the Development Request Form on this page to submit your requirements, budget, and preferred technology. We'll get back to you shortly." },
    { q: "How do I contact you directly?", a: "Call or WhatsApp us at +91 6305096514. Direct communication is always available — no support tickets or automated responses." },
  ];

  return (
    <section className={`py-20 lg:py-28 ${dark ? "bg-slate-800/40" : "bg-slate-50"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-600/10 text-blue-600 border border-blue-600/20">
            FAQ
          </div>
          <h2 className={`font-display text-5xl font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
        </div>
        <div className={`rounded-2xl border overflow-hidden ${dark ? "border-slate-700" : "border-slate-200"}`}>
          {faqs.map(({ q, a }, i) => (
            <div key={i} className={`border-b last:border-0 ${dark ? "border-slate-700" : "border-slate-100"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className={`w-full flex items-center justify-between px-6 py-5 text-left gap-4 transition-colors ${dark ? "hover:bg-slate-700/40" : "hover:bg-slate-50"}`}>
                <span className={`font-medium text-sm ${dark ? "text-white" : "text-slate-900"}`}>{q}</span>
                <Icon path={open === i ? ICONS.chevronUp : ICONS.chevronDown} size={16} className={`flex-shrink-0 ${dark ? "text-slate-400" : "text-slate-400"}`} />
              </button>
              {open === i && (
                <div className={`px-6 pb-5 text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
function WhatsAppCTA({ dark }: { dark: boolean }) {
  return (
    <section className="py-16 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Ready to Start Your Project?
        </h2>
        <p className="text-blue-100 text-lg mb-4">
          Have an app, website, or deployment requirement? Contact us directly.
        </p>
        <div className="text-3xl font-bold text-white mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>+91 6305096514</div>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="tel:+916305096514" className="flex items-center gap-2.5 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
            <Icon path={ICONS.phone} size={18} />
            Call Now
          </a>
          <a href="https://wa.me/916305096514" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={ICONS.whatsapp} /></svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Request Form ─────────────────────────────────────────────────────────────
function RequestForm({ dark, selectedService }: { dark: boolean; selectedService: string }) {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", email: "", service: selectedService,
    budget: "", description: "", features: "", tech: "", deployment: [], submitted: false,
  });

  useEffect(() => {
    if (selectedService) setForm((f) => ({ ...f, service: selectedService }));
  }, [selectedService]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleDeploy = (v: string) =>
    setForm((f) => ({ ...f, deployment: f.deployment.includes(v) ? f.deployment.filter((d) => d !== v) : [...f.deployment, v] }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm((f) => ({ ...f, submitted: true }));
  };

  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${dark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400"}`;
  const labelCls = `block text-sm font-medium mb-1.5 ${dark ? "text-slate-300" : "text-slate-700"}`;

  if (form.submitted) {
    return (
      <section id="contact-form" className={`py-20 ${dark ? "bg-slate-900" : "bg-white"}`}>
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
            <Icon path={ICONS.checkCircle} size={36} className="text-green-500" />
          </div>
          <h3 className={`font-display text-4xl font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Request Submitted Successfully!
          </h3>
          <p className={`text-lg mb-6 ${dark ? "text-slate-400" : "text-slate-500"}`}>We will contact you shortly at the provided details.</p>
          <button onClick={() => setForm({ name: "", phone: "", email: "", service: "", budget: "", description: "", features: "", tech: "", deployment: [], submitted: false })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className={`py-20 lg:py-28 ${dark ? "bg-slate-900" : "bg-white"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-600/10 text-blue-600 border border-blue-600/20">
            Development Request
          </div>
          <h2 className={`font-display text-5xl lg:text-6xl font-bold mb-4 ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Tell Us What You Want to <span className="text-blue-600">Build</span>
          </h2>
          <p className={`text-lg ${dark ? "text-slate-400" : "text-slate-500"}`}>Submit your requirements and we'll get back to you.</p>
        </div>

        <form onSubmit={submit} className={`rounded-2xl border p-8 ${dark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
          {/* Personal Info */}
          <div className={`text-xs font-bold uppercase tracking-widest mb-5 ${dark ? "text-slate-500" : "text-slate-400"}`}>Personal Information</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input required className={inputCls} placeholder="Your full name" value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input required className={inputCls} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set("phone")} />
            </div>
          </div>
          <div className="mb-8">
            <label className={labelCls}>Email Address *</label>
            <input required type="email" className={inputCls} placeholder="your@email.com" value={form.email} onChange={set("email")} />
          </div>

          {/* Project Info */}
          <div className={`text-xs font-bold uppercase tracking-widest mb-5 ${dark ? "text-slate-500" : "text-slate-400"}`}>Project Information</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className={labelCls}>Select Service *</label>
              <select required className={inputCls} value={form.service} onChange={set("service")}>
                <option value="">Choose service...</option>
                {["Android App", "iOS App", "Website", "Web Application", "Backend/API", "App Upload", "AWS Deployment", "Shared Hosting Deployment", "Bug Fixing", "Maintenance", "Other"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Project Budget</label>
              <select className={inputCls} value={form.budget} onChange={set("budget")}>
                <option value="">Select budget range...</option>
                {["₹500", "₹1,000", "₹1,000 – ₹3,000", "₹3,000 – ₹5,000", "₹5,000 – ₹10,000", "₹10,000+"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-5">
            <label className={labelCls}>Project Description *</label>
            <textarea required rows={4} className={inputCls} placeholder="Describe what you want to develop..." value={form.description} onChange={set("description")} />
          </div>
          <div className="mb-5">
            <label className={labelCls}>Required Features</label>
            <textarea rows={3} className={inputCls} placeholder="List the key features you need..." value={form.features} onChange={set("features")} />
          </div>
          <div className="mb-5">
            <label className={labelCls}>Preferred Technology</label>
            <select className={inputCls} value={form.tech} onChange={set("tech")}>
              <option value="">Select technology...</option>
              {["Android / Java", "Android / Kotlin", "React", "React + TypeScript", "HTML/CSS/JavaScript", "Python / Django", "Node.js", "PHP", "Other"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Deployment */}
          <div className="mb-8">
            <label className={labelCls}>Deployment Requirements</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["AWS", "Shared Hosting", "Cloud", "No Deployment Required"].map((d) => (
                <label key={d} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors ${form.deployment.includes(d) ? "bg-blue-600 border-blue-600 text-white" : dark ? "border-slate-600 text-slate-300 hover:border-slate-500" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  <input type="checkbox" className="sr-only" checked={form.deployment.includes(d)} onChange={() => toggleDeploy(d)} />
                  {d}
                </label>
              ))}
            </div>
          </div>

          {/* File upload */}
          {/* <div className={`mb-8 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${dark ? "border-slate-600 hover:border-slate-500" : "border-slate-200 hover:border-slate-300"}`}>
            <Icon path={ICONS.upload} size={24} className={`mx-auto mb-2 ${dark ? "text-slate-500" : "text-slate-400"}`} />
            <p className={`text-sm font-medium mb-1 ${dark ? "text-slate-400" : "text-slate-600"}`}>Upload Project Files</p>
            <p className={`text-xs ${dark ? "text-slate-600" : "text-slate-400"}`}>ZIP, PDF, DOC, images and other project requirement files</p>
          </div> */}

          <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-base transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:translate-y-[-1px] flex items-center justify-center gap-2">
            Submit Development Request
            <Icon path={ICONS.arrowRight} size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact({ dark }: { dark: boolean }) {
  const [sent, setSent] = useState(false);
  const [c, setC] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const set = (k: keyof typeof c) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setC((f) => ({ ...f, [k]: e.target.value }));
  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${dark ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400"}`;

  return (
    <section id="contact" className={`py-20 lg:py-28 ${dark ? "bg-slate-800/40" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 bg-blue-600/10 text-blue-600 border border-blue-600/20">
              Contact
            </div>
            <h2 className={`font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Let's Build Something <span className="text-blue-600">Together</span>
            </h2>
            <div className={`flex items-center gap-3 mb-8 text-lg font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>
              <div className="p-2 rounded-lg bg-blue-600/10">
                <Icon path={ICONS.phone} size={20} className="text-blue-600" />
              </div>
              +91 6305096514
            </div>
            <div className={`mb-8 ${dark ? "text-slate-400" : "text-slate-600"}`}>
              <p className="text-sm font-semibold mb-3 text-blue-600">Available Services</p>
              <ul className="space-y-2">
                {["App Development", "Web Development", "Backend Development", "App Uploading", "AWS Deployment", "Shared Hosting", "Maintenance"].map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm">
                    <Icon path={ICONS.check} size={14} className="text-green-500 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              <a href="tel:+916305096514" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors">
                <Icon path={ICONS.phone} size={16} />
                Call Now
              </a>
              <a href="https://wa.me/916305096514" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-sm transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={ICONS.whatsapp} /></svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right — contact form */}
          <div className={`rounded-2xl border p-8 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
            {sent ? (
              <div className="text-center py-8">
                <Icon path={ICONS.checkCircle} size={40} className="text-green-500 mx-auto mb-4" />
                <h3 className={`font-semibold text-xl mb-2 ${dark ? "text-white" : "text-slate-900"}`}>Message Sent!</h3>
                <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-slate-300" : "text-slate-700"}`}>Name *</label>
                    <input required className={inputCls} placeholder="Your name" value={c.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-slate-300" : "text-slate-700"}`}>Phone</label>
                    <input className={inputCls} placeholder="+91 XXXXX" value={c.phone} onChange={set("phone")} />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-slate-300" : "text-slate-700"}`}>Email *</label>
                  <input required type="email" className={inputCls} placeholder="your@email.com" value={c.email} onChange={set("email")} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-slate-300" : "text-slate-700"}`}>Service</label>
                  <select className={inputCls} value={c.service} onChange={set("service")}>
                    <option value="">Select service...</option>
                    {["App Development", "Web Development", "Backend Development", "App Uploading", "AWS Deployment", "Shared Hosting", "Maintenance", "Other"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-slate-300" : "text-slate-700"}`}>Message *</label>
                  <textarea required rows={4} className={inputCls} placeholder="Tell us about your project..." value={c.message} onChange={set("message")} />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors">
                  Send Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                {/* <Icon path={ICONS.code} size={16} className="text-white" /> */}
                 <img src="https://cdn.ascentracoresolutions.com/favicon.ico" alt="Ascentracore Solutions" className="text-white" />
              </div>
              <span className="font-display text-xl font-bold tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                <span className="text-blue-500">Ascentracore</span>
                <span className="text-white">&nbsp;Solutions</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Affordable software development, deployment, and technical services for startups, students, and businesses.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/916305096514" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-green-400"><path d={ICONS.whatsapp} /></svg>
              </a>
              <a href="tel:+916305096514" className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 transition-colors">
                <Icon path={ICONS.phone} size={18} className="text-blue-400" />
              </a>
              <a href="mailto:contact@ascentracoresolutions.com" className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                <Icon path={ICONS.mail} size={18} className="text-slate-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {["App Development", "Web Development", "Backend Development", "AWS Deployment", "App Uploading", "Hosting"].map((s) => (
                <li key={s}><a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["Home", "#home"], ["Services", "#services"], ["Pricing", "#pricing"], ["Contact", "#contact"], ["FAQ", "#faq"]].map(([label, href]) => (
                <li key={label}><a href={href} className="text-slate-400 hover:text-white text-sm transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Icon path={ICONS.phone} size={14} className="flex-shrink-0 text-blue-400" />
                +91 6305096514
              </div>
              <div className="flex items-start gap-2.5 text-slate-400 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 text-green-400 mt-0.5"><path d={ICONS.whatsapp} /></svg>
                WhatsApp Available
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className="text-slate-500 text-sm">© 2026 Ascentracore Solutions. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Professional Software Development Services</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Mobile Bottom Bar ────────────────────────────────────────────────────────
function MobileBar({ scrollToForm }: { scrollToForm: (s: string) => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="flex border-t bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl">
        <a href="tel:+916305096514" className="flex-1 flex flex-col items-center py-3 gap-1 text-slate-600 hover:text-blue-600 transition-colors">
          <Icon path={ICONS.phone} size={18} />
          <span className="text-xs font-medium">Call</span>
        </a>
        <a href="https://wa.me/916305096514" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center py-3 gap-1 text-green-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={ICONS.whatsapp} /></svg>
          <span className="text-xs font-medium">WhatsApp</span>
        </a>
        <button onClick={() => scrollToForm("")} className="flex-1 flex flex-col items-center py-3 gap-1 bg-blue-600 text-white">
          <Icon path={ICONS.arrowRight} size={18} />
          <span className="text-xs font-medium">Start Project</span>
        </button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const formRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollToForm = (service: string) => {
    setSelectedService(service);
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className={dark ? "dark bg-slate-900" : "bg-white"}>
      <Navbar dark={dark} setDark={setDark} />
      <Hero dark={dark} scrollToForm={scrollToForm} />
      <QuickServices dark={dark} scrollToForm={scrollToForm} />
      <ServicesGrid dark={dark} scrollToForm={scrollToForm} />
      <Pricing dark={dark} scrollToForm={scrollToForm} />
      <HowItWorks dark={dark} />
      <WhyUs dark={dark} />
      <Technologies dark={dark} />
      <WhatsAppCTA dark={dark} />
      <RequestForm dark={dark} selectedService={selectedService} />
      <FAQ dark={dark} />
      <Contact dark={dark} />
      <Footer />
      <MobileBar scrollToForm={scrollToForm} />
      {/* Bottom padding for mobile bar */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
