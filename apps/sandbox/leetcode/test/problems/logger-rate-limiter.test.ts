/**
 * Tests for the Logger Rate Limiter implementation
 */

import { createLogger } from "../../src/problems/logger-rate-limiter";

describe("Logger Rate Limiter", () => {
  test("should print a message when seen for the first time", () => {
    const logger = createLogger();

    // First occurrence of message should be printed
    expect(logger.shouldPrintMessage(1, "message1")).toBe(true);
  });

  test("should not print a duplicate message within 10 seconds", () => {
    const logger = createLogger();

    // First occurrence
    expect(logger.shouldPrintMessage(1, "message1")).toBe(true);

    // Second occurrence within 10 seconds
    expect(logger.shouldPrintMessage(2, "message1")).toBe(false);

    // Third occurrence still within 10 seconds
    expect(logger.shouldPrintMessage(10, "message1")).toBe(false);
  });

  test("should print a duplicate message after 10 seconds", () => {
    const logger = createLogger();

    // First occurrence
    expect(logger.shouldPrintMessage(1, "message1")).toBe(true);

    // Exactly 10 seconds later
    expect(logger.shouldPrintMessage(11, "message1")).toBe(true);

    // Within 10 seconds of the second occurrence
    expect(logger.shouldPrintMessage(20, "message1")).toBe(false);

    // After 10 seconds from the second occurrence
    expect(logger.shouldPrintMessage(21, "message1")).toBe(true);
  });

  test("should handle multiple different messages correctly", () => {
    const logger = createLogger();

    // Different messages at the same time
    expect(logger.shouldPrintMessage(1, "message1")).toBe(true);
    expect(logger.shouldPrintMessage(1, "message2")).toBe(true);

    // Different messages within their own 10-second windows
    expect(logger.shouldPrintMessage(2, "message1")).toBe(false);
    expect(logger.shouldPrintMessage(3, "message2")).toBe(false);

    // message1 can be printed again after its 10-second window
    expect(logger.shouldPrintMessage(11, "message1")).toBe(true);

    // message2 still can't be printed yet
    // Since message2 was first logged at timestamp 1, and we need to wait 10 seconds,
    // at timestamp 11 it has been exactly 10 seconds, so it should be printable
    expect(logger.shouldPrintMessage(11, "message2")).toBe(true);

    // Both messages were just printed at timestamp 11, so they should be blocked again
    expect(logger.shouldPrintMessage(12, "message1")).toBe(false);
    expect(logger.shouldPrintMessage(12, "message2")).toBe(false);
  });

  test("should match the LeetCode example", () => {
    const logger = createLogger();

    // Example from LeetCode
    expect(logger.shouldPrintMessage(1, "foo")).toBe(true);
    expect(logger.shouldPrintMessage(2, "bar")).toBe(true);
    expect(logger.shouldPrintMessage(3, "foo")).toBe(false);
    expect(logger.shouldPrintMessage(8, "bar")).toBe(false);
    expect(logger.shouldPrintMessage(10, "foo")).toBe(false);
    expect(logger.shouldPrintMessage(11, "foo")).toBe(true);
  });

  test("should handle edge cases", () => {
    const logger = createLogger();

    // Edge case: Empty message
    expect(logger.shouldPrintMessage(1, "")).toBe(true);
    expect(logger.shouldPrintMessage(2, "")).toBe(false);

    // Edge case: Large timestamp gaps
    expect(logger.shouldPrintMessage(1, "message")).toBe(true);
    expect(logger.shouldPrintMessage(1000000, "message")).toBe(true);

    // Edge case: Timestamp exactly at the boundary
    expect(logger.shouldPrintMessage(1, "boundary")).toBe(true);
    expect(logger.shouldPrintMessage(11, "boundary")).toBe(true);
  });
});
