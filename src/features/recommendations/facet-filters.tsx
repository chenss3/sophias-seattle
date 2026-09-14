import Link from "next/link";

import { PillLink } from "@/components/pill-link";
import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";
import type {
  AvailableFacets,
  RecommendationFilters,
} from "@/domain/recommendations/recommendation-queries";
import {
  hasActiveFilters,
  noRecommendationFilters,
} from "@/domain/recommendations/recommendation-queries";
import {
  catalogHref,
  toggleArea,
  toggleKind,
  toggleTag,
} from "./catalog-params";
import { facetLabel } from "./recommendation-presentation";

const copy = placeholderSiteCopy.catalog;

type FacetFiltersProps = {
  available: AvailableFacets;
  filters: RecommendationFilters;
};

/**
 * The browse filter controls.
 *
 * Every pill is a plain link that toggles one value in the current query
 * string, so filtering works with no client JavaScript and every filtered
 * view is shareable. A later progressive enhancement can make this feel
 * instant without changing the URL contract.
 *
 * On small screens the panel collapses into a native disclosure that is
 * closed by default, so filters never push the recommendations below the
 * fold. The wide-screen panel is a separate always-visible render rather than
 * a restyled disclosure, because the hidden state of `details` is not
 * reliably overridable across browsers.
 */
export function FacetFilters({ available, filters }: FacetFiltersProps) {
  const activeCount =
    filters.kinds.length + filters.areas.length + filters.tags.length;

  return (
    <section aria-label={copy.filtersLabel}>
      <details className="bg-surface ring-edge rounded-3xl ring-1 md:hidden">
        <summary className="focus-visible:outline-ink flex cursor-pointer list-none items-center justify-between gap-3 rounded-3xl px-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2">
          <h2 className="font-display text-ink text-lg">{copy.filtersLabel}</h2>
          <span className="text-ink/75 text-sm font-medium">
            {activeCount === 0 ? "None active" : `${activeCount} active`}
          </span>
        </summary>
        <div className="border-edge border-t px-5 pt-5 pb-6">
          <FacetGroups available={available} filters={filters} />
        </div>
      </details>

      <div className="bg-surface ring-edge hidden rounded-[2rem] px-7 py-6 ring-1 md:block">
        <h2 className="font-display text-ink text-xl">{copy.filtersLabel}</h2>
        <div className="mt-4">
          <FacetGroups available={available} filters={filters} />
        </div>
      </div>
    </section>
  );
}

function FacetGroups({ available, filters }: FacetFiltersProps) {
  return (
    <div className="flex flex-col gap-5">
      <FacetGroup
        heading="What it is"
        values={available.kinds}
        selected={filters.kinds}
        hrefFor={(kind) => catalogHref(toggleKind(filters, kind))}
      />
      <FacetGroup
        heading="Where it is"
        values={available.areas}
        selected={filters.areas}
        hrefFor={(area) => catalogHref(toggleArea(filters, area))}
      />
      <FacetGroup
        heading="Good for"
        values={available.tags}
        selected={filters.tags}
        hrefFor={(tag) => catalogHref(toggleTag(filters, tag))}
      />
    </div>
  );
}

function FacetGroup<Value extends string>({
  heading,
  values,
  selected,
  hrefFor,
}: {
  heading: string;
  values: readonly Value[];
  selected: readonly Value[];
  hrefFor: (value: Value) => string;
}) {
  if (values.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-ink text-xs font-semibold tracking-[0.14em] uppercase">
        {heading}
      </h3>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {values.map((value) => {
          const isSelected = selected.includes(value);

          return (
            <li key={value}>
              <PillLink
                href={hrefFor(value)}
                label={`${isSelected ? "Remove" : "Add"} filter: ${facetLabel(value)}`}
                selected={isSelected}
              >
                {facetLabel(value)}
              </PillLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * A plain-language statement of what the visitor is currently looking at.
 *
 * Announced politely rather than assertively: filtering is a full navigation,
 * so the new page is already presented, and this only needs to be available
 * when a visitor goes looking for it.
 */
export function CatalogResultSummary({
  matched,
  total,
  filters,
}: {
  matched: number;
  total: number;
  filters: RecommendationFilters;
}) {
  const active = hasActiveFilters(filters);
  const activeValues = [
    ...filters.kinds,
    ...filters.areas,
    ...filters.tags,
  ].map(facetLabel);

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <p role="status" className="text-ink text-sm">
        {active
          ? `Showing ${matched} of ${total} recommendations. Filters: ${activeValues.join(", ")}.`
          : `Showing all ${total} recommendations.`}
      </p>
      {active ? (
        <Link
          href={catalogHref(noRecommendationFilters)}
          className="text-ink focus-visible:outline-ink rounded-full text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {copy.resetLabel}
        </Link>
      ) : null}
    </div>
  );
}
