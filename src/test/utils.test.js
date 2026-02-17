import { describe, it, expect } from "vitest";
import { formatValues, generateColours } from "../utils/utils";

describe("formatValues", () => {
  it("returns an empty string for null or undefined", () => {
    expect(formatValues(null)).toBe("");
    expect(formatValues(undefined)).toBe("");
  });

  it("formats numbers to two decimal places", () => {
    expect(formatValues(10)).toBe("10.00");
    expect(formatValues(3.456)).toBe("3.46");
    expect(formatValues(0)).toBe("0.00");
  });
});

describe("generateColours", () => {
  it("returns an empty array when count is 0", () => {
    expect(generateColours(0)).toEqual([]);
  });

  it("returns exactly 'count' colours", () => {
    expect(generateColours(3)).toHaveLength(3);
    expect(generateColours(10)).toHaveLength(10);
  });

  it("generates valid HSL strings", () => {
    const colours = generateColours(5);
    colours.forEach((c) => {
      expect(c).toMatch(/^hsl\(\d+, 50%, 40%\)$/);
    });
  });
});