import { Routes } from '@angular/router';
import { Home } from './features/dashboard/pages/home/home';
import { Auditorias } from './features/auditorias/pages/auditorias/auditorias';
import { Login } from './features/auth/pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'auditorias',
    component: Auditorias
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'auth',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];