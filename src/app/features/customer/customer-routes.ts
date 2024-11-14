import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../core/auth/guards/hasRole.guard';

export const CustomerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'reservations',
    pathMatch: 'full',
  },
  { 
    path: 'home',
    loadComponent: () => import('./../home/home.component').then((m) => m.HomeComponent),
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('../../features/customer/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
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
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
];
