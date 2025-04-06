import { createGame } from "../../../src/application/useCases/createGame";

describe("createGame", () => {
  it("should create a game with default grid size", () => {
    const state = createGame({
      initialPosition: { x: 10, y: 10 },
    });

    expect(state.grid.width).toBe(20);
    expect(state.grid.height).toBe(20);
    expect(state.snake.segments.length).toBe(1);
    expect(state.snake.segments[0].x).toBe(10);
    expect(state.snake.segments[0].y).toBe(10);
    expect(state.food).toBeDefined();
    expect(state.score).toBe(0);
    expect(state.status).toBe("PAUSED");
  });

  it("should create a game with specified grid size", () => {
    const state = createGame({
      width: 15,
      height: 10,
      initialPosition: { x: 7, y: 5 },
    });

    expect(state.grid.width).toBe(15);
    expect(state.grid.height).toBe(10);
    expect(state.snake.segments[0].x).toBe(7);
    expect(state.snake.segments[0].y).toBe(5);
  });

  it("should create food that is not on snake", () => {
    const state = createGame({});

    const snakePositions = state.snake.segments.map(
      (segment) => `${segment.x},${segment.y}`,
    );
    const foodPosition = `${state.food.position.x},${state.food.position.y}`;

    expect(snakePositions.includes(foodPosition)).toBe(false);
  });
});
