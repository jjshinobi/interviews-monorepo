// Helper function to create a binary tree from an array representation
import {
  maximumAverageSubtree,
  TreeNode,
} from "../../src/problems/maximum-average-subtree";

function createTreeFromArray(
  arr: (number | null)[],
  index = 0,
): TreeNode | null {
  if (index >= arr.length || arr[index] === null) {
    return null;
  }

  const node: TreeNode = {
    val: arr[index] as number,
    left: createTreeFromArray(arr, 2 * index + 1),
    right: createTreeFromArray(arr, 2 * index + 2),
  };

  return node;
}

describe("Maximum Average Subtree", () => {
  test("Example 1: [5,6,1]", () => {
    // Create tree:
    //     5
    //    / \
    //   6   1
    const root = createTreeFromArray([5, 6, 1]);
    expect(maximumAverageSubtree(root)).toBeCloseTo(6.0);
  });

  test("Example 2: [0,null,1]", () => {
    // Create tree:
    //     0
    //      \
    //       1
    const root: TreeNode = {
      val: 0,
      left: null,
      right: {
        val: 1,
        left: null,
        right: null,
      },
    };
    expect(maximumAverageSubtree(root)).toBeCloseTo(1.0);
  });

  test("Balanced tree with same values", () => {
    // Create tree:
    //       3
    //      / \
    //     3   3
    //    / \
    //   3   3
    const root = createTreeFromArray([3, 3, 3, 3, 3]);
    expect(maximumAverageSubtree(root)).toBeCloseTo(3.0);
  });

  test("Empty tree", () => {
    expect(maximumAverageSubtree(null)).toBe(0);
  });

  test("Single node tree", () => {
    const root: TreeNode = { val: 42, left: null, right: null };
    expect(maximumAverageSubtree(root)).toBeCloseTo(42.0);
  });

  test("Complex tree with varying values", () => {
    // Create tree:
    //       10
    //      /  \
    //     5    15
    //    / \   / \
    //   1   8 12  20
    const root = createTreeFromArray([10, 5, 15, 1, 8, 12, 20]);
    // The maximum average is 20 (the leaf node with value 20 is its own subtree)
    expect(maximumAverageSubtree(root)).toBeCloseTo(20.0);
  });

  test("Tree with negative values", () => {
    // Create tree:
    //      -5
    //     /  \
    //   -10   -3
    //        /  \
    //      -2    -1
    const root: TreeNode = {
      val: -5,
      left: { val: -10, left: null, right: null },
      right: {
        val: -3,
        left: { val: -2, left: null, right: null },
        right: { val: -1, left: null, right: null },
      },
    };
    // The subtree with max average should be the one containing just the node with value -1
    expect(maximumAverageSubtree(root)).toBeCloseTo(-1.0);
  });
});
