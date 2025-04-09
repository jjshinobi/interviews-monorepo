import { lemonadeChange } from "../../src/problems/lemonade-change";

describe("lemonadeChange", () => {
  test("example 1: [5, 5, 5, 10, 20] -> true", () => {
    expect(lemonadeChange([5, 5, 5, 10, 20])).toBe(true);
  });

  test("example 2: [5, 5, 10, 10, 20] -> false", () => {
    expect(lemonadeChange([5, 5, 10, 10, 20])).toBe(false);
  });

  test("empty array returns true", () => {
    expect(lemonadeChange([])).toBe(true);
  });

  test("all $5 bills returns true", () => {
    expect(lemonadeChange([5, 5, 5, 5, 5])).toBe(true);
  });

  test("first customer with $10 bill returns false", () => {
    expect(lemonadeChange([10])).toBe(false);
  });

  test("first customer with $20 bill returns false", () => {
    expect(lemonadeChange([20])).toBe(false);
  });

  test("complex case that works", () => {
    expect(lemonadeChange([5, 5, 10, 5, 5, 5, 10, 20, 5, 10])).toBe(true);
  });

  test("complex case that fails", () => {
    expect(lemonadeChange([5, 10, 5, 20, 5, 10, 5, 20, 10])).toBe(false);
  });

  test("can use three $5 bills when making change for $20", () => {
    // We get [5, 5, 5, 20] and should make change using 5+5+5 for the $20
    expect(lemonadeChange([5, 5, 5, 20])).toBe(true);
  });

  test("prefer using $10 bill when making change for $20", () => {
    // We get [5, 5, 10, 20] and should make change using 10+5 for the $20
    // We start with 0 fives and 0 tens
    // After [5, 5, 10], we have 1 five and 1 ten
    // After making change for $20 using 10+5, we end with 0 fives and 0 tens
    expect(lemonadeChange([5, 5, 10, 20])).toBe(true);
  });
});
