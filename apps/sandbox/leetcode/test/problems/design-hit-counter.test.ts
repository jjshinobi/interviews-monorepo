import { createHitCounter } from "../../src/problems/design-hit-counter";

describe("HitCounter", () => {
  let counter: ReturnType<typeof createHitCounter>;

  beforeEach(() => {
    counter = createHitCounter();
  });

  test("basic hit recording and retrieval", () => {
    counter.hit(1);
    counter.hit(2);
    counter.hit(3);
    expect(counter.getHits(4)).toBe(3);
  });

  test("removes old hits correctly after 5 minutes", () => {
    counter.hit(1);
    counter.hit(300);
    counter.hit(301);
    expect(counter.getHits(301)).toBe(2); // hit at 1 is expired
  });

  test("multiple hits at the same timestamp", () => {
    counter.hit(100);
    counter.hit(100);
    counter.hit(100);
    expect(counter.getHits(100)).toBe(3);
    expect(counter.getHits(399)).toBe(3);
    expect(counter.getHits(400)).toBe(0); // all expired
  });

  test("no hits", () => {
    expect(counter.getHits(10)).toBe(0);
  });
});
