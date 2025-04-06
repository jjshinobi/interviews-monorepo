import {
  isCollidingWithSelf,
  isCollidingWithSnake,
  isCollidingWithWall,
  isGameOver,
} from "../../../src/domain/services/collisionService";
import {
  createSnake,
  createSnakeWithSegments,
} from "../../../src/domain/services/snakeService";
import { createGrid } from "../../../src/domain/services/gridService";

describe("Collision Service", () => {
  describe("isCollidingWithSelf", () => {
    it("should return true when snake collides with itself", () => {
      const snake = createSnakeWithSegments({
        segments: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 6, y: 6 },
          { x: 6, y: 5 },
          { x: 5, y: 5 },
        ],
        direction: "UP",
      });

      expect(isCollidingWithSelf({ snake })).toBe(true);
    });

    it("should return false when snake is not colliding with itself", () => {
      const snake = createSnake({});
      expect(isCollidingWithSelf({ snake })).toBe(false);

      const longerSnake = createSnakeWithSegments({
        segments: [
          { x: 5, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 5 },
          { x: 2, y: 5 },
        ],
      });

      expect(isCollidingWithSelf({ snake: longerSnake })).toBe(false);
    });
  });

  describe("isCollidingWithWall", () => {
    it("should return true when snake head is outside grid", () => {
      const grid = createGrid({ width: 10, height: 10 });

      const snakeRight = createSnakeWithSegments({
        segments: [{ x: 10, y: 5 }],
      });
      expect(isCollidingWithWall({ snake: snakeRight, grid })).toBe(true);

      const snakeLeft = createSnakeWithSegments({
        segments: [{ x: -1, y: 5 }],
        direction: "LEFT",
      });
      expect(isCollidingWithWall({ snake: snakeLeft, grid })).toBe(true);

      const snakeTop = createSnakeWithSegments({
        segments: [{ x: 5, y: -1 }],
        direction: "UP",
      });
      expect(isCollidingWithWall({ snake: snakeTop, grid })).toBe(true);

      const snakeBottom = createSnakeWithSegments({
        segments: [{ x: 5, y: 10 }],
        direction: "DOWN",
      });
      expect(isCollidingWithWall({ snake: snakeBottom, grid })).toBe(true);
    });

    it("should return false when snake is within grid", () => {
      const grid = createGrid({ width: 10, height: 10 });
      const snake = createSnake({ initialPosition: { x: 5, y: 5 } });
      expect(isCollidingWithWall({ snake, grid })).toBe(false);

      const snakeEdge = createSnakeWithSegments({
        segments: [{ x: 9, y: 9 }],
      });
      expect(isCollidingWithWall({ snake: snakeEdge, grid })).toBe(false);
    });
  });

  describe("isGameOver", () => {
    it("should return true when snake collides with a wall", () => {
      const grid = createGrid({ width: 10, height: 10 });
      const snakeOutOfBounds = createSnakeWithSegments({
        segments: [{ x: 10, y: 5 }],
      });

      expect(isGameOver({ snake: snakeOutOfBounds, grid })).toBe(true);
    });

    it("should return true when snake collides with itself", () => {
      const grid = createGrid({ width: 10, height: 10 });
      const snakeSelfCollision = createSnakeWithSegments({
        segments: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 6, y: 6 },
          { x: 6, y: 5 },
          { x: 5, y: 5 },
        ],
        direction: "UP",
      });

      expect(isGameOver({ snake: snakeSelfCollision, grid })).toBe(true);
    });

    it("should return false when snake is not colliding with anything", () => {
      const grid = createGrid({ width: 10, height: 10 });
      const snake = createSnake({ initialPosition: { x: 5, y: 5 } });

      expect(isGameOver({ snake, grid })).toBe(false);
    });
  });

  describe("isCollidingWithSnake", () => {
    it("should return true when position is on a snake segment", () => {
      const snake = createSnake({
        initialPosition: { x: 5, y: 5 },
      });

      expect(
        isCollidingWithSnake({
          position: { x: 5, y: 5 },
          snake,
        }),
      ).toBe(true);

      const longerSnake = {
        ...snake,
        segments: [
          { x: 7, y: 5 },
          { x: 6, y: 5 },
          { x: 5, y: 5 },
        ],
      };

      expect(
        isCollidingWithSnake({
          position: { x: 6, y: 5 },
          snake: longerSnake,
        }),
      ).toBe(true);
    });

    it("should return false when position is not on any snake segment", () => {
      const snake = createSnake({
        initialPosition: { x: 5, y: 5 },
      });

      expect(
        isCollidingWithSnake({
          position: { x: 10, y: 10 },
          snake,
        }),
      ).toBe(false);

      const longerSnake = {
        ...snake,
        segments: [
          { x: 7, y: 5 },
          { x: 6, y: 5 },
          { x: 5, y: 5 },
        ],
      };

      expect(
        isCollidingWithSnake({
          position: { x: 7, y: 6 },
          snake: longerSnake,
        }),
      ).toBe(false);
    });
  });
});
