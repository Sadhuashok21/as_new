import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, BookOpen, Clock, ArrowRight } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getTutorials } from "../api/cmsApi";
import type { Tutorial } from "../types/cms";

const CATEGORY_NAMES: Record<string, string> = {
  python: "Python Programming",
  java: "Java & JVM Architecture",
  django: "Django & REST Framework",
  dsa: "Data Structures & Algorithms",
  linux: "Linux & Systems Administration",
  react: "React 19 & TypeScript",
  javascript: "Modern JavaScript (ES6+)",
  typescript: "TypeScript Deep Dive",
  aiml: "Artificial Intelligence & Machine Learning",
  android: "Android App Development",
  aws: "Amazon Web Services (AWS)",
  databases: "Database Systems & SQL Optimization",
};

export default function TutorialCategory() {
  const { category = "" } = useParams<{ category: string }>();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  const cleanCategory = category.toLowerCase();
  const title = CATEGORY_NAMES[cleanCategory] || `${category.toUpperCase()} Tutorials`;

  useEffect(() => {
    setLoading(true);
    getTutorials({ category: cleanCategory }).then((res) => {
      setTutorials(res.tutorials);
      setLoading(false);
    });
  }, [cleanCategory]);

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title={`${title} | Ascentracore Solutions`}
        description={`Learn ${title} with structured, in-depth tutorials, practical code examples, and production architectural best practices.`}
        canonicalUrl={`https://www.ascentracoresolutions.com/tutorials/${cleanCategory}`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Tracks
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Technology Track
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Explore comprehensive guides and tutorials curated for {title}. Each guide is engineered with runnable examples and production recommendations.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs">Loading {title}...</span>
          </div>
        ) : tutorials.length === 0 ? (
          <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-white mb-2">Tutorials in progress</h2>
            <p className="text-xs text-slate-400 mb-4">
              Our engineering team is actively preparing verified guides for this track. Check out our other active categories in the meantime!
            </p>
            <Link to="/tutorials" className="px-4 py-2 rounded-lg text-xs font-bold bg-purple-600 text-white">
              Browse All Active Tracks
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tutorials.map((tut, index) => (
              <div
                key={tut.slug}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      Module #{index + 1}
                    </span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {tut.difficulty}
                    </span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {tut.estimated_reading_time} min read
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white hover:text-purple-400 transition-colors">
                    <Link to={`/tutorials/${tut.category}/${tut.slug}`}>{tut.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {tut.introduction}
                  </p>
                </div>

                <Link
                  to={`/tutorials/${tut.category}/${tut.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-colors shrink-0"
                >
                  Start Reading <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { TutorialCategory };

