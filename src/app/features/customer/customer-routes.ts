import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../core/auth/guards/hasRole.guard';

export const CustomerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('./wackys-services/services.component').then((m) => m.ServicesComponent),
  },
  {
    path: 'reservations',
    loadComponent: () => import('./reservation-form/reservation-form.component').then((m) => m.ReservationFormComponent),
  },
];
