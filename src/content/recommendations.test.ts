import { describe, expect, it } from "vitest";

import { recommendations } from "./recommendations";
import type { Recommendation } from "@/domain/recommendations/recommendation";

// Widened so these checks keep type-checking as entries are added to the
// `as const` catalog.
const catalog: readonly Recommendation[] = recommendations;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// These assertions run against the real catalog so editorial mistakes fail CI
// rather than reaching the site. They pass on an empty catalog by design.
describe("curated recommendations", () => {
  it("gives every recommendation a unique slug", () => {
    const slugs = catalog.map((recommendation) => recommendation.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses lowercase kebab-case slugs", () => {
    const invalid = catalog
      .map((recommendation) => recommendation.slug)
      .filter((slug) => !SLUG_PATTERN.test(slug));

    expect(invalid).toEqual([]);
  });

  it("gives every recommendation a name, a summary, and Sophia's reasoning", () => {
    const incomplete = catalog
      .filter(
        (recommendation) =>
          recommendation.name.trim() === "" ||
          recommendation.summary.trim() === "" ||
          recommendation.why.trim() === "",
      )
      .map((recommendation) => recommendation.slug);

    expect(incomplete).toEqual([]);
  });

  it("does not repeat a tag within a recommendation", () => {
    const duplicated = catalog
      .filter(
        (recommendation) =>
          new Set(recommendation.tags).size !== recommendation.tags.length,
      )
      .map((recommendation) => recommendation.slug);

    expect(duplicated).toEqual([]);
  });
});
