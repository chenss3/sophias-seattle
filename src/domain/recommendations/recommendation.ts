/**
 * What a recommendation is. The primary browse axis.
 *
 * Values are added alongside the first recommendation that needs them rather
 * than designed up front.
 */
export type RecommendationKind = "restaurant" | "bakery" | "dessert";

/**
 * What a recommendation is good for, or what characterises it. A secondary axis.
 *
 * Covers both occasion ("date-night", "quick-meal") and character
 * ("hidden-gem", "great-service"). Kept deliberately small: a tag has to be
 * useful for finding a recommendation, not merely true about it. Details
 * specific to one place -- a signature dish, a rotating menu -- belong in
 * `summary`, `why`, or `notes`.
 */
export type RecommendationTag =
  | "budget-friendly"
  | "casual"
  | "cocktails"
  | "customizable"
  | "date-night"
  | "great-service"
  | "group-friendly"
  | "happy-hour"
  | "hidden-gem"
  | "quick-meal"
  | "sweet-treat"
  | "unique-flavors"
  | "unique-seattle"
  | "vegan-friendly"
  | "worth-the-wait";

/**
 * Where a recommendation is. Named for location generally rather than
 * "neighborhood" so it can also describe places outside Seattle proper.
 *
 * Values are added alongside the first recommendation that needs them rather
 * than designed up front.
 */
export type Area =
  | "Bitter Lake"
  | "Capitol Hill"
  | "Fremont"
  | "Hillman City"
  | "Pike Place"
  | "South Lake Union";

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
