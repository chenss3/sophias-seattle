import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("identifies the application as a temporary foundation", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Sophia's Seattle" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Foundation in progress")).toBeInTheDocument();
  });
});
