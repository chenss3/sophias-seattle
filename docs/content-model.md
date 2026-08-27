# Content model

This is the contract for Sophia-curated recommendations. It describes what each field means, how classification works, and the editorial standard entries are held to.

## Where curated content lives

`src/content/recommendations.ts` exports a single typed array:

```ts
export const recommendations = [
  /* entries */
] as const satisfies readonly Recommendation[];
```

`satisfies` type-checks every entry against the domain contract while `as const` preserves literal types. `src/content` holds only Sophia-curated source data, so provenance is evident from location as well as from the type.

File order carries editorial intent. There is no sort order in the domain layer.

## Fields

| Field        | Required | Meaning                                                                                       |
| ------------ | -------- | --------------------------------------------------------------------------------------------- |
| `slug`       | yes      | Stable identity and future URL segment. Lowercase kebab-case. Treat as stable once published. |
| `name`       | yes      | What the place or experience is called.                                                       |
| `kind`       | yes      | What it is. The primary browse axis.                                                          |
| `area`       | yes      | Where it is.                                                                                  |
| `summary`    | yes      | One sentence a stranger can skim in a list.                                                   |
| `why`        | yes      | Sophia's reasoning, in her voice.                                                             |
| `tags`       | yes      | What it is good for, or what characterises it. May be empty.                                  |
| `notes`      | no       | Practical guidance, such as "go early, it fills up".                                          |
| `provenance` | yes      | Always `"sophia-curated"` in this file.                                                       |

### `slug`

The slug is the canonical identifier for a recommendation in the current MVP. There is no separate opaque ID because it provides no current benefit.

Slugs are lowercase, hyphen-separated, and made of letters and digits only. Changing a published slug can break existing URLs, so treat it as stable once published.

### `why` is required

`docs/product.md` states that Sophia's perspective is the product. Making the reasoning optional would let the catalog quietly degrade into generic listings, so the type requires it and a test rejects empty text.

`summary` says what something is. `why` says why Sophia sends people there. Keep them distinct.

### `provenance`

`provenance` is the literal `"sophia-curated"`, not an inferred string. Without the literal, any structurally similar object -- including a future visitor-added item -- would satisfy `Recommendation`, and non-curated content could flow into curated surfaces unnoticed. The literal makes the product's central boundary a compile-time error rather than a code-review responsibility.

Visitor-added items and external suggestions will get their own types and their own storage. They must never be added to this file.

## Classification

Classification uses two independent axes, because "what it is" and "what it is good for" are different questions. Collapsing them into a single tag list would make coherent filtering impossible later.

- `kind` -- what a recommendation **is**. Required, exactly one value.
- `tags` -- what a recommendation is **good for**, or what **characterises** it. Required to be present, may be empty, may hold several values.

Tags cover both senses deliberately. Occasion tags such as `date-night` and `quick-meal` answer "when would I go here"; character tags such as `hidden-gem`, `great-service`, and `worth-the-wait` answer "what is this place like". Both are useful for finding a recommendation, and a seven-entry catalog does not justify a third axis to separate them.

The bar for a tag is that it helps someone **find** a recommendation, not merely that it is true about one. Details specific to a single place -- a signature dish, a rotating menu, a second location -- belong in `summary`, `why`, or `notes`. A tag used by exactly one recommendation forever is a link, not a facet.

`area` is named for location generally rather than "neighborhood", so it can also describe places outside Seattle proper, such as a day trip.

All three are closed TypeScript unions rather than free strings. A typo like `"Capitol hill"` would silently create a duplicate facet in a future filter; a union catches it at compile time at no runtime cost.

### `area` holds a single value

Some recommendations have more than one location. Molly Moon's is the current example: it is recorded under `Capitol Hill`, and `notes` lists the other shops. One multi-location entry does not justify making `area` an array and complicating every future filter, but the limitation is real -- a visitor filtering by area will not see every place they could actually reach. Revisit if several entries end up in the same position.

## Growing the unions

Union values are grounded in real content. They are not a taxonomy designed up front; they are the set the published catalog actually uses.

Add a value when the recommendation that needs it is being added, in the same pull request. Remove a value when nothing uses it any more. Keeping unused values around invents a vocabulary the catalog has not earned.

Prefer reusing an existing tag over introducing a near-synonym. The tag vocabulary should stay small enough to read at a glance.

## Validation

There is no runtime schema validation. Content is trusted, typed, and compiled with the application, so there is no runtime trust boundary to defend. The compiler and the catalog integrity tests in `src/content/recommendations.test.ts` cover this today.

Add runtime validation when content starts arriving from somewhere the compiler cannot see, such as a database, a CMS, or visitor input.

## Adding a recommendation

1. Add an entry to `src/content/recommendations.ts`.
2. Add any new `kind`, `tag`, or `area` value it requires to `src/domain/recommendations/recommendation.ts`.
3. Run `npm run check`.
4. Open a pull request. Git history is the editorial workflow.
