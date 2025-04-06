import { startGame } from "../../../src/application/useCases/startGame";
import { createGame } from "../../../src/application/useCases/createGame";
import { GameState } from "../../../src/domain/entities/game.ts";

describe("startGame", () => {
  it("should change status from PAUSED to STARTED", () => {
    const initialState = createGame({});
    expect(initialState.status).toBe("PAUSED");

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
