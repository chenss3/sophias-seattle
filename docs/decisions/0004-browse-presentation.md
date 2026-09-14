# ADR 0004: Browse as a card grid, and the home page as a landing page

- **Status:** Accepted
- **Date:** 2026-09-13

## Context

The first three visitor screens, recorded in ADR 0003 and built on the art direction in `docs/design.md`, made two presentation bets that did not survive review on the real screens.

The home page carried a taste of the catalog: a "A few to start with" section, three preview cards, and a "See every recommendation" link. On the screen it read as a second, smaller browse experience competing with `/recommendations` for the same job.

The catalog was a single column of wide editorial entries, each leading with the `why` in its own panel. The intent was to keep Sophia's reasoning prominent everywhere. The effect was that scanning the catalog meant scrolling past seven long blocks, and choosing between them was harder than it should be. The filter panel above them offered every value on all three axes at once, which is a large number of pills for a visitor who has not yet seen a single recommendation.

This decision records the revised presentation. It does not change the domain model, the content contract, or the URL contract in ADR 0003.

## Decision

**The home page is a landing page.** Shared navigation, the hero, Sophia's introduction, one call to action, one optional poster region, and the shared footer. It shows no recommendations. Browsing belongs to one route, and a taste of the catalog on the doorway splits it across two.

**Browse is a responsive card grid.** One column, two from `sm`, three from `lg`. A card carries the optional visual region, the name, `kind` and `area` as quiet metadata, a short extract of the `why`, and up to three tags. The full `why` stays the centrepiece of the detail page, which is where a visitor has already chosen to spend attention on one place.

**No scores, ratings, rankings, or position numbers.** Every entry is a place Sophia recommends. Ordering is her editorial file order and the interface must not imply any other ranking.

**A card is one click target, and its tags are static.** The name is the only link, and its `::after` overlay covers the card. This gives the card one accessible name and no nested interactive elements, which is what makes whole-card clicking safe. Tag filtering has not been lost: it lives in the Vibe control and on the detail page. The earlier entry deliberately avoided an outer link precisely because it held tag links; removing those is what makes the outer link available.

**The card visual region is toned by `kind`.** Three kinds, three pastel surfaces, mapped exhaustively over the union so a new kind is a compile error rather than a silent default. Nothing is added to `Recommendation`. The region is an optional edge of the card layout, per `docs/design.md`, so Sophia's artwork replaces what sits inside it without touching the model or the card structure.

**Filters are hybrid, not uniform.** "What it is" stays on the page because it holds a few values and answers "what sort of thing is in here". "Where" and "Vibe" sit in `details` disclosures because they hold many more. One set of controls renders at every viewport, replacing the mobile and desktop pair that ADR 0003 recorded as a consequence.

**A disclosure opens when its axis has a selection.** The `open` attribute is computed on the server from the filters already parsed out of the URL, so an active filter is never hidden behind a closed control and no client state is introduced. The summary shows how many values that axis has selected. That is a count of the visitor's own selection and not a facet result count, so the "no facet counts" decision in ADR 0003 stands.

**"Good for" is now "Vibe" in visitor-facing copy**, on the filter control and on the detail page. The domain model keeps `tags`. This is a presentation rename only.

## Consequences

- Still no client components, and browse still works with JavaScript disabled. `details` is a platform element and every filter control is still a `Link`.
- The URL contract, the filter predicates, and filter-state preservation across the detail page are untouched. A card links through the same `recommendationHref` the entry used.
- Tag filtering is one interaction further away on the browse page than it was. The Vibe control and the detail page tags both still reach it.
- A visitor scanning the grid sees less of each `why` than before. That is the trade the grid is making, and the detail page is where the full reasoning lives.
- The grid needs more horizontal room than a reading column, so the browse route and the shared chrome widen. The detail page keeps a narrow measure, because it is prose.
- `docs/design.md` previously said to avoid a grid of cards. That guidance has been revised rather than quietly contradicted, and what it was protecting against is now stated as the specific things this grid must not become.

## Not included

This decision does not authorize artwork, image fields on `Recommendation`, an asset pipeline, sorting controls, search, pagination, client-side filtering, or facet counts.
