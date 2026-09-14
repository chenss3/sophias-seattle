import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PillLink } from "@/components/pill-link";
import { recommendations } from "@/content/recommendations";
import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";
import {
  filterRecommendations,
  getAdjacentRecommendations,
  getAvailableFacets,
  getRecommendationBySlug,
  hasActiveFilters,
} from "@/domain/recommendations/recommendation-queries";
import type { RawSearchParams } from "@/features/recommendations/catalog-params";
import {
  catalogHref,
  readCatalogFilters,
  recommendationHref,
  toggleTag,
} from "@/features/recommendations/catalog-params";
import { facetLabel } from "@/features/recommendations/recommendation-presentation";

const copy = placeholderSiteCopy.detail;

type DetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const recommendation = getRecommendationBySlug(
    recommendations,
    (await params).slug,
  );

  if (recommendation === undefined) {
    return { title: placeholderSiteCopy.notFound.heading };
  }

  return {
    title: recommendation.name,
    description: recommendation.summary,
  };
}

/**
 * A single recommendation.
 *
 * The reasoning is the hero of the page: it sits in its own panel, at larger
 * type than anything else on the screen except the name. `summary` comes
 * first only because a stranger needs to know what something is before the
 * reasoning can land, and it is deliberately the quieter of the two.
 *
 * Catalog filter state arrives in this route's own search parameters, carried
 * forward by the links on the browse page, so the back link can return the
 * visitor to the view they came from. The HTTP referrer is not used.
 */
export default async function RecommendationDetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const { slug } = await params;
  const recommendation = getRecommendationBySlug(recommendations, slug);

  if (recommendation === undefined) {
    notFound();
  }

  const available = getAvailableFacets(recommendations);
  const filters = readCatalogFilters(await searchParams, available);
  // Adjacency follows the filtered view the visitor is browsing, not the whole
  // catalog, so "next" never jumps to an entry their filters excluded.
  const { previous, next } = getAdjacentRecommendations(
    filterRecommendations(recommendations, filters),
    slug,
  );

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6">
      <p>
        <Link
          href={catalogHref(filters)}
          className="text-ink focus-visible:outline-ink inline-flex items-center gap-1.5 rounded-full text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span aria-hidden="true">&larr;</span>
          {hasActiveFilters(filters) ? copy.backFilteredLabel : copy.backLabel}
        </Link>
      </p>

      <article className="mt-7">
        <header className="relative">
          {/*
            Optional art region: `detail-header`. A decorative mark may sit
            beside the name later. The header is finished without one.
          */}
          <h1 className="font-display text-ink text-3xl leading-tight sm:text-5xl">
            {recommendation.name}
          </h1>
          <p className="text-ink/75 mt-3 text-sm font-medium">
            {facetLabel(recommendation.kind)}
            <span aria-hidden="true"> &middot; </span>
            {recommendation.area}
          </p>
          <p className="text-ink/75 mt-5 max-w-xl text-base leading-relaxed">
            {recommendation.summary}
          </p>
        </header>

        <section
          aria-labelledby="why-heading"
          className="bg-surface-soft relative mt-8 overflow-hidden rounded-[2rem] px-6 py-7 sm:px-9 sm:py-9"
        >
          {/*
            Optional art region: `why-panel-accent`. The highest value art
            placement in the product, because a small character here reinforces
            that a person is speaking. The panel reads as finished without it.
          */}
          <h2
            id="why-heading"
            className="text-ink text-xs font-semibold tracking-[0.14em] uppercase"
          >
            {copy.whyHeading}
          </h2>
          <blockquote className="text-ink mt-3 text-lg leading-relaxed sm:text-2xl sm:leading-relaxed">
            {recommendation.why}
          </blockquote>
          <p className="text-ink mt-5 text-xs italic">{copy.provenanceLabel}</p>
        </section>

        {recommendation.notes === undefined ? null : (
          <section
            aria-labelledby="notes-heading"
            className="bg-surface-quiet mt-7 rounded-[1.75rem] px-6 py-6 sm:px-8"
          >
            {/*
              Optional art region: `notes-mark`. A small practical mark may sit
              beside this heading later.
            */}
            <h2
              id="notes-heading"
              className="font-display text-ink text-lg sm:text-xl"
            >
              {copy.notesHeading}
            </h2>
            <p className="text-ink mt-2.5 text-sm leading-relaxed sm:text-base">
              {recommendation.notes}
            </p>
          </section>
        )}

        {recommendation.tags.length > 0 ? (
          <section aria-labelledby="tags-heading" className="mt-8">
            <h2
              id="tags-heading"
              className="text-ink text-xs font-semibold tracking-[0.14em] uppercase"
            >
              {copy.tagsHeading}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {recommendation.tags.map((tag) => (
                <li key={tag}>
                  <PillLink
                    href={catalogHref(toggleTag(filters, tag))}
                    label={`Browse recommendations tagged ${facetLabel(tag)}`}
                  >
                    {facetLabel(tag)}
                  </PillLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>

      <nav aria-labelledby="keep-browsing-heading" className="mt-12">
        <h2
          id="keep-browsing-heading"
          className="font-display text-ink text-lg"
        >
          {copy.keepBrowsingHeading}
        </h2>
        <ul className="mt-4 flex flex-col gap-3 sm:flex-row">
          {[
            { label: copy.previousLabel, recommendation: previous },
            { label: copy.nextLabel, recommendation: next },
          ].map(({ label, recommendation: neighbour }) =>
            neighbour === undefined ? null : (
              <li key={neighbour.slug} className="flex-1">
                <Link
                  href={recommendationHref(neighbour.slug, filters)}
                  className="bg-surface ring-edge hover:bg-surface-soft focus-visible:outline-ink block h-full rounded-[1.5rem] px-5 py-4 ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span className="text-ink block text-xs font-semibold tracking-[0.14em] uppercase">
                    {label}
                  </span>
                  <span className="font-display text-ink mt-1 block text-lg">
                    {neighbour.name}
                  </span>
                </Link>
              </li>
            ),
          )}
        </ul>
        <p className="mt-5">
          <Link
            href={catalogHref(filters)}
            className="text-ink focus-visible:outline-ink rounded-full text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {hasActiveFilters(filters)
              ? copy.backFilteredLabel
              : copy.backLabel}
          </Link>
        </p>
      </nav>
    </main>
  );
}
