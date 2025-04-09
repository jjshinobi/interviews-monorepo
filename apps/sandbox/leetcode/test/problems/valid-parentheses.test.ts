import { isValid } from "../../src/problems/valid-parentheses";

describe("Valid Parentheses", () => {
  // Test case: empty string is considered valid
  test("should return true for empty string", () => {
    expect(isValid("")).toBe(true);
  });

  // Test case: string with matching parentheses
  test("should return true for valid parentheses", () => {
    expect(isValid("()")).toBe(true);
    expect(isValid("()[]{}")).toBe(true);
    expect(isValid("{[()]}")).toBe(true);
  });

  // Test case: string with mismatched parentheses
  test("should return false for mismatched parentheses", () => {
    expect(isValid("(]")).toBe(false);
    expect(isValid("([)]")).toBe(false);
    expect(isValid("(((")).toBe(false);
  });

  // Test case: string with extra closing parentheses
  test("should return false for extra closing parentheses", () => {
    expect(isValid("[])")).toBe(false);
  });

  // Test case: string with unmatched closing parentheses
  test("should return false for unmatched closing parentheses", () => {
    expect(isValid("([}")).toBe(false);
  });
});
