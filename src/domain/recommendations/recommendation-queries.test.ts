import { describe, expect, it } from "vitest";

import { getRecommendationBySlug } from "./recommendation-queries";
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
  kind: "activity",
  area: "Ballard",
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
