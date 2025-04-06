import { Snake } from "./snake";
import { Food } from "./food";
import { Grid } from "./grid";

export type GameStatus = "NEW" | "STARTED" | "PAUSED" | "FINISHED";

export type GameState = {
  snake: Snake;
  food: Food;
  grid: Grid;
  status: GameStatus;
  score: number;
};
