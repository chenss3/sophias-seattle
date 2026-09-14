import type {
  Area,
  Recommendation,
  RecommendationKind,
  RecommendationTag,
} from "./recommendation";

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

/**
 * A selection across the three browse axes.
 *
 * Empty means "no constraint on this axis" rather than "match nothing", which
 * is what makes an unfiltered catalog the natural default.
 */
export type RecommendationFilters = {
  readonly kinds: readonly RecommendationKind[];
  readonly areas: readonly Area[];
  readonly tags: readonly RecommendationTag[];
};

export const noRecommendationFilters: RecommendationFilters = {
  kinds: [],
  areas: [],
  tags: [],
};

export function hasActiveFilters(filters: RecommendationFilters): boolean {
  return (
    filters.kinds.length > 0 ||
    filters.areas.length > 0 ||
    filters.tags.length > 0
  );
}

/**
 * Filters the catalog. Values within an axis combine with OR, and the three
 * axes combine with AND, so `kind=restaurant&kind=bakery&area=Fremont` reads
 * as "restaurants or bakeries, in Fremont".
 *
 * Editorial file order is preserved. The domain layer still defines no sort.
 */
export function filterRecommendations(
  recommendations: readonly Recommendation[],
  filters: RecommendationFilters,
): readonly Recommendation[] {
  return recommendations.filter(
    (recommendation) =>
      matchesAxis(filters.kinds, [recommendation.kind]) &&
      matchesAxis(filters.areas, [recommendation.area]) &&
      matchesAxis(filters.tags, recommendation.tags),
  );
}

function matchesAxis<Value extends string>(
  selected: readonly Value[],
  values: readonly Value[],
): boolean {
  return selected.length === 0 || selected.some((one) => values.includes(one));
}

/**
 * The facet values a catalog actually uses.
 *
 * Derived from content rather than from the TypeScript unions. The unions
 * enforce validity at compile time and are not a runtime data source: a union
 * value that no recommendation uses must not be offered as a filter that can
 * only ever return nothing.
 *
 * Sorted for a predictable, scannable control order. This is facet ordering,
 * not recommendation ordering, so it does not compete with editorial intent.
 */
export type AvailableFacets = {
  readonly kinds: readonly RecommendationKind[];
  readonly areas: readonly Area[];
  readonly tags: readonly RecommendationTag[];
};

export function getAvailableFacets(
  recommendations: readonly Recommendation[],
): AvailableFacets {
  return {
    kinds: sortedUnique(
      recommendations.map((recommendation) => recommendation.kind),
    ),
    areas: sortedUnique(
      recommendations.map((recommendation) => recommendation.area),
    ),
    tags: sortedUnique(
      recommendations.flatMap((recommendation) => [...recommendation.tags]),
    ),
  };
}

function sortedUnique<Value extends string>(
  values: readonly Value[],
): readonly Value[] {
  return [...new Set(values)].sort((first, second) =>
    first.localeCompare(second),
  );
}

/**
 * The recommendations either side of a slug in editorial order, for simple
 * "keep browsing" navigation. Deliberately positional rather than similarity
 * scored: the catalog is small and file order is Sophia's sequencing.
 *
 * Does not wrap around, so the ends of the catalog stay honest.
 */
export function getAdjacentRecommendations(
  recommendations: readonly Recommendation[],
  slug: string,
): {
  readonly previous: Recommendation | undefined;
  readonly next: Recommendation | undefined;
} {
  const index = recommendations.findIndex(
    (recommendation) => recommendation.slug === slug,
  );

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: recommendations[index - 1],
    next: recommendations[index + 1],
  };
}
