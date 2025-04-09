// Definition for a binary tree node
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Find the maximum average value of any subtree in the binary tree
 * @param root Root of the binary tree
 * @returns Maximum average value among all subtrees
 */
function maximumAverageSubtree(root: TreeNode | null): number {
  if (!root) return 0;

  let maxAverage = -Infinity; // Initialize to -Infinity to handle negative values

  // Helper function to traverse the tree
  // Returns [sum, count] for the subtree rooted at node
  function dfs(node: TreeNode | null): [number, number] {
    if (!node) return [0, 0];

    const [leftSum, leftCount] = dfs(node.left);
    const [rightSum, rightCount] = dfs(node.right);

    const sum = node.val + leftSum + rightSum;
    const count = 1 + leftCount + rightCount;

    const average = sum / count;
    maxAverage = Math.max(maxAverage, average);

    return [sum, count];
  }

  dfs(root);
  return maxAverage;
}

export { maximumAverageSubtree, TreeNode };
