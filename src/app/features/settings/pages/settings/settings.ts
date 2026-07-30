import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateModalComponent } from '../../components/user-create-modal/user-create-modal';
import { UsersTableComponent } from '../../components/users-table/users-table';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, UserCreateModalComponent, UsersTableComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 p-6">
      <div class="mx-auto max-w-7xl">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-slate-900">Administración de Usuarios</h1>
              <p class="text-sm text-slate-600 mt-1">Administra crear usuarios, editar rol, desactivarlos, actualizar contraseña.</p>
            </div>
            <button
              class="px-6 py-2.5 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all hover:from-emerald-700 hover:to-emerald-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <!-- Formulario de crear usuario (Columna izquierda) -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-emerald-200/40 rounded-2xl p-6 shadow-lg">
              <app-user-create-modal />
            </div>
          </div>

          <!-- Tabla de usuarios (Columna derecha) -->
          <div class="lg:col-span-2">
            <app-users-table />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsPage {}
