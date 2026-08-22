# Sophia's Seattle repository instructions

## Engineering approach

- Make the smallest complete change that satisfies the current task. Do not scaffold future phases, empty directories, speculative abstractions, or unused components.
- Preserve strict TypeScript. Avoid `any`, unsafe casts, non-null assertions, and silent error handling.
- Prefer mature platform and framework capabilities over new dependencies. Add a package only for a concrete requirement that existing tools cannot solve cleanly.
- Follow established repository naming, layout, scripts, and patterns. Keep files focused and delete superseded code instead of retaining parallel approaches.
- Before substantial changes, read the relevant files in docs/ and inspect the existing implementation before introducing a new pattern.

## Architecture

- Prefer React server components. Add `"use client"` only when browser state, effects, or event handlers require it.
- Keep business rules and query logic pure and outside React components and Next.js route files.
- Keep route files focused on routing, metadata, data access, and feature composition.
- Create reusable UI primitives only after concrete product use demonstrates reuse. Keep Tailwind usage aligned with the repository's semantic tokens once those tokens exist.
- Preserve provenance as a first-class boundary: Sophia-curated recommendations, visitor-added items, and external suggestions must never be conflated in types, storage, or presentation.

## Quality

- Add or update behavior-focused tests when behavior changes. Prefer domain and user-visible behavior tests over implementation details, broad snapshots, or trivial static-rendering tests.
- Use accessible semantic HTML and React Testing Library queries that reflect how visitors use the interface.
- Run the smallest relevant checks while developing and `npm run check` before considering a change complete.
- Update documentation when a durable product contract, architecture boundary, workflow, or dependency policy changes.

## Scope

- Implement only the explicitly requested phase or feature. Do not begin later product phases without a clear request.
- Do not introduce a database, authentication, AI/LLM functionality, external APIs, Azure infrastructure, microservices, or a large UI library without an approved requirement and architecture decision.
