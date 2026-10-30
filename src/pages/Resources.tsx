import { useState, useEffect } from "react";
import { Compass, Download, ExternalLink } from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdSlot from "../components/AdSlot";
import { getResources } from "../api/cmsApi";
import type { Resource } from "../types/cms";

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [types, setTypes] = useState<Array<{ id: string; name: string; count: number }>>([]);
  const [activeType, setActiveType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getResources({ type: activeType === "all" ? undefined : activeType }).then((res) => {
      setResources(res.resources);
      setTypes(res.types);
      setLoading(false);
    });
  }, [activeType]);

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title="Developer Resources, Roadmaps & Cheat Sheets | Ascentracore Solutions"
        description="Free, curated developer roadmaps, Python/Java syntax cheat sheets, system design interview guides, and developer productivity tools."
        canonicalUrl="https://www.ascentracoresolutions.com/resources"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Compass className="w-3.5 h-3.5" />
            Curated Toolkits
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Developer Resources & Roadmaps
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Essential reference documents, architectural cheat sheets, engineering career roadmaps, and interview preparation materials compiled by Ascentracore engineers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveType("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeType === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Resources
          </button>
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeType === t.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        {loading ? (
          <div className="py-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs">Loading resources...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {resources.map((res) => (
              <div
                key={res.slug}
                className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {res.resource_type_display}
                      </span>
                      {res.badge_text && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {res.badge_text}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {res.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                      {res.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {res.download_url && (
                      <a
                        href={res.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                      </a>
                    )}
                    {res.external_url && (
                      <a
                        href={res.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      >
                        External Link
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content preview if present */}
                {res.content && (
                  <div className="mt-6 pt-6 border-t border-slate-800 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed overflow-x-auto">
                    {res.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* AdSlot Placement */}
        <AdSlot slotId="resources-hub-ad" />
      </div>
    </div>
  );
}

export { Resources };

