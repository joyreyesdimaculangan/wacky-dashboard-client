import { Routes } from '@angular/router';

export const CustomerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.component').then((m) => m.ServicesComponent),
  },
  // {
  //   path: 'reservation-form',
  //   loadComponent: () => import('./reservation-form/reservation-form.component').then((m) => m.ReservationFormComponent),
  // }
];
