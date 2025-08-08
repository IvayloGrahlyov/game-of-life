import { Component, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { GameOfLifeService } from '../../services/game-of-life.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PresetNameDialog } from '../../dialogs/preset-name-dialog/preset-name-dialog';
import { PresetsService } from '../../services/presets.service';
import { LoadPresetDialog } from '../../dialogs/load-preset-dialog/load-preset-dialog';

@Component({
  selector: 'app-game-board',
  imports: [MatButtonModule, MatSliderModule],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css',
})
export class GameBoard {
  readonly minSize = 20;
  readonly maxSize = 200;

  size = signal(20);
  grid: boolean[][] = [];
  isRunning = signal(false);
  intervalId: ReturnType<typeof setInterval> | null = null;
  speed = signal(2);
  isLoggedIn = computed(() => this.authService.user());

  constructor(
    private gameOfLifeService: GameOfLifeService,
    private authService: AuthService,
    private presetService: PresetsService,
    private dialog: MatDialog,
  ) {
    let initialized = false;

    effect(() => {
      this.grid = gameOfLifeService.generateGrid(this.size(), this.size());

      if (!initialized) {
        this.grid = gameOfLifeService.randomizeGrid(this.grid);
        initialized = true;
      }
    });
  }

  toggleCell(row: number, col: number): void {
    this.grid[row][col] = !this.grid[row][col];
  }

  onSizeInputChange(value: string): void {
    const num = Math.max(this.minSize, Math.min(this.maxSize, parseInt(value)));

    this.size.set(num);
  }

  toggleRunning(): void {
    this.isRunning.update((running) => {
      if (!running) {
        this.intervalId = setInterval(() => {
          this.grid = this.gameOfLifeService.step(this.grid);
        }, 2000 / this.speed());
      } else {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = null;
      }
      return !running;
    });
  }

  changeSpeed(speed: number) {
    this.speed.set(speed);
    if (this.isRunning()) {
      // stop the last interval and start a new one
      this.toggleRunning();
      this.toggleRunning();
    }
  }

  randomizeGrid() {
    this.grid = this.gameOfLifeService.randomizeGrid(this.grid);
  }

  step() {
    this.grid = this.gameOfLifeService.step(this.grid);
  }

  clearGrid() {
    if (this.isRunning()) {
      this.toggleRunning();
    }
    this.grid = this.gameOfLifeService.clearGrid(this.grid);
  }

  savePreset() {
    const ref = this.dialog.open(PresetNameDialog);

    ref.afterClosed().subscribe((result) => {
      if (result?.presetName) {
        this.presetService
          .savePreset({
            name: result.presetName,
            grid: this.grid,
          })
          .subscribe({
            next: () => {
              ref.close();
            },
            error: (err) => {
              console.log({ err });
            },
          });
      }
    });
  }

  loadPreset() {
    const ref = this.dialog.open(LoadPresetDialog);

    ref.afterClosed().subscribe((selectedPreset) => {
      if (selectedPreset) {
        this.grid = selectedPreset.grid;
      }
    });
  }
}
