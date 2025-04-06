import {
  calculateNewHead,
  createSnake,
  getHead,
  growSnake,
  isValidDirectionChange,
  moveSnake,
} from "../../../../src/core/domain/services/snakeService.ts";

describe("Snake Service", () => {
  describe("createSnake", () => {
    it("should create a snake with default values", () => {
      const snake = createSnake({});
      expect(snake.segments.length).toBe(1);
      expect(snake.segments[0]).toEqual({ x: 10, y: 10 });
      expect(snake.direction).toBe("RIGHT");
      expect(snake.growing).toBe(false);
    });

    it("should create a snake at specified position and direction", () => {
      const snake = createSnake({
        initialPosition: { x: 5, y: 5 },
        initialDirection: "DOWN",
      });
      expect(snake.segments[0]).toEqual({ x: 5, y: 5 });
      expect(snake.direction).toBe("DOWN");
    });

    it("should work with empty call with default parameters", () => {
      const snake = createSnake();
      expect(snake.segments.length).toBe(1);
      expect(snake.segments[0]).toEqual({ x: 10, y: 10 });
      expect(snake.direction).toBe("RIGHT");
    });
  });

  describe("getHead", () => {
    it("should return the first segment as the head", () => {
      const snake = createSnake({ initialPosition: { x: 5, y: 5 } });
      expect(getHead(snake)).toEqual({ x: 5, y: 5 });
    });
  });

  describe("isValidDirectionChange", () => {
    it("should not allow 180-degree turns", () => {
      expect(
        isValidDirectionChange({
          currentDirection: "RIGHT",
          newDirection: "LEFT",
        }),
      ).toBe(false);
      expect(
        isValidDirectionChange({
          currentDirection: "LEFT",
          newDirection: "RIGHT",
        }),
      ).toBe(false);
      expect(
        isValidDirectionChange({
          currentDirection: "UP",
          newDirection: "DOWN",
        }),
      ).toBe(false);
      expect(
        isValidDirectionChange({
          currentDirection: "DOWN",
          newDirection: "UP",
        }),
      ).toBe(false);
    });

    it("should allow 90-degree turns", () => {
      expect(
        isValidDirectionChange({
          currentDirection: "RIGHT",
          newDirection: "UP",
        }),
      ).toBe(true);
      expect(
        isValidDirectionChange({
          currentDirection: "RIGHT",
          newDirection: "DOWN",
        }),
      ).toBe(true);
      expect(
        isValidDirectionChange({
          currentDirection: "LEFT",
          newDirection: "UP",
        }),
      ).toBe(true);
      expect(
        isValidDirectionChange({
          currentDirection: "LEFT",
          newDirection: "DOWN",
        }),
      ).toBe(true);
      expect(
        isValidDirectionChange({
          currentDirection: "UP",
          newDirection: "RIGHT",
        }),
      ).toBe(true);
      expect(
        isValidDirectionChange({
          currentDirection: "UP",
          newDirection: "LEFT",
        }),
      ).toBe(true);
      expect(
        isValidDirectionChange({
          currentDirection: "DOWN",
          newDirection: "RIGHT",
        }),
      ).toBe(true);
      expect(
        isValidDirectionChange({
          currentDirection: "DOWN",
          newDirection: "LEFT",
        }),
      ).toBe(true);
    });
  });

  describe("calculateNewHead", () => {
    it("should calculate new head position based on direction", () => {
      const head = { x: 5, y: 5 };
      expect(calculateNewHead({ head, direction: "RIGHT" })).toEqual({
        x: 6,
        y: 5,
      });
      expect(calculateNewHead({ head, direction: "LEFT" })).toEqual({
        x: 4,
        y: 5,
      });
      expect(calculateNewHead({ head, direction: "UP" })).toEqual({
        x: 5,
        y: 4,
      });
      expect(calculateNewHead({ head, direction: "DOWN" })).toEqual({
        x: 5,
        y: 6,
      });
    });
  });

  describe("moveSnake", () => {
    it("should move the snake in its current direction", () => {
      const snake = createSnake({
        initialPosition: { x: 5, y: 5 },
      });
      const movedSnake = moveSnake({ snake });
      expect(getHead(movedSnake)).toEqual({ x: 6, y: 5 });
    });

    it("should grow the snake if growing flag is true", () => {
      const snake = createSnake({ initialPosition: { x: 5, y: 5 } });
      const growingSnake = { ...snake, growing: true };
      const movedSnake = moveSnake({ snake: growingSnake });
      expect(movedSnake.segments.length).toBe(2);
      expect(movedSnake.segments[0]).toEqual({ x: 6, y: 5 });
      expect(movedSnake.segments[1]).toEqual({ x: 5, y: 5 });
    });

    it("should not allow 180-degree turns", () => {
      const snake = createSnake({
        initialPosition: { x: 5, y: 5 },
      });
      const movedSnake = moveSnake({ snake, newDirection: "LEFT" });
      expect(movedSnake.direction).toBe("RIGHT");
      expect(getHead(movedSnake)).toEqual({ x: 6, y: 5 });
    });

    it("should allow changing to a valid direction", () => {
      const snake = createSnake({
        initialPosition: { x: 5, y: 5 },
      });
      const movedSnake = moveSnake({ snake, newDirection: "DOWN" });
      expect(movedSnake.direction).toBe("DOWN");
      expect(getHead(movedSnake)).toEqual({ x: 5, y: 6 });
    });
  });

  describe("growSnake", () => {
    it("should set the growing flag to true", () => {
      const snake = createSnake();
      const growingSnake = growSnake(snake);
      expect(growingSnake.growing).toBe(true);
    });

    it("should not modify other properties", () => {
      const snake = createSnake({
        initialPosition: { x: 3, y: 3 },
        initialDirection: "UP",
      });
      const growingSnake = growSnake(snake);
      expect(growingSnake.segments).toEqual(snake.segments);
      expect(growingSnake.direction).toBe(snake.direction);
      expect(growingSnake.growing).toBe(true);
    });
  });
});
