import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border border-emerald-200/40 rounded-2xl overflow-hidden shadow-lg">
      <!-- Tabla -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-xs font-semibold text-white uppercase tracking-wider border-b border-emerald-400/20">
            <tr>
              <th scope="col" class="px-6 py-4">Nombre</th>
              <th scope="col" class="px-6 py-4">Rol</th>
              <th scope="col" class="px-6 py-4">Área</th>
              <th scope="col" class="px-6 py-4">Activo</th>
              <th scope="col" class="px-6 py-4">Contraseña</th>
              <th scope="col" class="px-6 py-4">UID</th>
              <th scope="col" class="px-6 py-4 text-right">Acción</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-emerald-100/50">
            <ng-container *ngFor="let user of users(); let idx = index">
              <tr class="hover:bg-emerald-50 transition-colors group" [ngClass]="idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'">
                <td class="px-6 py-4">
                  <div class="font-semibold text-slate-900">{{ user.nombre }}</div>
                  <div class="text-xs text-slate-500">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-amber-100 text-amber-800': user.rol === 'admin',
                      'bg-blue-100 text-blue-800': user.rol === 'auditor',
                      'bg-slate-100 text-slate-800': user.rol === 'user'
                    }">
                    {{ user.rol }}
                  </span>
                </td>
                <td class="px-6 py-4 text-slate-700">{{ user.area }}</td>
                <td class="px-6 py-4">
                  <button
                    type="button"
                    (click)="toggleStatus(user.id)"
                    [class]="user.activo ? 'text-emerald-600' : 'text-red-600'"
                    class="font-medium transition-colors hover:opacity-75"
                  >
                    {{ user.activo ? 'Sí' : 'No' }}
                  </button>
                </td>
                <td class="px-6 py-4 font-mono text-xs">{{ user.contrasenha }}</td>
                <td class="px-6 py-4 font-mono text-xs text-slate-500">{{ user.uid }}</td>
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <div class="flex items-center justify-end gap-2">
                    <button 
                      type="button"
                      (click)="onEdit(user)"
                      class="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-300/60 transition-all hover:scale-105 active:scale-95">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      type="button"
                      (click)="onDelete(user)"
                      class="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-300/60 transition-all hover:scale-105 active:scale-95">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div *ngIf="users().length === 0" class="p-12 text-center">
        <div class="inline-flex p-3 rounded-full bg-emerald-100/60 text-emerald-600 mb-3">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-slate-800">No hay usuarios creados</p>
        <p class="text-xs text-slate-600 mt-1">Crea un usuario en el formulario de arriba para que aparezca aquí.</p>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-slate-50 border-t border-emerald-200/40 text-sm text-slate-600">
        OBC: {{ users().length }} usuario{{ users().length !== 1 ? 's' : '' }}
      </div>
    </div>
  `,
  styles: []
})
export class UsersTableComponent {
  readonly usersService = inject(UsersService);
  readonly users = this.usersService.getUsers();

  toggleStatus(id: string): void {
    this.usersService.toggleUserStatus(id);
  }

  onEdit(user: User): void {
    const nombre = prompt('Nombre', user.nombre);
    if (nombre === null) return;
    const area = prompt('Área', user.area);
    if (area === null) return;
    const rol = prompt('Rol (admin, auditor, user)', user.rol);
    if (rol === null) return;

    this.usersService.updateUser(user.id, { nombre, area, rol: rol as User['rol'] });
  }

  onDelete(user: User): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.nombre}?`)) {
      this.usersService.deleteUser(user.id);
    }
  }
}
