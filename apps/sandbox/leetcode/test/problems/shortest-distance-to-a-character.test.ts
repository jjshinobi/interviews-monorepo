import { shortestToChar } from "../../src/problems/shortest-distance-to-a-character";

describe("shortestToChar", () => {
  test('Example 1: s = "loveleetcode", c = "e"', () => {
    const s = "loveleetcode";
    const c = "e";
    const expected = [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0];

    expect(shortestToChar(s, c)).toEqual(expected);
  });

  test('Example 2: s = "aaab", c = "b"', () => {
    const s = "aaab";
    const c = "b";
    const expected = [3, 2, 1, 0];

    expect(shortestToChar(s, c)).toEqual(expected);
  });

  test("Character occurs only once at the beginning", () => {
    const s = "abcd";
    const c = "a";
    const expected = [0, 1, 2, 3];

    expect(shortestToChar(s, c)).toEqual(expected);
  });

  test("Character occurs only once at the end", () => {
    const s = "abcd";
    const c = "d";
    const expected = [3, 2, 1, 0];

    expect(shortestToChar(s, c)).toEqual(expected);
  });

  test("Character occurs multiple times with varying distances", () => {
    const s = "aaba";
    const c = "a";
    const expected = [0, 0, 1, 0];

    expect(shortestToChar(s, c)).toEqual(expected);
  });

  test("Character is not in the string", () => {
    const s = "abcd";
    const c = "e";

    // This is an invalid input for the problem statement, but we should test edge cases
    // If the character isn't in the string, all distances should be Infinity or a very large number
    // Let's assert the function either throws or returns an appropriate response

    expect(() => shortestToChar(s, c)).not.toThrow();

    // Alternatively, we could check that all values are very large
    const result = shortestToChar(s, c);
    expect(result.every((val) => val >= s.length)).toBeTruthy();
  });

  test("Empty string", () => {
    const s = "";
    const c = "a";

    expect(shortestToChar(s, c)).toEqual([]);
  });

  test("Single character string that matches target", () => {
    const s = "a";
    const c = "a";
    const expected = [0];

    expect(shortestToChar(s, c)).toEqual(expected);
  });
});
