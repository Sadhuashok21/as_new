import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { cmsApi } from '../api/cmsApi';
import { Search as SearchIcon, BookOpen, FileCode, Layers, Loader2, Sparkles } from 'lucide-react';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<{
    posts: any[];
    tutorials: any[];
    case_studies: any[];
    resources: any[];
  }>({
    posts: [],
    tutorials: [],
    case_studies: [],
    resources: []
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (queryParam.trim()) {
      executeSearch(queryParam);
    }
  }, [queryParam]);

  const executeSearch = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    try {
      const data = await cmsApi.search(term);
      setResults(data);
      setHasSearched(true);
    } catch (e) {
      console.error("Search failed", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const totalResults = results.posts.length + results.tutorials.length + results.case_studies.length + results.resources.length;

  return (
    <>
      <SEOHead
        title={queryParam ? `Search Results for "${queryParam}" | Ascentracore Solutions` : "Search Technology Resources | Ascentracore Solutions"}
        description="Search engineering tutorials, architecture case studies, developer resources, and technical articles on Ascentracore Solutions."
        canonicalUrl="/search"
      />

      {/* Header & Search Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white mb-4">
            Search Resources & Knowledge Base
          </h1>
          <p className="text-slate-400 mb-6">
            Explore developer tutorials, cloud architecture benchmarks, case studies, and engineering articles.
          </p>

          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics (e.g. Django, Microservices, Python, Docker, Redis)..."
                className="w-full pl-12 pr-28 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition-colors text-sm flex items-center gap-1.5"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
              </button>
            </div>
          </form>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-400">
            <span>Popular topics:</span>
            {['Docker', 'Python', 'PostgreSQL', 'Django', 'Algorithms', 'Microservices'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setQuery(tag);
                  setSearchParams({ q: tag });
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Container - Strictly NO AdSense ads on search screens per policy */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-3" />
            <p className="text-sm">Searching knowledge base...</p>
          </div>
        )}

        {!loading && hasSearched && totalResults === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
            <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No matching resources found</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-6 text-sm">
              We couldn't find any articles or guides matching "{queryParam}". Try checking spelling, using broader keywords, or browse our directories.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/tutorials" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm">
                Browse Tutorials
              </Link>
              <Link to="/blog" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm">
                Explore Blog
              </Link>
            </div>
          </div>
        )}

        {!loading && hasSearched && totalResults > 0 && (
          <div className="space-y-10">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-sm text-slate-400">
              <span>Showing results for <strong className="text-white">"{queryParam}"</strong></span>
              <span className="font-semibold text-emerald-400">{totalResults} matches found</span>
            </div>

            {/* Tutorials */}
            {results.tutorials.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-emerald-400" /> Technical Tutorials ({results.tutorials.length})
                </h2>
                <div className="space-y-3">
                  {results.tutorials.map((tut: any) => (
                    <Link
                      key={tut.id}
                      to={`/tutorials/${tut.category_slug || 'backend'}/${tut.slug}`}
                      className="block p-4 bg-slate-900/70 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors"
                    >
                      <h3 className="text-base font-semibold text-white group-hover:text-emerald-400">{tut.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{tut.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="uppercase text-emerald-400">{tut.category_slug}</span>
                        <span>•</span>
                        <span>{tut.difficulty}</span>
                        <span>•</span>
                        <span>{tut.estimated_minutes} min read</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Blog Posts */}
            {results.posts.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" /> Engineering Blog ({results.posts.length})
                </h2>
                <div className="space-y-3">
                  {results.posts.map((post: any) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="block p-4 bg-slate-900/70 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors"
                    >
                      <h3 className="text-base font-semibold text-white">{post.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span>{post.category_name}</span>
                        <span>•</span>
                        <span>{post.reading_time_minutes} min read</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Case Studies */}
            {results.case_studies.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" /> Case Studies ({results.case_studies.length})
                </h2>
                <div className="space-y-3">
                  {results.case_studies.map((cs: any) => (
                    <Link
                      key={cs.id}
                      to={`/case-studies/${cs.slug}`}
                      className="block p-4 bg-slate-900/70 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors"
                    >
                      <h3 className="text-base font-semibold text-white">{cs.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cs.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span>{cs.client_industry}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="py-12 grid sm:grid-cols-3 gap-6">
            <Link to="/tutorials" className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-slate-700">
              <FileCode className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="font-bold text-white mb-1">Interactive Tutorials</h3>
              <p className="text-xs text-slate-400">Step-by-step guides for Python, Java, Django, and DSA.</p>
            </Link>
            <Link to="/blog" className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-slate-700">
              <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold text-white mb-1">Engineering Articles</h3>
              <p className="text-xs text-slate-400">Deep dives into distributed systems, scale, and compilers.</p>
            </Link>
            <Link to="/case-studies" className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-slate-700">
              <Layers className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold text-white mb-1">Architecture Case Studies</h3>
              <p className="text-xs text-slate-400">Real production deployments, architectures, and metrics.</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
