import { Injectable, inject, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { LoginDto, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);

  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(localStorage.getItem('auth_token'));
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this._user()));

  login(credentials: LoginDto): Observable<User> {
    this._loading.set(true);
    this._error.set(null);

    return this.http
      .post<{ user: User; token: string }>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(({ user, token }) => {
          this._user.set(user);
          this._token.set(token);
          localStorage.setItem('auth_token', token);
          this._loading.set(false);
        }),
        map(({ user }) => user),
        catchError((error) => {
          this._loading.set(false);
          const message = error?.error?.message || 'Error al iniciar sesión';
          this._error.set(message);
          return throwError(() => new Error(message));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this._token.set(null);
    this._user.set(null);
  }

  loadUser(): Observable<User | null> {
    const token = this._token();
    if (!token) {
      return of(null);
    }

    this._loading.set(true);
    return this.http.get<{ user: User }>(`${environment.apiUrl}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      tap(({ user }) => {
        this._user.set(user);
        this._loading.set(false);
      }),
      map(({ user }) => user),
      catchError(() => {
        this._loading.set(false);
        this._user.set(null);
        return of(null);
      })
    );
  }
}

