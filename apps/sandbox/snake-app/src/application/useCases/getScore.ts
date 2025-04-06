import { GameState } from "../../../src/domain/entities/game.ts";

export const getScore = ({ state }: { state: GameState }): number => {
  return state.score;
};
