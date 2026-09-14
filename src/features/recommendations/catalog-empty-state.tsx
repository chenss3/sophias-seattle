import Link from "next/link";

import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";
import { noRecommendationFilters } from "@/domain/recommendations/recommendation-queries";
import { catalogHref } from "./catalog-params";

const copy = placeholderSiteCopy.catalog;

/**
 * Shown when the active filters match nothing.
 *
 * Never a bare "no results". Dropping an individual filter is already offered
 * by the facet panel directly above, so this only needs to name the situation
 * warmly and give one click back to the whole catalog.
 */
export function CatalogEmptyState() {
  return (
    <section className="bg-surface ring-edge mt-6 rounded-[2rem] px-6 py-10 text-center ring-1 sm:px-10">
      {/*
        Optional art region: `empty-state`. An illustration may sit above this
        message later. The message stands on its own without one.
      */}
      <h2 className="font-display text-ink text-2xl">{copy.emptyHeading}</h2>
      <p className="text-ink/75 mx-auto mt-3 max-w-sm text-sm leading-relaxed">
        {copy.emptyBody}
      </p>

      <p className="mt-7">
        <Link
          href={catalogHref(noRecommendationFilters)}
          className="bg-accent font-display text-ink ring-edge hover:bg-surface-soft focus-visible:outline-ink inline-flex items-center rounded-full px-5 py-2.5 text-base ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {copy.resetLabel}
        </Link>
      </p>
    </section>
  );
}
