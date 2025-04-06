import { createGame } from "../../../src/core/useCases/createGame.ts";
import { startGame } from "../../../src/core/useCases/startGame.ts";
import { GameState } from "../../../src/core/domain/entities/game.ts";

describe("startGame", () => {
  it("should change status from NEW to STARTED", () => {
    const initialState = createGame({});
    expect(initialState.status).toBe("NEW");

    const startedState = startGame({ state: initialState });
    expect(startedState.status).toBe("STARTED");
  });

  it("should not change status if already STARTED", () => {
    const initialState = createGame({});
    const startedState = startGame({ state: initialState });
    const reStartedState = startGame({ state: startedState });

    expect(reStartedState.status).toBe("STARTED");
  });

  it("should not change status if FINISHED", () => {
    const initialState = createGame({});
    const finishedState: GameState = {
      ...initialState,
      status: "FINISHED",
    };

    const afterStartState = startGame({ state: finishedState });

    expect(afterStartState.status).toBe("FINISHED");
  });
});
