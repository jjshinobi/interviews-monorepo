import {
  createPeekingIterator,
  NormalIterator,
} from "../../src/problems/peeking-iterator";

function createIterator<T>(arr: T[]): NormalIterator<T> {
  let index = 0;
  return {
    next: () => ({ value: arr[index++], done: index > arr.length }),
    hasNext: () => index < arr.length,
  };
}

describe("PeekingIterator", () => {
  it("peeks and iterates correctly", () => {
    const nums = [10, 20, 30];
    const iterator = createIterator(nums);
    const peekIter = createPeekingIterator(iterator);

    expect(peekIter.peek()).toBe(10);
    expect(peekIter.peek()).toBe(10);
    expect(peekIter.next()).toBe(10);

    expect(peekIter.next()).toBe(20);

    expect(peekIter.peek()).toBe(30);
    expect(peekIter.hasNext()).toBe(true);
    expect(peekIter.next()).toBe(30);

    expect(peekIter.hasNext()).toBe(false);
  });

  it("handles empty iterator", () => {
    const iterator = createIterator<number>([]);
    const peekIter = createPeekingIterator(iterator);

    expect(peekIter.hasNext()).toBe(false);
  });
});
