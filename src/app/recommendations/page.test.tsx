import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { recommendations } from "@/content/recommendations";

import RecommendationsPage from "./page";

async function renderCatalog(
  params: Record<string, string | string[]> = {},
): Promise<void> {
  render(await RecommendationsPage({ searchParams: Promise.resolve(params) }));
}

function cardNames(): string[] {
  const list = screen.queryByRole("list", { name: "Recommendations" });

  if (list === null) {
    return [];
  }

  return within(list)
    .getAllByRole("heading", { level: 2 })
    .map((heading) => heading.textContent?.replace(/\s*→$/, "") ?? "");
}

function cardFor(name: string): HTMLElement {
  const card = screen.getByRole("link", { name }).closest("li");

  if (card === null) {
    throw new Error(`No catalog card found for ${name}`);
  }

  return card;
}

describe("recommendations catalog", () => {
  it("lists every curated recommendation when nothing is filtered", async () => {
    await renderCatalog();

    expect(cardNames()).toEqual(recommendations.map((one) => one.name));
    expect(
      screen.getByText(
        `Showing all ${recommendations.length} recommendations.`,
      ),
    ).toBeInTheDocument();
  });

  it("gives each card a taste of Sophia's reasoning", async () => {
    await renderCatalog({ kind: "bakery" });

    expect(
      within(cardFor("The Flour Box")).getByText(/Delicious filled brioche/),
    ).toBeInTheDocument();
  });

  it("shows what a recommendation is and where it is", async () => {
    await renderCatalog({ kind: "bakery" });

    expect(
      within(cardFor("The Flour Box")).getByText(/bakery.*Hillman City/),
    ).toBeInTheDocument();
  });

  it("narrows to a single kind", async () => {
    await renderCatalog({ kind: "dessert" });

    expect(cardNames()).toEqual([
      "Molly Moon's Homemade Ice Cream",
      "Hellenika Cultured Creamery",
    ]);
  });

  it("combines repeated values on one axis with OR", async () => {
    await renderCatalog({ kind: ["bakery", "dessert"] });

    expect(cardNames()).toEqual([
      "The Flour Box",
      "Molly Moon's Homemade Ice Cream",
      "Hellenika Cultured Creamery",
    ]);
  });

  it("combines separate axes with AND", async () => {
    await renderCatalog({ kind: "dessert", area: "Pike Place" });

    expect(cardNames()).toEqual(["Hellenika Cultured Creamery"]);
  });

  it("filters by tag", async () => {
    await renderCatalog({ tag: "vegan-friendly" });

    expect(cardNames()).toEqual(["Kin Len Thai Night Bites"]);
  });

  it("ignores filter values the catalog does not offer", async () => {
    await renderCatalog({ kind: "food-truck", area: "Ballard" });

    expect(cardNames()).toEqual(recommendations.map((one) => one.name));
  });

  it("reports the active filters alongside the match count", async () => {
    await renderCatalog({ kind: "dessert", tag: "sweet-treat" });

    expect(
      screen.getByText(
        `Showing 2 of ${recommendations.length} recommendations. Filters: dessert, sweet treat.`,
      ),
    ).toBeInTheDocument();
  });

  it("carries the active filters into each recommendation link", async () => {
    await renderCatalog({ kind: "dessert", area: "Pike Place" });

    expect(
      screen.getByRole("link", { name: "Hellenika Cultured Creamery" }),
    ).toHaveAttribute(
      "href",
      "/recommendations/hellenika-cultured-creamery?kind=dessert&area=Pike+Place",
    );
  });

  it("makes each card a single click target into the recommendation", async () => {
    await renderCatalog({ kind: "bakery" });

    const links = within(cardFor("The Flour Box")).getAllByRole("link");

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("The Flour Box");
  });

  it("shows tags on a card as quiet labels rather than filter links", async () => {
    await renderCatalog({ kind: "bakery" });

    const card = cardFor("The Flour Box");

    expect(within(card).getByText("worth the wait")).toBeInTheDocument();
    expect(
      within(card).queryByRole("link", { name: /filter/i }),
    ).not.toBeInTheDocument();
  });

  it("keeps what something is on the page as its own control", async () => {
    await renderCatalog();

    const kinds = screen.getByRole("heading", { name: "What it is" });

    expect(kinds).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Add filter: bakery" }),
    ).toHaveAttribute("href", "/recommendations?kind=bakery");
  });

  it("puts the larger axes behind their own compact controls", async () => {
    await renderCatalog();

    expect(screen.getByRole("heading", { name: "Where" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Vibe" })).toBeInTheDocument();
  });

  it("opens an axis that already has a selection", async () => {
    await renderCatalog({ area: "Pike Place" });

    const where = screen
      .getByRole("heading", { name: "Where" })
      .closest("details");
    const vibe = screen
      .getByRole("heading", { name: "Vibe" })
      .closest("details");

    expect(where).toHaveAttribute("open");
    expect(vibe).not.toHaveAttribute("open");
  });

  it("offers a pill that removes an active filter", async () => {
    await renderCatalog({ kind: "dessert" });

    expect(
      screen.getByRole("link", { name: "Remove filter: dessert" }),
    ).toHaveAttribute("href", "/recommendations");
  });

  it("offers a pill that adds a filter to the current selection", async () => {
    await renderCatalog({ kind: "dessert" });

    expect(
      screen.getByRole("link", { name: "Add filter: Pike Place" }),
    ).toHaveAttribute("href", "/recommendations?kind=dessert&area=Pike+Place");
  });

  it("only offers facets the catalog actually uses", async () => {
    await renderCatalog();

    expect(
      screen.queryByRole("link", { name: /filter: food truck/i }),
    ).not.toBeInTheDocument();
  });

  it("explains an empty result and offers a way back", async () => {
    await renderCatalog({ kind: "bakery", area: "Pike Place" });

    expect(cardNames()).toEqual([]);
    expect(
      screen.getByRole("heading", { name: "Nothing matches these filters" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Start over" })[0],
    ).toHaveAttribute("href", "/recommendations");
  });
});
