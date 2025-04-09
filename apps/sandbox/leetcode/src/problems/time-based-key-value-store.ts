// https://leetcode.com/problems/time-based-key-value-store

/**
 * Time-Based Key-Value Store: Storing and retrieving values based on keys and timestamps.
 */

// Define the structure of our time entries
type TimeEntry = [number, string]; // [timestamp, value]
type Store = Map<string, TimeEntry[]>;

/**
 * Creates a new time-based key-value store
 * @returns An object with set and get functions
 */
const createTimeMap = () => {
  // Initialize the store as a Map
  const store: Store = new Map();

  /**
   * Sets a key-value pair in the TimeMap with a timestamp
   * @param key - The key (string)
   * @param value - The value (string)
   * @param timestamp - The timestamp (number)
   */
  const set = (key: string, value: string, timestamp: number): void => {
    if (!store.has(key)) {
      store.set(key, []);
    }

    // Since we're told timestamps are strictly increasing, we can just push
    store.get(key)!.push([timestamp, value]);
  };

  /**
   * Gets the value associated with the key at the given timestamp or earlier
   * @param key - The key to look up
   * @param timestamp - The timestamp to look up
   * @returns The value associated with the key at the largest timestamp <= target,
   *          or "" if no such key or timestamp exists
   */
  const get = (key: string, timestamp: number): string => {
    if (!store.has(key)) {
      return "";
    }

    const entries = store.get(key)!;

    // Binary search to find the largest timestamp less than or equal to the target
    return binarySearch(entries, timestamp);
  };

  /**
   * Binary search helper function to find the value at the largest timestamp
   * less than or equal to the target
   * @param entries - Array of [timestamp, value] entries
   * @param targetTimestamp - The timestamp to look up
   * @returns The matching value or "" if not found
   */
  const binarySearch = (
    entries: TimeEntry[],
    targetTimestamp: number,
  ): string => {
    let left = 0;
    let right = entries.length - 1;
    let result = "";

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const [time, value] = entries[mid];

      if (time === targetTimestamp) {
        // Exact match found
        return value;
      } else if (time < targetTimestamp) {
        // This is a valid candidate, but we might find a better one
        result = value;
        left = mid + 1;
      } else {
        // This timestamp is too large
        right = mid - 1;
      }
    }

    return result;
  };

  // Return the public interface
  return { set, get };
};

// Export the factory function
export default createTimeMap;
