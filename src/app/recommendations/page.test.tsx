import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { recommendations } from "@/content/recommendations";

import RecommendationsPage from "./page";

async function renderCatalog(
  params: Record<string, string | string[]> = {},
): Promise<void> {
  render(await RecommendationsPage({ searchParams: Promise.resolve(params) }));
}

function entryNames(): string[] {
  const list = screen.queryByRole("list", { name: "Recommendations" });

  if (list === null) {
    return [];
  }

  return within(list)
    .getAllByRole("heading", { level: 2 })
    .map((heading) => heading.textContent ?? "");
}

function entryFor(name: string): HTMLElement {
  const heading = screen.getByRole("heading", { level: 2, name });
  const entry = heading.closest("li");

  if (entry === null) {
    throw new Error(`No catalog entry found for ${name}`);
  }

  return entry;
}

describe("recommendations catalog", () => {
  it("lists every curated recommendation when nothing is filtered", async () => {
    await renderCatalog();

    expect(entryNames()).toEqual(recommendations.map((one) => one.name));
    expect(
      screen.getByText(
        `Showing all ${recommendations.length} recommendations.`,
      ),
    ).toBeInTheDocument();
  });

  it("shows Sophia's reasoning ahead of the summary within an entry", async () => {
    await renderCatalog({ kind: "bakery" });

    const entry = entryFor("The Flour Box");
    const reasoning = within(entry).getByText(/Delicious filled brioche/);
    const summary = within(entry).getByText(/Small bakery specializing in/);

    expect(
      reasoning.compareDocumentPosition(summary) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("narrows to a single kind", async () => {
    await renderCatalog({ kind: "dessert" });

    expect(entryNames()).toEqual([
      "Molly Moon's Homemade Ice Cream",
      "Hellenika Cultured Creamery",
    ]);
  });

  it("combines repeated values on one axis with OR", async () => {
    await renderCatalog({ kind: ["bakery", "dessert"] });

    expect(entryNames()).toEqual([
      "The Flour Box",
      "Molly Moon's Homemade Ice Cream",
      "Hellenika Cultured Creamery",
    ]);
  });

  it("combines separate axes with AND", async () => {
    await renderCatalog({ kind: "dessert", area: "Pike Place" });

    expect(entryNames()).toEqual(["Hellenika Cultured Creamery"]);
  });

  it("filters by tag", async () => {
    await renderCatalog({ tag: "vegan-friendly" });

    expect(entryNames()).toEqual(["Kin Len Thai Night Bites"]);
  });

  it("ignores filter values the catalog does not offer", async () => {
    await renderCatalog({ kind: "food-truck", area: "Ballard" });

    expect(entryNames()).toEqual(recommendations.map((one) => one.name));
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

  it("does not wrap a whole entry in a single link", async () => {
    await renderCatalog({ kind: "bakery" });

    expect(entryFor("The Flour Box").closest("a")).toBeNull();
  });

  it("offers a pill that removes an active filter", async () => {
    await renderCatalog({ kind: "dessert" });

    expect(
      screen.getAllByRole("link", { name: "Remove filter: dessert" })[0],
    ).toHaveAttribute("href", "/recommendations");
  });

  it("offers a pill that adds a filter to the current selection", async () => {
    await renderCatalog({ kind: "dessert" });

    expect(
      screen.getAllByRole("link", { name: "Add filter: Pike Place" })[0],
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

    expect(entryNames()).toEqual([]);
    expect(
      screen.getByRole("heading", { name: "Nothing matches these filters" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Start over" })[0],
    ).toHaveAttribute("href", "/recommendations");
  });
});
