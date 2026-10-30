import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article";
  image?: string;
  publishedTime?: string;
  authorName?: string;
  structuredData?: Record<string, any>;
}

export default function SEOHead({
  title = "Ascentracore Solutions | Software Development & Tech Resources",
  description = "Ascentracore Solutions builds production software, developer platforms like SkilTrix, scalable APIs, and provides in-depth technical tutorials for engineers.",
  canonicalUrl,
  ogType = "website",
  image = "https://cdn.ascentracoresolutions.com/ascentra.webp",
  publishedTime,
  authorName,
  structuredData,
}: SEOHeadProps) {
  const location = useLocation();
  const currentUrl = canonicalUrl || `https://www.ascentracoresolutions.com${location.pathname}`;

  useEffect(() => {
    // 1. Title
    const fullTitle = (title.includes("Ascentracore") || title.includes("Ashok SFS") || title.includes("||"))
      ? title
      : `${title} | Ascentracore Solutions`;
    document.title = fullTitle;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", "index, follow");

    // Open Graph
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:site_name", "Ascentracore Solutions");

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    if (publishedTime) {
      setMetaTag("property", "article:published_time", publishedTime);
    }
    if (authorName) {
      setMetaTag("property", "article:author", authorName);
    }

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // 4. Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.getElementById("page-jsonld") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "page-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, currentUrl, ogType, image, publishedTime, authorName, structuredData ? JSON.stringify(structuredData) : '']);

  // Scroll to top strictly on route pathname transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

export { SEOHead };
