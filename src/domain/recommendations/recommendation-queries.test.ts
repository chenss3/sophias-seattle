import { describe, expect, it } from "vitest";

import {
  filterRecommendations,
  getAdjacentRecommendations,
  getAvailableFacets,
  getRecommendationBySlug,
  hasActiveFilters,
  noRecommendationFilters,
} from "./recommendation-queries";
import type { Recommendation } from "./recommendation";

// Fixtures are deliberately fictional. Sophia's real editorial content lives
// in src/content and is never duplicated into tests.
const firstFixture: Recommendation = {
  slug: "first-fixture",
  name: "First Fixture",
  kind: "restaurant",
  area: "Capitol Hill",
  summary: "A fixture used to exercise slug lookup.",
  why: "It exists so the query has something to find.",
  tags: ["date-night"],
  provenance: "sophia-curated",
};

const secondFixture: Recommendation = {
  slug: "second-fixture",
  name: "Second Fixture",
  kind: "dessert",
  area: "Fremont",
  summary: "A second fixture so lookup has to discriminate.",
  why: "It exists so a miss is distinguishable from a hit.",
  tags: [],
  provenance: "sophia-curated",
};

const catalog: readonly Recommendation[] = [firstFixture, secondFixture];

describe("getRecommendationBySlug", () => {
  it("returns the recommendation with the given slug", () => {
    expect(getRecommendationBySlug(catalog, "second-fixture")).toBe(
      secondFixture,
    );
  });

  it("returns undefined when no recommendation has the slug", () => {
    expect(getRecommendationBySlug(catalog, "missing-fixture")).toBeUndefined();
  });

  it("matches the whole slug rather than a prefix or substring", () => {
    expect(getRecommendationBySlug(catalog, "second")).toBeUndefined();
    expect(
      getRecommendationBySlug(catalog, "second-fixture-extra"),
    ).toBeUndefined();
    expect(getRecommendationBySlug(catalog, "fixture")).toBeUndefined();
  });

  it("returns undefined when the catalog is empty", () => {
    expect(getRecommendationBySlug([], "first-fixture")).toBeUndefined();
  });
});

// A slightly wider fixture catalog so filtering has something to discriminate
// on across all three axes.
const bakeryInFremont: Recommendation = {
  slug: "bakery-in-fremont",
  name: "Bakery In Fremont",
  kind: "bakery",
  area: "Fremont",
  summary: "A fixture bakery.",
  why: "It exists so kind and area can be told apart.",
  tags: ["sweet-treat", "hidden-gem"],
  provenance: "sophia-curated",
};

const restaurantInFremont: Recommendation = {
  slug: "restaurant-in-fremont",
  name: "Restaurant In Fremont",
  kind: "restaurant",
  area: "Fremont",
  summary: "A fixture restaurant.",
  why: "It shares an area with the bakery so the axes must combine.",
  tags: ["date-night"],
  provenance: "sophia-curated",
};

const restaurantOnCapitolHill: Recommendation = {
  slug: "restaurant-on-capitol-hill",
  name: "Restaurant On Capitol Hill",
  kind: "restaurant",
  area: "Capitol Hill",
  summary: "A second fixture restaurant.",
  why: "It shares a kind with the Fremont restaurant but not an area.",
  tags: ["date-night", "hidden-gem"],
  provenance: "sophia-curated",
};

const untaggedDessert: Recommendation = {
  slug: "untagged-dessert",
  name: "Untagged Dessert",
  kind: "dessert",
  area: "Capitol Hill",
  summary: "A fixture with no tags.",
  why: "It proves an empty tag list is not treated as a match for everything.",
  tags: [],
  provenance: "sophia-curated",
};

const filterCatalog: readonly Recommendation[] = [
  bakeryInFremont,
  restaurantInFremont,
  restaurantOnCapitolHill,
  untaggedDessert,
];

