# ADR 0001: Establish a single Next.js application foundation

- **Status:** Accepted
- **Date:** 2026-08-21

## Context

Sophia's Seattle is a small personal product that will grow incrementally. GitHub Copilot will perform much of the implementation work, so the repository needs strong, conventional guardrails without an architecture that creates unnecessary files, services, abstractions, or maintenance.

The application should support a static-first recommendation guide now and leave room for carefully introduced server-side capabilities later. Azure is the likely deployment environment, but hosting details are not yet known.

## Decision

Build Sophia's Seattle as one Next.js App Router application with React and strict TypeScript.

- Use npm and commit `package-lock.json`.
- Use Tailwind CSS with a future lightweight semantic token layer.
- Use ESLint, Prettier, TypeScript, Vitest, and React Testing Library as the local quality toolchain.
- Run formatting verification, linting, type checking, tests, and the production build in GitHub Actions and through one local `npm run check` command.
- Keep the future curated recommendation content as typed TypeScript committed to GitHub.
- Prefer static generation and server components until interaction or runtime data requires otherwise.
- Keep deployment provider details outside the application foundation.

## Consequences

- One repository and one deployable application remain easy to understand and operate.
- Product changes, curated content, documentation, and CI are reviewed through the same Git workflow.
- The application can later add server capabilities without creating a separate backend prematurely.
- Runtime content editing will require a later architectural decision if Git-based editing stops being sufficient.
- Azure infrastructure, persistence, authentication, and external integrations remain intentionally undecided.

## Not included

This decision does not authorize recommendation domain code, catalog features, a database, authentication, AI, external APIs, Playwright, a component library, or cloud infrastructure during foundation bootstrap.
