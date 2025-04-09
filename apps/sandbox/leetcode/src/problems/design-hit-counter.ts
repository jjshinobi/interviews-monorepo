// https://leetcode.com/problems/design-hit-counter

type HitCounter = {
  hit: (timestamp: number) => void;
  getHits: (timestamp: number) => number;
};

export const createHitCounter = (): HitCounter => {
  const hits: [number, number][] = []; // [timestamp, count]

  const hit = (timestamp: number): void => {
    const last = hits[hits.length - 1];
    if (last && last[0] === timestamp) {
      last[1]++;
    } else {
      hits.push([timestamp, 1]);
    }
  };

  const getHits = (timestamp: number): number => {
    const start = timestamp - 300 + 1;
    // Remove outdated timestamps
    while (hits.length && hits[0][0] < start) {
      hits.shift();
    }

    return hits.reduce((acc, [, count]) => acc + count, 0);
  };

  return { hit, getHits };
};
