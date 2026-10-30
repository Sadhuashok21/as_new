import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface AdSlotProps {
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  minWordCount?: number;
  wordCount?: number;
}

/**
 * Route whitelist check.
 * Strictly permits ads ONLY on publisher content screens with substantial text.
 * NEVER renders on login, register, dashboard, compiler, profile, admin, search empty states, error pages.
 */
function isRouteAdEligible(pathname: string): boolean {
  // Disallow all application, authentication, and administrative screens
  const BLOCKED_PREFIXES = [
    "/login",
    "/register",
    "/signin",
    "/signup",
    "/auth",
    "/dashboard",
    "/compiler",
    "/compilers",
    "/profile",
    "/settings",
    "/admin",
    "/upload",
    "/sfs/upload",
    "/404",
    "/500",
    "/contact",
  ];

  for (const prefix of BLOCKED_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return false;
    }
  }

  // Exactly permitted content-rich publisher routes
  const isBlogPost = pathname.startsWith("/blog/") && pathname.length > 7;
  const isTutorial = pathname.startsWith("/tutorials/") && pathname.split("/").length >= 3;
  const isCaseStudy = pathname.startsWith("/case-studies/") && pathname.length > 14;
  const isResourceHub = pathname === "/resources" || pathname.startsWith("/resources/");
  const isContentProduct = pathname.startsWith("/products/") && pathname.length > 10;
  const isContentService = pathname.startsWith("/services/") && pathname.length > 10;

  return isBlogPost || isTutorial || isCaseStudy || isResourceHub || isContentProduct || isContentService;
}

export default function AdSlot({
  slotId = "default-content-slot",
  format = "auto",
  className = "",
  minWordCount = 150,
  wordCount,
}: AdSlotProps) {
  const location = useLocation();
  const adRef = useRef<HTMLDivElement>(null);
  const eligible = isRouteAdEligible(location.pathname);

  // If word count is supplied and content is too short, block ads (prevents thin content rejection)
  if (wordCount !== undefined && wordCount < minWordCount) {
    return null;
  }

  if (!eligible) {
    return null;
  }

  useEffect(() => {
    // Only attempt to push ads if window.adsbygoogle is active
    try {
      if (typeof window !== "undefined") {
        const adsbygoogle = (window as any).adsbygoogle;
        if (Array.isArray(adsbygoogle)) {
          adsbygoogle.push({});
        }
      }
    } catch {
      // Graceful fallback if ad blocker is active or test environment
    }
  }, [location.pathname, slotId]);

  return (
    <div
      ref={adRef}
      className={`my-8 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 text-center overflow-hidden min-h-[90px] ${className}`}
      data-ad-slot-id={slotId}
      aria-label="Advertisement"
    >
      <div className="text-[10px] tracking-wider uppercase text-slate-400 font-medium mb-1">
        Sponsored Resource
      </div>
      {/* Real AdSense tag container */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8687126461256058"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
