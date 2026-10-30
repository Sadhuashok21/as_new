import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  Code2,
  Copy,
  Check,
  BookOpen,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdSlot from "../components/AdSlot";
import { getTutorialDetail } from "../api/cmsApi";
import type { Tutorial } from "../types/cms";

export default function TutorialView() {
  const { category = "", slug = "" } = useParams<{ category: string; slug: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (category && slug) {
      setLoading(true);
      getTutorialDetail(category, slug).then((res) => {
        setTutorial(res);
        setLoading(false);
      });
    }
  }, [category, slug]);

  const handleCopyCode = () => {
    if (tutorial?.code_examples) {
      navigator.clipboard.writeText(tutorial.code_examples);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Tutorial Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">
          The requested tutorial could not be found.
        </p>
        <Link to={`/tutorials/${category}`} className="text-purple-400 font-bold hover:underline">
          &larr; Back to {category.toUpperCase()} track
        </Link>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": tutorial.title,
    "description": tutorial.introduction,
    "articleSection": tutorial.category_display || tutorial.category,
    "author": {
      "@type": "Person",
      "name": tutorial.author?.name || "Ascentracore Engineering Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ascentracore Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.ascentracoresolutions.com/ascentra.webp",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ascentracoresolutions.com/tutorials/${tutorial.category}/${tutorial.slug}`,
    },
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title={`${tutorial.title} | Ascentracore Solutions`}
        description={tutorial.introduction}
        canonicalUrl={`https://www.ascentracoresolutions.com/tutorials/${tutorial.category}/${tutorial.slug}`}
        ogType="article"
        publishedTime={tutorial.published_date}
        authorName={tutorial.author?.name}
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <article className="lg:col-span-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
              <Link to="/tutorials" className="hover:text-white">Tutorials</Link>
              <span>/</span>
              <Link to={`/tutorials/${tutorial.category}`} className="hover:text-white capitalize">
                {tutorial.category_display || tutorial.category}
              </Link>
              <span>/</span>
              <span className="text-slate-300 truncate max-w-xs">{tutorial.title}</span>
            </nav>

            <header className="mb-10 pb-8 border-b border-slate-900">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                  {tutorial.category_display || tutorial.category}
                </span>
                <span className="text-xs text-slate-400 capitalize px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {tutorial.difficulty}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {tutorial.estimated_reading_time} min read
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
                {tutorial.title}
              </h1>

              <p className="text-base text-slate-300 leading-relaxed font-medium">
                {tutorial.introduction}
              </p>
            </header>

            {/* Tutorial Body */}
            <div className="prose prose-invert prose-purple max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 mb-10 whitespace-pre-line">
              {tutorial.content}
            </div>

            {/* Code Examples Section */}
            {tutorial.code_examples && (
              <div className="my-10 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                      Demonstration Code Snippet
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
                <div className="p-5 font-mono text-xs text-purple-200 bg-slate-950/90 overflow-x-auto">
                  <pre className="whitespace-pre leading-relaxed">{tutorial.code_examples}</pre>
                </div>
              </div>
            )}

            {/* AdSlot (Permitted publisher screen) */}
            <AdSlot slotId="tutorial-view-ad" />

            {/* Practice in Compiler CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-900/40 flex items-center justify-between gap-4 mt-8">
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Want to run and execute code right now?</h3>
                <p className="text-xs text-slate-400">Launch SkilTrix CodeLab to practice coding problems in an interactive browser IDE.</p>
              </div>
              <a
                href="https://skiltrix.ascentracoresolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shrink-0 transition-colors shadow-md"
              >
                Open Compiler &rarr;
              </a>
            </div>
          </article>

          {/* Sidebar: Track Navigation & Sibling Tutorials */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  {tutorial.category_display || tutorial.category} Track Lessons
                </h2>
              </div>

              {tutorial.category_siblings && tutorial.category_siblings.length > 0 ? (
                <div className="space-y-2">
                  {tutorial.category_siblings.map((sib, i) => {
                    const isCurrent = sib.slug === tutorial.slug;
                    return (
                      <Link
                        key={sib.slug}
                        to={`/tutorials/${tutorial.category}/${sib.slug}`}
                        className={`block p-3 rounded-xl text-xs transition-colors ${
                          isCurrent
                            ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 font-bold"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] text-slate-500">Lesson #{i + 1}</span>
                          <span className="text-[10px] uppercase text-slate-500">{sib.difficulty}</span>
                        </div>
                        <div className="truncate">{sib.title}</div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500">More lessons being added to this track.</p>
              )}

              <div className="mt-6 pt-4 border-t border-slate-800">
                <Link
                  to="/tutorials"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  View All Technology Tracks
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export { TutorialView };

