import Link from "next/link";

import type { Recommendation } from "@/domain/recommendations/recommendation";
import { noRecommendationFilters } from "@/domain/recommendations/recommendation-queries";
import { recommendationHref } from "./catalog-params";
import { excerptWhy, facetLabel } from "./recommendation-presentation";

const FEATURED_EXCERPT_LENGTH = 130;

/**
 * A compact preview of one recommendation for the home page taste.
 *
 * Leads with Sophia's reasoning rather than the name, because the reasoning is
 * what makes a visitor curious and the name is the answer to that curiosity.
 * Like the browse entry, this is not wrapped in an outer link.
 */
export function FeaturedRecommendation({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const excerpt = excerptWhy(recommendation.why, FEATURED_EXCERPT_LENGTH);

  return (
    <li className="bg-surface ring-edge rounded-[1.75rem] p-5 ring-1 sm:p-6">
      <blockquote className="text-ink text-base leading-relaxed sm:text-lg">
        {excerpt.text}
      </blockquote>
      <h3 className="font-display text-ink mt-4 text-xl">
        <Link
          href={recommendationHref(
            recommendation.slug,
            noRecommendationFilters,
          )}
          className="focus-visible:outline-ink rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {recommendation.name}
        </Link>
      </h3>
      <p className="text-ink/75 mt-1 text-sm font-medium">
        {facetLabel(recommendation.kind)}
        <span aria-hidden="true"> &middot; </span>
        {recommendation.area}
      </p>
    </li>
  );
}
