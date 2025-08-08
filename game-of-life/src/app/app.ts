import { Component, signal } from '@angular/core';
import { GameBoard } from './components/game-board/game-board';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavBar } from './components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [GameBoard, NavBar, CommonModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('game-of-life');
}
