# Visual design

This is the art direction for Sophia's Seattle. It describes how the product should look and feel, and it applies to all visitor-facing interface work.

It is deliberately a brief rather than a specification. It states intent and constraints. The actual token set and component library are built from real screens during product work, not designed in advance here.

## Direction

Sophia's Seattle should feel cute, pastel, cozy, polished, and playful, drawing on cozy girl games and adorable illustrated digital spaces.

The product should feel like:

> A polished, illustrated Seattle guide made by a friend with strong opinions who loves to host.

It should not feel like a generic travel directory, a SaaS product, or a corporate website.

The design balances two things that are easy to trade against each other by accident:

1. A clean, highly usable interface for browsing recommendations.
2. A distinctive art layer that makes the product feel cute, warm, and recognizably Sophia's.

The useful way to hold both is to treat the underlying interface as clean and functional, with an adorable cozy-game visual skin layered over it. Neither one is decoration for the other. A cute product nobody can read has failed, and a readable product with no personality is the generic directory this guide exists to avoid.

## Color

The starting palette:

| Color     | Name               |
| --------- | ------------------ |
| `#FFA5D6` | bright pastel pink |
| `#FFD6EE` | soft blush pink    |
| `#FFF0F1` | warm cream-pink    |
| `#ECD2E0` | dusty mauve        |
| `#CED1F8` | pale periwinkle    |
| `#A7ABDE` | soft lavender-blue |

These six are surface, accent, and decoration colors. None of them can carry text. The darkest, `#A7ABDE`, measures 2.21:1 against white, well below the 4.5:1 floor that body text needs.

### Ink

`#3B2F45` is the primary dark ink for body text, headings, and other high-contrast foreground content. It is an intentional extension of the palette for accessibility, not an accent color, and it should not be used as one.

Pure black is avoided unless a future case specifically calls for it. Black against pastels reads harsh and works against the cozy feeling the rest of the palette is building.

Measured against every surface in the system:

| Surface                      | Contrast with `#3B2F45` |
| ---------------------------- | ----------------------- |
| `#FFFFFF` white              | 12.51:1                 |
| `#FFF0F1` warm cream-pink    | 11.31:1                 |
| `#FFD6EE` soft blush pink    | 9.60:1                  |
| `#ECD2E0` dusty mauve        | 8.85:1                  |
| `#CED1F8` pale periwinkle    | 8.40:1                  |
| `#FFA5D6` bright pastel pink | 6.91:1                  |
| `#A7ABDE` soft lavender-blue | 5.67:1                  |

The ink clears WCAG AA on every surface here, and AAA on all but the two most saturated. This is worth recording because it settles a question that would otherwise resurface repeatedly: the pastel direction costs nothing in readability, so there is never a reason to trade one against the other.

Text and interactive controls meet WCAG AA. The pastels may fall below that floor only where they are purely decorative and carry no information.

### Tokens

`docs/architecture.md` establishes that product work defines a small token set from concrete use. The palette above is the raw material; the mapping from color to meaning emerged from the first visitor-facing screens and now lives in the `@theme` block in `src/app/globals.css`:

| Token                   | Meaning                                                |
| ----------------------- | ------------------------------------------------------ |
| `--color-ink`           | The only text color. Opacity varies, the hue does not. |
| `--color-canvas`        | Page background.                                       |
| `--color-surface`       | Raised content panels.                                 |
| `--color-surface-soft`  | The `why` panel, and hover on primary actions.         |
| `--color-surface-quiet` | Secondary chips and quiet metadata surfaces.           |
| `--color-accent`        | Primary actions and the selected filter state.         |
| `--color-edge`          | Default hairline border.                               |
| `--color-edge-strong`   | Emphasis border on the `why` panel.                    |

`--color-edge-strong` is too light to carry a focus indicator, so focus outlines use `--color-ink`. Add a token when a real screen needs one, not before.

## Interface style

The interface favors soft rounded shapes, pastel surfaces, gentle borders and shadows, playful but readable typography, generous spacing, and cute filter controls and buttons. The target feeling is a polished cozy game.

Two constraints matter more than the rest:

