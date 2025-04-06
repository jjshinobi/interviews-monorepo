import { generateRandomPosition } from "../domain/services/positionService.ts";
import { Direction, Position } from "../domain/entities/position.ts";
import { GameState } from "../domain/entities/game.ts";
import { createGrid } from "../domain/services/gridService.ts";
import { createSnake } from "../domain/services/snakeService.ts";
import { generateFood } from "../domain/services/foodService.ts";

export const createGame = ({
  width = 20,
  height = 20,
  initialPosition = generateRandomPosition({ width, height }),
  initialDirection = "RIGHT",
}: {
  width?: number;
  height?: number;
  initialPosition?: Position;
  initialDirection?: Direction;
} = {}): GameState => {
  const grid = createGrid({ width, height });
  const snake = createSnake({
    initialPosition: initialPosition,
    initialDirection,
  });
  const food = generateFood({ grid, snake });

  return {
    snake,
    food,
    grid,
    status: "NEW",
    score: 0,
  };
};
