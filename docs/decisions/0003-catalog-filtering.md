# ADR 0003: Filter the catalog server-side with URL search parameters

- **Status:** Accepted
- **Date:** 2026-09-10

## Context

ADR 0002 deferred filtering and facet derivation until the interface that needed them made their requirements concrete. The first three visitor-facing screens make them concrete: `/recommendations` is the primary browse experience, and a visitor needs to narrow seven strong opinions by what something is, where it is, and what it is good for.

`docs/architecture.md` already prefers server components, URL search parameters for shareable filtering, and no global state. This decision records the specific contract that follows from those preferences, and the one cost it carries.

## Decision

Filtering is entirely server-side and entirely expressed in the URL. Every filter control is a `Link`. There are no client components.

- **Repeated keys, three axes.** `?kind=restaurant&kind=bakery&area=Fremont`. Values combine as OR within an axis and AND across axes, which is the behavior a visitor expects from checkbox facets.
- **Unknown values are ignored, not errors.** `readCatalogFilters` intersects the requested values with the values actually present in the catalog. A stale or hand-edited URL degrades to a broader result set rather than a failure.
- **URLs are canonical.** Toggling sorts values with `localeCompare`, so click order never changes the resulting URL and the same view always has the same address.
- **Facets are derived from the catalog, not from the type unions.** The unions describe what is expressible; the catalog describes what exists. Offering a facet that matches nothing would be a dead end. A consequence is that facets appear and disappear as Sophia adds content, which is correct.
- **No facet counts.** Counts imply a data volume the catalog does not have and add noise to a small set of pills.
- **Catalog state travels to the detail page and back.** Detail hrefs carry the active query string verbatim, and the detail page's back link rebuilds the catalog URL from it. The HTTP referrer is not used: it is unreliable, absent on direct entry, and not something the visitor can share or bookmark.
- **The URL contract lives in `src/features/recommendations/catalog-params.ts`**, separate from the pure predicates in the domain layer. The domain layer does not know that URLs exist.

## Consequences

- Browse works without JavaScript, every view is shareable, and the back button is correct for free.
- **Both recommendation routes render dynamically rather than statically**, because both read `searchParams`. This is a deliberate deviation from the static-generation preference in `docs/architecture.md`. The catalog is in-memory, so the per-request cost is negligible. If the content source ever becomes expensive to read, this is the decision to revisit.
- Adding a fourth axis means touching the URL contract, the filter predicate, and the facet panel. That is acceptable at this size and is a signal to generalize only if it happens repeatedly.
- ~~The filter panel is rendered twice, once inside a mobile `<details>` disclosure and once in a desktop panel.~~ Superseded by ADR 0004. The hybrid filter layout renders one set of controls at every viewport, so the duplicate render and its cost are gone.

## Not included

This decision does not authorize free-text search, sorting controls, pagination, client-side filtering, saved filters, a database, or any persistence of visitor state.
