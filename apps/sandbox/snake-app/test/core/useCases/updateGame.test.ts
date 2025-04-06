import { createGame } from "../../../src/core/useCases/createGame.ts";
import { startGame } from "../../../src/core/useCases/startGame.ts";
import { updateGame } from "../../../src/core/useCases/updateGame.ts";
import { GameState } from "../../../src/core/domain/entities/game.ts";

describe("updateGame", () => {
  it("should move the snake in the current direction", () => {
    const initialState = createGame({});
    initialState.snake.direction = "RIGHT"; // Ensure direction is RIGHT
    const startedState = startGame({ state: initialState });

    const updatedState = updateGame({ state: startedState });

    expect(updatedState.snake.segments[0].x).toBe(
      initialState.snake.segments[0].x + 1,
    );
    expect(updatedState.snake.segments[0].y).toBe(
      initialState.snake.segments[0].y,
    );
  });

  it("should change direction if a valid new direction is provided", () => {
    const initialState = createGame({});
    initialState.snake.direction = "RIGHT";
    const startedState = startGame({ state: initialState });

    const updatedState = updateGame({
      state: startedState,
      newDirection: "DOWN",
    });

    expect(updatedState.snake.direction).toBe("DOWN");
    expect(updatedState.snake.segments[0].y).toBe(
      initialState.snake.segments[0].y + 1,
    );
  });

  it("should not update if game is PAUSED", () => {
    const initialState = createGame({});
    const updatedState = updateGame({ state: initialState });
    expect(updatedState).toEqual(initialState);
  });

  it("should not update if game is FINISHED", () => {
    const initialState = createGame({});
    const finishedState: GameState = {
      ...initialState,
      status: "FINISHED",
    };

    const updatedState = updateGame({ state: finishedState });

    expect(updatedState).toEqual(finishedState);
  });

  it("should end the game if snake hits a wall", () => {
    const initialState = createGame({ width: 5, height: 5 });
    initialState.snake.segments = [{ x: 4, y: 2 }];
    initialState.snake.direction = "RIGHT";
    const startedState = startGame({ state: initialState });

    const updatedState = updateGame({ state: startedState });

    expect(updatedState.status).toBe("FINISHED");
  });

  it("should end the game if snake hits itself", () => {
    const initialState = createGame({ initialPosition: { x: 5, y: 5 } });

    initialState.snake.segments = [
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 6, y: 6 },
      { x: 6, y: 5 },
      { x: 6, y: 4 },
      { x: 5, y: 4 },
    ];
    const startedState = startGame({ state: initialState });
    const updatedState = updateGame({ state: startedState });

    expect(updatedState.status).toBe("FINISHED");
  });

  it("should increase score and grow snake when it eats food", () => {
    const initialState = createGame({});
    initialState.snake.segments = [{ x: 4, y: 5 }];
    initialState.snake.direction = "RIGHT";
    initialState.food.position = { x: 5, y: 5 };
    const startedState = startGame({ state: initialState });

    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0.7);

    const updatedState = updateGame({ state: startedState });

    expect(updatedState.score).toBe(1);
    expect(updatedState.snake.growing).toBe(true);
    expect(updatedState.food.position).not.toEqual({ x: 5, y: 5 });

    Math.random = originalRandom;
  });
});
