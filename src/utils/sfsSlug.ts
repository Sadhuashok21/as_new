import type { SfsBlueprint } from '../api/sfsApi';

/**
 * Converts a string to a clean, URL-safe slug.
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Creates an SEO-rich URL for a Spaceflight Simulator blueprint.
 * Example:
 *   Input: { name: "Artemis 2", bp_id: "BVQKBG3JADDRH1O682ND" }
 *   Output: "/sfs/blueprints/artemis-2-BVQKBG3JADDRH1O682ND"
 */
export function getBlueprintSeoUrl(bp: { name?: string; bp_id: string }): string {
  if (!bp || !bp.bp_id) return '/sfs/blueprints';
  const nameSlug = slugify(bp.name || '');
  if (!nameSlug) {
    return `/sfs/blueprints/${encodeURIComponent(bp.bp_id)}`;
  }
  return `/sfs/blueprints/${nameSlug}-${encodeURIComponent(bp.bp_id)}`;
}

/**
 * Extracts a candidate bp_id from an SEO slug or raw identifier.
 * Examples:
 *   "artemis-2-BVQKBG3JADDRH1O682ND" -> "BVQKBG3JADDRH1O682ND"
 *   "BVQKBG3JADDRH1O682ND"           -> "BVQKBG3JADDRH1O682ND"
 *   "first-space-station-FIRST_SPACE_STATION_385" -> "FIRST_SPACE_STATION_385"
 */
export function extractBpIdFromSlug(slugOrId: string): string {
  if (!slugOrId) return '';
  const trimmed = slugOrId.trim();

  // If no hyphen, the whole string is the ID
  if (!trimmed.includes('-')) {
    return trimmed;
  }

  // Check from the end for the ID segment
  const lastHyphen = trimmed.lastIndexOf('-');
  if (lastHyphen !== -1 && lastHyphen < trimmed.length - 1) {
    const candidate = trimmed.substring(lastHyphen + 1);
    if (candidate.length > 0) {
      return candidate;
    }
  }

  return trimmed;
}

/**
 * Resolves a blueprint from a list using bp_id, compound SEO slug, or name slug.
 */
export function findBlueprintByIdentifier(
  identifier: string,
  blueprints: SfsBlueprint[]
): SfsBlueprint | undefined {
  if (!identifier || !blueprints || blueprints.length === 0) return undefined;
  const idLower = identifier.toLowerCase().trim();

  // 1. Direct match on bp_id
  let found = blueprints.find((b) => b.bp_id === identifier || b.bp_id.toLowerCase() === idLower);
  if (found) return found;

  // 2. Candidate extracted from slug
  const candidateId = extractBpIdFromSlug(identifier);
  if (candidateId && candidateId !== identifier) {
    found = blueprints.find(
      (b) => b.bp_id === candidateId || b.bp_id.toLowerCase() === candidateId.toLowerCase()
    );
    if (found) return found;
  }

  // 3. Match if identifier ends with -<bp_id> (case insensitive)
  found = blueprints.find((b) => {
    const bIdLower = b.bp_id.toLowerCase();
    return idLower.endsWith(`-${bIdLower}`) || idLower.endsWith(`_${bIdLower}`);
  });
  if (found) return found;

  // 4. Match by slugified name
  found = blueprints.find((b) => {
    const bNameSlug = slugify(b.name);
    return bNameSlug === idLower || idLower.startsWith(`${bNameSlug}-`);
  });
  if (found) return found;

  return undefined;
}

