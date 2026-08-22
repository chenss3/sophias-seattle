# Sophia's Seattle

Sophia's Seattle is a living, curated guide to Seattle based on Sophia's personal recommendations. The project is currently in its foundation phase: this repository contains the application scaffold and engineering tooling, but no recommendation features yet.

## Prerequisites

- [Node.js 24](https://nodejs.org/) (the current LTS major)
- npm 11, included with Node.js 24

The expected Node.js version is recorded in `.nvmrc` and `package.json`.

## Setup

Install the lockfile-exact dependency set:

```powershell
npm ci
```

Start the local development server:

```powershell
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

No environment variables or external services are required for the foundation application.

## Commands

| Command                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the Next.js development server             |
| `npm run format`       | Format supported repository files                |
| `npm run format:check` | Verify formatting without changing files         |
| `npm run lint`         | Run ESLint with warnings treated as failures     |
| `npm run typecheck`    | Run TypeScript without emitting build artifacts  |
| `npm run test`         | Run the Vitest suite once                        |
| `npm run test:watch`   | Run Vitest in watch mode                         |
| `npm run build`        | Create a production Next.js build                |
| `npm run check`        | Run every required quality gate in release order |

Run `npm run check` before opening or updating a pull request.

## Documentation

- [Product principles and scope](docs/product.md)
- [Architecture](docs/architecture.md)
- [Foundation decision record](docs/decisions/0001-foundation.md)

## Development workflow

Use short-lived feature branches and pull requests for changes intended for `main`. Keep changes narrow, include tests for behavior changes, and update documentation when a durable product or architecture decision changes.

Recommendation data, catalog routes, filtering, saved items, trip planning, and personalization belong to later product phases and are intentionally absent from this bootstrap.
