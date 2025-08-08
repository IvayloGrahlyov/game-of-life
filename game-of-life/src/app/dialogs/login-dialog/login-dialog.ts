import { Component, computed, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css',
})
export class LoginDialog {
  currentMode = signal('');
  username = signal('');
  password = signal('');
  confirmPassword = signal('');
  firstName = signal('');
  lastName = signal('');
  errorState = signal('');

  constructor(
    private dialogRef: MatDialogRef<LoginDialog>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'login' | 'register' },
  ) {
    this.currentMode.set(data.mode);
  }

  submit() {
    if (this.username()) {
      const method = this.currentMode() === 'register' ? 'register' : 'login';
      this.authService[method]({
        username: this.username(),
        password: this.password(),
        ...(method === 'register'
          ? {
              confirmPassword: this.confirmPassword(),
              firstName: this.firstName(),
              lastName: this.lastName(),
            }
          : {}),
      }).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          this.errorState.set(`${method} failed`);
        },
      });
    }
  }

  isUsernameTouched() {
    return this.username().length > 0;
  }

  isPasswordTouched() {
    return this.password().length > 0;
  }

  isConfirmPasswordTouched() {
    return this.confirmPassword().length > 0;
  }

  isUsernameValid() {
    return this.username().length > 6 && this.username().length < 30;
  }

  isPasswordValid() {
    return this.password().length > 8 && this.username().length < 64;
  }

  isConfirmPasswordValid() {
    return this.password() === this.confirmPassword();
  }

  isModeRegister() {
    return this.currentMode() === 'register';
  }

  switchMode() {
    this.currentMode.set(this.isModeRegister() ? 'login' : 'register');
  }

  close() {
    this.dialogRef.close();
  }
}
