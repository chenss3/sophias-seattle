import Link from "next/link";

import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";
import { CATALOG_PATH } from "@/features/recommendations/catalog-params";

const copy = placeholderSiteCopy.notFound;

/**
 * Shown when a slug does not match a curated recommendation. The domain query
 * returns `undefined` rather than throwing, so the route decides how a miss is
 * presented, and it is presented as a route back into the catalog rather than
 * as an error.
 */
export default function RecommendationNotFound() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-6"
    >
      <section className="bg-surface ring-edge rounded-[2.5rem] px-6 py-14 ring-1 sm:px-10">
        {/*
          Optional art region: `empty-state`. An illustration may sit above this
          message later. The message stands on its own without one.
        */}
        <h1 className="font-display text-ink text-3xl leading-tight sm:text-4xl">
          {copy.heading}
        </h1>
        <p className="text-ink/75 mx-auto mt-4 max-w-md text-base leading-relaxed">
          {copy.body}
        </p>
        <p className="mt-8">
          <Link
            href={CATALOG_PATH}
            className="bg-accent font-display text-ink ring-edge hover:bg-surface-soft focus-visible:outline-ink inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {copy.action}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </section>
    </main>
  );
}
