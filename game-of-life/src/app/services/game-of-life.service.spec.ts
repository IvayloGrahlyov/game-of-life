import { TestBed } from '@angular/core/testing';
import { GameOfLifeService } from './game-of-life.service';

describe('GameOfLifeService', () => {
  let service: GameOfLifeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOfLifeService);
  });

  describe('generateGrid', () => {
    it('should generate a grid of the correct size with all false values', () => {
      const grid = service.generateGrid(3, 4);
      expect(grid.length).toBe(3);
      grid.forEach((row) => {
        expect(row.length).toBe(4);
        row.forEach((cell) => expect(cell).toBeFalse());
      });
    });
  });

  describe('countNeighbors', () => {
    it('should count neighbors correctly in the middle of the grid', () => {
      const grid = [
        [true, true, false],
        [false, true, false],
        [false, false, true],
      ];
      expect(service.countNeighbors(grid, 1, 1)).toBe(3);
    });

    it('should count neighbors correctly at the edge', () => {
      const grid = [
        [true, false],
        [false, true],
      ];
      expect(service.countNeighbors(grid, 0, 0)).toBe(1);
    });

    it('should return 0 when there are no neighbors', () => {
      const grid = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ];
      expect(service.countNeighbors(grid, 1, 1)).toBe(0);
    });
  });

  describe('step', () => {
    it('should keep a live cell alive if it has 2 or 3 neighbors', () => {
      const grid = [
        [true, true, false],
        [true, true, false],
        [false, false, false],
      ];
      const next = service.step(grid);
      expect(next[1][1]).toBeTrue(); // center cell stays alive
    });

    it('should kill a live cell with fewer than 2 neighbors (underpopulation)', () => {
      const grid = [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ];
      const next = service.step(grid);
      expect(next[1][1]).toBeFalse();
    });

    it('should kill a live cell with more than 3 neighbors (overpopulation)', () => {
      const grid = [
        [true, true, true],
        [true, true, false],
        [false, false, false],
      ];
      const next = service.step(grid);
      expect(next[1][1]).toBeFalse();
    });

    it('should make a dead cell alive if it has exactly 3 neighbors (reproduction)', () => {
      const grid = [
        [true, true, false],
        [false, false, false],
        [false, true, false],
      ];
      const next = service.step(grid);
      expect(next[1][1]).toBeTrue();
    });
  });

  describe('clearGrid', () => {
    it('should set all cells to false', () => {
      const grid = [
        [true, false],
        [false, true],
      ];
      const cleared = service.clearGrid(grid);
      cleared.forEach((row) => row.forEach((cell) => expect(cell).toBeFalse()));
    });
  });

  describe('randomizeGrid', () => {
    let originalRandom: () => number;

    beforeEach(() => {
      originalRandom = Math.random;
    });

    afterEach(() => {
      Math.random = originalRandom;
    });

    it('should set approximately 20% of cells to true', () => {
      // Force deterministic "randomness"
      let calls = 0;
      Math.random = () => {
        calls++;
        return calls % 5 === 0 ? 0.1 : 0.9; // every 5th cell will be < 0.2
      };

      const grid = service.generateGrid(5, 5);
      const randomized = service.randomizeGrid(grid);

      let trueCount = randomized.flat().filter(Boolean).length;
      expect(trueCount).toBeGreaterThan(0);
      expect(trueCount).toBeLessThan(25);
    });
  });
});
