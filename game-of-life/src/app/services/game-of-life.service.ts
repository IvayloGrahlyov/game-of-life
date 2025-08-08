import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameOfLifeService {
  generateGrid(rows: number, cols: number) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => false),
    );
  }

  step(currentGrid: boolean[][]) {
    return currentGrid.map((row, i) =>
      row.map((cell, j) => {
        const neighbors = this.countNeighbors(currentGrid, i, j);
        if (cell) return neighbors === 2 || neighbors === 3;
        else return neighbors === 3;
      }),
    );
  }

  countNeighbors(grid: boolean[][], x: number, y: number) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < grid.length &&
          ny < grid[0].length &&
          grid[nx][ny]
        ) {
          count++;
        }
      }
    }
    return count;
  }

  clearGrid(grid: boolean[][]) {
    return grid.map((row) => row.map(() => false));
  }

  randomizeGrid(grid: boolean[][]) {
    return grid.map((row) => {
      return row.map(() => {
        const m = Math.random() < 0.2;
        return m;
      });
    });
  }
}
