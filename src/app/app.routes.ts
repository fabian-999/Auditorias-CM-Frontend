import { Routes } from '@angular/router';
import { Home } from './features/dashboard/pages/home/home';
import { Auditorias } from './features/auditorias/pages/auditorias/auditorias';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'auditorias',
    component: Auditorias
  },
];