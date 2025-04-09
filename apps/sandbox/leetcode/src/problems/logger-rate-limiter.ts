/**
 * Logger Rate Limiter
 *
 * Design a logger system that receives a stream of messages along with their timestamps.
 * Each unique message should only be printed at most every 10 seconds.
 *
 * The logger should provide a function that accepts a timestamp and message, and returns whether
 * the message should be printed. It should return:
 * - true if the message is being printed for the first time or has been more than 10 seconds since it was last printed
 * - false if the message has been printed within the last 10 seconds
 *
 * All timestamps will be in seconds granularity.
 */

// Type definition for the message timestamp map
type MessageTimestampMap = Map<string, number>;

/**
 * Creates a logger that limits the rate of messages to at most once per 10 seconds
 * @returns An object with a shouldPrintMessage function
 */
export function createLogger() {
  // Map to store the last timestamp when each message was printed
  const messageTimestamps: MessageTimestampMap = new Map();

  /**
   * Determines if a message should be printed based on the rate limiting rules
   * @param timestamp - The current timestamp in seconds
   * @param message - The message to potentially print
   * @returns true if the message should be printed, false otherwise
   */
  const shouldPrintMessage = (timestamp: number, message: string): boolean => {
    // Check if we've seen this message before
    if (!messageTimestamps.has(message)) {
      // First time seeing this message, so print it
      messageTimestamps.set(message, timestamp);
      return true;
    }

    // Get the last time we printed this message
    const lastPrintTime = messageTimestamps.get(message)!;

    // Check if it's been at least 10 seconds since we last printed this message
    if (timestamp - lastPrintTime >= 10) {
      // Update the timestamp and print the message
      messageTimestamps.set(message, timestamp);
      return true;
    }

    // Less than 10 seconds have passed, so don't print
    return false;
  };

  return {
    shouldPrintMessage,
  };
}
