import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdSlot from "../components/AdSlot";
import { getProductDetail } from "../api/cmsApi";
import type { Product } from "../types/cms";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getProductDetail(slug).then((res) => {
        setProduct(res);
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

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">The requested product could not be found.</p>
        <Link to="/products" className="text-blue-400 font-bold hover:underline">
          &larr; Back to all products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title={`${product.name} | Ascentracore Solutions`}
        description={product.description}
        canonicalUrl={`https://www.ascentracoresolutions.com/products/${product.slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Products
          </Link>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">
              {product.status}
            </span>
            <span className="text-xs font-mono text-slate-500">Product: {product.slug}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {product.name}
          </h1>
          <p className="text-slate-300 text-base font-medium leading-relaxed mb-4">
            {product.tagline}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {product.website_url && (
              <a
                href={product.website_url}
                target={product.website_url.startsWith("http") ? "_blank" : undefined}
                rel={product.website_url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
              >
                Launch Application
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {product.documentation_url && (
              <a
                href={product.documentation_url}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                Documentation & Tutorials
              </a>
            )}
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 mb-10">
          <h2 className="text-lg font-bold text-white">Platform Capabilities & Architecture</h2>
          <div className="space-y-3">
            {product.features?.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AdSense Placement */}
        <AdSlot slotId="product-detail-ad" />

        {/* Related Case Study Link if available */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Want to read the engineering case study?</h3>
            <p className="text-xs text-slate-400">Discover our technical decisions, performance benchmarks, and lessons learned.</p>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 shrink-0 ml-4"
          >
            Case Studies <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ProductDetail };

