import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { recommendations } from "@/content/recommendations";

import Home from "./page";

describe("Home", () => {
  it("names the product and points at the browse experience", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Sophia's Seattle" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Browse my recs/ }),
    ).toHaveAttribute("href", "/recommendations");
  });

  it("shows a short taste drawn from the top of the catalog", () => {
    render(<Home />);

    const featured = within(
      screen.getByRole("region", { name: "A few to start with" }),
    ).getAllByRole("heading", { level: 3 });

    expect(featured.map((heading) => heading.textContent)).toEqual(
      recommendations.slice(0, 3).map((one) => one.name),
    );
  });

  it("leads each preview with Sophia's reasoning rather than the name", () => {
    render(<Home />);

    const preview = screen
      .getByRole("heading", { level: 3, name: recommendations[0].name })
      .closest("li");

    expect(preview).not.toBeNull();
    const reasoning = within(preview as HTMLElement).getByText(
      /I came here my first week in Seattle/,
    );

    expect(
      reasoning.compareDocumentPosition(
        within(preview as HTMLElement).getByRole("heading", { level: 3 }),
      ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("links each preview to its recommendation", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: recommendations[0].name }),
    ).toHaveAttribute("href", `/recommendations/${recommendations[0].slug}`);
  });

  it("does not show the whole catalog", () => {
    render(<Home />);

    expect(
      screen.queryByRole("heading", { name: "Hellenika Cultured Creamery" }),
    ).not.toBeInTheDocument();
  });
});
