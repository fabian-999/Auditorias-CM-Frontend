import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private readonly fb = inject(FormBuilder);

  isLoading = false;

  readonly loginForm = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.nonNullable.control('', [
      Validators.required,
    ]),
    rememberMe: this.fb.nonNullable.control(false),
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

      // Aquí puedes llamar al servicio de autenticación:
      // await this.authService.login(credenciales);
    } catch (error: unknown) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      this.isLoading = false;
    }
  }
}