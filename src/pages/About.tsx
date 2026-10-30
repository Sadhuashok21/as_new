import { Link } from "react-router-dom";
import { Target, Users, Code2, Globe, Database, Cloud } from "lucide-react";
import SEOHead from "../components/SEOHead";

export default function About() {
  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title="About Us | Ascentracore Solutions"
        description="Learn about Ascentracore Solutions: our mission to build reliable enterprise software systems, developer compilers like SkilTrix, and open educational technology."
        canonicalUrl="https://www.ascentracoresolutions.com/about"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Users className="w-3.5 h-3.5" />
            Company & Mission
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineering Systems Built for Scale, Longevity & Developer Growth
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Ascentracore Solutions is a technology and software development company founded to build resilient digital systems, interactive developer platforms, and accessible programming knowledge.
          </p>
        </div>

        {/* Core Mission */}
        <div className="p-8 lg:p-12 rounded-3xl bg-slate-900 border border-slate-800 mb-16 space-y-6">
          <div className="flex items-center gap-3 text-blue-400">
            <Target className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            We believe that modern software should be robust, transparent, and built with craftsmanship. Too much software today suffers from bloat, opaque dependencies, and fragility under load. Our objective is to design clean, high-throughput architectures that stand the test of time while empowering the global developer community through platforms like <strong>SkilTrix</strong> and <strong>SFS Blueprints</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800 text-xs">
            <div>
              <strong className="text-white block mb-1">Architecture First</strong>
              <span className="text-slate-400">We invest in database normalization, index profiling, and asynchronous concurrency before writing a single line of business logic.</span>
            </div>
            <div>
              <strong className="text-white block mb-1">Democratizing Practice</strong>
              <span className="text-slate-400">Through our in-browser compiler simulators, we eliminate hardware and licensing barriers for developers entering specialized fields like SAP ABAP.</span>
            </div>
            <div>
              <strong className="text-white block mb-1">Authentic Knowledge</strong>
              <span className="text-slate-400">All tutorials and technical guides published on our platform reflect verified engineering reality, tested in production environments.</span>
            </div>
          </div>
        </div>

        {/* Technology Capabilities */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Core Engineering Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Code2 className="w-7 h-7 text-blue-400" />
              <h3 className="font-bold text-white text-base">Backend & APIs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Python, Django, Django REST Framework, Daphne ASGI, Channels WebSockets, Microservices.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Globe className="w-7 h-7 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Modern Frontend</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                React 19, TypeScript, Tailwind CSS, Monaco Editor, Vite, Accessible Semantic HTML.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Database className="w-7 h-7 text-amber-400" />
              <h3 className="font-bold text-white text-base">Data & Storage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PostgreSQL, MySQL, Redis Caching, Connection Pooling, Query Profiling & Optimization.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Cloud className="w-7 h-7 text-purple-400" />
              <h3 className="font-bold text-white text-base">Cloud & DevOps</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AWS EC2, Ubuntu Linux, Nginx Upstream Clusters, Systemd, Automated Let's Encrypt SSL.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Ecosystem */}
        <div className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Our Product Ecosystem</h2>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ascentracore Solutions operates multiple production platforms serving thousands of engineers and creators worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/products/skiltrix" className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/20">
              SkilTrix Coding Platform &rarr;
            </Link>
            <Link to="/products/sfs-blueprints" className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/20">
              SFS Blueprints Community &rarr;
            </Link>
            <Link to="/case-studies" className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/20">
              Technical Case Studies &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { About };

