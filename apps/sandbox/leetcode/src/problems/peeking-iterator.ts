// https://leetcode.com/problems/peeking-iterator

export type NormalIterator<T> = {
  next: () => { value: T; done: boolean };
  hasNext: () => boolean;
};

export type PeekingIterator<T> = {
  peek: () => T;
  next: () => T;
  hasNext: () => boolean;
};

export function createPeekingIterator<T>(
  iterator: NormalIterator<T>,
): PeekingIterator<T> {
  let peeked: { value: T } | null = null;

  function peek(): T {
    if (peeked === null && iterator.hasNext()) {
      peeked = { value: iterator.next().value };
    }
    return peeked!.value;
  }

  function next(): T {
    if (peeked !== null) {
      const val = peeked.value;
      peeked = null;
      return val;
    }
    return iterator.next().value;
  }

  function hasNext(): boolean {
    return peeked !== null || iterator.hasNext();
  }

  return { peek, next, hasNext };
}
