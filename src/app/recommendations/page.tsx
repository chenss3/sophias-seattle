import type { Metadata } from "next";

import { recommendations } from "@/content/recommendations";
import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";
import {
  filterRecommendations,
  getAvailableFacets,
} from "@/domain/recommendations/recommendation-queries";
import type { RawSearchParams } from "@/features/recommendations/catalog-params";
import { readCatalogFilters } from "@/features/recommendations/catalog-params";
import {
  CatalogResultSummary,
  FacetFilters,
} from "@/features/recommendations/facet-filters";
import { RecommendationCard } from "@/features/recommendations/recommendation-card";
import { CatalogEmptyState } from "@/features/recommendations/catalog-empty-state";

const copy = placeholderSiteCopy.catalog;

export const metadata: Metadata = {
  title: copy.heading,
  description:
    "Browse Sophia's Seattle recommendations and her reasoning for each one.",
};

export default async function RecommendationsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const available = getAvailableFacets(recommendations);
  const filters = readCatalogFilters(await searchParams, available);
  const matches = filterRecommendations(recommendations, filters);

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6">
      <header className="bg-surface-soft relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-9">
        {/*
          Optional art region: `catalog-banner`. A decorative band may sit
          behind this header later. The soft surface is a finished state on its
          own.
        */}
        <h1 className="font-display text-ink text-3xl leading-tight sm:text-4xl">
          {copy.heading}
        </h1>
        <p className="text-ink mt-3 max-w-2xl text-base leading-relaxed">
          {copy.intro}
        </p>
      </header>

      <div className="mt-8">
        <FacetFilters available={available} filters={filters} />
      </div>

      <div className="mt-7">
        <CatalogResultSummary
          matched={matches.length}
          total={recommendations.length}
          filters={filters}
        />
      </div>

      {matches.length === 0 ? (
        <CatalogEmptyState />
      ) : (
        <ul
          aria-label={copy.heading}
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {matches.map((recommendation) => (
            <RecommendationCard
              key={recommendation.slug}
              recommendation={recommendation}
              filters={filters}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