**Recommendation content stays easy to scan and read.** Decoration sits around the content, not on top of it.

**Sophia's `why` is visually prominent.** Her reasoning is the core value of the product, as `docs/product.md` states. It should not be styled as a secondary detail below the practical facts. If a layout buries the `why`, the layout is wrong.

Avoid turning the catalog into a generic grid of interchangeable travel cards. Seven strong opinions presented with character will serve a visitor better than seven uniform tiles.

## Illustration and art direction

Sophia creates custom artwork externally. The visual style supports cute cats and dogs, small animal characters, food illustrations, cozy objects, Seattle-inspired motifs, and sticker-like decorative elements, with rounded forms, soft outlines, pastel fills, and a polished cute-game illustration style.

Custom art may eventually appear in the homepage hero, category treatments, decorative accents, section headers, recommendation pages, or empty states. Art should add personality without making the interface visually overwhelming.

Copilot must not generate substitute artwork, add stock imagery, or introduce unrelated illustration styles unless explicitly asked. An inconsistent one-off illustration does more damage than a blank space, because the blank space is honest about waiting for real art.

Do not create art directories or placeholder assets ahead of time. Asset structure gets added when real artwork arrives.

### Reserved art regions

The first three screens name their art regions in a source comment at the point the art would go. Each is an optional layout region at the edge of a layout, never inside a component's internals, so the interface is complete without any of them:

| Region                | Location                                                    |
| --------------------- | ----------------------------------------------------------- |
| `hero`, `hero-accent` | Behind and beside the home page title block                 |
| `catalog-banner`      | A decorative band above the catalog list                    |
| `entry-accent`        | A sticker-like mark on a browse entry                       |
| `detail-header`       | Beside the detail page title                                |
| `why-panel-accent`    | The `why` panel on a detail page. The highest value region. |
| `notes-mark`          | Beside the practical notes block                            |
| `empty-state`         | Above the no-results and not-found messages                 |
| `footer-motif`        | A small Seattle motif in the footer                         |

## Typography

A playful, rounded display typeface carries major headings; a clean, highly readable typeface carries recommendation text and functional interface elements.

| Role        | Face        | Used for                                                                   |
| ----------- | ----------- | -------------------------------------------------------------------------- |
| Display     | Fredoka     | Page titles, recommendation names, section headings, primary action labels |
| Body and UI | Nunito Sans | The `why`, summaries, notes, metadata, filter controls, footer             |

Both are loaded through `next/font/google` in `src/app/layout.tsx` and exposed as the `--font-display` and `--font-sans` theme tokens. That is the only file that may import `next/font`.

One rule is worth stating because it looks like an inconsistency: **the `why` is set in Nunito Sans, not Fredoka.** It is the most important text in the product, but it is also multi-sentence personal prose, and a rounded display face would cost readability at that length. Its prominence comes from size, measure, the panel it sits in, and the italic attribution beneath it.

## Personality

The site should feel welcoming, personal, opinionated, cute, warm, fun to explore, and thoughtfully designed.

The cute visual design supports Sophia's strong personal voice rather than replacing it. The editorial rules in `docs/content-model.md` protect that voice in the writing; this document protects it in the presentation. The result should feel like Sophia made a little Seattle world for her friends to explore.

## What to avoid

Generic SaaS styling. Sterile white card grids. Corporate dashboard aesthetics. Glassmorphism. Random gradients. Harsh high-contrast visual systems. Excessive visual clutter. Stock-photo-driven layouts. Large generic component libraries. Inconsistent one-off illustration styles.

Also avoid the opposite failure. Do not make the product childish or difficult to use in order to make it cute. Cuteness that costs usability is not the goal.

## Building the visual system

Build the visual system from the real interface. Do not create a speculative design system in advance.

Introduce a design token when a real screen needs it, and extract a reusable component when actual product use has demonstrated the reuse. This matches the engineering approach the rest of the repository already follows.

Keep custom artwork and application interface as separate concerns, so art assets can be replaced or iterated without restructuring the interface. This is the one structural constraint in this document. Art referenced from the edges of a layout can change freely; art baked into component internals cannot.
