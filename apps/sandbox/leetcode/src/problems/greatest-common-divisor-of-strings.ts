// https://leetcode.com/problems/greatest-common-divisor-of-strings

/**
 * Find the largest string X such that X divides both str1 and str2.
 * A string X divides another string if X can be concatenated multiple times to form the original string.
 *
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The greatest common divisor string
 */
export function gcdOfStrings(str1: string, str2: string): string {
  // Handle empty string edge cases
  if (str1 === "" || str2 === "") {
    return "";
  }

  // If concatenations in both orders are not equal, there's no common divisor
  if (str1 + str2 !== str2 + str1) {
    return "";
  }

  // If the strings pass the concatenation test, then the GCD is related to the GCD of their lengths
  const gcdLength = findGCD(str1.length, str2.length);

  // Return the substring of length gcdLength (from either string)
  return str1.substring(0, gcdLength);
}

/**
 * Find the greatest common divisor of two numbers using Euclidean algorithm
 *
 * @param a - First number
 * @param b - Second number
 * @returns The greatest common divisor
 */
function findGCD(a: number, b: number): number {
  // Handle special cases
  if (a === 0 && b === 0) {
    return 0;
  }
  if (a === 0) {
    return b;
  }
  if (b === 0) {
    return a;
  }

  // Recursive case
  return findGCD(b, a % b);
}
