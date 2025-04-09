// https://leetcode.com/problems/longest-increasing-subsequence

// longestIncreasingSubsequence.ts

/**
 * Finds the length of the longest increasing subsequence in an array of numbers.
 * @param nums An array of integers.
 * @returns The length of the longest increasing subsequence.
 */
export function lengthOfLIS(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;

  // dp[i] will hold the length of the longest increasing subsequence ending at index i
  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // If nums[i] can extend the increasing subsequence ending at nums[j]
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // The result is the max value in dp array
  return Math.max(...dp);
}
