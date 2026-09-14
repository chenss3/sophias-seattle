/**
 * Presentation helpers for recommendation content.
 *
 * These shape how curated text is displayed. They never rewrite, summarise,
 * or paraphrase it: `why` is Sophia's writing and only she edits it, per
 * docs/content-model.md.
 */

import type { RecommendationKind } from "@/domain/recommendations/recommendation";

const DEFAULT_EXCERPT_LENGTH = 200;

/**
 * The browse grid shows several cards side by side, so its excerpt is shorter
 * than a full-width list would allow. Long enough to carry Sophia's voice,
 * short enough that cards stay a scannable, even height.
 */
export const CARD_EXCERPT_LENGTH = 120;

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

/**
 * The pastel surface a browse card's visual region uses until Sophia's
 * artwork exists.
 *
 * Varying the tone by `kind` keeps the grid from reading as one wall of
 * identical blocks, and it reads from data the recommendation model already
 * has, so no field is added in anticipation of art. The region itself stays
 * an optional edge of the card layout: real artwork replaces what sits inside
 * it without touching this mapping or the card structure.
 *
 * The record is exhaustive over the union, so adding a kind is a compile
 * error rather than a silent fallback to a default tone.
 */
const kindTones: Record<RecommendationKind, string> = {
  restaurant: "bg-surface-soft",
  bakery: "bg-surface-warm",
  dessert: "bg-surface-quiet",
};

export function visualToneClass(kind: RecommendationKind): string {
  return kindTones[kind];
}
