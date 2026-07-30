import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { User, CreateUserPayload } from '../models/user.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  private users = signal<User[]>([]);

  private loadingList = signal(false);
  private loadingAction = signal(false);
  private error = signal<string | null>(null);

  getUsers() {
    return this.users.asReadonly();
  }

  getLoadingList() {
    return this.loadingList.asReadonly();
  }

  getLoadingAction() {
    return this.loadingAction.asReadonly();
  }

  getError() {
    return this.error.asReadonly();
  }

  constructor() {
    this.loadUsers();
  }

  createUser(payload: CreateUserPayload): void {
    this.loadingAction.set(true);
    this.error.set(null);

    this.http.post<User>(`${environment.apiUrl}/users`, payload, { observe: 'response' }).subscribe({
      next: (resp: HttpResponse<User>) => {
        const created = resp.body;
        if (created) {
          this.users.update((u) => [...u, created]);
          this.loadingAction.set(false);
        } else {
          // Backend returned no body (201 with Location). Refresh list.
          this.loadUsers();
          this.loadingAction.set(false);
        }
      },
      error: (err) => {
        this.error.set(String(err));
        this.loadingAction.set(false);
      },
    });
  }

  updateUser(id: string, payload: Partial<User>): void {
    this.loadingAction.set(true);
    this.error.set(null);

    this.http.put<User>(`${environment.apiUrl}/users/${id}`, payload).subscribe({
      next: (updated) => {
        this.users.update((users) => users.map((u) => (u.id === id ? updated : u)));
        this.loadingAction.set(false);
      },
      error: (err) => {
        this.error.set(String(err));
        this.loadingAction.set(false);
      },
    });
  }

  deleteUser(id: string): void {
    this.loadingAction.set(true);
    this.error.set(null);

    this.http.delete(`${environment.apiUrl}/users/${id}`).subscribe({
      next: () => {
        this.users.update((users) => users.filter((u) => u.id !== id));
        this.loadingAction.set(false);
      },
      error: (err) => {
        this.error.set(String(err));
        this.loadingAction.set(false);
      },
    });
  }

  toggleUserStatus(id: string): void {
    // Toggle locally and sync to backend
    const user = this.users().find((u) => u.id === id);
    if (!user) return;

    const updated = { ...user, activo: !user.activo };
    this.updateUser(id, updated);
    // optimistic update: reflect immediately
    this.users.update((users) => users.map((u) => (u.id === id ? updated : u)));
  }

  // Inicializar cargando usuarios desde el backend
  loadUsers(): void {
    this.loadingList.set(true);
    this.http.get<User[]>(`${environment.apiUrl}/users`).subscribe({
      next: (list) => {
        this.users.set(list);
        this.loadingList.set(false);
      },
      error: (err) => {
        this.error.set(String(err));
        this.loadingList.set(false);
      },
    });
  }
}
