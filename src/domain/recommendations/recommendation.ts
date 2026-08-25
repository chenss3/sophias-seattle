/**
 * What a recommendation is. The primary browse axis.
 *
 * Deliberately minimal: values are added alongside the first recommendation
 * that needs them rather than designed up front.
 */
export type RecommendationKind = "restaurant" | "activity";

/**
 * What a recommendation is good for. A secondary axis.
 *
 * Deliberately minimal: values are added alongside the first recommendation
 * that needs them rather than designed up front.
 */
export type RecommendationTag = "date-night" | "rainy-day";

/**
 * Where a recommendation is. Named for location generally rather than
 * "neighborhood" so it can also describe places outside Seattle proper.
 *
 * Deliberately minimal: values are added alongside the first recommendation
 * that needs them rather than designed up front.
 */
export type Area = "Ballard" | "Capitol Hill";

/**
 * A single Sophia-curated recommendation.
 *
 * `provenance` is a literal rather than an inferred string. Without it, any
 * structurally similar object -- including a future visitor-added item --
 * would satisfy this type, and curated surfaces could silently accept
 * non-curated content.
 */
export type Recommendation = {
  readonly slug: string;
  readonly name: string;
  readonly kind: RecommendationKind;
  readonly area: Area;
  readonly summary: string;
  /** Sophia's reasoning. Required: a recommendation without it is not a recommendation. */
  readonly why: string;
  readonly tags: readonly RecommendationTag[];
  readonly notes?: string;
  readonly provenance: "sophia-curated";
};
