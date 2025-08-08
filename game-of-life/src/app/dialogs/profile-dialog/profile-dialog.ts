import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-profile-dialog',
  imports: [MatButtonModule, MatFormFieldModule],
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.css',
})
export class ProfileDialog {
  user = signal({
    username: '',
    firstName: '',
    lastName: '',
  });
  constructor(
    private dialogRef: MatDialogRef<ProfileDialog>,
    authService: AuthService,
  ) {
    this.user.set(authService.user());
  }

  close() {
    this.dialogRef.close();
  }
}
