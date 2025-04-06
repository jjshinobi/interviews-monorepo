import { Grid } from "../entities/grid";
import { Position } from "../entities/position";

export const createGrid = ({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
} = {}): Grid => ({
  width,
  height,
});

export const isOutOfBounds = ({
  position,
  grid,
}: {
  position: Position;
  grid: Grid;
}): boolean => {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= grid.width ||
    position.y >= grid.height
  );
};
