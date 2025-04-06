import {
  createGrid,
  isOutOfBounds,
} from "../../../src/domain/services/gridService";

describe("Grid Service", () => {
  describe("createGrid", () => {
    it("should create a grid with default size", () => {
      const grid = createGrid({});
      expect(grid.width).toBe(20);
      expect(grid.height).toBe(20);
    });

    it("should create a grid with specified size", () => {
      const grid = createGrid({ width: 15, height: 10 });
      expect(grid.width).toBe(15);
      expect(grid.height).toBe(10);
    });

    it("should work with empty call with default parameters", () => {
      const grid = createGrid();
      expect(grid.width).toBe(20);
      expect(grid.height).toBe(20);
    });

    it("should allow specifying only one dimension", () => {
      const widthOnlyGrid = createGrid({ width: 30 });
      const heightOnlyGrid = createGrid({ height: 25 });

      expect(widthOnlyGrid.width).toBe(30);
      expect(widthOnlyGrid.height).toBe(20);

      expect(heightOnlyGrid.width).toBe(20);
      expect(heightOnlyGrid.height).toBe(25);
    });
  });

  describe("isOutOfBounds", () => {
    it("should return true for positions outside the grid", () => {
      const grid = createGrid({ width: 10, height: 10 });

      expect(isOutOfBounds({ position: { x: -1, y: 5 }, grid })).toBe(true);
      expect(isOutOfBounds({ position: { x: 5, y: -1 }, grid })).toBe(true);
      expect(isOutOfBounds({ position: { x: 10, y: 5 }, grid })).toBe(true);
      expect(isOutOfBounds({ position: { x: 5, y: 10 }, grid })).toBe(true);
    });

    it("should return false for positions inside the grid", () => {
      const grid = createGrid({ width: 10, height: 10 });

      expect(isOutOfBounds({ position: { x: 0, y: 0 }, grid })).toBe(false);
      expect(isOutOfBounds({ position: { x: 9, y: 9 }, grid })).toBe(false);
      expect(isOutOfBounds({ position: { x: 5, y: 5 }, grid })).toBe(false);
    });

    it("should work with different grid sizes", () => {
      const smallGrid = createGrid({ width: 5, height: 5 });
      const rectangularGrid = createGrid({ width: 10, height: 20 });

      expect(isOutOfBounds({ position: { x: 4, y: 4 }, grid: smallGrid })).toBe(
        false,
      );
      expect(isOutOfBounds({ position: { x: 5, y: 5 }, grid: smallGrid })).toBe(
        true,
      );
      expect(
        isOutOfBounds({ position: { x: 9, y: 19 }, grid: rectangularGrid }),
      ).toBe(false);
      expect(
        isOutOfBounds({ position: { x: 10, y: 15 }, grid: rectangularGrid }),
      ).toBe(true);
      expect(
        isOutOfBounds({ position: { x: 5, y: 20 }, grid: rectangularGrid }),
      ).toBe(true);
    });
  });
});
