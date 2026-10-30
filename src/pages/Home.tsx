import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Terminal,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Users,
  Compass,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getSiteOverview, FALLBACK_SITE_OVERVIEW } from "../api/cmsApi";
import type { SiteOverview } from "../types/cms";

export default function Home() {
  const [data, setData] = useState<SiteOverview>(FALLBACK_SITE_OVERVIEW);

  useEffect(() => {
    getSiteOverview().then(setData);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ascentracoresolutions.com/#organization",
        "name": "Ascentracore Solutions",
        "url": "https://www.ascentracoresolutions.com",
        "logo": "https://cdn.ascentracoresolutions.com/ascentra.webp",
        "description": "Software development company engineering scalable web systems, in-browser compiler environments, and technical learning platforms.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+916305096514",
          "contactType": "Customer Service",
          "email": "contact@ascentracoresolutions.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ascentracoresolutions.com/#website",
        "url": "https://www.ascentracoresolutions.com",
        "name": "Ascentracore Solutions",
        "publisher": {
          "@id": "https://www.ascentracoresolutions.com/#organization",
        },
      },
    ],
  };

  return (
    <div className="bg-slate-950 text-slate-100">
      <SEOHead
        title="Ascentracore Solutions | Software Development, Cloud Architecture & Developer Platforms"
        description="Ascentracore Solutions engineers custom software systems, scalable backend architectures, developer tools like SkilTrix, and comprehensive programming resources."
        structuredData={structuredData}
      />

      {/* ── 1. Hero Section ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-900 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Ascentracore Solutions — Engineering & Technology</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Building Scalable Software, Developer Tools & High-Value Learning Platforms
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Ascentracore Solutions is an engineering-driven software company. We architect robust custom web systems, high-throughput cloud backends, in-browser developer tooling like <strong>SkilTrix</strong>, and comprehensive technical learning resources for developers worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                Browse Free Tutorials
              </Link>
              <a
                href="https://skiltrix.ascentracoresolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-blue-950/40 hover:bg-blue-900/40 text-blue-300 border border-blue-800/50 transition-all"
              >
                <Terminal className="w-4 h-4 text-blue-400" />
                Launch SkilTrix
                <ExternalLink className="w-3.5 h-3.5 text-blue-400/80" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. What Ascentracore Solutions Does (Core Pillars) ──────────── */}
      <section className="py-16 lg:py-24 border-b border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              What We Do: Engineering Across the Technology Lifecycle
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We bridge software development, developer tooling, and technical education to solve complex engineering challenges and empower developers with hands-on practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Software Development</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-lifecycle engineering of custom web applications, scalable REST/ASGI APIs, and cloud microservices built with Python, Django, React, and TypeScript.
              </p>
              <Link to="/services/custom-software-development" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300">
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Developer Tooling & Compilers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Specialized in-browser development environments, Monaco Editor language extensions, AST syntax validators, and cloud sandbox simulators like the SkilTrix ABAP Compiler.
              </p>
              <Link to="/products/skiltrix" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300">
                Explore tools <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Educational Technology</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive, original technical learning platforms featuring automated test-case scoring, recruitment mock assessments, and in-depth software engineering guides.
              </p>
              <Link to="/tutorials" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300">
                View tutorials <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Featured Products Showcase ────────────────────────────────── */}
      <section className="py-16 lg:py-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                Our Software Platforms
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Featured Products & Solutions
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white"
            >
              View all products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.featured_products.map((product) => (
              <div
                key={product.slug}
                className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">
                      {product.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Product ID: {product.slug}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-xs font-semibold text-slate-300 mb-3">{product.tagline}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{product.description}</p>

                  <div className="space-y-2 mb-6">
                    {product.features?.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {product.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${product.slug}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      Technical Overview
                    </Link>
                    {product.website_url && (
                      <a
                        href={product.website_url}
                        target={product.website_url.startsWith("http") ? "_blank" : undefined}
                        rel={product.website_url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      >
                        Launch
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Engineering Case Studies (Real Project Retrospectives) ───── */}
      <section className="py-16 lg:py-24 border-b border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Real Engineering Results
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Production Case Studies
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white"
            >
              View all case studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.featured_case_studies.map((cs) => (
              <div
                key={cs.slug}
                className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    {cs.project_name}
                  </span>
                  <span className="text-xs text-slate-400">{cs.client_or_type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{cs.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{cs.summary}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {cs.technology_used?.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  Read Architecture Breakdown <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Latest Tutorials & Learning Resources ─────────────────────── */}
      <section className="py-16 lg:py-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                Developer Knowledge Hub
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Featured Programming Tutorials
              </h2>
            </div>
            <Link
              to="/tutorials"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white"
            >
              Browse all categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.recent_tutorials.map((tut) => (
              <div
                key={`${tut.category}-${tut.slug}`}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tut.category_display || tut.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {tut.estimated_reading_time} min read
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {tut.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    {tut.introduction}
                  </p>
                </div>

                <Link
                  to={`/tutorials/${tut.category}/${tut.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
                >
                  Start Reading <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Latest Engineering Articles ──────────────────────────────── */}
      <section className="py-16 lg:py-24 border-b border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                Engineering Blog & Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Latest Articles
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white"
            >
              Browse all articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.recent_posts.map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-blue-400">
                      {post.category?.name || "Architecture"}
                    </span>
                    <span>{post.reading_time} min read</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  Read full article <ArrowRight className="w-3 h-3" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Why Choose Ascentracore Solutions ──────────────────────────── */}
      <section className="py-16 lg:py-24 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Why Choose Ascentracore Solutions
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We write clean, testable code and architect resilient systems that scale without technical debt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-blue-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Production Reliability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero-downtime deployment pipelines, strict database indexing, and automatic systemd process supervision.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <Zap className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Sub-Second Speed</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asynchronous ASGI workers, optimized queries with no N+1 bottlenecks, and lightweight client bundles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <Compass className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Clean Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Domain-driven design, strong TypeScript types, and decoupled API service layers for long-term maintainability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <Users className="w-8 h-8 text-purple-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Community & Learning</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thousands of developers engage with our community platforms, compilers, and educational problem sets daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Contact & Collaboration CTA ──────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
            Have a Project in Mind or Want to Collaborate?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you need custom software development, cloud infrastructure architecture, or developer tooling, our engineering team is ready to assist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all"
            >
              Get in Touch with Us
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
            >
              About the Company
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { Home };

