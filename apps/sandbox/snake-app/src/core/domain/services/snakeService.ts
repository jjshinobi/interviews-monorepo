import { Position, Direction } from "../entities/position";
import { Snake } from "../entities/snake";

export const createSnake = ({
  initialPosition = { x: 10, y: 10 },
  initialDirection = "RIGHT",
}: {
  initialPosition?: Position;
  initialDirection?: Direction;
} = {}): Snake => {
  return {
    segments: [initialPosition],
    direction: initialDirection,
    growing: false,
  };
};

export const createSnakeWithSegments = ({
  segments,
  direction = "RIGHT",
}: {
  segments: Position[];
  direction?: Direction;
}): Snake => {
  return {
    segments: [...segments],
    direction: direction,
    growing: false,
  };
};

export const getHead = (snake: Snake): Position => snake.segments[0];

export const isValidDirectionChange = ({
  currentDirection,
  newDirection,
}: {
  currentDirection: Direction;
  newDirection: Direction;
}): boolean => {
  return !(
    (currentDirection === "UP" && newDirection === "DOWN") ||
    (currentDirection === "DOWN" && newDirection === "UP") ||
    (currentDirection === "LEFT" && newDirection === "RIGHT") ||
    (currentDirection === "RIGHT" && newDirection === "LEFT")
  );
};

export const calculateNewHead = ({
  head,
  direction,
}: {
  head: Position;
  direction: Direction;
}): Position => {
  switch (direction) {
    case "UP":
      return { x: head.x, y: head.y - 1 };
    case "DOWN":
      return { x: head.x, y: head.y + 1 };
    case "LEFT":
      return { x: head.x - 1, y: head.y };
    case "RIGHT":
      return { x: head.x + 1, y: head.y };
  }
};

export const moveSnake = ({
  snake,
  newDirection,
}: {
  snake: Snake;
  newDirection?: Direction;
}): Snake => {
  const direction =
    newDirection &&
    isValidDirectionChange({
      currentDirection: snake.direction,
      newDirection,
    })
      ? newDirection
      : snake.direction;

  const head = getHead(snake);
  const newHead = calculateNewHead({ head, direction });

  const newSegments = [newHead, ...snake.segments];
  if (!snake.growing) {
    newSegments.pop();
  }

  return {
    segments: newSegments,
    direction,
    growing: false,
  };
};

export const growSnake = (snake: Snake): Snake => ({
  ...snake,
  growing: true,
});
