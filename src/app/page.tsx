import Link from "next/link";

import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";

const copy = placeholderSiteCopy.home;

/**
 * The home page is a doorway, not a second browse experience.
 *
 * It says what the site is, then sends the visitor to the catalog. It
 * deliberately shows no recommendations: a taste of the catalog here competes
 * with `/recommendations` for the same job and splits the browse experience
 * across two screens.
 *
 * The page is a two-column composition at wide viewports and stacks below
 * that, so the poster region reads as part of the hero rather than as a
 * banner bolted above it.
 */
export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6">
      <section className="bg-surface-soft relative overflow-hidden rounded-[2.5rem] px-6 py-12 sm:px-10 sm:py-16">
        {/*
          Optional art regions: `hero` behind this block and `hero-accent` at
          its corners. Until Sophia's artwork exists the hero is a soft pastel
          surface with two decorative washes, which is a finished state rather
          than a placeholder.
        */}
        <div
          aria-hidden="true"
          className="bg-accent/50 pointer-events-none absolute -top-16 -left-14 h-44 w-44 rounded-full blur-2xl"
        />
        <div
          aria-hidden="true"
          className="bg-surface-quiet/70 pointer-events-none absolute -right-16 -bottom-20 h-52 w-52 rounded-full blur-2xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-ink text-4xl leading-tight sm:text-6xl">
              Sophia&apos;s Seattle
            </h1>
            <p className="text-ink mx-auto mt-5 max-w-lg text-base leading-relaxed sm:text-lg lg:mx-0">
              {copy.intro}
            </p>
            <Link
              href="/recommendations"
              className="bg-accent font-display text-ink ring-edge hover:bg-surface focus-visible:outline-ink mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {copy.primaryAction}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/*
            Optional art region: `home-poster`. The most prominent art
            placement in the product and the one Sophia's poster is intended
            for. It is a sized pastel panel at the edge of the hero layout, so
            real artwork drops in without the page being redesigned, and the
            hero stays balanced while it is empty.
          */}
          <div
            aria-hidden="true"
            className="bg-surface/70 ring-edge mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] ring-1 lg:mx-0"
          />
        </div>
      </section>
    </main>
  );
}
