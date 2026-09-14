import { describe, expect, it } from "vitest";

import {
  catalogHref,
  filtersToQuery,
  readCatalogFilters,
  recommendationHref,
  toggleArea,
  toggleKind,
  toggleTag,
} from "./catalog-params";
import type { AvailableFacets } from "@/domain/recommendations/recommendation-queries";
import { noRecommendationFilters } from "@/domain/recommendations/recommendation-queries";

const available: AvailableFacets = {
  kinds: ["bakery", "restaurant"],
  areas: ["Capitol Hill", "Fremont"],
  tags: ["date-night", "hidden-gem"],
};

describe("readCatalogFilters", () => {
  it("reads a single value on each axis", () => {
    expect(
      readCatalogFilters(
        { kind: "bakery", area: "Fremont", tag: "hidden-gem" },
        available,
      ),
    ).toEqual({
      kinds: ["bakery"],
      areas: ["Fremont"],
      tags: ["hidden-gem"],
    });
  });

  it("reads repeated keys as multiple values on one axis", () => {
    expect(
      readCatalogFilters({ kind: ["bakery", "restaurant"] }, available).kinds,
    ).toEqual(["bakery", "restaurant"]);
  });

  it("returns an empty selection when no parameters are present", () => {
    expect(readCatalogFilters({}, available)).toEqual(noRecommendationFilters);
  });

  it("ignores values the catalog does not offer rather than failing", () => {
    expect(
      readCatalogFilters(
        { kind: ["bakery", "Bakery", "food-truck"], area: "Ballard" },
        available,
      ),
    ).toEqual({ kinds: ["bakery"], areas: [], tags: [] });
  });

  it("ignores unrecognised parameter names", () => {
    expect(readCatalogFilters({ sort: "name", q: "thai" }, available)).toEqual(
      noRecommendationFilters,
    );
  });

  it("collapses a repeated value to a single selection", () => {
    expect(
      readCatalogFilters({ tag: ["date-night", "date-night"] }, available).tags,
    ).toEqual(["date-night"]);
  });
});

describe("toggling facet values", () => {
  it("adds a value that is not selected", () => {
    expect(toggleKind(noRecommendationFilters, "bakery").kinds).toEqual([
      "bakery",
    ]);
  });

  it("removes a value that is already selected", () => {
    const selected = toggleArea(noRecommendationFilters, "Fremont");

    expect(toggleArea(selected, "Fremont").areas).toEqual([]);
  });

  it("leaves the other axes untouched", () => {
    const withKind = toggleKind(noRecommendationFilters, "restaurant");
    const withTag = toggleTag(withKind, "hidden-gem");

    expect(withTag).toEqual({
      kinds: ["restaurant"],
      areas: [],
      tags: ["hidden-gem"],
    });
  });

  it("produces the same query regardless of the order values were chosen", () => {
    const oneWay = toggleKind(
      toggleKind(noRecommendationFilters, "restaurant"),
      "bakery",
    );
    const otherWay = toggleKind(
      toggleKind(noRecommendationFilters, "bakery"),
      "restaurant",
    );

    expect(filtersToQuery(oneWay)).toEqual(filtersToQuery(otherWay));
  });
});

describe("hrefs", () => {
  it("links to the bare catalog when nothing is selected", () => {
    expect(catalogHref(noRecommendationFilters)).toBe("/recommendations");
  });

  it("encodes every selected value as a repeated key", () => {
    expect(
      catalogHref({
        kinds: ["bakery", "restaurant"],
        areas: ["Capitol Hill"],
        tags: [],
      }),
    ).toBe("/recommendations?kind=bakery&kind=restaurant&area=Capitol+Hill");
  });

  it("carries catalog state into a recommendation link so the visitor can get back", () => {
    expect(
      recommendationHref("the-flour-box", {
        kinds: ["bakery"],
        areas: [],
        tags: ["hidden-gem"],
      }),
    ).toBe("/recommendations/the-flour-box?kind=bakery&tag=hidden-gem");
  });

  it("round trips a filtered catalog href back into the same selection", () => {
    const filters = {
      kinds: ["bakery"],
      areas: ["Fremont"],
      tags: ["date-night"],
    } as const;
    const query = new URLSearchParams(filtersToQuery(filters));

    expect(
      readCatalogFilters(
        {
          kind: query.getAll("kind"),
          area: query.getAll("area"),
          tag: query.getAll("tag"),
        },
        available,
      ),
    ).toEqual(filters);
  });

  it("links to a recommendation without a query when nothing is selected", () => {
    expect(recommendationHref("the-flour-box", noRecommendationFilters)).toBe(
      "/recommendations/the-flour-box",
    );
  });
});
