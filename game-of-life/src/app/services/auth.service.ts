import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt';
  user = signal<any>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.http.get('/api/users').subscribe({
        next: (u) => this.user.set(u),
        error: () => localStorage.removeItem(this.tokenKey),
      });
    }
  }

  login(data: { username: string; password: string }) {
    return this.http.post<{ accessToken: string }>('api/auth/login', data).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.accessToken);
        this.http.get('/api/users').subscribe((u) => this.user.set(u));
      }),
    );
  }

  register(data: { username: string; password: string }) {
    return this.http
      .post<{ accessToken: string }>('/api/auth/register', data)
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.accessToken);
          this.http.get('/api/users').subscribe((u) => this.user.set(u));
        }),
      );
  }

  signOut() {
    localStorage.removeItem(this.tokenKey);
    this.user.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
