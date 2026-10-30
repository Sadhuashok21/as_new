import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getCaseStudies } from "../api/cmsApi";
import type { CaseStudy } from "../types/cms";

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCaseStudies().then((res) => {
      setStudies(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title="Engineering Case Studies | Ascentracore Solutions"
        description="Read technical retrospectives of real software platforms built by Ascentracore Solutions: SkilTrix, SFS Blueprints, SonicOra, and Transport Hub."
        canonicalUrl="https://www.ascentracoresolutions.com/case-studies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Engineering Retrospectives
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Production Case Studies
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Transparent architectural breakdowns of real software systems engineered by Ascentracore Solutions. We detail the background, problem, technical solution, challenges overcome, and lessons learned.
          </p>
        </div>

        {/* Case Studies Grid */}
        {loading ? (
          <div className="py-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs">Loading case studies...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studies.map((cs) => (
              <div
                key={cs.slug}
                className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      {cs.project_name}
                    </span>
                    <span className="text-xs text-slate-500">{cs.client_or_type}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
                    <Link to={`/case-studies/${cs.slug}`} className="hover:text-emerald-400 transition-colors">
                      {cs.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {cs.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cs.technology_used?.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-800 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-mono">
                    Project: {cs.project_name}
                  </div>
                  <Link
                    to={`/case-studies/${cs.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    Read Architectural Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { CaseStudies };

