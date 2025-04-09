// https://leetcode.com/problems/find-leaves-of-binary-tree

/**
 * Definition for a binary tree node.
 */
export type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

/**
 * Problem: Find Leaves of Binary Tree
 *
 * Given the root of a binary tree, collect a tree's nodes as if you were doing this:
 * 1. Collect all the leaf nodes.
 * 2. Remove those leaf nodes.
 * 3. Repeat until the tree is empty.
 *
 * The key insight here is to use the height of nodes from the bottom up.
 * - Leaves have height 0
 * - Nodes with only leaf children have height 1
 * - And so on...
 *
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the result and recursion stack
 */
export const findLeaves = (root: TreeNode | null): number[][] => {
  const result: number[][] = [];

  // Helper function to get height from bottom and collect nodes
  const getHeight = (node: TreeNode | null): number => {
    if (!node) return -1;

    // Get height of left and right subtrees
    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    // Current node's height is max of left/right + 1
    const currentHeight = Math.max(leftHeight, rightHeight) + 1;

    // If result array doesn't have an entry for this height, create one
    if (result.length <= currentHeight) {
      result.push([]);
    }

    // Add current node to the appropriate level
    result[currentHeight].push(node.val);

    return currentHeight;
  };

  getHeight(root);
  return result;
};

// Example usage:
// Input: root = [1,2,3,4,5]
//        1
//       / \
//      2   3
//     / \
//    4   5
// Output: [[4,5,3],[2],[1]]
// Explanation:
// 1. Leaf nodes [4,5,3] are removed first.
// 2. Then node [2] becomes a leaf and is removed.
// 3. Finally, node [1] becomes a leaf and is removed.

// Example test
const root = {
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
