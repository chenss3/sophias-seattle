import Link from "next/link";

import type { Recommendation } from "@/domain/recommendations/recommendation";
import type { RecommendationFilters } from "@/domain/recommendations/recommendation-queries";
import { recommendationHref } from "./catalog-params";
import {
  CARD_EXCERPT_LENGTH,
  excerptWhy,
  facetLabel,
  visualToneClass,
} from "./recommendation-presentation";

/**
 * How many tags a card shows. Enough to characterise a place at a glance,
 * few enough that the grid stays scannable. The full set is on the detail
 * page, and every tag remains filterable through the Vibe control.
 */
const CARD_TAG_LIMIT = 3;

/**
 * One recommendation in the browse grid.
 *
 * The grid is for discovery: a visitor should be able to scan the catalog and
 * pick something. Sophia's reasoning still leads the text, but as a short
 * excerpt rather than the full panel it gets on the detail page, which stays
 * the place her `why` is the centrepiece.
 *
 * The whole card is one click target. The name is the only link and its
 * overlay covers the card, so the card has exactly one accessible name and no
 * nested interactive elements. That is what lets the tags be quiet static
 * chips here instead of the filter links they are elsewhere.
 *
 * There is deliberately no score, rating, rank, or position number. Every
 * entry is a place Sophia recommends, and ordering is her editorial file
 * order.
 */
export function RecommendationCard({
  recommendation,
  filters,
}: {
  recommendation: Recommendation;
  filters: RecommendationFilters;
}) {
  const excerpt = excerptWhy(recommendation.why, CARD_EXCERPT_LENGTH);
  const tags = recommendation.tags.slice(0, CARD_TAG_LIMIT);

  return (
    <li className="bg-surface ring-edge hover:ring-edge-strong focus-within:ring-ink relative flex flex-col overflow-hidden rounded-[1.75rem] ring-1 transition-colors focus-within:ring-2">
      {/*
        Optional art region: `card-visual`. Sophia's artwork sits here later.
        Until then the region is a pastel surface toned by `kind`, which is a
        finished state rather than a placeholder for missing art.
      */}
      <div
        aria-hidden="true"
        className={`${visualToneClass(recommendation.kind)} h-32 w-full sm:h-36`}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="font-display text-ink text-xl leading-tight">
          <Link
            href={recommendationHref(recommendation.slug, filters)}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {recommendation.name}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </h2>

        <p className="text-ink/75 mt-1.5 text-sm font-medium">
          {facetLabel(recommendation.kind)}
          <span aria-hidden="true"> &middot; </span>
          {recommendation.area}
        </p>

        <blockquote className="text-ink mt-3.5 text-base leading-relaxed">
          {excerpt.text}
        </blockquote>

        {tags.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="bg-surface-quiet/60 text-ink rounded-full px-2.5 py-1 text-xs font-medium"
              >
                {facetLabel(tag)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