describe("filterRecommendations", () => {
  it("returns the whole catalog when nothing is selected", () => {
    expect(
      filterRecommendations(filterCatalog, noRecommendationFilters),
    ).toEqual(filterCatalog);
  });

  it("preserves editorial order", () => {
    const matched = filterRecommendations(filterCatalog, {
      ...noRecommendationFilters,
      areas: ["Fremont", "Capitol Hill"],
    });

    expect(matched.map((one) => one.slug)).toEqual(
      filterCatalog.map((one) => one.slug),
    );
  });

  it("combines values within an axis with OR", () => {
    const matched = filterRecommendations(filterCatalog, {
      ...noRecommendationFilters,
      kinds: ["bakery", "dessert"],
    });

    expect(matched.map((one) => one.slug)).toEqual([
      "bakery-in-fremont",
      "untagged-dessert",
    ]);
  });

  it("combines separate axes with AND", () => {
    const matched = filterRecommendations(filterCatalog, {
      ...noRecommendationFilters,
      kinds: ["restaurant"],
      areas: ["Fremont"],
    });

    expect(matched.map((one) => one.slug)).toEqual(["restaurant-in-fremont"]);
  });

  it("matches a recommendation holding any one of the selected tags", () => {
    const matched = filterRecommendations(filterCatalog, {
      ...noRecommendationFilters,
      tags: ["sweet-treat", "date-night"],
    });

    expect(matched.map((one) => one.slug)).toEqual([
      "bakery-in-fremont",
      "restaurant-in-fremont",
      "restaurant-on-capitol-hill",
    ]);
  });

  it("excludes a recommendation with no tags once a tag is selected", () => {
    const matched = filterRecommendations(filterCatalog, {
      ...noRecommendationFilters,
      tags: ["hidden-gem"],
    });

    expect(matched.map((one) => one.slug)).not.toContain("untagged-dessert");
  });

  it("returns nothing when the axes cannot be satisfied together", () => {
    expect(
      filterRecommendations(filterCatalog, {
        ...noRecommendationFilters,
        kinds: ["bakery"],
        areas: ["Capitol Hill"],
      }),
    ).toEqual([]);
  });
});

describe("hasActiveFilters", () => {
  it("is false for an empty selection", () => {
    expect(hasActiveFilters(noRecommendationFilters)).toBe(false);
  });

  it("is true when any single axis has a value", () => {
    expect(
      hasActiveFilters({ ...noRecommendationFilters, tags: ["hidden-gem"] }),
    ).toBe(true);
  });
});

describe("getAvailableFacets", () => {
  it("offers only values the catalog actually uses", () => {
    const facets = getAvailableFacets(filterCatalog);

    expect(facets.kinds).toEqual(["bakery", "dessert", "restaurant"]);
    expect(facets.areas).toEqual(["Capitol Hill", "Fremont"]);
    expect(facets.tags).toEqual(["date-night", "hidden-gem", "sweet-treat"]);
  });

  it("does not repeat a value used by several recommendations", () => {
    const { tags } = getAvailableFacets(filterCatalog);

    expect(tags.filter((tag) => tag === "date-night")).toHaveLength(1);
  });

  it("offers nothing for an empty catalog", () => {
    expect(getAvailableFacets([])).toEqual({ kinds: [], areas: [], tags: [] });
  });
});

describe("getAdjacentRecommendations", () => {
  it("returns the entries either side in editorial order", () => {
    const { previous, next } = getAdjacentRecommendations(
      filterCatalog,
      "restaurant-in-fremont",
    );

    expect(previous).toBe(bakeryInFremont);
    expect(next).toBe(restaurantOnCapitolHill);
  });

  it("does not wrap around at the ends of the catalog", () => {
    expect(
      getAdjacentRecommendations(filterCatalog, "bakery-in-fremont").previous,
    ).toBeUndefined();
    expect(
      getAdjacentRecommendations(filterCatalog, "untagged-dessert").next,
    ).toBeUndefined();
  });

  it("returns neither neighbour for an unknown slug", () => {
    expect(getAdjacentRecommendations(filterCatalog, "missing")).toEqual({
      previous: undefined,
      next: undefined,
    });
  });
});
