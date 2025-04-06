import { Position, Direction } from "./position";

export type Snake = {
  segments: Position[];
  direction: Direction;
  growing: boolean;
};
