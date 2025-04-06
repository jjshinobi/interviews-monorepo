import { pauseGame } from "../../../src/application/useCases/pauseGame";
import { startGame } from "../../../src/application/useCases/startGame";
import { createGame } from "../../../src/application/useCases/createGame";
import { GameState } from "../../../src/domain/entities/game.ts";

describe("pauseGame", () => {
  it("should change status from STARTED to PAUSED", () => {
    const initialState = createGame({});
    const startedState = startGame({ state: initialState });
    expect(startedState.status).toBe("STARTED");

    const pausedState = pauseGame({ state: startedState });
    expect(pausedState.status).toBe("PAUSED");
  });

  it("should not change status if already PAUSED", () => {
    const initialState = createGame({});
    expect(initialState.status).toBe("PAUSED");

    const stillPausedState = pauseGame({ state: initialState });
    expect(stillPausedState.status).toBe("PAUSED");
  });

  it("should not change status if FINISHED", () => {
    const initialState = createGame({});
    const finishedState: GameState = {
      ...initialState,
      status: "FINISHED",
    };

    const afterPauseState = pauseGame({ state: finishedState });

    expect(afterPauseState.status).toBe("FINISHED");
  });
});
