/**
 * PLACEHOLDER INTERFACE COPY. NOT SOPHIA'S VOICE.
 *
 * Every string here is temporary, neutral, functional text written to make the
 * interface complete. None of it was supplied by Sophia and none of it may be
 * presented as her opinion, memory, or endorsement.
 *
 * docs/content-model.md requires that Sophia's reasoning comes only from
 * Sophia. That rule does not stop at the edge of the catalog, so framing copy,
 * empty states, and error states are held to it too.
 *
 * Sophia's actual words live in `src/content/recommendations.ts` and are the
 * only text in the product written in her voice.
 *
 * This module exists so all of it sits in one reviewable place. Replace these
 * strings with Sophia's own wording, then delete this notice.
 */
export const placeholderSiteCopy = {
  home: {
    intro:
      "A personal guide to Seattle. Every recommendation here was chosen by Sophia, and each one comes with her reasoning for it.",
    primaryAction: "Browse the recommendations",
    featuredHeading: "A few to start with",
    featuredFooterLink: "See every recommendation",
  },
  catalog: {
    heading: "Recommendations",
    intro:
      "Filter by what something is, where it is, or what it is good for. Sophia's reasoning sits with every entry.",
    filtersLabel: "Filters",
    activeFiltersLabel: "Active filters",
    resetLabel: "Start over",
    entryAction: "Read the full reasoning",
    emptyHeading: "Nothing matches these filters",
    emptyBody:
      "Try removing one of the filters, or start over to see the whole catalog.",
  },
  detail: {
    whyHeading: "Why Sophia recommends it",
    notesHeading: "Good to know",
    tagsHeading: "Good for",
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
