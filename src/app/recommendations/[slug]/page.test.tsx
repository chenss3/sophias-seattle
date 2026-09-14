import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { recommendations } from "@/content/recommendations";

import RecommendationDetailPage from "./page";

async function renderDetail(
  slug: string,
  params: Record<string, string | string[]> = {},
): Promise<void> {
  render(
    await RecommendationDetailPage({
      params: Promise.resolve({ slug }),
      searchParams: Promise.resolve(params),
    }),
  );
}

const flourBox = recommendations.find((one) => one.slug === "the-flour-box");

if (flourBox === undefined) {
  throw new Error("Fixture slug the-flour-box is no longer in the catalog");
}

describe("recommendation detail", () => {
  it("presents Sophia's reasoning in full rather than an excerpt", async () => {
    await renderDetail(flourBox.slug);

    expect(screen.getByText(flourBox.why)).toBeInTheDocument();
  });

  it("labels the reasoning as Sophia's", async () => {
    await renderDetail(flourBox.slug);

    expect(
      screen.getByRole("heading", { name: "Why Sophia recommends it" }),
    ).toBeInTheDocument();
  });

  it("names the recommendation and where to find it", async () => {
    await renderDetail(flourBox.slug);

    expect(
      screen.getByRole("heading", { level: 1, name: flourBox.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Hillman City/)).toBeInTheDocument();
  });

  it("keeps practical notes separate from the reasoning", async () => {
    await renderDetail(flourBox.slug);

    expect(
      screen.getByRole("heading", { name: "Good to know" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/longest wait of your life/)).toBeInTheDocument();
  });

  it("marks the recommendation as Sophia-curated", async () => {
    await renderDetail(flourBox.slug);

    expect(
      screen.getByText("Sophia-curated recommendation"),
    ).toBeInTheDocument();
  });

  it("returns the visitor to the unfiltered catalog when they arrived unfiltered", async () => {
    await renderDetail(flourBox.slug);

    expect(
      screen.getAllByRole("link", { name: /Back to recommendations/ })[0],
    ).toHaveAttribute("href", "/recommendations");
  });

  it("returns the visitor to the filtered view they arrived from", async () => {
    await renderDetail(flourBox.slug, { kind: "bakery", tag: "hidden-gem" });

    expect(
      screen.getAllByRole("link", {
        name: /Back to filtered recommendations/,
      })[0],
    ).toHaveAttribute("href", "/recommendations?kind=bakery&tag=hidden-gem");
  });

  it("drops catalog state the catalog does not offer", async () => {
    await renderDetail(flourBox.slug, { kind: "food-truck" });

    expect(
      screen.getAllByRole("link", { name: /Back to recommendations/ })[0],
    ).toHaveAttribute("href", "/recommendations");
  });

  it("links each tag into a filtered catalog view", async () => {
    await renderDetail(flourBox.slug);

    expect(screen.getByRole("heading", { name: "Vibe" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Browse recommendations tagged worth the wait",
      }),
    ).toHaveAttribute("href", "/recommendations?tag=worth-the-wait");
  });

  it("offers the neighbouring recommendations in editorial order", async () => {
    await renderDetail("molly-moons-homemade-ice-cream");

    expect(
      screen.getByRole("link", { name: /Previous\s*The Flour Box/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Next\s*Hellenika Cultured Creamery/ }),
    ).toBeInTheDocument();
  });

  it("carries catalog state into the neighbouring recommendations", async () => {
    await renderDetail("molly-moons-homemade-ice-cream", { kind: "dessert" });

    expect(
      screen.getByRole("link", { name: /Next\s*Hellenika Cultured Creamery/ }),
    ).toHaveAttribute(
      "href",
      "/recommendations/hellenika-cultured-creamery?kind=dessert",
    );
  });

  it("keeps neighbours inside the filtered view the visitor is browsing", async () => {
    await renderDetail("molly-moons-homemade-ice-cream", { kind: "dessert" });

    expect(
      screen.queryByRole("link", { name: /^Previous/ }),
    ).not.toBeInTheDocument();
  });

  it("does not offer a previous entry at the start of the catalog", async () => {
    await renderDetail(recommendations[0].slug);

    expect(
      screen.queryByRole("link", { name: /^Previous/ }),
    ).not.toBeInTheDocument();
  });

  it("refuses to render an unknown slug", async () => {
    await expect(
      RecommendationDetailPage({
        params: Promise.resolve({ slug: "not-a-real-recommendation" }),
        searchParams: Promise.resolve({}),
      }),
    ).rejects.toThrowError();
  });
});
