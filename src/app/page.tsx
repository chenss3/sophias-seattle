import Link from "next/link";

import { recommendations } from "@/content/recommendations";
import { placeholderSiteCopy } from "@/copy/placeholder-site-copy";
import { FeaturedRecommendation } from "@/features/recommendations/featured-recommendation";

const copy = placeholderSiteCopy.home;

/**
 * The home page is deliberately small. It frames what the product is, points
 * at the browse experience, and shows a short taste drawn from editorial file
 * order. Later product capability is expected to land here, so the page leaves
 * room rather than filling it now.
 */
const featured = recommendations.slice(0, 3);

export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-6">
      <section className="bg-surface-soft relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-10 sm:py-20">
        {/*
          Optional art regions: `hero` behind this block and `hero-accent` at
          its corners. Until Sophia's artwork exists, the hero is a soft pastel
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

        <div className="relative">
          <h1 className="font-display text-ink text-4xl leading-tight sm:text-6xl">
            Sophia&apos;s Seattle
          </h1>
          <p className="text-ink mx-auto mt-5 max-w-lg text-base leading-relaxed sm:text-lg">
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
      </section>

      <section aria-labelledby="featured-heading" className="mt-14">
        <h2
          id="featured-heading"
          className="font-display text-ink text-2xl sm:text-3xl"
        >
          {copy.featuredHeading}
        </h2>
        <ul className="mt-6 flex flex-col gap-4">
          {featured.map((recommendation) => (
            <FeaturedRecommendation
              key={recommendation.slug}
              recommendation={recommendation}
            />
          ))}
        </ul>
        <p className="mt-6">
          <Link
            href="/recommendations"
            className="text-ink focus-visible:outline-ink rounded-full text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {copy.featuredFooterLink}
          </Link>
        </p>
      </section>
    </main>
  );
}
