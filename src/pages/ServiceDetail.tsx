import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Code2,
  Globe,
  Server,
  Cloud,
  Terminal,
  Cpu,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdSlot from "../components/AdSlot";
import { getServiceDetail } from "../api/cmsApi";
import type { Service } from "../types/cms";

const ICON_MAP: Record<string, any> = {
  code: Code2,
  globe: Globe,
  server: Server,
  cloud: Cloud,
  terminal: Terminal,
  cpu: Cpu,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getServiceDetail(slug).then((res) => {
        setService(res);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">The requested engineering service could not be located.</p>
        <Link to="/services" className="text-blue-400 font-bold hover:underline">
          &larr; Back to all services
        </Link>
      </div>
    );
  }

  const IconComp = ICON_MAP[service.icon_name] || Code2;

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title={`${service.name} | Ascentracore Solutions`}
        description={service.short_description}
        canonicalUrl={`https://www.ascentracoresolutions.com/services/${service.slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Services
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <IconComp className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {service.name}
            </h1>
          </div>

          <p className="text-slate-300 text-base leading-relaxed">
            {service.short_description}
          </p>
        </div>

        {/* Detailed Description */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 mb-10">
          <h2 className="text-lg font-bold text-white">Engineering Methodology & Scope</h2>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {service.full_description}
          </p>

          <div className="pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                Key Benefits & Outcomes
              </h3>
              <ul className="space-y-2.5">
                {service.benefits?.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                Engineering Deliverables
              </h3>
              <ul className="space-y-2.5">
                {service.deliverables?.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Supported Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* AdSense Placement (Approved on content-rich service detail) */}
        <AdSlot slotId="service-detail-ad" />

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/50 to-slate-900 border border-blue-900/40 text-center space-y-4">
          <h3 className="text-lg font-bold text-white">Interested in This Engineering Service?</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Get in touch with our solutions architects to schedule a technical discovery call.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Contact Engineering Team <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ServiceDetail };

