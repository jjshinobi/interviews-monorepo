/**
 * Returns an array of integers representing the shortest distance
 * from each character in the string 's' to the character 'c'.
 *
 * @param s - The input string
 * @param c - The target character
 * @returns An array where each element represents the shortest distance to character 'c'
 */
function shortestToChar(s: string, c: string): number[] {
  const n = s.length;
  const result = new Array(n).fill(Infinity);

  // Find all occurrences of the character c
  const occurrences: number[] = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === c) {
      occurrences.push(i);
      result[i] = 0; // Distance to itself is 0
    }
  }

  // For each character in s, find the minimum distance to any occurrence of c
  for (let i = 0; i < n; i++) {
    if (s[i] !== c) {
      for (const pos of occurrences) {
        result[i] = Math.min(result[i], Math.abs(i - pos));
      }
    }
  }

  return result;
}

export { shortestToChar };
