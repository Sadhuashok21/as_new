import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Calendar, Share2, Check } from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdSlot from "../components/AdSlot";
import { getBlogPostDetail } from "../api/cmsApi";
import type { BlogPost as BlogPostType } from "../types/cms";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getBlogPostDetail(slug).then((res) => {
        setPost(res);
        setLoading(false);
      });
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">The article you requested could not be found or has not been published yet.</p>
        <Link to="/blog" className="text-blue-400 font-bold hover:underline">
          &larr; Back to all articles
        </Link>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Ascentracore Engineering Team",
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
      "@id": `https://www.ascentracoresolutions.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-12 lg:py-20">
      <SEOHead
        title={`${post.title} | Ascentracore Solutions`}
        description={post.excerpt}
        canonicalUrl={`https://www.ascentracoresolutions.com/blog/${post.slug}`}
        ogType="article"
        publishedTime={post.published_at}
        authorName={post.author?.name}
        structuredData={structuredData}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-white">Blog</Link>
          <span>/</span>
          <span className="text-slate-300 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Meta Header */}
        <header className="mb-10 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {post.category?.name || "Architecture"}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.reading_time} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-medium">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-900 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                {post.author?.name ? post.author.name[0] : "A"}
              </div>
              <div>
                <div className="text-white font-semibold">{post.author?.name || "Ascentracore Engineering"}</div>
                <div className="text-[11px] text-slate-500">{post.author?.role || "Core Engineering"}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Share article"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Article Content */}
        <div className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-slate-300 prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-2xl prose-code:text-blue-300">
          <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-200 space-y-4">
            {post.content}
          </div>
        </div>

        {/* AdSense In-Article Placement (Compliant publisher content) */}
        <AdSlot slotId="blog-post-content-bottom" />

        {/* Author Bio Box */}
        {post.author && (
          <div className="my-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shrink-0">
              {post.author.name[0]}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">{post.author.name}</div>
              <div className="text-xs text-blue-400">{post.author.role}</div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">{post.author.bio}</p>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {post.related_posts && post.related_posts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-900">
            <h2 className="text-xl font-bold text-white mb-6">Related Technical Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.related_posts.map((rel) => (
                <div key={rel.slug} className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide mb-1 block">
                      {rel.category?.name || "Article"}
                    </span>
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug hover:text-blue-400 transition-colors">
                      <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                  </div>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 pt-3"
                  >
                    Read &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

export { BlogPost };

