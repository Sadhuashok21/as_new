import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  image?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: Record<string, any>;
}

export function useSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  image = 'https://cdn.ascentracoresolutions.com/ascentra.webp',
  ogType = 'website',
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = (title.includes('Ascentracore') || title.includes('Ashok SFS') || title.includes('||'))
      ? title
      : `${title} | Ascentracore Solutions`;
    document.title = fullTitle;

    // Helper to set meta tags
    const setMetaTag = (attr: string, key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Meta Description & Keywords
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Open Graph & Twitter Cards
    setMetaTag('name', 'robots', 'index, follow');
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', 'Ashok SFS | Ascentracore Solutions');

    const effectiveUrl = canonicalUrl || window.location.href;
    setMetaTag('property', 'og:url', effectiveUrl);

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:image', image);

    // 4. Canonical Link
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = effectiveUrl;

    // 5. JSON-LD Structured Data
    if (structuredData) {
      let script = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonicalUrl, image, ogType, structuredData ? JSON.stringify(structuredData) : '']);
}
