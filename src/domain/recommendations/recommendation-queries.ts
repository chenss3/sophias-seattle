import type { Recommendation } from "./recommendation";

/**
 * Finds a recommendation by its exact slug.
 *
 * Takes the catalog as a parameter so this module depends on nothing: not
 * React, not Next.js, not the curated content. Callers compose the two.
 *
 * Returns `undefined` rather than throwing so the caller decides how a miss
 * is presented.
 */
export function getRecommendationBySlug(
  recommendations: readonly Recommendation[],
  slug: string,
): Recommendation | undefined {
  return recommendations.find((recommendation) => recommendation.slug === slug);
}
