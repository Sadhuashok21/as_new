import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  ExternalLink,
  Briefcase,
  CheckCircle2,
  Layers,
  Code2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdSlot from "../components/AdSlot";
import { getCaseStudyDetail } from "../api/cmsApi";
import type { CaseStudy } from "../types/cms";

export default function CaseStudyDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [cs, setCs] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getCaseStudyDetail(slug).then((res) => {
        setCs(res);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!cs) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Case Study Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">The requested case study could not be located.</p>
        <Link to="/case-studies" className="text-emerald-400 font-bold hover:underline">
          &larr; Back to all case studies
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title={`${cs.project_name}: ${cs.title} | Case Study`}
        description={cs.summary}
        canonicalUrl={`https://www.ascentracoresolutions.com/case-studies/${cs.slug}`}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/case-studies" className="hover:text-white">Case Studies</Link>
          <span>/</span>
          <span className="text-slate-300 truncate">{cs.project_name}</span>
        </nav>

        {/* Case Study Header */}
        <header className="mb-12 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {cs.project_name}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Type: {cs.client_or_type}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            {cs.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium mb-6">
            {cs.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-900">
            <div className="flex flex-wrap gap-2">
              {cs.technology_used?.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {cs.live_url && (
              <a
                href={cs.live_url}
                target={cs.live_url.startsWith("http") ? "_blank" : undefined}
                rel={cs.live_url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                Visit Live Platform
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </header>

        {/* Retrospective Sections */}
        <div className="space-y-12">
          {/* Background */}
          {cs.background && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Project Background & Context
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {cs.background}
              </div>
            </section>
          )}

          {/* Problem Statement */}
          {cs.problem && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                The Core Problem & Constraints
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {cs.problem}
              </div>
            </section>
          )}

          {/* Technical Solution & Architecture */}
          {cs.solution && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                The Engineering Solution
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {cs.solution}
              </div>
            </section>
          )}

          {/* Architecture */}
          {cs.architecture && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                System Architecture
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line p-6 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-purple-200">
                {cs.architecture}
              </div>
            </section>
          )}

          {/* Challenges Faced */}
          {cs.challenges && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                Key Engineering Challenges Overcome
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {cs.challenges}
              </div>
            </section>
          )}

          {/* Results & Lessons Learned */}
          {cs.results && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Verified Results & Outcomes
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {cs.results}
              </div>
            </section>
          )}

          {cs.lessons_learned && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Lessons Learned & Architectural Takeaways
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                {cs.lessons_learned}
              </div>
            </section>
          )}
        </div>

        {/* AdSense Placement */}
        <AdSlot slotId="case-study-bottom-ad" />

        <div className="mt-14 pt-8 border-t border-slate-900 flex items-center justify-between">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Case Studies Overview
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white"
          >
            Discuss a Similar Project &rarr;
          </Link>
        </div>
      </article>
    </div>
  );
}

export { CaseStudyDetail };

