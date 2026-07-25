import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../services/auth';
import { LoginDto } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  private readonly fb = inject(FormBuilder);

  // Se utilizará cuando conectemos el backend
  isLoading = false;

  readonly loginForm = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),
    password: this.fb.nonNullable.control('', [
      Validators.required
    ]),
    rememberMe: this.fb.nonNullable.control(false)
  });

  async iniciarSesion(): Promise<void> {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    try {

      const credenciales = this.loginForm.getRawValue();

      console.log('Credenciales:', credenciales);

      // Aquí llamaremos al AuthService
      // await this.authService.login(credenciales);

    } catch (error) {

      console.error('Error al iniciar sesión:', error);

    } finally {

      this.isLoading = false;

    }

  }

}