// listHelpers.ts

export type ListNode = {
  val: number;
  next: ListNode | null;
};

// Helper to create a ListNode from array
export const arrayToList = (arr: number[]): ListNode | null => {
  const dummy: ListNode = { val: 0, next: null };
  let curr = dummy;
  for (const val of arr) {
    curr.next = { val, next: null };
    curr = curr.next;
  }
  return dummy.next;
};

// Helper to convert a ListNode to array
export const listToArray = (node: ListNode | null): number[] => {
  const result: number[] = [];
  while (node) {
    result.push(node.val);
    node = node.next;
  }
  return result;
};

// MinHeap implementation for ListNode based on val
const pushHeap = (heap: ListNode[], node: ListNode) => {
  heap.push(node);
  let i = heap.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent].val <= heap[i].val) break;
    [heap[i], heap[parent]] = [heap[parent], heap[i]];
    i = parent;
  }
};

const popHeap = (heap: ListNode[]): ListNode => {
  const top = heap[0];
  const last = heap.pop()!;
  if (heap.length > 0) {
    heap[0] = last;
    let i = 0;
    const n = heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && heap[left].val < heap[smallest].val) smallest = left;
      if (right < n && heap[right].val < heap[smallest].val) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }
  return top;
};

// Main function to merge k sorted lists
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const heap: ListNode[] = [];

  // Initialize heap with head of each list
  for (const node of lists) {
    if (node) pushHeap(heap, node);
  }

  const dummy: ListNode = { val: 0, next: null };
  let curr = dummy;

  while (heap.length > 0) {
    const smallest = popHeap(heap);
    curr.next = smallest;
    curr = curr.next;
    if (smallest.next) {
      pushHeap(heap, smallest.next);
    }
  }

  return dummy.next;
}
