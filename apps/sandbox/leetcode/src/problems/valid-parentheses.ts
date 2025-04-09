// https://leetcode.com/problems/valid-parentheses

function isValid(s: string): boolean {
  // Stack to keep track of opening parentheses
  const stack: string[] = [];

  // Mapping for closing parentheses to opening parentheses
  const parenthesesMap: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  // Loop through each character in the string
  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      // If it's an opening bracket, push it onto the stack
      stack.push(char);
    } else if (char === ")" || char === "}" || char === "]") {
      // If it's a closing bracket, check if the stack is empty
      // or if the last element in the stack is the matching opening bracket
      if (stack.pop() !== parenthesesMap[char]) {
        return false;
      }
    }
  }

  // After processing all characters, the stack should be empty if the parentheses are valid
  return stack.length === 0;
}

export { isValid };
