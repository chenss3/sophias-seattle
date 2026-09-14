# Architecture

## Current foundation

Sophia's Seattle is one Next.js application using the App Router, React, strict TypeScript, Tailwind CSS, and npm. It has no separate backend, database, runtime integrations, or cloud-specific dependencies.

This single-application architecture is intentional. It supplies routing, metadata, static rendering, client interactivity when needed, and a future server boundary without introducing service-to-service complexity.

## Repository boundaries

The repository contains route-level application files, test setup, the recommendation domain model, curated content, feature components, reusable UI primitives, and placeholder interface copy. Future directories should be added when their first concrete implementation requires them, not pre-created as placeholders.

Dependency direction is:

```text
routes/pages -> feature components -> domain queries/types
     |                  |
     |                  `-> reusable UI primitives
     `-> curated content
```

- `src/app` owns routes, layouts, metadata, and route-level composition. It is also the only place that may import `next/font`.
- Domain code owns pure business rules and imports nothing: not React, not Next.js, not curated content. Queries take the data they operate on as parameters, so route code composes content with queries and tests can run against fixtures.
- Curated content must satisfy domain TypeScript contracts and contain no rendering logic.
- `src/features` holds feature components and the feature-level URL contract. They may depend on domain code and reusable UI primitives.
- UI primitives in `src/components` must not know about recommendations or content provenance.
- `src/copy` holds temporary interface copy that is not Sophia's voice and is awaiting her wording. It is deliberately not `src/content`, which is contractually Sophia-curated data. See `docs/content-model.md`.
- `src/lib` is reserved for clearly named cross-cutting integrations or utilities and must not become a miscellaneous dumping ground.

## Content and provenance

The curated catalog is typed TypeScript data committed to GitHub. Git history and pull requests are the editorial workflow. `docs/content-model.md` is the field-level contract.

Provenance is a domain boundary:

Sophia-curated recommendations are immutable application input at runtime and carry an explicit `provenance` literal so the boundary is compiler-enforced rather than a review responsibility.

- Future visitor-added items belong to separate types, persistence, and presentation.
- Future external suggestions must remain distinct from Sophia's endorsements.

Runtime schema validation is unnecessary while trusted, typed content is compiled with the application. Add validation only when a real runtime trust boundary appears.

## Routes

| Route                     | Purpose                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `/`                       | A deliberately minimal doorway plus a small taste of the catalog. More product functionality will live here later. |
| `/recommendations`        | The primary browse experience, with server-side filtering driven entirely by URL search parameters.                |
| `/recommendations/[slug]` | A single recommendation, with Sophia's `why` as the hero.                                                          |

ADR 0003 records the filtering URL contract.

## Rendering and state

- Prefer server components and static generation for catalog content.
- Add client components only for interactions that require browser state. There are currently no client components.
- Use URL search parameters for shareable filtering. Filtering is server-side: every filter control is a link, so browse works without JavaScript and every view is shareable and back-button correct.
- Both recommendation routes read `searchParams`, so both render dynamically rather than statically. This is a deliberate trade for the URL-as-state contract. The catalog is in-memory, so the per-request cost is trivial. Revisit if the content source ever becomes expensive to read.
- Do not add global state management until application-wide client state creates a demonstrated need.

## Styling

Tailwind CSS is the styling foundation, configured through an `@theme` block in `src/app/globals.css` rather than a JavaScript config. The semantic token set is small and every token is used by a real screen; `docs/design.md` documents what each one means. Extract a reusable component only from concrete use. Avoid one-off arbitrary styles, a large component library, or a standalone design-system package.

## Testing

Vitest and React Testing Library provide the test harness. Tests should prioritize domain rules and user-visible behavior, use accessible queries, and avoid snapshots or trivial rendering assertions unless they protect a meaningful contract.

Async server components are tested by awaiting the component function and rendering its result, passing `params` and `searchParams` as resolved promises. `notFound()` is asserted as a rejection.

## Deployment

Production output is a standard Next.js build. Azure is the expected eventual host, but the hosting product and infrastructure approach should be selected only when deployment requirements are concrete. The application should not depend on Azure SDKs or services merely because Azure is the likely destination.

## Dependency policy

Prefer the platform, framework, and existing dependencies. Add a dependency only when it solves a concrete requirement more clearly and reliably than a small local implementation. Avoid frameworks within frameworks, speculative abstractions, and packages for trivial utilities.
