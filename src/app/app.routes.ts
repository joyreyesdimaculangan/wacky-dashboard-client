import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth-routes').then((m) => m.AuthRoutes),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home/home.component').then((m) => m.HomeComponent),
  }
];
