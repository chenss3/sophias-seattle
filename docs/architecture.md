# Architecture

## Current foundation

Sophia's Seattle is one Next.js application using the App Router, React, strict TypeScript, Tailwind CSS, and npm. It has no separate backend, database, runtime integrations, or cloud-specific dependencies.

This single-application architecture is intentional. It supplies routing, metadata, static rendering, client interactivity when needed, and a future server boundary without introducing service-to-service complexity.

## Repository boundaries

The foundation contains only route-level application files and test setup. Future directories should be added when their first concrete implementation requires them, not pre-created as placeholders.

When recommendation features begin, dependency direction should be:

```text
routes/pages -> feature components -> domain queries/types -> curated content
                    |
                    `-> reusable UI primitives
```

- `src/app` owns routes, layouts, metadata, and route-level composition.
- Domain code owns pure business rules and must not import React or Next.js.
- Curated content must satisfy domain TypeScript contracts and contain no rendering logic.
- Feature components may depend on domain code and reusable UI primitives.
- UI primitives must not know about recommendations or content provenance.
- `src/lib` is reserved for clearly named cross-cutting integrations or utilities and must not become a miscellaneous dumping ground.

## Content and provenance

The future curated catalog will be typed TypeScript data committed to GitHub. Git history and pull requests will be the initial editorial workflow.

Provenance is a domain boundary:

- Sophia-curated recommendations are immutable application input at runtime.
- Future visitor-added items belong to separate persistence and presentation.
- Future external suggestions must remain distinct from Sophia's endorsements.

Runtime schema validation is unnecessary while trusted, typed content is compiled with the application. Add validation only when a real runtime trust boundary appears.

## Rendering and state

- Prefer server components and static generation for catalog content.
- Add client components only for interactions that require browser state.
- Use URL search parameters for shareable filtering.
- Do not add global state management until application-wide client state creates a demonstrated need.

## Styling

Tailwind CSS is the styling foundation. Product work should define a small semantic token set and create reusable components only from concrete use. Avoid one-off arbitrary styles, a large component library, or a standalone design-system package.

The temporary foundation page is not the product design system.

## Testing

Vitest and React Testing Library provide the test harness. Tests should prioritize domain rules and user-visible behavior, use accessible queries, and avoid snapshots or trivial rendering assertions unless they protect a meaningful contract.

The bootstrap includes one small page test to prove the browser-like test environment is wired correctly. Product tests should focus primarily on recommendation behavior.

## Deployment

Production output is a standard Next.js build. Azure is the expected eventual host, but the hosting product and infrastructure approach should be selected only when deployment requirements are concrete. The application should not depend on Azure SDKs or services merely because Azure is the likely destination.

## Dependency policy

Prefer the platform, framework, and existing dependencies. Add a dependency only when it solves a concrete requirement more clearly and reliably than a small local implementation. Avoid frameworks within frameworks, speculative abstractions, and packages for trivial utilities.
