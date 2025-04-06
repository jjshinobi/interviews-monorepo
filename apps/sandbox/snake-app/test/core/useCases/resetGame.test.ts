import { createGame } from "../../../src/core/useCases/createGame.ts";
import { startGame } from "../../../src/core/useCases/startGame.ts";
import { updateGame } from "../../../src/core/useCases/updateGame.ts";
import { resetGame } from "../../../src/core/useCases/resetGame.ts";
import { GameState } from "../../../src/core/domain/entities/game.ts";

describe("resetGame", () => {
  it("should reset the game to initial state", () => {
    let state = createGame({});
    state = startGame({ state });

    for (let i = 0; i < 5; i++) {
      state = updateGame({ state });
    }

    const resetState = resetGame({ state });

    expect(resetState.score).toBe(0);
    expect(resetState.status).toBe("NEW");
    expect(resetState.snake.segments.length).toBe(1);

    expect(resetState.grid.width).toBe(state.grid.width);
    expect(resetState.grid.height).toBe(state.grid.height);
  });

  it("should work even if the game is FINISHED", () => {
    const initialState = createGame({});
    const finishedState: GameState = {
      ...initialState,
      status: "FINISHED",
    };

    const resetState = resetGame({ state: finishedState });

    expect(resetState.status).toBe("NEW");
  });

  it("should maintain custom grid dimensions", () => {
    const customState = createGame({ width: 30, height: 15 });

    const resetState = resetGame({ state: customState });

    expect(resetState.grid.width).toBe(30);
    expect(resetState.grid.height).toBe(15);
  });
});
