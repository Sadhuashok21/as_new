import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname || '/404';

  return (
    <>
      <SEOHead
        title="404 Not Found || Ascentracore Solutions"
        description="Your requested url was not found on this server. We will fix soon. Thank you for your patience."
        canonicalUrl="/404"
      />

      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-slate-100 font-sans">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-4xl w-full">
          {/* Status Illustration from Ascentracore CDN */}
          <img
            src="https://cdn.ascentracoresolutions.com/status/404.webp"
            alt="404"
            className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain flex-shrink-0"
          />

          {/* Error Description & Logo */}
          <div className="text-left flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.ascentracoresolutions.com/ascentra.webp"
                alt="logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Ascentracore Solutions
              </span>
            </div>

            <p className="text-lg md:text-xl font-semibold text-slate-200 mt-2">
              404 That&apos;s an error
            </p>

            <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed">
              Your requested url <b className="text-emerald-400 font-mono break-all">{currentPath}</b> was not found on this server. We will fix soon.
            </p>

            <p className="text-slate-400 text-sm md:text-base mt-4">
              Thank you for your patience.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-sm transition-colors shadow-sm"
              >
                <Home className="w-4 h-4" /> Go to Homepage
              </Link>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-sm transition-colors border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
