import { describe, expect, it } from "vitest";

import { excerptWhy, facetLabel } from "./recommendation-presentation";

describe("excerptWhy", () => {
  it("returns short reasoning unchanged", () => {
    expect(excerptWhy("Short and complete.")).toEqual({
      text: "Short and complete.",
      truncated: false,
    });
  });

  it("cuts long reasoning on a word boundary and marks the cut", () => {
    const why = "one two three four five six seven eight nine ten";

    const excerpt = excerptWhy(why, 20);

    expect(excerpt.truncated).toBe(true);
    expect(excerpt.text.endsWith("\u2026")).toBe(true);
    expect(excerpt.text).toBe("one two three four\u2026");
  });

  it("never invents or reorders Sophia's words", () => {
    const why = "The khao man gai is SO good and the sauce is sooooo good.";

    const excerpt = excerptWhy(why, 25);

    expect(why.startsWith(excerpt.text.replace("\u2026", ""))).toBe(true);
  });

  it("does not leave a dangling comma at the cut", () => {
    expect(excerptWhy("first second, third fourth", 14).text).toBe(
      "first second\u2026",
    );
  });
});

describe("facetLabel", () => {
  it("reads kebab-case taxonomy values as words", () => {
    expect(facetLabel("date-night")).toBe("date night");
    expect(facetLabel("worth-the-wait")).toBe("worth the wait");
  });

  it("leaves values already written for people alone", () => {
    expect(facetLabel("Capitol Hill")).toBe("Capitol Hill");
  });
});
