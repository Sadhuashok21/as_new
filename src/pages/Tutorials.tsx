import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Search,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getTutorials } from "../api/cmsApi";
import type { Tutorial } from "../types/cms";

const CATEGORIES = [
  { id: "python", name: "Python", desc: "Object-oriented programming, data science, web scraping, and scripting." },
  { id: "java", name: "Java", desc: "Core Java, JVM internals, Collections Framework, multithreading & Spring Boot." },
  { id: "django", name: "Django", desc: "Django REST Framework, ORM query optimizations, auth, and production deployment." },
  { id: "dsa", name: "DSA", desc: "Arrays, Linked Lists, Trees, Two-Pointers, Dynamic Programming, and Binary Search." },
  { id: "linux", name: "Linux", desc: "Command line, permissions, Bash automation, SSH hardening, and server administration." },
  { id: "react", name: "React", desc: "Hooks, component lifecycles, state management, and modern React 19 architecture." },
  { id: "javascript", name: "JavaScript", desc: "ES6+, Event Loop, Promises, Async/Await, and browser DOM manipulation." },
  { id: "typescript", name: "TypeScript", desc: "Static typing, generics, utility types, and enterprise frontend architecture." },
  { id: "aiml", name: "AI/ML", desc: "Machine learning pipelines, PyTorch, model inference, and natural language processing." },
  { id: "android", name: "Android", desc: "Kotlin, Jetpack Compose, Android SDK architecture, and mobile performance." },
  { id: "aws", name: "AWS", desc: "EC2 instances, S3 storage, IAM security, VPC networks, and cloud deployment." },
  { id: "databases", name: "Databases", desc: "PostgreSQL, MySQL, query execution plans, indexing strategies, and ACID guarantees." },
];

export default function Tutorials() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTutorials().then((res) => {
      setTutorials(res.tutorials);
      setLoading(false);
    });
  }, []);

  const filteredTutorials = search
    ? tutorials.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.introduction.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      )
    : tutorials;

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title="Programming Tutorials & Developer Guides | Ascentracore Solutions"
        description="Master Python, Java, Django, DSA, Linux, React, and Cloud Architecture with in-depth, original tutorials and code examples."
        canonicalUrl="https://www.ascentracoresolutions.com/tutorials"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Developer Learning Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            In-Depth Programming Tutorials
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Engineered for real-world software development: from core language syntax and data structures to production API backends and Linux systems administration.
          </p>

          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutorials by title, language or topic..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">Browse by Technology Track</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/tutorials/${cat.id}`}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Tutorials List */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Featured Practice Tutorials</h2>
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <span className="text-xs">Loading tutorials...</span>
            </div>
          ) : filteredTutorials.length === 0 ? (
            <div className="py-12 text-center bg-slate-900 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400">No tutorials match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tut) => (
                <div
                  key={`${tut.category}-${tut.slug}`}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {tut.category_display || tut.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {tut.estimated_reading_time} min read
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      <Link
                        to={`/tutorials/${tut.category}/${tut.slug}`}
                        className="hover:text-purple-400 transition-colors"
                      >
                        {tut.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                      {tut.introduction}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Difficulty: {tut.difficulty}
                    </span>
                    <Link
                      to={`/tutorials/${tut.category}/${tut.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
                    >
                      Start Tutorial <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Tutorials };

