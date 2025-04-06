import { Position } from "../entities/position.ts";

export const generateRandomPosition = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): Position => ({
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
});
