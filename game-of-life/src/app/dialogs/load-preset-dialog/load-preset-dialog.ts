import { Component, Inject, effect, signal } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-preset-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './load-preset-dialog.html',
  styleUrl: './load-preset-dialog.css',
})
export class LoadPresetDialog {
  presets = signal<{ _id: string; name: string }[]>([]);
  selectedPreset = signal<string | null>(null);
  errorState = signal('');

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<LoadPresetDialog>,
  ) {
    this.loadPresets();
  }

  loadPresets() {
    this.http
      .get<{ _id: string; name: string; grid: boolean[][] }[]>('/api/presets')
      .subscribe({
        next: (res) => this.presets.set(res),
        error: (err) => {
          this.errorState.set('Failed to load presets');
          return console.error('Failed to load presets', err);
        },
      });
  }

  select() {
    if (this.selectedPreset()) {
      this.dialogRef.close(this.selectedPreset());
    }
  }

  close() {
    this.dialogRef.close(null);
  }
}
