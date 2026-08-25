# ADR 0002: Model curated recommendations as a slug-identified domain type

- **Status:** Accepted
- **Date:** 2026-08-25

## Context

ADR 0001 deliberately excluded recommendation domain code from the foundation bootstrap. The next increment defines the canonical `Recommendation` contract, adds typed curated content, and proves both with tests. It adds no user interface.

Two product constraints shape the model. Sophia's perspective is the product, so a recommendation without her reasoning is not useful. And Sophia-curated recommendations must stay distinct from future visitor-added items and external suggestions, in the domain model as well as in storage and presentation.

## Decision

Define `Recommendation` in `src/domain/recommendations/recommendation.ts` with `slug`, `name`, `kind`, `area`, `summary`, `why`, `tags`, optional `notes`, and `provenance`.

- **The slug is the canonical identifier for the current MVP.** No separate opaque ID is needed today. The slug already provides a stable URL-facing identifier, and adding a second ID would add synchronization complexity without a current product benefit. Revisit this if future persistence requirements justify an immutable internal ID.
- **`provenance` is the literal `"sophia-curated"`.** Without the literal, any structurally similar object satisfies `Recommendation`, so a future visitor-added item could flow into curated surfaces without a type error. The literal turns the product's central boundary into a compile-time guarantee.
- **`why` is required.** The type enforces the editorial standard instead of relying on discipline.
- **Classification uses two axes.** A required `kind` describes what something is; `tags` describe what it is good for and may be an empty list. Collapsing them into one list would make coherent filtering impossible later.
- **`kind`, `tags`, and `area` are closed unions.** A typo would silently create a duplicate facet in a future filter. A union catches it at compile time at no runtime cost. Union values start minimal and grow with the recommendation that needs them, rather than being designed up front.
- **`area`, not `neighborhood`.** A day trip has no Seattle neighborhood.
- **Queries are pure and parameterized.** `getRecommendationBySlug` takes the catalog as an argument, so the domain layer imports nothing -- not React, not Next.js, not `src/content` -- and tests run against fixtures. Route code composes content with queries.
- **Only slug lookup ships now.** Filtering, facet derivation, and sorting are deferred until the interface that needs them makes their requirements concrete.
- **No runtime validation.** Content is trusted, typed, and compiled with the application, so no runtime trust boundary exists yet. This is consistent with `docs/architecture.md`.

## Consequences

- Curated content cannot be confused with visitor or external content without a type error.
- The catalog cannot silently lose its editorial voice; missing reasoning fails the build or the tests.
- Catalog integrity tests protect editorial quality automatically as the catalog grows, and pass on an empty catalog so the contract can land before content does.
- The union vocabulary will change often at first. That is intended.
- A future visitor-added item needs its own type and its own storage. It must not be widened into `Recommendation`.
- If content later moves to a database or CMS, runtime validation becomes necessary and this decision should be revisited.

## Not included

This decision does not authorize catalog browse UI, recommendation detail routes, filtering, search, sorting, design tokens or components, images, addresses, websites, hours, pricing, geo coordinates, publication status, a database, authentication, AI, external APIs, Azure infrastructure, visitor-added items, external suggestions, saved items, or trip planning.
