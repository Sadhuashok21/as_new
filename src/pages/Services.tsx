import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Globe,
  Server,
  Cloud,
  Terminal,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Layers,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getServices } from "../api/cmsApi";
import type { Service } from "../types/cms";

const ICON_MAP: Record<string, any> = {
  code: Code2,
  globe: Globe,
  server: Server,
  cloud: Cloud,
  terminal: Terminal,
  cpu: Cpu,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title="Software Engineering & Cloud Services | Ascentracore Solutions"
        description="Explore custom software development, high-throughput backend APIs, modern web apps with React & TypeScript, and AWS cloud deployment services."
        canonicalUrl="https://www.ascentracoresolutions.com/services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            Engineering Solutions
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Software Engineering & Cloud Infrastructure Services
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Ascentracore Solutions delivers end-to-end development services tailored to mission-critical systems, high-concurrency web platforms, and specialized developer tooling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const IconComp = ICON_MAP[svc.icon_name] || Code2;
            return (
              <div
                key={svc.slug}
                className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3">{svc.name}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {svc.short_description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Key Deliverables:
                    </div>
                    {svc.deliverables?.slice(0, 3).map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {svc.technologies?.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 lg:p-12 rounded-3xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl font-bold text-white">Need a Custom Software Solution?</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Contact our engineering architects directly to discuss technical requirements, architecture planning, and deployment timelines.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shrink-0 shadow-lg shadow-blue-600/20 transition-all"
          >
            Start a Conversation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export { Services };

