import {
  findLeaves,
  TreeNode,
} from "../../src/problems/find-leaves-of-binary-tree";

describe("findLeaves", () => {
  it("should return empty array for null input", () => {
    expect(findLeaves(null)).toEqual([]);
  });

  it("should handle a single node tree", () => {
    const root = { val: 1, left: null, right: null };
    expect(findLeaves(root)).toEqual([[1]]);
  });

  it("should handle the example tree from LeetCode", () => {
    // Tree:
    //        1
    //       / \
    //      2   3
    //     / \
    //    4   5
    const root: TreeNode = {
      val: 1,
      left: {
        val: 2,
        left: { val: 4, left: null, right: null },
        right: { val: 5, left: null, right: null },
      },
      right: {
        val: 3,
        left: null,
        right: null,
      },
    };

    const expected = [[4, 5, 3], [2], [1]];
    expect(findLeaves(root)).toEqual(expected);
  });

  it("should handle a skewed tree (right)", () => {
    // Tree:
    //    1
    //     \
    //      2
    //       \
    //        3
    const root: TreeNode = {
      val: 1,
      left: null,
      right: {
        val: 2,
        left: null,
        right: {
          val: 3,
          left: null,
          right: null,
        },
      },
    };

    const expected = [[3], [2], [1]];
    expect(findLeaves(root)).toEqual(expected);
  });

  it("should handle a skewed tree (left)", () => {
    // Tree:
    //      1
    //     /
    //    2
    //   /
    //  3
    const root: TreeNode = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 3,
          left: null,
          right: null,
        },
        right: null,
      },
      right: null,
    };

    const expected = [[3], [2], [1]];
    expect(findLeaves(root)).toEqual(expected);
  });

  it("should handle nodes with the same removal level but different depths", () => {
    // Tree:
    //        1
    //       / \
    //      2   3
    //     /   / \
    //    4   5   6
    //       /
    //      7
    const root: TreeNode = {
      val: 1,
      left: {
        val: 2,
        left: { val: 4, left: null, right: null },
        right: null,
      } as TreeNode,
      right: {
        val: 3,
        left: {
          val: 5,
          left: { val: 7, left: null, right: null },
          right: null,
        },
        right: { val: 6, left: null, right: null },
      } as TreeNode,
    };

    const expected = [[4, 7, 6], [2, 5], [3], [1]];
    expect(findLeaves(root)).toEqual(expected);
  });

  it("should handle unbalanced tree with multiple levels", () => {
    // Create a more complex tree using the helper function
    //          1
    //        /   \
    //       2     3
    //      / \   / \
    //     4   5 6   7
    //    /       \
    //   8         9
    //  /
    // 10
    const root: TreeNode = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 4,
          left: {
            val: 8,
            left: { val: 10, left: null, right: null },
            right: null,
          },
          right: null,
        },
        right: { val: 5, left: null, right: null },
      },
      right: {
        val: 3,
        left: {
          val: 6,
          left: null,
          right: { val: 9, left: null, right: null },
        },
        right: { val: 7, left: null, right: null },
      },
    };

    const expected = [[10, 5, 9, 7], [8, 6], [4, 3], [2], [1]];
    expect(findLeaves(root)).toEqual(expected);
  });
});
