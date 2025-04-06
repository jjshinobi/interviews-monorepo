import { GameState } from "../domain/entities/game.ts";
import { Direction } from "../domain/entities/position.ts";
import { growSnake, moveSnake } from "../domain/services/snakeService.ts";
import {
  isCollidingWithSelf,
  isCollidingWithWall,
} from "../domain/services/collisionService.ts";
import { generateFood, isEatingFood } from "../domain/services/foodService.ts";

export const updateGame = ({
  state,
  newDirection,
}: {
  state: GameState;
  newDirection?: Direction;
}): GameState => {
  if (state.status !== "STARTED") {
    return state;
  }

  const newSnake = moveSnake({
    snake: state.snake,
    newDirection: newDirection ?? state.snake.direction,
  });

  if (
    isCollidingWithWall({ snake: newSnake, grid: state.grid }) ||
    isCollidingWithSelf({ snake: newSnake })
  ) {
    return {
      ...state,
      snake: newSnake,
      status: "FINISHED",
    };
  }

  const eatingFood = isEatingFood({ snake: newSnake, food: state.food });

  let updatedSnake = newSnake;
  let updatedFood = state.food;
  let updatedScore = state.score;

  if (eatingFood) {
    updatedSnake = growSnake(newSnake);
    updatedFood = generateFood({ grid: state.grid, snake: updatedSnake });
    updatedScore = state.score + 1;
  }

  return {
    ...state,
    snake: updatedSnake,
    food: updatedFood,
    score: updatedScore,
  };
};
