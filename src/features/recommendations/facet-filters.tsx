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
 * view is shareable.
 *
 * The layout is hybrid rather than uniform, because the three axes are not
 * the same size. "What it is" holds a few values and stays on the page, where
 * it doubles as an answer to "what kind of thing is in here". "Where" and
 * "Vibe" hold many more, so they sit behind compact disclosures instead of
 * spilling dozens of pills above the recommendations.
 *
 * `details` is a platform element, so this adds no client state. A disclosure
 * renders open when its axis has a selection, which is a server-rendered
 * attribute, so an active filter is never hidden behind a closed control.
 */
export function FacetFilters({ available, filters }: FacetFiltersProps) {
  return (
    <section
      aria-label={copy.filtersLabel}
      className="flex flex-col gap-3.5 sm:gap-4"
    >
      <InlineFacet
        heading={copy.kindFacetLabel}
        values={available.kinds}
        selected={filters.kinds}
        hrefFor={(kind) => catalogHref(toggleKind(filters, kind))}
      />

      <div className="flex flex-wrap items-start gap-3">
        <CollapsedFacet
          heading={copy.areaFacetLabel}
          values={available.areas}
          selected={filters.areas}
          hrefFor={(area) => catalogHref(toggleArea(filters, area))}
        />
        <CollapsedFacet
          heading={copy.tagFacetLabel}
          values={available.tags}
          selected={filters.tags}
          hrefFor={(tag) => catalogHref(toggleTag(filters, tag))}
        />
      </div>
    </section>
  );
}

type FacetProps<Value extends string> = {
  heading: string;
  values: readonly Value[];
  selected: readonly Value[];
  hrefFor: (value: Value) => string;
};

function InlineFacet<Value extends string>({
  heading,
  values,
  selected,
  hrefFor,
}: FacetProps<Value>) {
  if (values.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <h2 className="text-ink text-xs font-semibold tracking-[0.14em] uppercase">
        {heading}
      </h2>
      <FacetPills values={values} selected={selected} hrefFor={hrefFor} />
    </div>
  );
}

function CollapsedFacet<Value extends string>({
  heading,
  values,
  selected,
  hrefFor,
}: FacetProps<Value>) {
  if (values.length === 0) {
    return null;
  }

  return (
    <details
      open={selected.length > 0}
      className="bg-surface ring-edge rounded-3xl ring-1 open:w-full"
    >
      <summary className="focus-visible:outline-ink flex cursor-pointer list-none items-center gap-2 rounded-3xl px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2">
        <h2 className="text-ink text-sm font-semibold">{heading}</h2>
        {selected.length > 0 ? (
          <span className="bg-accent text-ink rounded-full px-2 py-0.5 text-xs font-semibold">
            {selected.length}
          </span>
        ) : null}
        <span aria-hidden="true" className="text-ink/75 text-xs">
          &#9662;
        </span>
      </summary>
      <div className="border-edge border-t px-4 pt-3.5 pb-4">
        <FacetPills values={values} selected={selected} hrefFor={hrefFor} />
      </div>
    </details>
  );
}

function FacetPills<Value extends string>({
  values,
  selected,
  hrefFor,
}: Omit<FacetProps<Value>, "heading">) {
  return (
    <ul className="flex flex-wrap gap-2">
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
  );
}

/**
 * A plain-language statement of what the visitor is currently looking at.
 *
 * Announced politely rather than assertively: filtering is a full navigation,
 * so the new page is already presented, and this only needs to be available
 * when a visitor goes looking for it. It also names every active value, which
 * is what keeps a selection legible when its axis sits in a disclosure.
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
