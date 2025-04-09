import { dieSimulator } from "../../src/problems/dice-roll-simulation";

describe("dieSimulator", () => {
  it("should return 34 for n = 2, rollMax = [1,1,2,2,2,3]", () => {
    expect(dieSimulator(2, [1, 1, 2, 2, 2, 3])).toBe(34);
  });

  it("should return 30 for n = 2, rollMax = [1,1,1,1,1,1]", () => {
    expect(dieSimulator(2, [1, 1, 1, 1, 1, 1])).toBe(30);
  });

  it("should return 1 for n = 1, rollMax = [1,1,1,1,1,1]", () => {
    expect(dieSimulator(1, [1, 1, 1, 1, 1, 1])).toBe(6);
  });

  it("should handle larger input", () => {
    expect(dieSimulator(3, [1, 1, 1, 2, 2, 3])).toBeGreaterThan(0);
  });
});
