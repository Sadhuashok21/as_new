import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  CheckCircle2,
  Layers,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getProducts } from "../api/cmsApi";
import type { Product } from "../types/cms";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title="Products & Platforms | Ascentracore Solutions"
        description="Discover software products engineered by Ascentracore Solutions, including the SkilTrix developer platform, SFS Blueprints, SonicOra, and Transport Hub."
        canonicalUrl="https://www.ascentracoresolutions.com/products"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            Software Products
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Software Products & Developer Platforms
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Ascentracore Solutions builds and operates modern platforms spanning in-browser developer tooling, creator communities, streaming audio, and real-time fleet logistics.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
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

                <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
                <p className="text-xs font-semibold text-slate-300 mb-3">{product.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{product.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Key Features:
                  </div>
                  {product.features?.map((feat, idx) => (
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
                      Launch Platform
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Products };

