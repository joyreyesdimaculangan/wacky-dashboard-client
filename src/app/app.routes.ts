import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'customer',
    loadChildren: () => 
      import('./features/customer/customer-routes').then(m => m.CustomerRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-routes').then(m => m.AdminRoutes),
  }
];
