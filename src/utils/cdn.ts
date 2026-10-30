/**
 * Ascentracore Solutions Ecosystem CDN Configuration
 * CDN Domain: https://cdn.ascentracoresolutions.com/
 *
 * Paths:
 * - SFS (Spaceflight Simulator):
 *   - Images:   https://cdn.ascentracoresolutions.com/sfs/images/<filename>
 *   - Zipfiles: https://cdn.ascentracoresolutions.com/sfs/zipfiles/<filename>
 * - SkilTrix:
 *   - Images:   https://cdn.ascentracoresolutions.com/st/images/<filename>
 *   - PDFs:     https://cdn.ascentracoresolutions.com/st/pdfs/<filename>
 *   - Videos:   https://cdn.ascentracoresolutions.com/st/videos/<filename>
 */

export const CDN_BASE_URL = (
  import.meta.env.VITE_CDN_BASE_URL || "https://cdn.ascentracoresolutions.com"
).replace(/\/+$/, "");

export const SFS_CDN = {
  images: `${CDN_BASE_URL}/sfs/images`,
  zipfiles: `${CDN_BASE_URL}/sfs/zipfiles`,
} as const;

export const SKILTRIX_CDN = {
  images: `${CDN_BASE_URL}/st/images`,
  pdfs: `${CDN_BASE_URL}/st/pdfs`,
  videos: `${CDN_BASE_URL}/st/videos`,
} as const;

export const SFS_FALLBACK_IMAGE = "https://cdn.ascentracoresolutions.com/sfs/images/ashoksfs.webp";

/**
 * Returns the CDN image URL for any SFS blueprint or category image.
 * Guarantees prefix: https://cdn.ascentracoresolutions.com/sfs/images/<filename>
 */
export function getSfsImageUrl(filename?: string, fallback = SFS_FALLBACK_IMAGE): string {
  if (!filename) return fallback;
  const clean = filename.trim();
  if (!clean || clean === "/bg.jpg" || clean === "bg.jpg") return fallback;

  // Already prefixed with https://cdn.ascentracoresolutions.com/sfs/images/
  if (clean.startsWith("https://cdn.ascentracoresolutions.com/sfs/images/")) {
    return clean;
  }

  // If URL contains cdn.ascentracoresolutions.com, normalize to /sfs/images/
  if (clean.includes("cdn.ascentracoresolutions.com")) {
    const fileOnly = clean.split("/").pop()?.split("?")[0] || "";
    return `${SFS_CDN.images}/${fileOnly}`;
  }

  // If another external http(s) URL
  if (/^https?:\/\//i.test(clean)) {
    // If it's a mock external image, extract filename or keep as is
    const fileOnly = clean.split("/").pop()?.split("?")[0];
    if (fileOnly && (fileOnly.endsWith(".webp") || fileOnly.endsWith(".png") || fileOnly.endsWith(".jpg"))) {
      return `${SFS_CDN.images}/${fileOnly}`;
    }
    return clean;
  }

  const sanitized = clean.replace(/^\/+/, "");
  if (sanitized.startsWith("sfs/images/")) {
    return `${CDN_BASE_URL}/${sanitized}`;
  }
  return `${SFS_CDN.images}/${sanitized}`;
}

export function getSfsZipUrl(filename?: string, fallback = ""): string {
  if (!filename) return fallback;
  if (/^https?:\/\//i.test(filename)) return filename;
  const clean = filename.replace(/^\/+/, "");
  if (clean.startsWith("sfs/zipfiles/")) return `${CDN_BASE_URL}/${clean}`;
  return `${SFS_CDN.zipfiles}/${clean}`;
}

export function getStImageUrl(filename?: string, fallback = "/placeholder-image.webp"): string {
  if (!filename) return fallback;
  if (/^https?:\/\//i.test(filename)) return filename;
  const clean = filename.replace(/^\/+/, "");
  if (clean.startsWith("st/images/")) return `${CDN_BASE_URL}/${clean}`;
  return `${SKILTRIX_CDN.images}/${clean}`;
}

export function getStPdfUrl(filename?: string, fallback = ""): string {
  if (!filename) return fallback;
  if (/^https?:\/\//i.test(filename)) return filename;
  const clean = filename.replace(/^\/+/, "");
  if (clean.startsWith("st/pdfs/")) return `${CDN_BASE_URL}/${clean}`;
  return `${SKILTRIX_CDN.pdfs}/${clean}`;
}

export function getStVideoUrl(filename?: string, fallback = ""): string {
  if (!filename) return fallback;
  if (/^https?:\/\//i.test(filename)) return filename;
  const clean = filename.replace(/^\/+/, "");
  if (clean.startsWith("st/videos/")) return `${CDN_BASE_URL}/${clean}`;
  return `${SKILTRIX_CDN.videos}/${clean}`;
}
