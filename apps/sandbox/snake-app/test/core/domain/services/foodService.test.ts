import {
  createFood,
  generateFood,
  isEatingFood,
} from "../../../../src/core/domain/services/foodService.ts";
import {
  createSnake,
  createSnakeWithSegments,
} from "../../../../src/core/domain/services/snakeService.ts";
import { createGrid } from "../../../../src/core/domain/services/gridService.ts";

describe("Food Service", () => {
  describe("createFood", () => {
    it("should create food at the specified position", () => {
      const food = createFood({ position: { x: 5, y: 5 } });
      expect(food.position).toEqual({ x: 5, y: 5 });
    });
  });

  describe("isEatingFood", () => {
    it("should return true when snake head is at food position", () => {
      const snake = createSnake({ initialPosition: { x: 5, y: 5 } });
      const food = { position: { x: 5, y: 5 } };

      expect(isEatingFood({ snake, food })).toBe(true);
    });

    it("should return false when snake head is not at food position", () => {
      const snake = createSnake({ initialPosition: { x: 5, y: 5 } });
      const food = { position: { x: 8, y: 8 } };

      expect(isEatingFood({ snake, food })).toBe(false);

      const longerSnake = createSnakeWithSegments({
        segments: [
          { x: 7, y: 5 },
          { x: 6, y: 5 },
          { x: 5, y: 5 },
        ],
      });
      const foodOnTail = { position: { x: 5, y: 5 } };

      expect(isEatingFood({ snake: longerSnake, food: foodOnTail })).toBe(
        false,
      );
    });
  });

  describe("generateFood", () => {
    it("should generate food at a random position within the grid", () => {
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValueOnce(0.5).mockReturnValueOnce(0.5);

      const grid = createGrid({ width: 10, height: 10 });
      const snake = createSnake({
        initialPosition: { x: 0, y: 0 },
      });

      const food = generateFood({ grid, snake });

      expect(food.position).toEqual({ x: 5, y: 5 });

      Math.random = originalRandom;
    });

    it("should not generate food on snake segments", () => {
      const originalRandom = Math.random;
      Math.random = jest
        .fn()
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0.6)
        .mockReturnValueOnce(0.6);

      const grid = createGrid({ width: 10, height: 10 });
      const snake = createSnakeWithSegments({
        segments: [
          { x: 5, y: 5 },
          { x: 4, y: 5 },
        ],
      });

      const food = generateFood({ grid, snake });

      expect(food.position).toEqual({ x: 6, y: 6 });

      Math.random = originalRandom;
    });
  });
});
