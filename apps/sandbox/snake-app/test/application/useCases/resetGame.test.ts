import { resetGame } from "../../../src/application/useCases/resetGame";
import { updateGame } from "../../../src/application/useCases/updateGame";
import { startGame } from "../../../src/application/useCases/startGame";
import { createGame } from "../../../src/application/useCases/createGame";
import { GameState } from "../../../src/domain/entities/game.ts";

describe("resetGame", () => {
  it("should reset the game to initial state", () => {
    let state = createGame({});
    state = startGame({ state });

    for (let i = 0; i < 5; i++) {
      state = updateGame({ state });
    }

    const resetState = resetGame({ state });

    expect(resetState.score).toBe(0);
    expect(resetState.status).toBe("PAUSED");
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

    expect(resetState.status).toBe("PAUSED");
  });

  it("should maintain custom grid dimensions", () => {
    const customState = createGame({ width: 30, height: 15 });

    const resetState = resetGame({ state: customState });

    expect(resetState.grid.width).toBe(30);
    expect(resetState.grid.height).toBe(15);
  });
});
