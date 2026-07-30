import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Título -->
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Crear usuario</h2>
        <p class="text-sm text-slate-600 mt-1">Crea un usuario en Auth+ su perfil será guardado en la base. Solo en Auth.</p>
      </div>

      <!-- Formulario -->
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            formControlName="email"
            placeholder="correo@empresa.com"
            class="w-full px-4 py-2 border border-emerald-300/40 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all text-slate-900"
          />
        </div>

        <!-- Nombre -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
          <input
            type="text"
            formControlName="nombre"
            placeholder="Nombre completo"
            class="w-full px-4 py-2 border border-emerald-300/40 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all text-slate-900"
          />
        </div>

        <!-- Contraseña -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
          <input
            type="password"
            formControlName="contrasenha"
            placeholder="Mínimo 8 caracteres"
            class="w-full px-4 py-2 border border-emerald-300/40 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all text-slate-900"
          />
        </div>

        <!-- Área -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Área</label>
          <input
            type="text"
            formControlName="area"
            placeholder="Área / proceso"
            class="w-full px-4 py-2 border border-emerald-300/40 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all text-slate-900"
          />
        </div>

        <!-- Rol -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Rol</label>
          <select
            formControlName="rol"
            class="w-full px-4 py-2 border border-emerald-300/40 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all text-slate-900 bg-white"
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Admin</option>
            <option value="auditor">Auditor</option>
            <option value="user">Usuario</option>
          </select>
        </div>

        <!-- Botón -->
        <button
          type="submit"
          [disabled]="form.invalid || usersService.getLoadingAction()()"
          class="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg transition-all hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ usersService.getLoadingAction()() ? 'Creando...' : 'Crear usuario' }}
        </button>
      </form>
    </div>
  `,
  styles: []
})
export class UserCreateModalComponent {
  readonly usersService = inject(UsersService);
  private readonly fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      contrasenha: ['', [Validators.required, Validators.minLength(8)]],
      area: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.usersService.createUser(this.form.value);
      this.form.reset();
    }
  }
}
