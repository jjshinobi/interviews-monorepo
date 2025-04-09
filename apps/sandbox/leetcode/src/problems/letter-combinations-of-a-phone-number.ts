// https://leetcode.com/problems/letter-combinations-of-a-phone-number

/**
 * Letter Combinations of a Phone Number
 *
 * Given a string containing digits from 2-9 inclusive, return all possible letter
 * combinations that the number could represent. Return the answer in any order.
 *
 * A mapping of digits to letters (just like on the telephone buttons) is given below.
 * Note that 1 does not map to any letters.
 *
 * 2: abc
 * 3: def
 * 4: ghi
 * 5: jkl
 * 6: mno
 * 7: pqrs
 * 8: tuv
 * 9: wxyz
 */

// Phone digit to letters mapping
const digitToLetters: Record<string, string[]> = {
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"],
};

/**
 * Generate all possible letter combinations for a given phone number
 * @param digits A string containing digits from 2-9
 * @returns An array of all possible letter combinations
 */
export function letterCombinations(digits: string): string[] {
  // Handle empty input
  if (digits.length === 0) {
    return [];
  }

  const result: string[] = [];

  // Helper function for backtracking
  const backtrack = (index: number, currentCombination: string): void => {
    // If we've processed all digits, add the combination to our result
    if (index === digits.length) {
      result.push(currentCombination);
      return;
    }

    // Get the current digit and its corresponding letters
    const currentDigit = digits[index];
    const letters = digitToLetters[currentDigit];

    // For each letter corresponding to the current digit
    for (const letter of letters) {
      // Add the letter to our current combination and continue backtracking
      backtrack(index + 1, currentCombination + letter);
    }
  };

  // Start backtracking from the first digit with an empty combination
  backtrack(0, "");

  return result;
}
