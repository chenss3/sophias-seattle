import Link from "next/link";

import { PillLink } from "@/components/pill-link";
import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";
import type { Recommendation } from "@/domain/recommendations/recommendation";
import type { RecommendationFilters } from "@/domain/recommendations/recommendation-queries";
import { catalogHref, recommendationHref, toggleTag } from "./catalog-params";
import { excerptWhy, facetLabel } from "./recommendation-presentation";

const copy = placeholderSiteCopy.catalog;

/**
 * One wide editorial entry in the browse list.
 *
 * Sophia's reasoning is the visual centre: it gets the panel, the largest
 * body text, and the position directly under the name. `summary` sits beneath
 * it as supporting text rather than above it as a headline, because her
 * perspective is the product.
 *
 * The entry is deliberately not wrapped in a single link. It contains tag
 * links of its own, so an outer anchor would nest interactive elements and
 * make the tags ambiguous. The name and the reasoning link are the two routes
 * to the detail page.
 */
export function RecommendationEntry({
  recommendation,
  filters,
}: {
  recommendation: Recommendation;
  filters: RecommendationFilters;
}) {
  const href = recommendationHref(recommendation.slug, filters);
  const excerpt = excerptWhy(recommendation.why);

  return (
    <li className="bg-surface ring-edge relative rounded-[2rem] p-6 ring-1 sm:p-8">
      {/*
        Optional art region: `entry-accent`. A sticker-like mark may be
        anchored here later. The entry is complete without one, so nothing is
        rendered until real artwork exists.
      */}
      <h2 className="font-display text-ink text-2xl leading-tight sm:text-[1.75rem]">
        <Link
          href={href}
          className="focus-visible:outline-ink rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {recommendation.name}
        </Link>
      </h2>

      <p className="text-ink/75 mt-2 text-sm font-medium">
        {facetLabel(recommendation.kind)}
        <span aria-hidden="true"> &middot; </span>
        {recommendation.area}
      </p>

      <figure className="bg-surface-soft mt-5 rounded-3xl px-5 py-5 sm:px-7 sm:py-6">
        <figcaption className="text-ink text-xs font-semibold tracking-[0.14em] uppercase">
          {placeholderSiteCopy.detail.whyHeading}
        </figcaption>
        <blockquote className="text-ink mt-2 text-lg leading-relaxed sm:text-xl">
          {excerpt.text}
        </blockquote>
      </figure>

      <p className="text-ink/75 mt-5 text-sm leading-relaxed">
        {recommendation.summary}
      </p>

      {recommendation.tags.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {recommendation.tags.map((tag) => {
            const selected = filters.tags.includes(tag);

            return (
              <li key={tag}>
                <PillLink
                  href={catalogHref(toggleTag(filters, tag))}
                  label={`${selected ? "Remove" : "Add"} filter: ${facetLabel(tag)}`}
                  selected={selected}
                >
                  {facetLabel(tag)}
                </PillLink>
              </li>
            );
          })}
        </ul>
      ) : null}

      <p className="mt-6">
        <Link
          href={href}
          aria-label={`${copy.entryAction} for ${recommendation.name}`}
          className="text-ink focus-visible:outline-ink inline-flex items-center gap-1 rounded-full text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {copy.entryAction}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
    </li>
  );
}
