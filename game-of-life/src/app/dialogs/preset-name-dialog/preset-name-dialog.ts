import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-preset-name-dialog',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './preset-name-dialog.html',
  styleUrl: './preset-name-dialog.css',
})
export class PresetNameDialog {
  presetName = signal('');
  errorState = signal('');
  constructor(private dialogRef: MatDialogRef<PresetNameDialog>) {}

  submit() {
    this.dialogRef.close({
      presetName: this.presetName(),
    });
  }

  isPresetNameTouched() {
    return this.presetName().length > 0;
  }
  isPresetNameValid() {
    return this.presetName().length > 6 && this.presetName().length < 30;
  }
  close() {
    this.dialogRef.close();
  }
}
