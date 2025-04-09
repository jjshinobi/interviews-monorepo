import {
  arrayToList,
  listToArray,
  mergeKLists,
} from "../../src/problems/merge-k-sorted-lists";

describe("mergeKLists", () => {
  it("merges k sorted lists correctly", () => {
    const input = [
      arrayToList([1, 4, 5]),
      arrayToList([1, 3, 4]),
      arrayToList([2, 6]),
    ];
    const result = mergeKLists(input);
    expect(listToArray(result)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  });

  it("returns empty list when input is empty", () => {
    expect(mergeKLists([])).toBeNull();
  });

  it("returns empty list when all lists are null", () => {
    expect(mergeKLists([null, null])).toBeNull();
  });

  it("handles single list correctly", () => {
    const input = [arrayToList([1, 2, 3])];
    const result = mergeKLists(input);
    expect(listToArray(result)).toEqual([1, 2, 3]);
  });
});
