import { Snake } from "../entities/snake";
import { Grid } from "../entities/grid";
import { getHead } from "./snakeService";
import { isOutOfBounds } from "./gridService";
import { Position } from "../entities/position.ts";

export const isCollidingWithSnake = ({
  position,
  snake,
}: {
  position: Position;
  snake: Snake;
}): boolean => {
  return snake.segments.some(
    (segment) => segment.x === position.x && segment.y === position.y,
  );
};

export const isCollidingWithSelf = ({ snake }: { snake: Snake }): boolean => {
  const head = getHead(snake);
  return snake.segments
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
};

export const isCollidingWithWall = ({
  snake,
  grid,
}: {
  snake: Snake;
  grid: Grid;
}): boolean => {
  const head = getHead(snake);
  return isOutOfBounds({ position: head, grid });
};

export const isGameOver = ({
  snake,
  grid,
}: {
  snake: Snake;
  grid: Grid;
}): boolean => {
  return isCollidingWithWall({ snake, grid }) || isCollidingWithSelf({ snake });
};
