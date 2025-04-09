/**
 * Determines if it's possible to provide change to all customers buying lemonade.
 * Each lemonade costs $5.
 * Customers pay with either $5, $10, or $20 bills.
 * We need to give correct change so each customer pays a net of $5.
 *
 * @param bills - An array of integers representing the bills that customers pay with
 * @returns - True if you can provide change to every customer, false otherwise
 */
export function lemonadeChange(bills: number[]): boolean {
  // Keep track of the number of $5 and $10 bills we have for change
  let fives = 0;
  let tens = 0;

  for (const bill of bills) {
    if (bill === 5) {
      // If the customer gives us $5, no change needed
      fives++;
    } else if (bill === 10) {
      // If the customer gives us $10, we need to give them $5 in change
      if (fives === 0) {
        // If we don't have any $5 bills, we can't provide change
        return false;
      }

      fives--;
      tens++;
    } else if (bill === 20) {
      // If the customer gives us $20, we need to give them $15 in change

      // Option 1: Use one $10 bill and one $5 bill (preferred)
      if (tens > 0 && fives > 0) {
        tens--;
        fives--;
      }
      // Option 2: Use three $5 bills
      else if (fives >= 3) {
        fives -= 3;
      }
      // If we can't provide change with either option, return false
      else {
        return false;
      }

      // Note: We don't add $20 bills to our inventory as they're not used for change
    }
  }

  // If we made it through all customers, we can provide change to everyone
  return true;
}
