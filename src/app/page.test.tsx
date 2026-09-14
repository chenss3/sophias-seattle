import { render, screen } from "@testing-library/react";
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

  it("introduces the site in Sophia's words", () => {
    render(<Home />);

    expect(
      screen.getByText(
        "All my Seattle recs in one place, so I can finally stop making the same list every time someone visits.",
      ),
    ).toBeInTheDocument();
  });

  it("does not browse recommendations, so the catalog owns that job alone", () => {
    render(<Home />);

    for (const recommendation of recommendations) {
      expect(screen.queryByText(recommendation.name)).not.toBeInTheDocument();
    }
  });

  it("offers exactly one way forward", () => {
    render(<Home />);

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
