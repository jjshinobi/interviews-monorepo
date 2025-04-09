import { letterCombinations } from "../../src/problems/letter-combinations-of-a-phone-number";

describe("Letter Combinations of a Phone Number", () => {
  test("should return empty array for empty input", () => {
    expect(letterCombinations("")).toEqual([]);
  });

  test("should return correct combinations for a single digit", () => {
    const result = letterCombinations("2");
    expect(result).toHaveLength(3);
    expect(result).toEqual(expect.arrayContaining(["a", "b", "c"]));
  });

  test("should return correct combinations for two digits", () => {
    const result = letterCombinations("23");
    expect(result).toHaveLength(9);
    expect(result).toEqual(
      expect.arrayContaining([
        "ad",
        "ae",
        "af",
        "bd",
        "be",
        "bf",
        "cd",
        "ce",
        "cf",
      ]),
    );
  });

  test("should return correct combinations for three digits", () => {
    const result = letterCombinations("234");
    expect(result).toHaveLength(27); // 3 × 3 × 3 = 27

    // Check a few sample combinations
    expect(result).toContain("adg");
    expect(result).toContain("beh");
    expect(result).toContain("cfi");
  });

  test("should handle digits with 4 letters (7 and 9)", () => {
    const result = letterCombinations("79");
    expect(result).toHaveLength(16); // 4 × 4 = 16

    // Check a few sample combinations
    expect(result).toContain("pw");
    expect(result).toContain("qz");
    expect(result).toContain("sy");
  });

  test("should match the expected output for the LeetCode example", () => {
    const result = letterCombinations("23");
    const expected = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"];
    expect(result.sort()).toEqual(expected.sort());
  });
});
