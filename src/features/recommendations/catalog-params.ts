import type {
  AvailableFacets,
  RecommendationFilters,
} from "@/domain/recommendations/recommendation-queries";
import type {
  Area,
  RecommendationKind,
  RecommendationTag,
} from "@/domain/recommendations/recommendation";

/**
 * Translation between catalog filter state and URL search parameters.
 *
 * Filter state lives entirely in the URL so every filtered view is shareable
 * and the browse page needs no client state. Repeated keys express multiple
 * values on one axis: `?kind=restaurant&kind=bakery&area=Fremont`.
 *
 * These functions are pure and know nothing about React or Next.js. The
 * routes hand them raw search parameters and use the hrefs they return.
 */

export const CATALOG_PATH = "/recommendations";

const KIND_PARAM = "kind";
const AREA_PARAM = "area";
const TAG_PARAM = "tag";

/** The shape Next.js hands a route for `searchParams`. */
export type RawSearchParams = Record<string, string | string[] | undefined>;

/**
 * Reads filters from raw search parameters, keeping only values the catalog
 * actually offers. Unknown, misspelled, and duplicated values are dropped
 * rather than raising, so a hand-edited URL degrades to a broader view
 * instead of an error page.
 */
export function readCatalogFilters(
  raw: RawSearchParams,
  available: AvailableFacets,
): RecommendationFilters {
  return {
    kinds: keepAvailable<RecommendationKind>(raw[KIND_PARAM], available.kinds),
    areas: keepAvailable<Area>(raw[AREA_PARAM], available.areas),
    tags: keepAvailable<RecommendationTag>(raw[TAG_PARAM], available.tags),
  };
}

function keepAvailable<Value extends string>(
  raw: string | string[] | undefined,
  available: readonly Value[],
): readonly Value[] {
  const requested = raw === undefined ? [] : [raw].flat();

  return available.filter((value) => requested.includes(value));
}

/**
 * The canonical query string for a filter selection, or an empty string when
 * nothing is selected. Axis and value order follow the available facets, so
 * the same selection always produces the same URL regardless of click order.
 */
export function filtersToQuery(filters: RecommendationFilters): string {
  const params = new URLSearchParams();

  for (const kind of filters.kinds) params.append(KIND_PARAM, kind);
  for (const area of filters.areas) params.append(AREA_PARAM, area);
  for (const tag of filters.tags) params.append(TAG_PARAM, tag);

  return params.toString();
}

function withQuery(path: string, query: string): string {
  return query === "" ? path : `${path}?${query}`;
}

/** The catalog, filtered by the given selection. */
export function catalogHref(filters: RecommendationFilters): string {
  return withQuery(CATALOG_PATH, filtersToQuery(filters));
}

/**
 * A recommendation detail page, carrying the catalog filter state forward so
 * the detail page's back link can return the visitor to the view they came
 * from. The HTTP referrer is deliberately not used: it is unavailable on
 * direct visits and under some referrer policies, which would make the back
 * link behave differently depending on how the page was reached.
 */
export function recommendationHref(
  slug: string,
  filters: RecommendationFilters,
): string {
  return withQuery(`${CATALOG_PATH}/${slug}`, filtersToQuery(filters));
}

/** The same selection with one kind toggled on or off. */
export function toggleKind(
  filters: RecommendationFilters,
  kind: RecommendationKind,
): RecommendationFilters {
  return { ...filters, kinds: toggleValue(filters.kinds, kind) };
}

/** The same selection with one area toggled on or off. */
export function toggleArea(
  filters: RecommendationFilters,
  area: Area,
): RecommendationFilters {
  return { ...filters, areas: toggleValue(filters.areas, area) };
}

/** The same selection with one tag toggled on or off. */
export function toggleTag(
  filters: RecommendationFilters,
  tag: RecommendationTag,
): RecommendationFilters {
  return { ...filters, tags: toggleValue(filters.tags, tag) };
}

function toggleValue<Value extends string>(
  values: readonly Value[],
  value: Value,
): readonly Value[] {
  const next = values.includes(value)
    ? values.filter((existing) => existing !== value)
    : [...values, value];

  // Sorted so a selection produces one canonical URL regardless of the order
  // the visitor clicked the pills in. This matches the order facets are
  // derived in, so reading a URL back yields the identical selection.
  return next.sort((first, second) => first.localeCompare(second));
}
