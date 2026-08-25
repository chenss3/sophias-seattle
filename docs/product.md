# Product principles and scope

## Vision

Sophia's Seattle gives visitors access to Sophia's personal knowledge of Seattle. It should help friends and other visitors understand what Sophia recommends and why, then eventually help them turn those recommendations into a trip that fits their preferences.

The product should feel curated and personal, not like a generic travel search engine.

## Product principles

### Sophia's perspective is the product

Every Sophia-curated recommendation should explain why she recommends it. Generic descriptions and exhaustive coverage are less valuable than a clear personal point of view.

### Provenance must remain visible

Sophia-curated recommendations, visitor-added items, and externally suggested items are different kinds of content. Future features must preserve that distinction in the domain model, storage, and interface. Visitor or external content must never imply Sophia's endorsement.

### Start useful and stay understandable

Build the smallest complete visitor experience, learn from real use, and add capability incrementally. Prefer transparent deterministic behavior over opaque personalization.

### Editorial quality over catalog size

A smaller maintained collection is preferable to a large, stale, or automatically generated catalog.

## Initial MVP

The first product release will be read-only and should let a visitor:

- browse Sophia-curated recommendations;
- filter recommendations through simple deterministic facets;
- open a recommendation and understand why Sophia recommends it.

The canonical entity is a `Recommendation`, not a `Place`. Recommendations may represent restaurants, activities, neighborhoods, outdoor experiences, day trips, or other experiences.

## Current phase

The foundation phase established the application scaffold, engineering workflow, documentation, Copilot instructions, and continuous integration.

The current phase defines the canonical `Recommendation` domain model, its curated content module, and its tests. It intentionally contains no catalog interface, filtering, or detail routes. See `docs/content-model.md` for the content contract.

## Later capabilities

Potential later phases may add:

- preference-based recommendation matching;
- saved items;
- trip planning;
- visitor-added items;
- carefully labeled external suggestions.

These are directions, not commitments or requirements for the initial MVP.

## Explicit initial exclusions

The initial MVP will not include authentication, accounts, a database, AI or LLM features, external location APIs, a CMS, trip optimization, collaboration, payments, notifications, microservices, or cloud-specific infrastructure.
