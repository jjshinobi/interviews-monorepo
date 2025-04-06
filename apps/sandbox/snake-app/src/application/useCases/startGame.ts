import { GameState } from "../../../src/domain/entities/game.ts";

export const startGame = ({ state }: { state: GameState }): GameState => {
  if (state.status !== "FINISHED") {
    return {
      ...state,
      status: "STARTED",
    };
  }
  return state;
};
