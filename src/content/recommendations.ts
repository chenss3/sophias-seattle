import type { Recommendation } from "@/domain/recommendations/recommendation";

/**
 * Sophia's curated Seattle recommendations.
 *
 * This is editorial source data, not generated or aggregated content. Every
 * entry is written by Sophia and reviewed through a pull request.
 *
 * `satisfies` type-checks each entry against the domain contract while
 * `as const` preserves literal types for later use.
 *
 * File order carries editorial intent; there is no sort order in the domain
 * layer yet.
 *
 * The catalog is intentionally empty until Sophia supplies her first
 * recommendations. See docs/content-model.md for the field contract.
 */
export const recommendations = [] as const satisfies readonly Recommendation[];
