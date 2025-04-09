import { lengthOfLIS } from "../../src/problems/longest-increasing-subsequence";

describe("lengthOfLIS", () => {
  it("returns the correct length for a typical increasing subsequence", () => {
    expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4); // [2, 3, 7, 101]
  });

  it("returns 1 for strictly decreasing array", () => {
    expect(lengthOfLIS([5, 4, 3, 2, 1])).toBe(1);
  });

  it("returns length of array if already strictly increasing", () => {
    expect(lengthOfLIS([1, 2, 3, 4, 5])).toBe(5);
  });

  it("returns 0 for an empty array", () => {
    expect(lengthOfLIS([])).toBe(0);
  });

  it("handles single element array", () => {
    expect(lengthOfLIS([42])).toBe(1);
  });
});
