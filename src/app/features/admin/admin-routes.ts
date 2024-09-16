import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'reservations',
    loadComponent: () => import('./datatables/datatables.component').then((m) => m.DatatablesComponent),
  }
];
