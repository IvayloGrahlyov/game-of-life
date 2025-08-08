import { Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog/login-dialog';
import { AuthService } from '../../services/auth.service';
import { ProfileDialog } from '../../dialogs/profile-dialog/profile-dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
  imports: [MatButtonModule],
})
export class NavBar {
  isLoggedIn = computed(() => this.authService.user());

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  openLogin(mode: 'login' | 'register') {
    this.dialog.open(LoginDialog, {
      data: { mode },
    });
  }

  signOut() {
    this.authService.signOut();
  }

  openProfile() {
    this.dialog.open(ProfileDialog);
  }
}
