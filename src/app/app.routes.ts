import { Routes } from '@angular/router';
import { hasTokenGuard } from './core/auth/guards/hasToken.guard';
import { authGuard } from './core/auth/guards/isAuthenticated.guard';
import { hasRoleGuard } from './core/auth/guards/hasRole.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AuthRoutes),
    title: 'Authentication',
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'password-recovery',
    loadChildren: () =>
      import('./core/password-recovery/password-recovery.component').then((m) => m.PasswordRecoveryComponent),
    title: 'Password Recovery',
  },
  {
    path: 'unauthorized',
    loadChildren: () =>
      import('./core/auth/pages/app-unauthorized/app-unauthorized.component').then((m) => m.AppUnauthorizedComponent),
    title: 'Unauthorized',
  },
  {
    path: 'customer',
    loadChildren: () => 
      import('./features/customer/customer-routes').then(m => m.CustomerRoutes),
    title: 'Home Page',
    canActivate: [hasRoleGuard],
    data: { roles: ['customer'] }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-routes').then(m => m.AdminRoutes),
    title: 'Admin Page',
    canActivate: [hasRoleGuard],
    data: { roles: ['admin'] }
  }
];
