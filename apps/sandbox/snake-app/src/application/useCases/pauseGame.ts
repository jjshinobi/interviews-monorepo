import { GameState } from "../../../src/domain/entities/game.ts";

export const pauseGame = ({ state }: { state: GameState }): GameState => {
  if (state.status === "STARTED") {
    return {
      ...state,
      status: "PAUSED",
    };
  }
  return state;
};
