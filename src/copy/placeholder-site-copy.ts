/**
 * INTERFACE COPY. MOSTLY PLACEHOLDER, NOT SOPHIA'S VOICE.
 *
 * Strings marked `supplied by Sophia` are her own words and must not be
 * rewritten, paraphrased, or polished. Everything else is temporary, neutral,
 * functional text written to make the interface complete. None of that may be
 * presented as her opinion, memory, or endorsement.
 *
 * docs/content-model.md requires that Sophia's reasoning comes only from
 * Sophia. That rule does not stop at the edge of the catalog, so framing copy,
 * empty states, and error states are held to it too.
 *
 * Sophia's recommendation text lives in `src/content/recommendations.ts`.
 *
 * This module exists so all of it sits in one reviewable place. Replace the
 * remaining strings with Sophia's own wording, then delete this notice.
 */
export const placeholderSiteCopy = {
  home: {
    // Supplied by Sophia. Verbatim.
    intro:
      "All my Seattle recs in one place, so I can finally stop making the same list every time someone visits.",
    // Supplied by Sophia. Verbatim.
    primaryAction: "Browse my recs",
  },
  catalog: {
    heading: "Recommendations",
    // Supplied by Sophia. Verbatim.
    intro:
      "Browse all my Seattle recs and filter based on what you\u2019re in the mood for, what area you\u2019ll be in, or what sounds good to you.",
    filtersLabel: "Filters",
    kindFacetLabel: "What it is",
    areaFacetLabel: "Where",
    tagFacetLabel: "Vibe",
    resetLabel: "Start over",
    emptyHeading: "Nothing matches these filters",
    emptyBody:
      "Try removing one of the filters, or start over to see the whole catalog.",
  },
  detail: {
    whyHeading: "Why Sophia recommends it",
    notesHeading: "Good to know",
    tagsHeading: "Vibe",
    keepBrowsingHeading: "Keep browsing",
    provenanceLabel: "Sophia-curated recommendation",
    backLabel: "Back to recommendations",
    backFilteredLabel: "Back to filtered recommendations",
    previousLabel: "Previous",
    nextLabel: "Next",
  },
  notFound: {
    heading: "That recommendation could not be found",
    body: "The link may be out of date, or the recommendation may have moved. The full catalog is still here.",
    action: "Back to all recommendations",
  },
  footer: {
    note: "A personally curated Seattle guide. Every recommendation is chosen and written by Sophia.",
  },
} as const;
