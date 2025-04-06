import { createGame } from "./createGame";
import { GameState } from "../../../src/domain/entities/game.ts";

export const resetGame = ({ state }: { state: GameState }): GameState => {
  return createGame({
    width: state.grid.width,
    height: state.grid.height,
  });
};
