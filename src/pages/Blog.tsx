import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, Search, Clock, ArrowRight } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getBlogPosts } from "../api/cmsApi";
import type { BlogPost, Category } from "../types/cms";

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    setLoading(true);
    getBlogPosts({
      category: selectedCategory === "all" ? undefined : selectedCategory,
      q: searchQuery || undefined,
    }).then((res) => {
      setPosts(res.posts);
      setCategories(res.categories);
      setLoading(false);
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    if (slug === "all") {
      next.delete("category");
    } else {
      next.set("category", slug);
    }
    setSearchParams(next);
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title="Engineering Blog & System Architecture | Ascentracore Solutions"
        description="In-depth technical articles on system architecture, zero-downtime AWS deployments, Django query optimization, and modern React 19 engineering."
        canonicalUrl="https://www.ascentracoresolutions.com/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Ascentracore Technical Journal
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineering Blog & System Architecture
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Practical architectural insights, production postmortems, performance profiling guides, and full-stack software development best practices.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const next = new URLSearchParams(searchParams);
                if (e.target.value) {
                  next.set("q", e.target.value);
                } else {
                  next.delete("q");
                }
                setSearchParams(next);
              }}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs">Loading articles...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-2">No matching articles found</h3>
            <p className="text-xs text-slate-400 mb-4">Try clearing filters or search terms.</p>
            <button
              onClick={() => setSearchParams(new URLSearchParams())}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="p-7 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-blue-400">
                      {post.category?.name || "Architecture"}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {post.reading_time} min read
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white mb-3 leading-snug hover:text-blue-400 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { Blog };

