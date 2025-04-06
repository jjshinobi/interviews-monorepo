import { Food } from "../entities/food";
import { Position } from "../entities/position";
import { Grid } from "../entities/grid";
import { Snake } from "../entities/snake";
import { generateRandomPosition } from "./positionService.ts";
import { getHead } from "./snakeService.ts";
import { isCollidingWithSnake } from "./collisionService.ts";

export const createFood = ({ position }: { position: Position }): Food => ({
  position,
});

export const generateFood = ({
  grid,
  snake,
}: {
  grid: Grid;
  snake: Snake;
}): Food => {
  let position;

  do {
    position = generateRandomPosition({
      width: grid.width,
      height: grid.height,
    });
  } while (isCollidingWithSnake({ position, snake }));

  return createFood({ position });
};

export const isEatingFood = ({
  snake,
  food,
}: {
  snake: Snake;
  food: Food;
}): boolean => {
  const head = getHead(snake);
  return head.x === food.position.x && head.y === food.position.y;
};
