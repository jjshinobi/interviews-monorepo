import { generateRandomPosition } from "../../../../src/core/domain/services/positionService.ts";

describe("generateRandomPosition", () => {
  it("should generate position within the specified dimensions", () => {
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValueOnce(0.5).mockReturnValueOnce(0.5);

    const position = generateRandomPosition({ width: 10, height: 10 });

    expect(position).toEqual({ x: 5, y: 5 });

    Math.random = originalRandom;
  });

  it("should generate different positions based on random values", () => {
    const originalRandom = Math.random;
    Math.random = jest
      .fn()
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(0.2);

    const position1 = generateRandomPosition({ width: 10, height: 10 });
    const position2 = generateRandomPosition({ width: 10, height: 10 });

    expect(position1).toEqual({ x: 1, y: 9 });
    expect(position2).toEqual({ x: 8, y: 2 });

    Math.random = originalRandom;
  });
});
