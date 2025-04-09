import createTimeMap from "../../src/problems/time-based-key-value-store";

describe("TimeMap", () => {
  it("Example 1 from LeetCode", () => {
    const timeMap = createTimeMap();

    timeMap.set("foo", "bar", 1);
    expect(timeMap.get("foo", 1)).toBe("bar");
    expect(timeMap.get("foo", 3)).toBe("bar");

    timeMap.set("foo", "bar2", 4);
    expect(timeMap.get("foo", 4)).toBe("bar2");
    expect(timeMap.get("foo", 5)).toBe("bar2");
  });

  it("Example 2 from LeetCode", () => {
    const timeMap = createTimeMap();

    timeMap.set("love", "high", 10);
    timeMap.set("love", "low", 20);

    expect(timeMap.get("love", 5)).toBe("");
    expect(timeMap.get("love", 10)).toBe("high");
    expect(timeMap.get("love", 15)).toBe("high");
    expect(timeMap.get("love", 20)).toBe("low");
    expect(timeMap.get("love", 25)).toBe("low");
  });

  it("Multiple keys", () => {
    const timeMap = createTimeMap();

    timeMap.set("key1", "value1", 5);
    timeMap.set("key2", "value2", 10);

    expect(timeMap.get("key1", 5)).toBe("value1");
    expect(timeMap.get("key2", 10)).toBe("value2");
    expect(timeMap.get("key3", 15)).toBe(""); // Non-existent key
  });

  it("Multiple timestamps for the same key", () => {
    const timeMap = createTimeMap();

    timeMap.set("key", "value1", 1);
    timeMap.set("key", "value2", 2);
    timeMap.set("key", "value3", 3);
    timeMap.set("key", "value4", 4);
    timeMap.set("key", "value5", 5);

    expect(timeMap.get("key", 1)).toBe("value1");
    expect(timeMap.get("key", 2)).toBe("value2");
    expect(timeMap.get("key", 3)).toBe("value3");
    expect(timeMap.get("key", 4)).toBe("value4");
    expect(timeMap.get("key", 5)).toBe("value5");
    expect(timeMap.get("key", 6)).toBe("value5"); // Latest value for timestamp > 5
  });

  it("Edge cases", () => {
    const timeMap = createTimeMap();

    // Empty store
    expect(timeMap.get("anyKey", 100)).toBe("");

    // Timestamps between values
    timeMap.set("test", "early", 10);
    timeMap.set("test", "late", 50);

    expect(timeMap.get("test", 9)).toBe(""); // Before first timestamp
    expect(timeMap.get("test", 10)).toBe("early"); // Exact match first
    expect(timeMap.get("test", 30)).toBe("early"); // Between timestamps
    expect(timeMap.get("test", 50)).toBe("late"); // Exact match second
    expect(timeMap.get("test", 100)).toBe("late"); // After all timestamps
  });

  it("Large number of entries", () => {
    const timeMap = createTimeMap();
    const numEntries = 1000;

    // Create many entries with increasing timestamps
    for (let i = 1; i <= numEntries; i++) {
      timeMap.set("bigKey", `value${i}`, i);
    }

    // Test random access
    expect(timeMap.get("bigKey", 500)).toBe("value500");
    expect(timeMap.get("bigKey", 750)).toBe("value750");
    expect(timeMap.get("bigKey", 250)).toBe("value250");

    // Test edge cases
    expect(timeMap.get("bigKey", 0)).toBe("");
    expect(timeMap.get("bigKey", 1001)).toBe(`value${numEntries}`);
  });
});
