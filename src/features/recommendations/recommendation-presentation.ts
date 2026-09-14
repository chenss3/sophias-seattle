/**
 * Presentation helpers for recommendation content.
 *
 * These shape how curated text is displayed. They never rewrite, summarise,
 * or paraphrase it: `why` is Sophia's writing and only she edits it, per
 * docs/content-model.md.
 */

const DEFAULT_EXCERPT_LENGTH = 200;

export type WhyExcerpt = {
  readonly text: string;
  readonly truncated: boolean;
};

/**
 * A leading extract of Sophia's reasoning for list contexts.
 *
 * The browse page needs enough of the `why` to carry real voice while leaving
 * a reason to open the detail page. Several entries run several hundred
 * characters, so showing them all in full turns the list into a wall.
 *
 * Cuts on a word boundary and marks the cut so nothing reads as a complete
 * thought that was not one.
 */
export function excerptWhy(
  why: string,
  maxLength: number = DEFAULT_EXCERPT_LENGTH,
): WhyExcerpt {
  const trimmed = why.trim();

  if (trimmed.length <= maxLength) {
    return { text: trimmed, truncated: false };
  }

  const window = trimmed.slice(0, maxLength);
  const lastSpace = window.lastIndexOf(" ");
  const cut = lastSpace === -1 ? window : window.slice(0, lastSpace);

  return { text: `${cut.replace(/[,.;:]$/, "")}\u2026`, truncated: true };
}

/**
 * Turns a taxonomy value into readable label text. Kinds and tags are stored
 * kebab-case for URL and type safety; areas are already written for people.
 */
export function facetLabel(value: string): string {
  return value.replaceAll("-", " ");
}
