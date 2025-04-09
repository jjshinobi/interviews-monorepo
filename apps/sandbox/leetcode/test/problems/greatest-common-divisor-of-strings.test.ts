import { gcdOfStrings } from "../../src/problems/greatest-common-divisor-of-strings";

describe("Greatest Common Divisor of Strings", () => {
  test('example 1: str1 = "ABCABC", str2 = "ABC"', () => {
    expect(gcdOfStrings("ABCABC", "ABC")).toBe("ABC");
  });

  test('example 2: str1 = "ABABAB", str2 = "ABAB"', () => {
    expect(gcdOfStrings("ABABAB", "ABAB")).toBe("AB");
  });

  test('example 3: str1 = "LEET", str2 = "CODE"', () => {
    expect(gcdOfStrings("LEET", "CODE")).toBe("");
  });

  test("handles empty strings", () => {
    expect(gcdOfStrings("", "")).toBe("");
    expect(gcdOfStrings("ABC", "")).toBe("");
    expect(gcdOfStrings("", "ABC")).toBe("");
  });

  test("handles identical strings", () => {
    expect(gcdOfStrings("ABC", "ABC")).toBe("ABC");
    expect(gcdOfStrings("XYZXYZ", "XYZXYZ")).toBe("XYZXYZ");
  });

  test("handles multiple common divisors", () => {
    expect(gcdOfStrings("AAAA", "AA")).toBe("AA");
    expect(gcdOfStrings("ABCABCABC", "ABCABC")).toBe("ABC");
  });

  test("handles single character strings", () => {
    expect(gcdOfStrings("AAA", "A")).toBe("A");
    expect(gcdOfStrings("A", "AAA")).toBe("A");
  });

  test("handles strings with different characters but same pattern", () => {
    expect(gcdOfStrings("XYZXYZ", "XYZ")).toBe("XYZ");
    expect(gcdOfStrings("ABCDEFABCDEF", "ABCDEF")).toBe("ABCDEF");
  });

  test("handles strings with no common divisor", () => {
    expect(gcdOfStrings("ABC", "DEF")).toBe("");
    expect(gcdOfStrings("ABCDEF", "XYZABC")).toBe("");
  });
});
