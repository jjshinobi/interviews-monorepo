import { GameState } from "../../../domain/entities/game";
import { StyledBoard, Cell } from "./styles";

export const Board = ({ gameState }: { gameState: GameState }) => {
  const { snake, food, grid } = gameState;

  const getCellContent = (x: number, y: number) => {
    if (snake.segments[0].x === x && snake.segments[0].y === y) {
      return "head";
    }

    if (
      snake.segments
        .slice(1)
        .some((segment) => segment.x === x && segment.y === y)
    ) {
      return "body";
    }

    if (food.position.x === x && food.position.y === y) {
      return "food";
    }

    return "empty";
  };

  const renderCells = () => {
    const cells = [];

    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        const content = getCellContent(x, y);
        cells.push(<Cell key={`${x}-${y}`} type={content} />);
      }
    }

    return cells;
  };

  return (
    <StyledBoard width={grid.width} height={grid.height}>
      {renderCells()}
    </StyledBoard>
  );
};
