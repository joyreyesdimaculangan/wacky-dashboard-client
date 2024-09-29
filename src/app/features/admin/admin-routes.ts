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
  },
  {
    path: 'calendar',
    loadComponent: () => import('./admin-calendar/admin-calendar.component').then((m) => m.AdminCalendarComponent),
  },
  {
    path: 'customer_reviews',
    loadComponent: () => import('./admin-review/admin-review.component').then((m) => m.AdminReviewComponent),
  }
];
